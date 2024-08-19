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
          您好
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
          fontSize: '20px', 
          fontWeight: 'bold', 
          color: 'black',
          margin: '0', 
        }}>
          "回家的路很長"
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
            <Link to="/Pending" className="buttonWithBackground2 btn btn-secondary btn-lg btn-block square-btn">
              <div className="buttonContent">
                <span style={{ fontFamily: 'serif', fontSize: '60px', fontWeight: 'bold'}}>會員審核</span>
              </div>
              <div className="buttonOverlay"></div>
            </Link>
          </div>
        </div>
      </div>

      <div className="back-home">
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
