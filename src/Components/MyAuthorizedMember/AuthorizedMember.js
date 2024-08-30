import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api/axiosConfig';
import './AuthorizedMember.css';

const AuthorizedMember = () => {
  const { uuid } = useParams(); // Get the UUID from the URL
  const [member, setMember] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const response = await api.get(`/userApi/member/${uuid}`);
        if (response.data) {
          setMember(response.data);
        } else {
          setError('無法找到該會員，請確認網址是否正確');
        }
      } catch (err) {
        setError('無法取得會員資料，請稍後再試');
      }
    };

    fetchMember();
  }, [uuid]);

  return (
    <div className="authorized-member-page">
      <h1 style={{ fontFamily: 'serif', fontSize: '50px', fontWeight: 'bold', color: 'black' }}>
        會員資訊
      </h1>

      {error && <div className="error-message">{error}</div>}

      {member && (
        <div className="member-info">
          <h2>{member.taiwaneseName} ({member.englishName})</h2>
          <p>Email: {member.email}</p>
          <p>學校: {member.school}</p>
          <p>課程: {member.program}</p>
          <p>學年: {member.year_of_study}</p>
          <p>生日: {member.birthday}</p>
          <p>聯絡電話: {member.contact_number}</p>
        </div>
      )}

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

export default AuthorizedMember;
