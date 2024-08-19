import { useState } from 'react';
import api from '../../api/axiosConfig';
import './Register.css';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    taiwaneseName: '',
    englishName: '',
    email: '',
    school: '',
    program: '',
    year_of_study: '',
    birthday: '',
    contact_number: ''
  });

  const [file, setFile] = useState(null); // New state for the file
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Save the file to state
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Basic validation to ensure all fields are filled
    if (Object.values(formData).some(field => field === '') || !file) {
      setError('請填寫所有欄位並上傳學生證圖片');
      return;
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
        alert('謝謝您的填寫，請先驗證郵件。資料才會送出～');
        navigate('/');  // Redirect to the home page
      }
    } catch (err) {
      setError('註冊失敗，請稍後再試');
    }
  };

  const backHome = () => {
    navigate("/");
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

      <form onSubmit={handleSubmit} className="register-form">
        <div>
          <label>中文名:</label>
          <input
            type="text"
            name="taiwaneseName"
            value={formData.taiwaneseName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>英文名:</label>
          <input
            type="text"
            name="englishName"
            value={formData.englishName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>學校:</label>
          <input
            type="text"
            name="school"
            value={formData.school}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>課程:</label>
          <input
            type="text"
            name="program"
            value={formData.program}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>學年:</label>
          <input
            type="text"
            name="year_of_study"
            value={formData.year_of_study}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>生日:</label>
          <input
            type="text"
            name="birthday"
            value={formData.birthday}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>聯絡電話:</label>
          <input
            type="text"
            name="contact_number"
            value={formData.contact_number}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>學生證圖片:</label> {/* New file input for the student card */}
          <input
            type="file"
            name="studentCard"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="submit-button pt-3">
          <button type="submit">提交</button>
        </div>
      </form>

      <div className="back-home">
        <button type="button" onClick={backHome}>返回首頁</button>
      </div>

      <div className='pt-5'></div>
      <div className='pt-5'></div>
      <div className='pt-5'></div>
    </div>
  );
};

export default Register;
