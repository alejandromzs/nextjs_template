// /pages/api/register.js
import runMiddleware,{ limiter } from '../../utils/rateLimiter'; 
import { userRepository } from '../.././/src/lib/repositories/userRepository';
 

const registerHandler = async (req, res) => {
  try{
    await runMiddleware(req, res, limiter);

      if (req.method === 'POST') {
        const { username, password } = req.body; 
        // Validation moved to userRepository 
        try {
          const id = await userRepository.create({username,password})
          console.log(id)
          return res.status(201).json({id: id});
        } catch (error) {
          //Recommended not return error from DB but one with less information
          //console.log(error)
          return res.status(400).json({ error: 'Error creating user' });
          
        }
      } else {
        return await res.status(405).json({ error: 'Method not allowed' });
      }
      
   } catch (error) { 
     return res.status(500).json({ error: 'Internal server error' });
   } 
};
 
export default registerHandler;