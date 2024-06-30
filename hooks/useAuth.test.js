import { useRouter } from 'next/router';
import { renderHook, act } from '@testing-library/react';
import Cookies from 'js-cookie';
import useAuth from './useAuth';

jest.mock('next/router', () => ({
    useRouter: jest.fn(),
  }));

jest.mock('js-cookie', () => ({
    get: jest.fn(),
    set: jest.fn(),
    remove: jest.fn(),
  }));

describe('useAuth hook', () => {
    let routerPush;

    beforeEach(() => {
        routerPush = jest.fn();
        useRouter.mockReturnValue({ push: routerPush });

         // Mock inital COOKIES
        Cookies.get.mockImplementation((key) => {
            switch (key) {
            case 'username':
                return 'testuser';
            case 'role':
                return 'admin';
            case 'token':
                return 'dummytoken';
            default:
                return null;
            }
        });
    })

    afterEach(() => {
        jest.clearAllMocks();
      });  

  it('should redirect to login on logout', () => {
        const { result } = renderHook(() => useAuth());
    
        act(() => {
            result.current.handleLogout();
        });
    
        expect(routerPush).toHaveBeenCalledWith('/login');
    });
    
    it('should set auth state and cookies when setAuth is called', () => {
        const { result } = renderHook(() => useAuth());
    
        act(() => {
            result.current.setAuth('newuser', 'userrole', 'newtoken');
        });
    
        expect(result.current.username).toBe('newuser');
        expect(result.current.role).toBe('userrole');
        expect(result.current.token).toBe('newtoken');
        // Optionally, check if Cookies.set was called if you modify the hook to set cookies
    });

  it('should remove cookies and clear auth state on logout', () => {
    
    const { result } = renderHook(() => useAuth());

    // Verify initial STATE
    expect(result.current.username).toBe('testuser');
    expect(result.current.role).toBe('admin');
    expect(result.current.token).toBe('dummytoken');

        //act as we call to handleLogout
    act(() => {
      result.current.handleLogout();
    });

    // verify the COOKIES were removed
    expect(Cookies.remove).toHaveBeenCalledWith('token');
    expect(Cookies.remove).toHaveBeenCalledWith('username');
    expect(Cookies.remove).toHaveBeenCalledWith('role');
    // Verify STATE is clean
    expect(result.current.username).toBe('');
    expect(result.current.role).toBe('');
    expect(result.current.token).toBe('');
  });
});
