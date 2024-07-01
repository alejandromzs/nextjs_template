// /pages/login.test.js
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRouter } from 'next/router';
import LoginPage from './login';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

// Mockear window.alert
beforeAll(() => {
    global.alert = jest.fn();
  });

describe('LoginPage', () => {
  let push;

  beforeEach(() => {
    push = jest.fn();
    useRouter.mockReturnValue({ push });
    fetch.resetMocks();
  });

  it('renders login form', () => {
    render(<LoginPage />);
    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  it('shows alert on invalid credentials', async () => {
    fetch.mockResponseOnce(JSON.stringify({ error: 'Invalid credentials' }), { status: 401 });

    render(<LoginPage />);

    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'wronguser' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'wrongpassword' } });
    fireEvent.click(screen.getByText('Login'));

    await waitFor(() => expect(global.alert).toHaveBeenCalledWith('Invalid credentials'));
});

  it('redirects to dashboard on successful login', async () => {
    fetch.mockResponseOnce(JSON.stringify({ token: 'dummytoken', username: 'testuser', role: 'admin' }), { status: 200 });

    render(<LoginPage />);

    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByText('Login'));
    await waitFor(() => expect(push).toHaveBeenCalledWith('/dashboard'));
  });
});
