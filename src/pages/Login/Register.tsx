import { useState, FC, FormEvent } from "react";
import { Link } from "react-router-dom";
import Major from "../../components/Selectors/Major";
import useMajor from "../../hooks/useMajor";
import Alert from "../../components/Alert";
import axiosClient from "../../config/axios";

interface AlertType {
  type: string;
  msg: string;
}

const Register: FC = () => {
  const { major, setMajor } = useMajor();
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [genre, setGenre] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const [alert, setAlert] = useState<AlertType>({ type: '', msg: '' });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if ([name, lastName, userName, email, birthDate, genre, major, password, repeatPassword].includes('')) {
      setAlert({ type: 'alert', msg: 'All fields are required' });
      return;
    }

    if (password !== repeatPassword) {
      setAlert({ type: 'alert', msg: 'Passwords do not match' });
      return;
    }

    try {
      const response = await axiosClient.post('/users', {
        name,
        last_name: lastName,
        user_name: userName,
        email,
        birth_date: birthDate,
        genre,
        major_id: major,
        password,
      });
      setMajor(0);
      setName('');
      setLastName('');
      setUserName('');
      setEmail('');
      setBirthDate('');
      setGenre('');
      setPassword('');
      setRepeatPassword('');
      setAlert({
        type: 'success',
        msg: response.data.message
      })
      console.log('Register response:', response);
    } catch (error: any) {
      console.log('Register error:', error.response.data);
      setAlert({ msg: error.response.data.message || 'An error occurred', type: 'alert' });
    }
  };

  return (
    <>
      <div>
        <h1 className="text-6xl font-bold text-black">
          Sign up and show the newest <span className="text-blue-700">UTMA</span> info
        </h1>
      </div>
      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {alert.msg && <Alert type={alert.type} msg={alert.msg} />}
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value.trim())}
              id="name"
              name="name"
              className="mt-1 p-3 w-full border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value.trim())}
              id="lastName"
              name="lastName"
              className="mt-1 p-3 w-full border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="userName" className="block text-sm font-medium text-gray-700">User name</label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value.trim())}
              id="userName"
              name="userName"
              className="mt-1 p-3 w-full border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value.trim())}
              id="email"
              name="email"
              className="mt-1 p-3 w-full border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700">Birth date</label>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              id="birthDate"
              name="birthDate"
              className="mt-1 p-3 w-full border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="genre" className="block text-sm font-medium text-gray-700">Gender</label>
            <select
              name="genre"
              id="genre"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="mt-1 p-3 w-full border border-gray-300 rounded-md"
            >
              <option value="">Select Gender</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
              <option value="O">Other</option>
            </select>
          </div>
          <div className="mb-5">
            <label htmlFor="major" className="block text-sm font-medium text-gray-700">Major</label>
            <Major />
          </div>
          <div className="mb-5">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value.trim())}
              id="password"
              name="password"
              className="mt-1 p-3 w-full border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="repeatPassword" className="block text-sm font-medium text-gray-700">Repeat Password</label>
            <input
              type="password"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value.trim())}
              id="repeatPassword"
              name="repeatPassword"
              className="mt-1 p-3 w-full border border-gray-300 rounded-md"
            />
          </div>
          <button type="submit" className="bg-blue-700 hover:bg-blue-800 font-bold text-white w-full py-3 rounded-md">
            Sign up
          </button>
        </form>
        <div className="flex justify-evenly">
          <p className="mt-5 text-center">
            Already have an account? <Link to="/" className="text-blue-700">Log in</Link>
          </p>
          <p className="mt-5 text-center">
            <Link to="/forget-password" className="text-blue-700">Forgot password?</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
