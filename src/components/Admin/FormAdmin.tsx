// import axiosClient from "../../config/axios"
import { FC, FormEvent, useState } from 'react'
import Major from '../Selectors/Major'
import axiosClient from '../../config/axios';
import { AlertType } from '../../Types/Types';
import Alert from '../Static/Alert';

const FormAdmin: FC = () => {

  const [major, setMajor] = useState<number>(0);
  const [name, setName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [birthDate, setBirthDate] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [repeatPassword, setRepeatPassword] = useState<string>('');
  const [alert, setAlert] = useState<AlertType>({} as AlertType);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if ([name, lastName, userName, email, birthDate, gender, major, password, repeatPassword].includes('')) {
      console.log('All field are required')
      return;
    }

    if (password !== repeatPassword) {
      console.log('Passwords do not match')
      return;
    }

    try {
      const response = await axiosClient.post('/users', {
        name,
        last_name: lastName,
        user_name: userName,
        email: email.toLowerCase(),
        birth_date: birthDate,
        gender,
        major_id: major,
        password,
        user_type_id: 1
      });
      setMajor(0);
      setName('');
      setLastName('');
      setUserName('');
      setEmail('');
      setBirthDate('');
      setGender('');
      setPassword('');
      setRepeatPassword('');
      setAlert({message: response.data.message, type: 'success'})
    } catch (error: any) {
      setAlert({message: error.response.data.message, type: 'alert'})
    }
  };

  return (
    <>
      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white w-2/3 mx-auto">
        {alert.message && <Alert alert={alert} />}
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
              value={gender}
              onChange={(e) => setGender(e.target.value)}
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
            <Major major={major} setMajor={setMajor} />
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
      </div>
    </>
  )
}

export default FormAdmin
