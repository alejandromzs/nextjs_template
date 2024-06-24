// /components/ProtectedRoute.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'; 
import { verifyToken } from '../utils/auth';
import Cookies from 'js-cookie'; 


const ProtectedRoute = ({ children, onAuth }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); 
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('token'); 
    if (token) {
      try {
        const decoded = verifyToken(token);  

        if (decoded) { 
          const { username, role } = decoded;
          Cookies.set('username', username, { path: '/' });
          Cookies.set('role', role, { path: '/' });
          // localStorage.setItem('username', username);
          // localStorage.setItem('role', role);
          if (onAuth) onAuth(username, role);
          setIsAuthenticated(true);
        } else { 
          Cookies.remove('username');
          Cookies.remove('role');
          // localStorage.removeItem('username');
          // localStorage.removeItem('role');
          router.push('/login');
        } 
      } catch (error) {
        console.error('Token verification failed:', error);
        router.push('/login');
      }
    } else {
      router.push('/login');
    }
  }, [router, onAuth]);

  if (!isAuthenticated) {
    console.log('Not authenticated');
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
