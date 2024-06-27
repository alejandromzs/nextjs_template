// /hooks/useAuth.test.js

//babel.config.js
//jest.config.js
//jest.setup.ks
//package.json


// import { renderHook, act } from '@testing-library/react-hooks';
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
    })

    afterEach(() => {
        jest.clearAllMocks();
      });
//   beforeEach(() => {
//     Cookies.get = jest.fn();
//     Cookies.remove = jest.fn();
//   });

//   it('should set auth state from cookies on mount', () => {
//     Cookies.get.mockImplementation((key) => {
//       switch (key) {
//         case 'username':
//           return 'testuser';
//         case 'role':
//           return 'admin';
//         case 'token':
//           return 'dummytoken';
//         default:
//           return null;
//       }
//     });

//     const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

//     expect(result.current.username).toBe('testuser');
//     expect(result.current.role).toBe('admin');
//     expect(result.current.token).toBe('dummytoken');
//   });

  it('should remove cookies and clear auth state on logout', () => {
     // Mocke inital COOKIES
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
