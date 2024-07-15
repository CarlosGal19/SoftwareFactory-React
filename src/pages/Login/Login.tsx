import { useState, FormEvent, FC } from 'react';
import { Link } from 'react-router-dom';
import Alert from '../../components/Alert';
import axiosClient from '../../config/axios';

const Login: FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [alert, setAlert] = useState<{ msg: string; type: string }>({ msg: '', type: '' });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if ([email, password].includes('')) {
      setAlert({
        type: 'alert',
        msg: 'Both fields are required'
      })
      return;
    }
    try {
      const response = await axiosClient.post('/users/login', { email, password });
      setEmail('');
      setPassword('');
      console.log(response.data);
    } catch (error: any) {
      console.error('Error:', error.response.data);
      setAlert({ msg: error.response.data.message || 'An error occurred', type: 'alert' });
    }
  };

  return (
    <>
      <div>
        <h1 className="text-6xl font-bold text-black">Log in and show the newest <span className="text-blue-700">UTMA</span> info</h1>
      </div>
      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
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
          <button type="submit" className="bg-blue-700 hover:bg-blue-800 font-bold text-white w-full py-3 rounded-md">Log in</button>
        </form>
        <div className='flex justify-evenly'>
          <p className="mt-5 text-center">Don't have an account? <Link to="/register" className="text-blue-700">Register</Link></p>
          <p className="mt-5 text-center"><Link to="/forget-password" className="text-blue-700">Forgot password?</Link></p>
        </div>
      </div>
    </>
  );
};

export default Login;
