
import { useState } from 'react';
import api from '../../api/axiosConfig';
import './Register.css';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    taiwaneseName: '',
    englishName: '',
    birthday: '',
    gender: '',
    contact_number: '',
    line_id: '', // Updated field for Line ID
    email: '',
    current_citizenship: '', // Updated field for citizenship

    school: '',
    program: '',
    education_level: '', // Updated field for education level
    year_of_study: '',
    date_of_enrollment: '', // Updated field for enrollment date
    date_of_graduation: '', // Updated field for graduation date
  });

  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Loading state

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
  
    // Check if any field is empty or if the file is not uploaded
    if (Object.values(formData).some(field => field === '') || !file) {
      setError('請填寫所有欄位並上傳學生證圖片');
      setLoading(false);
      return; // Prevent form submission
    }
  
    const formDataObj = new FormData();
    formDataObj.append('user', new Blob([JSON.stringify(formData)], { type: 'application/json' }));
    formDataObj.append('file', file);
  
    try {
      const response = await api.post('/userApi/register', formDataObj, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (response.status === 200) {
        // Show success alert
        alert('已成功提交，請於15分鐘內完成電子郵件驗證。');
        navigate('/');  // Redirect to the home page after showing the alert
      }
    } catch (err) {
      // Show error alert
      alert('註冊失敗，請稍後再試');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="register-background">
      <div className='pt-5'></div>
      <div className='pt-5'></div>

      <div className='home-heading'>
        <h1 style={{ fontFamily: 'serif', fontSize: '60px', fontWeight: 'bold', color: 'black' }}>
          註冊頁面
        </h1>
      </div>

      <div className='pt-5'></div>


      <div style={{
  display: 'inline-block',
  backgroundColor: 'rgba(128, 128, 128, 0.2)',
  padding: '5px',
  borderRadius: '5px',
}}>
  <h5 style={{ 
    fontFamily: 'serif', 
    fontSize: '28px', 
    fontWeight: 'bold', 
    color: 'black',
    margin: '0'
  }}>
    <strong>使用需知</strong>
  </h5>

  <div className='pt-3'></div>

  <h5 style={{ 

    fontSize: '20px',  
    color: 'black',
    margin: '0', 
    textAlign: 'left',
  }}>
     1.   請填入 "個人資料" 和 "學校資訊" 以申請會員
  </h5>
  <div className='pt-2'></div>

  <h5 style={{ 
    fontSize: '20px', 
    color: 'black',
    margin: '0', 
    textAlign: 'left',
  }}>
     2.  學生證上傳僅接受 JPG 圖檔，且必須小於 2.5 MB，以免失敗。
  </h5>

  <div className='pt-2'></div>
  <h5 style={{ 
    fontSize: '20px', 
    color: 'black',
    margin: '0', 
    textAlign: 'left',
  }}>
     3.  確認送出後 請到個人信箱 Email 驗證
  </h5>

  <div className='pt-2'></div>

  <h5 style={{ 
    fontSize: '20px', 
    color: 'black',
    margin: '0', 
    textAlign: 'left',
  }}>
     4.  郵箱驗證後 需等幹部們審核會員資格(約1~3個工作天)
  </h5>

  <div className='pt-2'></div>

  <h5 style={{ 
    fontSize: '20px', 
    color: 'black',
    margin: '0', 
    textAlign: 'left',
  }}>
     5.  審核通過後 會員卡將會透過郵件寄出!!
  </h5>

</div>

      <div className='pt-5'></div>
      <div className='pt-5'></div>

      <form onSubmit={handleSubmit} className="register-form">
        <h2 className="section-title">個人資訊</h2>
        <div className="form-group">
          <label>中文名:</label>
          <input
            type="text"
            name="taiwaneseName"
            value={formData.taiwaneseName}
            onChange={handleInputChange}
            required
            placeholder="例：王小明"
          />
        </div>
        <div className="form-group">
          <label>英文名:</label>
          <input
            type="text"
            name="englishName"
            value={formData.englishName}
            onChange={handleInputChange}
            required
            placeholder="例：Xiao-Ming Wang"
          />
        </div>
        <div className="form-group">
          <label>生日:</label>
          <input
            type="text"
            name="birthday"
            value={formData.birthday}
            onChange={handleInputChange}
            required
            placeholder="例：2001-05-09"
          />
        </div>
        <div className="form-group">
          <label>性別:</label>
          <select 
            name="gender" 
            value={formData.gender} 
            onChange={handleInputChange}
            required
          >
            <option value="">請選擇</option>
            <option value="male">男性</option>
            <option value="female">女性</option>
          </select>
        </div>
        <div className="form-group">
          <label>聯絡電話:</label>
          <input
            type="text"
            name="contact_number"
            value={formData.contact_number}
            onChange={handleInputChange}
            required
            placeholder="例：+65 98761234"
          />
        </div>
        <div className="form-group">
          <label>Line ID:</label>
          <input
            type="text"
            name="line_id" // Updated to match the User class
            value={formData.line_id}
            onChange={handleInputChange}
            required
            placeholder="例：mingming123"
          />
        </div>
        
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            placeholder="例：xiaoming123@gmail.com"
          />
        </div>

        <div className="form-group">
          <label>目前身份:</label>
          <select 
            name="current_citizenship" // Updated to match the User class
            value={formData.current_citizenship}
            onChange={handleInputChange}
            required
          >
            <option value="">請選擇</option>
            <option value="Taiwanese">台灣國民</option>
            <option value="Singaporean">新加坡公民</option>
            <option value="PR">新加坡 PR</option>
          </select>
        </div>
        
        <h2 className="section-title">學校資訊</h2>
        <div className="form-group">
          <label>學校:</label>
          <select 
            name="school" 
            value={formData.school} 
            onChange={handleInputChange}
            required
          >
            <option value="">請選擇</option>
            <option value="新加坡國立大學 (NUS)">新加坡國立大學 (NUS)</option>
            <option value="南洋理工大學 (NTU)">南洋理工大學 (NTU)</option>
            <option value="新加坡管理大學">新加坡管理大學 (SMU)</option>
            <option value="新加坡管理學院">新加坡管理大學 (SIM)</option>
            <option value="新加坡理工大學 (SIT)">新加坡理工大學 (SIT)</option>
            <option value="新加坡科技設計大學 (SUTD)">新加坡科技設計大學 (SUTD)</option>
            <option value="新加坡社科大學 (SUSS)">新加坡社科大學 (SUSS)</option>
            <option value="詹姆士庫克大學">詹姆士庫克大學</option>
            <option value="洛桑酒店管理學院">洛桑酒店管理學院</option>
            <option value="歐洲工商管理學院">歐洲工商管理學院</option>
            <option value="SP Jain全球管理學院">SP Jain全球管理學院</option>
            <option value="歐洲工商管理學院">歐洲工商管理學院</option>
            <option value="迪吉彭理工學院">迪吉彭理工學院</option>
            <option value="科廷大學新加坡校區">科廷大學新加坡校區</option>
            <option value="慕尼黑工業大學亞洲校區">慕尼黑工業大學亞洲校區</option>
            <option value="巴黎第二大學">巴黎第二大學</option>
            <option value="St.Gallen Institute of Management in Asia">St.Gallen Institute of Management in Asia</option>
          </select>
        </div>
        <div className="form-group">
          <label>科系:</label>
          <input
            type="text"
            name="program"
            value={formData.program}
            onChange={handleInputChange}
            required
            placeholder="例：Computer Science"
          />
        </div>
        <div className="form-group">
          <label>學位:</label>
          <select 
            name="education_level" // Updated to match the User class
            value={formData.education_level}
            onChange={handleInputChange}
            required
          >
            <option value="">請選擇</option>
            <option value="Bachelor">學士</option>
            <option value="Master">碩士</option>
            <option value="Doctorate">博士</option>
          </select>
        </div>

        <div className="form-group">
          <label>學年:</label>
          <select 
            name="year_of_study" // Updated to match the User class
            value={formData.year_of_study}
            onChange={handleInputChange}
            required
          >
            <option value="">請選擇</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
          </select>
        </div>

        <div className="form-group">
          <label>入學年月:</label>
          <input
            type="text"
            name="date_of_enrollment" // Updated to match the User class
            value={formData.date_of_enrollment}
            onChange={handleInputChange}
            required
            placeholder="例：2022-08"
          />
        </div>

        <div className="form-group">
          <label>預計畢業年月:</label>
          <input
            type="text"
            name="date_of_graduation" // Updated to match the User class
            value={formData.date_of_graduation}
            onChange={handleInputChange}
            required
            placeholder="例：2026-08"
          />
        </div>

        <div className="form-group">
          <label>學生證圖片:</label>
          <input
            type="file"
            name="studentCard"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
        </div>

        {error && <div className="error-message">{error}</div>}
        {loading && <div className="spinner"></div>}  {/* Spinner */}

        <div className="submit-button pt-3">
          <button type="submit" disabled={loading}>提交</button>
        </div>
      </form>

      <div className='pt-5'></div>

      <div className="back-home">
        <button type="button" onClick={() => navigate('/')}>返回首頁</button>
      </div>

      <div className='pt-5'></div>
      <div className='pt-5'></div>
    </div>
  );
};

export default Register;