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
                console.error('Failed to fetch users', err);
            }
        };

        fetchUsers();
    }, []);

    const handleApprove = async (id) => {
        try {
            await api.post(`/userApi/approve/${id}`);
            setUsers(users.filter(user => user.id !== id));  // Remove approved user from list
            alert('User approved successfully!');  // Show success alert
        } catch (err) {
            console.error('Failed to approve user', err);
            alert('Failed to approve user.');  // Show error alert
        }
    };

    const handleReject = async (id) => {
        try {
            await api.post(`/userApi/reject/${id}`);
            setUsers(users.filter(user => user.id !== id));  // Remove rejected user from list
            alert('User rejected successfully!');  // Show success alert
        } catch (err) {
            console.error('Failed to reject user', err);
            alert('Failed to reject user.');  // Show error alert
        }
    };

    return (
        <div className="admin-dashboard-page">
            <h2>Pending User Approvals</h2>
            <div className="approval-list">
                {users.map(user => {
                    return (
                        <div key={user.id} className="approval-card">
                            <h2>{user.taiwaneseName}</h2>
                            <p>{user.school}</p>
                            <p>{user.program}</p>
                            {user?.imageUrl && (
                                <img 
                                src={`http://localhost:8080/userApi/images/${user.imageUrl}`}  
                                alt="Student Card" 
                                style={{ maxWidth: '100%', height: 'auto', marginBottom: '10px' }} 

                                />
                            )}

                            <button onClick={() => handleApprove(user.id)}>Approve</button>
                            <button className="reject" onClick={() => handleReject(user.id)}>Reject</button>
                        </div>
                    );
                })}
            </div>
            <div className='pt-5'></div>
            <div className='pt-5'></div>
            <div className='pt-5'></div>
            <div className='pt-5'></div>
            <div className='pt-5'></div>
            <div className='pt-5'></div>
            <div className='pt-5'></div>
            <div className='pt-5'></div>
            <div className='pt-5'></div>
            <div className='pt-5'></div>
            <div className='pt-5'></div>
            <div className='pt-5'></div>
            <div className='pt-5'></div>
            <div className='pt-5'></div>

        </div>
    );
};

export default Pending;
