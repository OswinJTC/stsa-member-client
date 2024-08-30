import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Admin from '../MyAdmin/Admin';
import './AdminProtected.css';

const AdminProtected = () => {
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate(); // Use useNavigate instead of useHistory

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        if (password === 'hellostsa') {
            setIsAuthenticated(true);
        } else {
            alert('Incorrect password');
            navigate('/');  // Use navigate instead of history.push
        }
    };

    if (isAuthenticated) {
        return <Admin />;
    }

    return (
        
        <div className="password-protect-page">
            <h2>進入系統後台</h2>
            <form onSubmit={handlePasswordSubmit}>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="輸入密碼"
                />
                <button type="submit">送出</button>
            </form>
        </div>
    );
};

export default AdminProtected;
