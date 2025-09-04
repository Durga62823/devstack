const express = require('express');
const router = express.Router();
const RoomAllocation = require('../models/RoomAllocation');

// Get all room allocations
router.get('/', async (req, res) => {
  try {
    const { status } = req.query;
    let filter = {};
    if (status) {
      filter.status = status;
    }
    const allocations = await RoomAllocation.find(filter);
    res.json(allocations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get room allocation by ID
router.get('/:id', async (req, res) => {
  try {
    const allocation = await RoomAllocation.findById(req.params.id);
    if (!allocation) {
      return res.status(404).json({ message: 'Room allocation not found' });
    }
    res.json(allocation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new room allocation
router.post('/', async (req, res) => {
  const allocation = new RoomAllocation({
    campus: req.body.campus,
    branch: req.body.branch,
    mentorName: req.body.mentorName,
    roomNo: req.body.roomNo,
    createdBy: req.body.createdBy
  });

  try {
    const newAllocation = await allocation.save();
    res.status(201).json(newAllocation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update room allocation status (for admin approval)
router.patch('/:id', async (req, res) => {
  try {
    const allocation = await RoomAllocation.findById(req.params.id);
    if (!allocation) {
      return res.status(404).json({ message: 'Room allocation not found' });
    }

    if (req.body.status) {
      allocation.status = req.body.status;
    }

    const updatedAllocation = await allocation.save();
    res.json(updatedAllocation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a room allocation
router.delete('/:id', async (req, res) => {
  try {
    const allocation = await RoomAllocation.findByIdAndDelete(req.params.id);
    if (!allocation) {
      return res.status(404).json({ message: 'Room allocation not found' });
    }
    res.json({ message: 'Room allocation deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;