import './App.css';
import { useState, useEffect } from 'react';
import api from './api/axiosConfig';
import { Routes, Route } from 'react-router-dom';
import Layout from './Components/Layout';
import Login from './Components/MyLogin/Login';
import Home from './Components/MyHome/Home';
import Register from './Components/MyRegister/Register';
import {useNavigate } from 'react-router-dom';
import Transaction from './Components/MyTransaction/Transaction';
import Performance from './Components/MyPerformance/Performance';

 
 


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [singleUser,setUser] = useState();
  const [loggedUsername, setloggedUsername ] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    // Create or update the description meta tag
    const descriptionMetaTag = document.querySelector('meta[name="股票追蹤管理系統"]');
    if (descriptionMetaTag) {
      descriptionMetaTag.setAttribute('股票追蹤管理系統', '單純簡易的股票追蹤管理系統');
    } else {
      const newDescriptionMetaTag = document.createElement('meta');
      newDescriptionMetaTag.setAttribute('股票追蹤管理系統', '單純簡易的股票追蹤管理系統');
      newDescriptionMetaTag.setAttribute('股票追蹤管理系統', '');
      document.head.appendChild(newDescriptionMetaTag);
    }
  }, []);


  const handleLogout = () =>{
    localStorage.removeItem(isLoggedIn);
    localStorage.removeItem(loggedUsername);
    
  
    setIsLoggedIn(false);
    navigate("/");
  }

  const updateLocalStorage = () =>{

    localStorage.setItem("isLoggedIn", isLoggedIn);
    localStorage.setItem("loggedInUserName", loggedUsername);

  }

  useEffect(()=>{

    const storeIsLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const storeUserName = localStorage.getItem("loggedInUserName")

    if(storeIsLoggedIn && storeUserName){
      setIsLoggedIn(true);
      setloggedUsername(storeUserName);
    }

  },[]);

  useEffect(()=>{

    updateLocalStorage();

  },[isLoggedIn, loggedUsername]);



  console.log("Now the user is logged in or not?", isLoggedIn);
  console.log("The current user is:", loggedUsername);


  return (
    <div className="App">
      <Routes>
        <Route path = "/" element={<Layout/>}>
            {isLoggedIn?(

              <>
                <Route path = "/" element={<Home handleLogout={handleLogout}/>} /> 
                <Route path = "/Transaction" element={<Transaction />} /> 
                <Route path = "/Performance" element={<Performance />} /> 
                
              </>

            ):(

              <>
                <Route path = "/"  element={<Login setIsLoggedIn={setIsLoggedIn}  setLoggedUserName={setloggedUsername} />}/> 
                <Route path = "/Register" element={<Register/>} /> 
              </>

            )}


        </Route>
      </Routes>
    </div>
  );
}

export default App;


