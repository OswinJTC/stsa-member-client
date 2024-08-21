import React, { useState, useEffect } from 'react';
import api from '../../api/axiosConfig';
import './Pending.css';

const Pending = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Fetch users pending approval
        const fetchUsers = async () => {
            try {
                const response = await api.get('/userApi/pending');
                console.log(response.data);  // Log the data to inspect it
                setUsers(response.data);
            } catch (err) {
                console.error('Failed to fetch users:', err.response ? err.response.data : err.message);
            }
        };

        fetchUsers();
    }, []);

    const handleApprove = async (id) => {
        try {
            const response = await api.post(`/userApi/approve/${id}`);
            console.log('Approve response:', response);  // Log the response

            if (response.status === 200) {
                setUsers(prevUsers => prevUsers.filter(user => user.id !== id));  // Remove approved user from list
                alert('User approved successfully!');
            } else {
                console.warn('Unexpected response status:', response.status);
                alert('Failed to approve user.');
            }
        } catch (err) {
            console.error('Failed to approve user:', err.response ? err.response.data : err.message);
            alert('Failed to approve user.');
        }
    };

    const handleReject = async (id) => {
        try {
            const response = await api.post(`/userApi/reject/${id}`);
            console.log('Reject response:', response);  // Log the response

            if (response.status === 200) {
                setUsers(prevUsers => prevUsers.filter(user => user.id !== id));  // Remove rejected user from list
                alert('User rejected successfully!');
            } else {
                console.warn('Unexpected response status:', response.status);
                alert('Failed to reject user.');
            }
        } catch (err) {
            console.error('Failed to reject user:', err.response ? err.response.data : err.message);
            alert('Failed to reject user.');
        }
    };

    return (
        <div className="admin-dashboard-page">
            <h2>Pending User Approvals</h2>
            <div className="approval-list">
                {users.map(user => (
                    <div key={user.id} className="approval-card">
                        <h2>{user.taiwaneseName}</h2>
                        <p>{user.school}</p>
                        <p>{user.program}</p>
                        {user?.fileId && (
                            <img 
                                src={`http://localhost:8080/userApi/images/${user.fileId}`}  
                                alt="Student Card" 
                                style={{ maxWidth: '100%', height: 'auto', marginBottom: '10px' }} 
                            />
                        )}
                        <button onClick={() => handleApprove(user.id)}>Approve</button>
                        <button className="reject" onClick={() => handleReject(user.id)}>Reject</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Pending;
