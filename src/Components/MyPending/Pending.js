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
            <h2>待認證的會員</h2>
            <div className="approval-list">

                {loading && <div className="spinner"></div>}  {/* Spinner */}
                {error && <div className="error-message">{error}</div>}  {/* Error message */}
                {!loading && users.map(user => (

                    <div key={user.id} className="approval-card">
    <h2>{user.taiwaneseName} ({user.englishName})</h2>

    {user?.fileId && (
        <img 
            src={`http://localhost:8080/userApi/images/${user.fileId}`}  
            alt="Student Card" 
            style={{ maxWidth: '100%', height: 'auto', marginBottom: '10px' }} 
        />
    )}
    <p><strong>生日:</strong> {user.birthday}</p>
    <p><strong>性別:</strong> {user.gender}</p>
    <p><strong>聯絡電話:</strong> {user.contact_number}</p>
    <p><strong>Line ID:</strong> {user.line_id}</p>
    <p><strong>Email:</strong> {user.email} （已驗證）</p>
    <p><strong>目前身份:</strong> {user.current_citizenship}</p>
    <p><strong>---------------</strong></p>
    <p><strong>學校:</strong> {user.school}</p>
    <p><strong>科系:</strong> {user.program}</p>
    <p><strong>學位:</strong> {user.education_level}</p>
    <p><strong>年級:</strong> {user.year_of_study}</p>
    <p><strong>入學日期:</strong> {user.date_of_enrollment}</p>
    <p><strong>預計畢業:</strong> {user.date_of_graduation}</p>

    
    <button onClick={() => handleApprove(user.id)}>Approve</button>
    <button className="reject" onClick={() => handleReject(user.id)}>Reject</button>
</div>

                ))}
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
        </div> 
    );
};

export default Pending;
