// /pages/api/register.js
import { addUser } from '../../utils/users';
import { limiter } from '../../utils/rateLimiter'; 
 

const registerHandler = async (req, res) => {
    limiter(req, res, async () => {
      if (req.method === 'POST') {
        const { username, password } = req.body;

        // Validate Fields
        if (!username || !password) {
          return res.status(400).json({ error: 'All fields are required' });
        } 

        try {
          await addUser(username, password, 'standard');
          res.status(201).json({ message: 'User created successfully' });
        } catch (error) { 
          res.status(500).json({ error: 'Error creating user' });
          
        }
      } else {
        res.status(405).json({ error: 'Method not allowed' });
      }
    }); 
};
 
export default registerHandler;