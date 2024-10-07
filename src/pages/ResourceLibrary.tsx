import React, { useState, useEffect } from 'react';
import { Book, Video, FileText, Link, Plus } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

interface Resource {
  _id: string;
  title: string;
  type: 'book' | 'video' | 'pdf' | 'link';
  content: string;
}

const ResourceLibrary: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const { register, handleSubmit, reset } = useForm<Resource>();

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/resources');
      setResources(response.data);
    } catch (error) {
      console.error('Error fetching resources:', error);
      toast.error('Failed to fetch resources');
    }
  };

  const onSubmit = async (data: Resource) => {
    try {
      const response = await axios.post('http://localhost:5000/api/resources', data);
      setResources([...resources, response.data]);
      reset();
      toast.success('Resource added successfully');
    } catch (error) {
      console.error('Error adding resource:', error);
      toast.error('Failed to add resource');
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'book':
        return <Book className="text-primary" size={24} />;
      case 'video':
        return <Video className="text-primary" size={24} />;
      case 'pdf':
        return <FileText className="text-primary" size={24} />;
      case 'link':
        return <Link className="text-primary" size={24} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-primary">Resource Library</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white rounded-lg shadow-md p-4">
        <div>
          <label htmlFor="title" className="block mb-1">Title</label>
          <input
            type="text"
            id="title"
            {...register('title', { required: true })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label htmlFor="type" className="block mb-1">Type</label>
          <select
            id="type"
            {...register('type', { required: true })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="book">Book</option>
            <option value="video">Video</option>
            <option value="pdf">PDF</option>
            <option value="link">Link</option>
          </select>
        </div>
        <div>
          <label htmlFor="content" className="block mb-1">Content</label>
          <textarea
            id="content"
            {...register('content', { required: true })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            rows={4}
          ></textarea>
        </div>
        <button type="submit" className="bg-primary text-white py-2 px-4 rounded-md hover:bg-secondary transition-colors">
          <Plus size={20} className="inline mr-2" />
          Add Resource
        </button>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map(resource => (
          <div key={resource._id} className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center space-x-4">
              {getIcon(resource.type)}
              <div>
                <h3 className="text-lg font-semibold">{resource.title}</h3>
                <p className="text-sm text-gray-500 capitalize">{resource.type}</p>
              </div>
            </div>
            <p className="mt-2 text-gray-600">{resource.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResourceLibrary;