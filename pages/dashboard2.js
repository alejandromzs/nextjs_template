import ProtectedRoute from '../components/ProtectedRoute';
import useAuth from '../hooks/useAuth';
import Link from 'next/link';

const Dashboard2 = () => {
    const { username, role, handleLogout, setAuth } = useAuth();
 

  return (
    <ProtectedRoute onAuth={setAuth}>
      <h1>Dashboard 2</h1>
      <p>Welcome to Dashboard 2, {username}. Your role is {role}.</p>
      <Link href="/dashboard"> Back to Dashboard </Link>
      <br />
      <button onClick={handleLogout}>Logout</button>
    </ProtectedRoute>
  );
};

export default Dashboard2;
