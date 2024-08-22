import React, { useState, useEffect } from 'react';
import api from '../../api/axiosConfig';
import './Pending.css';

const Pending = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);  // Loading state
    const [error, setError] = useState('');         // Error message state

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                const response = await api.get('/userApi/pending');
                setUsers(response.data);
            } catch (err) {

                setError('Failed to fetch users.');
            } finally {
                setLoading(false);

            }
        };

        fetchUsers();
    }, []);

    const handleApprove = async (id) => {
        try {

            setLoading(true);
            const response = await api.post(`/userApi/approve/${id}`);
            if (response.status === 200) {
                setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
                alert('User approved successfully!');
            } else {
                setError('Failed to approve user.');
            }
        } catch (err) {
            setError('Failed to approve user.');
        } finally {
            setLoading(false);

        }
    };

    const handleReject = async (id) => {
        try {

            setLoading(true);
            const response = await api.post(`/userApi/reject/${id}`);
            if (response.status === 200) {
                setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
                alert('User rejected successfully!');
            } else {
                setError('Failed to reject user.');
            }
        } catch (err) {
            setError('Failed to reject user.');
        } finally {
            setLoading(false);

        }
    };

    return (
        <div className="admin-dashboard-page">
            <h2>Pending User Approvals</h2>
            <div className="approval-list">

                {loading && <div className="spinner"></div>}  {/* Spinner */}
                {error && <div className="error-message">{error}</div>}  {/* Error message */}
                {!loading && users.map(user => (

                    <div key={user.id} className="approval-card">
                        <h2>{user.taiwaneseName}</h2>
                        <p>{user.school}</p>
                        <p>{user.program}</p>
                        {user?.fileId && (
                            <img 
                                src={`https://member-server.stsa.tw/userApi/images/${user.fileId}`}  
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
