// /pages/api/login.js
import { getUsers } from '../../utils/users';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'; 
 

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
        let secret = process.env.SECRET_JWT; 
        const token = jwt.sign({ username: user.username, role: user.role },secret.toString('utf-8'), { expiresIn: '1h' });
        res.status(200).json({ token });
      } else {
        res.status(401).json({ error: 'Invalid credentials' });
      }
    }else {
        res.status(401).json({ error: 'Invalid credentials.' });
    }
  }else {
      res.status(405).json({ error: 'Method not allowed' });
    }
};

export default loginHandler;