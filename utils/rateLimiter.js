// /utils/rateLimiter.js
import rateLimit from 'express-rate-limit';

export const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 mute
  max: 3, // Limit each IP to 3+1 = 4 requests. It will fail for the 5th request
  message: 'Too many requests from this IP, please try again after a minute',
  keyGenerator: (req) => req.ip, // Usar la IP del cliente
  handler: (req, res) => {
    res.status(429).json({ error: 'Too many requests from this IP, please try again after a minute' });
  },
});
