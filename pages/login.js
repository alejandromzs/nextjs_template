// /pages/login.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie'; 

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });  
    if (response.ok) {
      const data = await response.json(); 
      //Cookies.set('token', data.token, { expires: 1, sameSite: 'strict', secure: true, httpOnly: true });
      //Cookies.set('username', data.username, { expires: 1 });
      //Cookies.set('role', data.role, { expires: 1 });

      //localstorage replaced by cookies as part of api/login
      // localStorage.setItem('token', data.token);  
      // localStorage.setItem('username', data.username);
      // localStorage.setItem('role', data.role);

      router.push('/dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginPage;
