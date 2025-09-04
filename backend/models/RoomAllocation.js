const mongoose = require('mongoose');

const roomAllocationSchema = new mongoose.Schema({
  campus: {
    type: String,
    required: true
  },
  branch: {
    type: String,
    required: true
  },
  mentorName: {
    type: String,
    required: true
  },
  roomNo: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  createdBy: {
    type: String, // Coordinator ID or name
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('RoomAllocation', roomAllocationSchema);