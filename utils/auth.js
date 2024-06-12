// /utils/auth.js
import jwt from 'jsonwebtoken';

export const verifyToken = () => {
  const token = localStorage.getItem('token');  
  if (token) {
    try {
      const secret = process.env.SECRET_JWT; // Asegúrate de usar NEXT_PUBLIC para variables de entorno que se utilizarán en el cliente
      const decoded = jwt.verify(token.toString('utf-8'), secret.toString('utf-8'));
      return decoded;
    } catch (e) {
      console.error('Token verification failed:', e);
      localStorage.removeItem('token');
      return null;
    }
  }
  return null;
};
