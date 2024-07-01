// /pages/api/login.test.js
import loginHandler from './login';
import { getUsers } from '../../utils/users';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { createMocks } from 'node-mocks-http';
jest.mock('../../utils/users');
jest.mock('jsonwebtoken');
jest.mock('bcrypt');


process.env.SECRET_JWT = 'mysecretTest';

describe('Login API', () => {
  let req, res;

  beforeEach(() => {
    ({ req, res } = createMocks({
      method: 'POST',
      body: { username: 'usernameTest', password: 'hashedpasswordTest' },
    }));
  });

  it('should return 200 and set cookies for valid credentials', async () => {
    getUsers.mockResolvedValue([
      {
        username: 'usernameTest',
        password: 'hashedpasswordTest',
        salt: 'saltTest',
        role: 'userRoleTest',
      },
    ]);

    bcrypt.hash.mockResolvedValue('hashedpasswordTest');
    jwt.sign.mockReturnValue('dummytoken');

    await loginHandler(req, res);

    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toEqual({ message: 'Login successful' });
    expect(res.getHeader('Set-Cookie')).toEqual([
      expect.stringContaining('token=dummytoken'),
      expect.stringContaining('username=usernameTest'),
      expect.stringContaining('role=userRoleTest'),
    ]);
  });

  it('should return 401 for invalid credentials', async () => {
    getUsers.mockResolvedValue([
      {
        username: 'usernameTest',
        password: 'hashedpasswordTest',
        salt: 'saltTest',
        role: 'userRoleTest',
      },
    ]);

    bcrypt.hash.mockResolvedValue('wronghashedpassword');

    await loginHandler(req, res);

    expect(res.statusCode).toBe(401);
    expect(res._getJSONData()).toEqual({ error: 'Invalid credentials' });
  });

  it('should return 401 if user is not found', async () => {
    getUsers.mockResolvedValue([]);

    await loginHandler(req, res);

    expect(res.statusCode).toBe(401);
    expect(res._getJSONData()).toEqual({ error: 'Invalid credentials.' });
  });

  it('should return 405 if method is not POST', async () => {
    req.method = 'GET';

    await loginHandler(req, res);

    expect(res.statusCode).toBe(405);
    expect(res._getJSONData()).toEqual({ error: 'Method not allowed' });
  });
});
