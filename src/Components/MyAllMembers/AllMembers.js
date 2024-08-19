import { useState, useEffect } from 'react';
import api from '../../api/axiosConfig';
import './AllMembers.css';

const AllMembers = () => {
  const [members, setMembers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await api.get('/userApi/members');
        console.log(response.data); // Log the response to check its structure
        if (Array.isArray(response.data)) {
          setMembers(response.data);
        } else {
          setError('無法取得會員資料，格式不正確');
        }
      } catch (err) {
        setError('無法取得會員資料，請稍後再試');
      }
    };

    fetchMembers();
  }, []);

  return (
    <div className="all-member-page">
      <h1 style={{ fontFamily: 'serif', fontSize: '50px', fontWeight: 'bold', color: 'black' }}>
        會員列表
      </h1>

      {error && <div className="error-message">{error}</div>}

      <div className="member-list">
        {members.map((member) => (
          <div key={member.id} className="member-card">
            <h2>{member.taiwaneseName} ({member.englishName})</h2>
            <p>Email: {member.email}</p>
            <p>學校: {member.school}</p>
            <p>課程: {member.program}</p>
            <p>學年: {member.year_of_study}</p>
            <p>生日: {member.birthday}</p>
            <p>聯絡電話: {member.contact_number}</p>
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
    </div>
  );
};

export default AllMembers;
