import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className='home-background'>
      <div className='spacer'></div>
      
      <div className='home-heading'>
        <h1 className="main-title">
          STSA 會員系統
        </h1>
      </div>

      <div className='spacer'></div>

      <div className='home-heading'>
      
        <h3 className="welcome-title">
          歡迎加入STSA大家庭
        </h3>

        <div className='pt-3'></div>
        
        <p className="welcome-text">
          <strong></strong>以下是台灣學生總會會員註冊表單<br/><br/>
          <strong>(1) 此表單僅供本組織及駐新加坡台北代表處參考和用於日後的活動籌備</strong><br/><br/>
          <strong>(2) 資料已加密並安全的存在資料庫，並不會提供於其他單位</strong><br/><br/>
          
          請各位安心填寫,謝謝！
        </p>
      </div>

      <div className='spacer'></div>

      <Link to="/register" className="buttonWithBackground1">
        <div className="buttonContent">
          <span className="button-text">開始註冊</span>
        </div>
        <div className="buttonOverlay"></div>
      </Link>

      <div className='spacer'></div>
    </div>
  );
};

export default Home;
