// /pages/dashboard.js
import ProtectedRoute from '../components/ProtectedRoute';
import useAuth from '../hooks/useAuth';
import Link from 'next/link';


const Dashboard = () => {
  const { username, role, handleLogout, setAuth } = useAuth();

  return (
    <ProtectedRoute onAuth={setAuth}>
      <h1>Dashboard 1</h1>
      <p>Welcome to the protected dashboard, {username}. Your role is {role}.</p>
      <Link id="link" href="/dashboard2">Go to Dashboard 2</Link> 
      <button onClick={handleLogout}>Logout</button>
    </ProtectedRoute>
  );
};

export default Dashboard;
