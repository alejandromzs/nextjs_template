// /components/ProtectedRoute.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'; 
import { verifyToken } from '../utils/auth';


const ProtectedRoute = ({ children, onAuth }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); 
  const router = useRouter();

  useEffect(() => {
    const decoded = verifyToken(); 

    if (decoded) { 
      const { username, role } = decoded;
      localStorage.setItem('username', username);
      localStorage.setItem('role', role);
      if (onAuth) onAuth(username, role);
      setIsAuthenticated(true);
    } else { 
      localStorage.removeItem('username');
      localStorage.removeItem('role');
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
