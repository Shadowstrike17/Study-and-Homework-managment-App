import express from 'express';
import Resource from '../models/Resource.js';

const router = express.Router();

// Get all resources
router.get('/', async (req, res) => {
  try {
    const resources = await Resource.find({ userId: req.userId });
    res.json(resources);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new resource
router.post('/', async (req, res) => {
  const resource = new Resource({
    ...req.body,
    userId: req.userId,
  });

  try {
    const newResource = await resource.save();
    res.status(201).json(newResource);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a resource
router.put('/:id', async (req, res) => {
  try {
    const updatedResource = await Resource.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true }
    );
    res.json(updatedResource);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a resource
router.delete('/:id', async (req, res) => {
  try {
    await Resource.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    res.json({ message: 'Resource deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;