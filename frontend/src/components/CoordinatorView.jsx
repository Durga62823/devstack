import React, { useState } from 'react';
import axios from 'axios';

const CoordinatorView = ({ allocations, fetchAllocations, setMessage }) => {
  const [formData, setFormData] = useState({
    campus: '',
    branch: '',
    mentorName: '',
    roomNo: ''
  });
  const [loading, setLoading] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await axios.post('http://localhost:5000/api/room-allocations', {
        ...formData,
        createdBy: 'Coordinator Name' // Replace with auth context
      });
      
      setMessage('Room allocation created successfully! Waiting for admin approval.');
      setFormData({ campus: '', branch: '', mentorName: '', roomNo: '' });
      fetchAllocations(); // Refresh the list
    } catch (error) {
      setMessage('Error creating room allocation.');
      console.error('Error creating room allocation:', error);
    }
    
    setLoading(false);
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAllocations = allocations.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(allocations.length / itemsPerPage);

  return (
    <div>
      <div className="allocation-form">
        <h3>Create New Room Allocation</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Campus:</label>
            <select 
              name="campus" 
              value={formData.campus} 
              onChange={handleInputChange}
              required
            >
              <option value="">Select Campus</option>
              <option value="Kiet">Kiet</option>
              <option value="kiet+">Kiet+</option>
              <option value="Kiet Womens">Kiet Womens</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Branch:</label>
            <input 
              type="text" 
              name="branch" 
              value={formData.branch} 
              onChange={handleInputChange}
              placeholder="e.g., Computer Science"
              required 
            />
          </div>
          
          <div className="form-group">
            <label>Mentor Name:</label>
            <input 
              type="text" 
              name="mentorName" 
              value={formData.mentorName} 
              onChange={handleInputChange}
              placeholder="e.g., Dr. Sarah Johnson"
              required 
            />
          </div>
          
          <div className="form-group">
            <label>Room No:</label>
            <input 
              type="text" 
              name="roomNo" 
              value={formData.roomNo} 
              onChange={handleInputChange}
              placeholder="e.g., CS-101"
              required 
            />
          </div>
          
          <button type="submit" disabled={loading}>
            {loading ? 'Creating...' : 'Create Allocation'}
          </button>
        </form>
      </div>
      
      <div className="allocations-table">
        <h3>All Room Allocations</h3>
        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Campus</th>
              <th>Branch</th>
              <th>Mentor Name</th>
              <th>Room No</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {currentAllocations.map((allocation, index) => (
              <tr key={allocation._id}>
                <td>{indexOfFirstItem + index + 1}</td>
                <td>{allocation.campus}</td>
                <td>{allocation.branch}</td>
                <td>{allocation.mentorName}</td>
                <td>{allocation.roomNo}</td>
                <td className={`status ${allocation.status}`}>
                  {allocation.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="pagination">
          <button 
            disabled={currentPage === 1} 
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Prev
          </button>
          <span> Page {currentPage} of {totalPages} </span>
          <button 
            disabled={currentPage === totalPages} 
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoordinatorView;
