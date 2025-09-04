import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CoordinatorView from './CoordinatorView';
import AdminView from './AdminView';
import './RoomAllocation.css';

const RoomAllocation = () => {
  const [userRole, setUserRole] = useState('coordinator'); // Default to coordinator
  const [allocations, setAllocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  // Fetch room allocations
  const fetchAllocations = async (status = '') => {
    try {
      const url = status 
        ? `http://localhost:5000/api/room-allocations?status=${status}`
        : 'http://localhost:5000/api/room-allocations';
      
      const response = await axios.get(url);
      setAllocations(response.data);
    } catch (error) {
      console.error('Error fetching room allocations:', error);
      setMessage('Error fetching room allocations.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllocations();
  }, []);

  const handleRoleChange = (role) => {
    setUserRole(role);
    if (role === 'admin') {
      fetchAllocations('pending'); // For admin, show pending by default
    } else {
      fetchAllocations(); // For coordinator, show all
    }
  };

  return (
    <div className="room-allocation-container">
      <div className="role-selector">
        <button 
          className={userRole === 'coordinator' ? 'active' : ''}
          onClick={() => handleRoleChange('coordinator')}
        >
          Coordinator View
        </button>
        <button 
          className={userRole === 'admin' ? 'active' : ''}
          onClick={() => handleRoleChange('admin')}
        >
          Admin View
        </button>
      </div>

      <h2>Room Allocation Management - {userRole === 'coordinator' ? 'Coordinator' : 'Admin'}</h2>
      
      {message && <div className="message">{message}</div>}
      
      {loading ? (
        <div className="loading">Loading...</div>
      ) : userRole === 'coordinator' ? (
        <CoordinatorView 
          allocations={allocations}
          fetchAllocations={fetchAllocations}
          setMessage={setMessage}
        />
      ) : (
        <AdminView 
          allocations={allocations}
          fetchAllocations={fetchAllocations}
          setMessage={setMessage}
        />
      )}
    </div>
  );
};

export default RoomAllocation;