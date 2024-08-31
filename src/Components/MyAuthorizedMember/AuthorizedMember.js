import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api/axiosConfig';
import './AuthorizedMember.css';

const AuthorizedMember = () => {
  const { uuid } = useParams(); // Get the UUID from the URL
  const [member, setMember] = useState(null);
  const [pdfData, setPdfData] = useState(null); // State to store PDF data
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

    const fetchPdf = async () => {
      try {
        const response = await api.get(`/userApi/pdf/${uuid}`, {
          responseType: 'blob', // Important: Fetch the PDF as a binary blob
        });
        const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
        const pdfUrl = URL.createObjectURL(pdfBlob);
        setPdfData(pdfUrl);
      } catch (err) {
        console.error('Error fetching PDF:', err);
      }
    };

    fetchMember();
    fetchPdf();
  }, [uuid]);

  return (
    <div className="authorized-member-page">
      <div className='pt-5'></div>
      <div className='pt-5'></div>

      <h1 className="heading-large">歡迎加入新加坡學生總會(STSA)</h1>

      <div className='pt-5'></div>

      <h6 style={{ fontFamily: 'serif', fontWeight: 'bold', color: 'black' }}>
      會員 {member?.taiwaneseName} ({member?.englishName})
        </h6>
 

    

      <p className="text-bold">

      {/* PDF Display */}
      {pdfData && (
        <div className="pdf-viewer">
          <div className="spacer-large"></div>
          <iframe
            src={pdfData}
            title="Member Card PDF"
            className="pdf-frame"
          />
        </div>
      )}

      <div className='pt-3'></div>
        We're thrilled to have you join our student association. As a member, you're now part of a diverse group of individuals who share a passion for Taiwanese culture and building connections. Whether you're here to make new friends, explore our rich heritage, or engage in exciting activities, we're excited to support and inspire you every step of the way.
        <br /><br />
        Feel free to dive into our upcoming events, join our discussions, and make the most of your membership. Your presence enriches our association, and we can't wait to see what amazing contributions you'll bring.
        <br /><br />
        Once again, welcome aboard!
        <br /><br />
        Warm regards,
        <br />
        Singapore Taiwanese Student Association
        <br />
        <br />
        <img 
    src="https://www.pngitem.com/pimgs/m/41-419983_transparent-signature-clipart-transparent-background-signature-png-png.png" 
    alt="Signature" 
    style={{ maxWidth: '200px', height: 'auto' }} 
  />
      </p>

      <div className='pt-5'></div>
      <h6 className="heading-medium">個人資料</h6>

{member && (
  <div className="member-info">
    <div className="info-row">
      <span className="info-label">中文姓名:</span>
      <span className="info-value">{member.taiwaneseName}</span>
    </div>
    <div className="info-row">
      <span className="info-label">英文名字:</span>
      <span className="info-value">{member.englishName}</span>
    </div>
    <div className="info-row">
      <span className="info-label">出生日期:</span>
      <span className="info-value">{member.birthday}</span>
    </div>
    <div className="info-row">
      <span className="info-label">生理性別:</span>
      <span className="info-value">{member.gender}</span>
    </div>
    <div className="info-row">
      <span className="info-label">聯絡電話:</span>
      <span className="info-value">{member.contact_number}</span>
    </div>
    <div className="info-row">
      <span className="info-label">Line ID:</span>
      <span className="info-value">{member.line_id}</span>
    </div>
    <div className="info-row">
      <span className="info-label">Email:</span>
      <span className="info-value">{member.email}</span>
    </div>
    <div className="info-row">
      <span className="info-label">目前身份:</span>
      <span className="info-value">{member.current_citizenship}</span>
    </div>
  </div>
)}

<div className='pt-5'></div>

<h6 className="heading-medium">學校資訊</h6>

{member && (
  <div className="member-info">
    <div className="info-row">
      <span className="info-label">學校:</span>
      <span className="info-value">{member.school}</span>
    </div>
    <div className="info-row">
      <span className="info-label">科系:</span>
      <span className="info-value">{member.program}</span>
    </div>
    <div className="info-row">
      <span className="info-label">年級:</span>
      <span className="info-value">{member.year_of_study}</span>
    </div>
    <div className="info-row">
      <span className="info-label">就讀學制:</span>
      <span className="info-value">{member.education_level}</span>
    </div>
    <div className="info-row">
      <span className="info-label">入學日期:</span>
      <span className="info-value">{member.date_of_enrollment}</span>
    </div>
    <div className="info-row">
      <span className="info-label">預計畢業:</span>
      <span className="info-value">{member.date_of_graduation}</span>
    </div>
  </div>
)}

      <div className='pt-5'></div>
      <div className='pt-5'></div>
      <div className='pt-5'></div>
    </div>
  );
};

export default AuthorizedMember;
