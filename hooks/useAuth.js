// /hooks/useAuth.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie'; 

const useAuth = () => {
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');
  const [token, setToken] = useState('');
  const router = useRouter();

  useEffect(() => { 
    const username = Cookies.get('username');
    const role = Cookies.get('role');
    const token = Cookies.get('token');
    // const username = localStorage.getItem('username');
    // const role = localStorage.getItem('role');
    if (username && role && token) {
      setUsername(username);
      setRole(role);
      setToken(token);
    } else {
      router.push('/login');
    }
  }, [router]);

  const handleLogout = () => {
  //Removing Cookies
  Cookies.remove('token');
  Cookies.remove('username');
  Cookies.remove('role');

   // Clear states
   setUsername('');
   setRole('');
   setToken('');

  //REMOVING from LocalStorage old way
    // localStorage.removeItem('token');
    // localStorage.removeItem('username');
    // localStorage.removeItem('role');
    router.push('/login');
  };

  return { username, role, token,handleLogout, setAuth: (username, role,token) => { setUsername(username); setRole(role); setToken(token); } };
};

export default useAuth;
