import { useState, useEffect } from 'react';
import ProtectedRoute from '../components/ProtectedRoute';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Dashboard2 = () => {
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

  useEffect(() => {
    const username = localStorage.getItem('username');
    const role = localStorage.getItem('role');
    if (username && role) {
      setUsername(username);
      setRole(role);
    } else {
      router.push('/login');
    }
  }, [router]);

  return (
    <ProtectedRoute onAuth={handleAuth}>
      <h1>Dashboard 2</h1>
      <p>Welcome to Dashboard 2, {username}. Your role is {role}.</p>
      <Link href="/dashboard"> Back to Dashboard </Link>
      <br />
      <button onClick={handleLogout}>Logout</button>
    </ProtectedRoute>
  );
};

export default Dashboard2;
