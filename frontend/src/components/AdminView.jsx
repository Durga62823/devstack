import React, { useState } from 'react';
import axios from 'axios';

const AdminView = ({ allocations, fetchAllocations, setMessage }) => {
  const [filterStatus, setFilterStatus] = useState('pending');

  const handleStatusChange = async (id, status) => {
    try {
      await axios.patch(`http://localhost:5000/api/room-allocations/${id}`, { status });
      setMessage(`Room allocation ${status} successfully.`);
      fetchAllocations(filterStatus);
    } catch (error) {
      setMessage('Error updating room allocation status.');
      console.error('Error updating room allocation:', error);
    }
  };

  const handleFilterChange = (e) => {
    const status = e.target.value;
    setFilterStatus(status);
    fetchAllocations(status);
  };

  return (
    <div>
      <div className="filter-container">
        <label>Filter by status: </label>
        <select value={filterStatus} onChange={handleFilterChange}>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
          <option value="">All</option>
        </select>
      </div>

      <div className="allocations-table">
        <h3>Room Allocations - {filterStatus || 'All'}</h3>
        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Campus</th>
              <th>Branch</th>
              <th>Mentor Name</th>
              <th>Room No</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allocations.map((allocation, index) => (
              <tr key={allocation._id}>
                <td>{index + 1}</td>
                <td>{allocation.campus}</td>
                <td>{allocation.branch}</td>
                <td>{allocation.mentorName}</td>
                <td>{allocation.roomNo}</td>
                <td className={`status ${allocation.status}`}>
                  {allocation.status}
                </td>
                <td className="actions">
                  {allocation.status === 'pending' ? (
                    <>
                      <button
                        onClick={() => handleStatusChange(allocation._id, 'approved')}
                        className="approve-btn"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleStatusChange(allocation._id, 'rejected')}
                        className="reject-btn"
                      >
                        Reject
                      </button>
                    </>
                  ) : (
                    <span>No actions available</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {allocations.length === 0 && <p>No room allocations found.</p>}
      </div>
    </div>
  );
};

export default AdminView;
