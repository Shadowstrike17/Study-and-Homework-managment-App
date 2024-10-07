import express from 'express';
import Task from '../models/Task.js';
import Event from '../models/Event.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const userId = req.user.sub;
    const weeklyStudyTime = await getWeeklyStudyTime(userId);
    const taskDistribution = await getTaskDistribution(userId);

    res.json({
      weeklyStudyTime,
      taskDistribution,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function getWeeklyStudyTime(userId) {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const events = await Event.find({
    userId,
    start: { $gte: sevenDaysAgo },
  });

  const tasks = await Task.find({
    userId,
    createdAt: { $gte: sevenDaysAgo },
    status: 'done',
  });

  const weeklyData = Array(7).fill().map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return {
      name: date.toLocaleDateString('en-US', { weekday: 'short' }),
      studyTime: 0,
      tasks: 0,
    };
  }).reverse();

  events.forEach(event => {
    const dayIndex = 6 - Math.floor((new Date() - event.start) / (1000 * 60 * 60 * 24));
    if (dayIndex >= 0 && dayIndex < 7) {
      weeklyData[dayIndex].studyTime += (event.end - event.start) / (1000 * 60);
    }
  });

  tasks.forEach(task => {
    const dayIndex = 6 - Math.floor((new Date() - task.createdAt) / (1000 * 60 * 60 * 24));
    if (dayIndex >= 0 && dayIndex < 7) {
      weeklyData[dayIndex].tasks += 1;
    }
  });

  return weeklyData;
}

async function getTaskDistribution(userId) {
  const tasks = await Task.find({ userId });
  const distribution = {
    todo: 0,
    inProgress: 0,
    done: 0,
  };

  tasks.forEach(task => {
    distribution[task.status]++;
  });

  return Object.entries(distribution).map(([name, value]) => ({ name, value }));
}

export default router;