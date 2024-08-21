import './App.css';
import { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Layout from './Components/Layout';
import Home from './Components/MyHome/Home';
import Performance from './Components/MyPerformance/Performance';
import Register from './Components/MyRegister/Register';
import AllMembers from './Components/MyAllMembers/AllMembers'; 
import ProtectedPending from './Components/MyPending/ProtectedPending'; 

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "STSA 會員管理系統";
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="Register" element={<Register />} />
          <Route path="Performance" element={<Performance />} />
          <Route path="AllMembers" element={<AllMembers />} /> 
          <Route path="admin/Pending" element={<ProtectedPending />} /> 
        </Route>
      </Routes>
    </div>
  );
}

export default App;
