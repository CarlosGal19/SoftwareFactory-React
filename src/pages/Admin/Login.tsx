import { useState, FormEvent, FC } from 'react';
import { Link } from 'react-router-dom';
import Alert from '../../components/Static/Alert';
import axiosClient from '../../config/axios';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const AdminLogin: FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [alert, setAlert] = useState<{ msg: string; type: string }>({ msg: '', type: '' });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if ([email, password].includes('')) {
      setAlert({
        type: 'alert',
        msg: 'Both fields are required'
      });
      return;
    }
    try {
      const response = await axiosClient.post('/users/admin/login', { email, password });
      setEmail('');
      setPassword('');
      login(response.data.token);
      navigate('/admin/home');
    } catch (error: any) {
      console.log(error.response);
      setAlert({ msg: error.response.data.message || 'An error occurred', type: 'alert' });
    }
  };

  return (
    <div className="shadow-xl px-6 py-12 rounded-lg bg-gray-100">
      <h2 className="text-center text-3xl font-extrabold mb-6 text-gray-800">Admin Login</h2>
      <div className='flex justify-center mb-8'>
        <img src="/UTMA.png" alt="UTMA logo" className="h-16"/>
      </div>
      {alert.msg && <Alert type={alert.type} msg={alert.msg} />}
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="email" className="block text-lg font-medium text-gray-800">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            name="email"
            className="mt-2 p-4 w-full border border-gray-300 rounded-lg"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-lg font-medium text-gray-800">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            name="password"
            className="mt-2 p-4 w-full border border-gray-300 rounded-lg"
          />
        </div>
        <button type="submit" className="bg-blue-800 hover:bg-blue-900 font-bold text-white w-full py-4 rounded-lg">
          Log in
        </button>
      </form>
      <div className='mt-6'>
        <p className="text-center"><Link to="/forget-password" className="text-blue-800">Forgot password?</Link></p>
      </div>
    </div>
  );
};

export default AdminLogin;
