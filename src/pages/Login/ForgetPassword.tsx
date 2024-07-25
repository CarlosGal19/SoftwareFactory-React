import { Link } from "react-router-dom";
import { useState, FC } from "react";
import Alert from "../../components/Static/Alert";
import axiosClient from "../../config/axios";

interface AlertType {
  type: string;
  msg: string;
}

const ForgetPassword: FC = () => {

  const [email, setEmail] = useState('');
  const [alert, setAlert] = useState<AlertType>({ type: '', msg: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || email.length < 10) {
      setAlert({
        type: 'alert',
        msg: 'Please enter a valid email'
      })
      return;
    }
    try {
      const response = await axiosClient.post('/users/forget-password', { email });
      if (response.status === 200) {
        setEmail('');
        setAlert({
          type: 'success',
          msg: response.data.message
        })
      }
    } catch (error: any) {
      setAlert({
        type: 'alert',
        msg: error.response.data.message || 'An error occurred'
      })
    }
  }

  return (
    <>
      <div className="shadow-lg px-5 py-10 rounded-xl bg-white">
        <div className='flex justify-center mb-6'>
          <img src="./UTMA.png" alt="UTMA LOGO" />
        </div>
        <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
          {
            alert.msg && (
              <Alert type={alert.type} msg={alert.msg} />
            )
          }
          <form onSubmit={handleSubmit}>
            <div className="my-6">
              <label htmlFor="email" className="uppercase text-gray-600 block text-xl font-bold">Email</label>
              <input value={email} onChange={e => setEmail(e.target.value)} type="email" id="email" placeholder="Your email" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" />
            </div>
            <input type="submit" value="Send instructions" className="bg-indigo-700 text-white font-bold rounded-xl w-full py-3 uppercase mt-5 hover:cursor-pointer hover:bg-indigo-900 px-16" />
          </form>
          <nav className='mt-10'>
            <ul className="flex justify-evenly mt-5 text-center items-center">
              <li className="flex flex-col w-2/3">
                Do you already have an account? <Link to="/" className="text-indigo-500 hover:text-indigo-900">Login</Link>
              </li>
              <li>
                <Link to="/register" className="text-indigo-500 hover:text-indigo-900">Register</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  )
}

export default ForgetPassword
