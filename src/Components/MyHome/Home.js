import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import AllMembers from '../MyAllMembers/AllMembers';
import { useNavigate } from 'react-router-dom';

 

const Home = ({ handleLogout }) => {
  

  const navigate = useNavigate();
 

  const AllMembers = () => {
    navigate("/AllMembers");
  };


  return (
    <div className='home-background'>
      <div className='pt-5'></div>
      <div className='pt-2'></div>
      
      <div className='home-heading'>
        <h1 style={{ fontFamily: 'serif', fontSize: '60px', fontWeight: 'bold', color: 'black' }}>
          STSA 會員系統
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
          margin: '0', 
        }}>
          <strong>使用需知</strong>
        </h5>

        <h5 style={{ 
          fontFamily: 'serif', 
          fontSize: '20px', 
          fontWeight: 'bold', 
          color: 'black',
          margin: '0', 
        }}>
          1. 填入個資以申請會員
        </h5>

        <h5 style={{ 
          fontFamily: 'serif', 
          fontSize: '20px', 
          fontWeight: 'bold', 
          color: 'black',
          margin: '0', 
        }}>
          2. 驗證電子郵件，並等待審核
        </h5>

        <h5 style={{ 
          fontFamily: 'serif', 
          fontSize: '20px', 
          fontWeight: 'bold', 
          color: 'black',
          margin: '0', 
        }}>
          3. 審核通過後，會員卡會透過郵件寄出
        </h5>
      </div>

      <div className='pt-5'></div>
      <div className='pt-5'></div>

      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <Link to="/Register" className="buttonWithBackground1 btn btn-secondary btn-lg btn-block square-btn">
              <div className="buttonContent">
                <span style={{ fontFamily: 'serif', fontSize: '60px', fontWeight: 'bold' }}>會員註冊</span>
              </div>
              <div className="buttonOverlay"></div>
            </Link>
          </div>

          <div className="col-md-4">
            <Link to="/not-done-yet" className="buttonWithBackground2 btn btn-secondary btn-lg btn-block square-btn">
              <div className="buttonContent">
                <span style={{ fontFamily: 'serif', fontSize: '60px', fontWeight: 'bold'}}>會員信息</span>
              </div>
              <div className="buttonOverlay"></div>
            </Link>
          </div>
        </div>
      </div>

      <div className='pt-5'></div>
      
      <div className="show-all-member">
        <button type="button" onClick={AllMembers}>全部會員</button>
      </div>


      <div className='pt-5'></div>
      <div className='pt-5'></div>
      
      <div className='pt-5'></div>
      <div className='pt-5'></div>
    </div>
  );
};

export default Home;
