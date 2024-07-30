import { useState, FormEvent, FC } from 'react';
import { Link } from 'react-router-dom';
import Alert from '../../components/Static/Alert';
import axiosClient from '../../config/axios';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Login: FC = () => {
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
      const response = await axiosClient.post('/users/login', { email, password });
      setEmail('');
      setPassword('');
      login(response.data.token);
      navigate('/home');
    } catch (error: any) {
      setAlert({ msg: error.response.data.message || 'An error occurred', type: 'alert' });
    }
  };

  return (
    <div className="shadow-lg px-5 py-10 rounded-xl bg-white">
      <h2 className="text-center text-2xl font-bold mb-5">Login to your account</h2>
      <div className='flex justify-center mb-6'>
        <img src="./utma.png" alt="UTMA LOGO" />
      </div>
      {alert.msg && <Alert type={alert.type} msg={alert.msg} />}
      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            name="email"
            className="mt-1 p-3 w-full border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-5">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            name="password"
            className="mt-1 p-3 w-full border border-gray-300 rounded-md"
          />
        </div>
        <button type="submit" className="bg-blue-700 hover:bg-blue-800 font-bold text-white w-full py-3 rounded-md">
          Log in
        </button>
      </form>
      <div className='flex justify-evenly mt-5'>
        <p className="text-center">Don't have an account? <Link to="/register" className="text-blue-700">Register</Link></p>
        <p className="text-center"><Link to="/forget-password" className="text-blue-700">Forgot password?</Link></p>
      </div>
    </div>
  );
};

export default Login;
