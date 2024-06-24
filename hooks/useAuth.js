// /hooks/useAuth.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie'; 

const useAuth = () => {
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');
  const router = useRouter();

  useEffect(() => { 
    const username = Cookies.get('username');
    const role = Cookies.get('role');
    //const token = Cookies.getItem('token');
    // const username = localStorage.getItem('username');
    // const role = localStorage.getItem('role');
    if (username && role) {
      setUsername(username);
      setRole(role);
    } else {
      router.push('/login');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    router.push('/login');
  };

  return { username, role, handleLogout, setAuth: (username, role) => { setUsername(username); setRole(role); } };
};

export default useAuth;
