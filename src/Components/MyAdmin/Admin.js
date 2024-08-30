import React from 'react';
import { Link } from 'react-router-dom';
import './Admin.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import AllMembers from '../MyAllMembers/AllMembers';
import { useNavigate } from 'react-router-dom';

 

const Admin = () => {
  

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
          STSA 會員系統後台
        </h1>
      </div>

      <div className='pt-5'></div>

      <div className='home-heading'>
        <h3 style={{fontSize: '32px', fontWeight: 'bold', color: 'black' }}>
        這是我們後台自己看的，功能比較陽春但都沒問題。有問題請私訊陳睿泰
        </h3>

        <div className='pt-3'></div>
      </div>

      

      <div className='pt-5'></div>
      <div className='pt-5'></div>

      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <Link to="/admin/pending" className="buttonWithBackground1 btn btn-secondary btn-lg btn-block square-btn">
              <div className="buttonContent">
                <span style={{ fontFamily: 'serif', fontSize: '60px', fontWeight: 'bold' }}>會員審核</span>
              </div>
              <div className="buttonOverlay"></div>
            </Link>
          </div>

          <div className="col-md-4">
            <Link to="/AllMembers" className="buttonWithBackground2 btn btn-secondary btn-lg btn-block square-btn">
              <div className="buttonContent">
                <span style={{ fontFamily: 'serif', fontSize: '60px', fontWeight: 'bold'}}>所有會員</span>
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

export default Admin;
