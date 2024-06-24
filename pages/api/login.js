// /pages/api/login.js
import { getUsers } from '../../utils/users';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'; 
const cookie = require('cookie');
 

const loginHandler = async (req, res) => {
  if (req.method === 'POST') {
    const { username, password } = req.body; 
    const users = await getUsers(); 
    const user = users.find(
      (u) => u.username  === username
    );  

    if (user) { 
      const hashedPassword = await bcrypt.hash(password, user.salt);  
      const isPasswordValid = hashedPassword === user.password;
      
      if (isPasswordValid) {
        //VERSION JWT
        // let secret = process.env.SECRET_JWT; 
        // const token = jwt.sign({ username: user.username, role: user.role },secret.toString('utf-8'), { expiresIn: '1h' });
        // res.setHeader('Set-Cookie', [
        //   `token=${token}; HttpOnly; Path=/; Max-Age=3600`,
        //   `username=${user.username}; Path=/; Max-Age=3600`,
        //   `role=${user.role}; Path=/; Max-Age=3600`,
        // ]);

        //VERSION COOKIE
        let secret = process.env.SECRET_JWT;
        const token = jwt.sign(
          { username: user.username, role: user.role },
          secret.toString('utf-8'),
          { expiresIn: '1h' }
        );  
        // Configurar cookies usando la librería cookie
        res.setHeader('Set-Cookie', [
          cookie.serialize('token', token, {
            //httpOnly: true,
           // secure: process.env.NODE_ENV === 'production',
            maxAge: 3600,
            path: '/',
          }),
          cookie.serialize('username', user.username, {
            maxAge: 3600,
            path: '/',
          }),
          cookie.serialize('role', user.role, {
            maxAge: 3600,
            path: '/',
          }),
        ]);

        return res.status(200).json({ message: 'Login successful' });
      } else {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
    }else {
        return res.status(401).json({ error: 'Invalid credentials.' });
    }
  }else {
      return res.status(405).json({ error: 'Method not allowed' });
    }
};

export default loginHandler;