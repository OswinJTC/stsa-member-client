import './App.css';
import { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Layout from './Components/Layout';
import Home from './Components/MyHome/Home';
import Register from './Components/MyRegister/Register';
import AllMembers from './Components/MyAllMembers/AllMembers'; 
import AuthorizedMember from './Components/MyAuthorizedMember/AuthorizedMember';
import AdminProtected from './Components/MyAdminProtected/AdminProtected';
import PendingProtected from './Components/MyPendingProtected/PendingProtected';
import AllMembersProtected from './Components/MyAllMembersProtected/AllMembersProtected';

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
          <Route path="AllMembers" element={<AllMembersProtected />} /> 
          <Route path="admin/pending" element={<PendingProtected />} /> 
          <Route path="authorizedMember/:uuid" element={<AuthorizedMember />} /> 
          <Route path="admin" element={<AdminProtected />} /> 
        </Route>
      </Routes>
    </div>
  );
}

export default App;
