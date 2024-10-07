import React, { useState, useEffect } from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const localizer = momentLocalizer(moment);

interface Event {
  _id: string;
  title: string;
  start: Date;
  end: Date;
}

const Calendar: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/events');
      setEvents(response.data.map((event: any) => ({
        ...event,
        start: new Date(event.start),
        end: new Date(event.end)
      })));
    } catch (error) {
      console.error('Error fetching events:', error);
      toast.error('Failed to fetch events');
    }
  };

  const handleSelect = async ({ start, end }: { start: Date; end: Date }) => {
    const title = window.prompt('New Event name');
    if (title) {
      const newEvent = { title, start, end };
      try {
        const response = await axios.post('http://localhost:5000/api/events', newEvent);
        setEvents([...events, { ...response.data, start: new Date(response.data.start), end: new Date(response.data.end) }]);
        toast.success('Event added successfully');
      } catch (error) {
        console.error('Error adding event:', error);
        toast.error('Failed to add event');
      }
    }
  };

  const onDragEnd = async (result: any) => {
    if (!result.destination) return;

    const { source, destination, draggableId } = result;
    const event = events.find(e => e._id === draggableId);

    if (!event) return;

    const newStart = new Date(event.start);
    const newEnd = new Date(event.end);
    const diff = destination.index - source.index;

    newStart.setDate(newStart.getDate() + diff);
    newEnd.setDate(newEnd.getDate() + diff);

    try {
      await axios.put(`http://localhost:5000/api/events/${event._id}`, {
        ...event,
        start: newStart,
        end: newEnd
      });

      setEvents(events.map(e => e._id === event._id ? { ...e, start: newStart, end: newEnd } : e));
      toast.success('Event updated successfully');
    } catch (error) {
      console.error('Error updating event:', error);
      toast.error('Failed to update event');
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-primary">Calendar</h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="calendar" direction="horizontal">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <div className="bg-white rounded-lg shadow-md p-4" style={{ height: '600px' }}>
                <BigCalendar
                  localizer={localizer}
                  events={events}
                  startAccessor="start"
                  endAccessor="end"
                  style={{ height: '100%' }}
                  selectable
                  onSelectSlot={handleSelect}
                  components={{
                    event: ({ event }) => (
                      <Draggable key={event._id} draggableId={event._id} index={events.indexOf(event)}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            {event.title}
                          </div>
                        )}
                      </Draggable>
                    ),
                  }}
                />
              </div>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default Calendar;