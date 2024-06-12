// /pages/dashboard.js
import ProtectedRoute from '../components/ProtectedRoute';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Link from 'next/link';


const Dashboard = () => {
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');
  const router = useRouter(); 
  

  const handleLogout = () => { 
    localStorage.removeItem('token'); 
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    router.push('/login');
  };


  const handleAuth = (username, role) => {
    setUsername(username);
    setRole(role);
  };

  return (
    <ProtectedRoute onAuth={handleAuth}>
      <h1>Dashboard</h1>
      <p>Welcome to the protected dashboard, {username}. Your role is {role}.</p>
      <Link id="link" href="/dashboard2">Go to Dashboard 2</Link> 
      <button onClick={handleLogout}>Logout</button>
    </ProtectedRoute>
  );
};

export default Dashboard;
