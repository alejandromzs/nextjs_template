// /pages/api/register.test.js
import registerHandler from './register';
import runMiddleware, { limiter } from '../../utils/rateLimiter';
import { userRepository } from '../../src/lib/repositories/userRepository';
import { createMocks } from 'node-mocks-http';

jest.mock('../../utils/rateLimiter', () => ({
  __esModule: true,
  default: jest.fn(),
  limiter: jest.fn(),
}));

jest.mock('../../src/lib/repositories/userRepository', () => ({
  __esModule: true,
  userRepository: {
    create: jest.fn(),
  },
}));

describe('Register API', () => {
  let req, res;

  beforeEach(() => {
    ({ req, res } = createMocks({
      method: 'POST',
      body: { username: 'newuser', password: 'newpassword' },
    }));
    runMiddleware.mockResolvedValue();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return 201 and user id on successful registration', async () => {
    userRepository.create.mockResolvedValue(1);

    await registerHandler(req, res);

    expect(res.statusCode).toBe(201);
    expect(res._getJSONData()).toEqual({ id: 1 });
  });

  it('should return 400 on user creation error', async () => {
    userRepository.create.mockRejectedValue(new Error('DB error'));

    await registerHandler(req, res);

    expect(res.statusCode).toBe(400);
    expect(res._getJSONData()).toEqual({ error: 'Error creating user' });
  });

  it('should return 405 on method not allowed', async () => {
    req.method = 'GET';

    await registerHandler(req, res);

    expect(res.statusCode).toBe(405);
    expect(res._getJSONData()).toEqual({ error: 'Method not allowed' });
  });

  it('should return 500 on internal server error', async () => {
    runMiddleware.mockRejectedValue(new Error('Middleware error'));

    await registerHandler(req, res);

    expect(res.statusCode).toBe(500);
    expect(res._getJSONData()).toEqual({ error: 'Internal server error' });
  });
});
