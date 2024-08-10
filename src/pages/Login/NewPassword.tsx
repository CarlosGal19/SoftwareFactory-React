import { useState, FC } from 'react'
import { Link, useParams } from 'react-router-dom'
import Alert from '../../components/Static/Alert'
import axiosClient from '../../config/axios'
import { AlertType } from '../../Types/Types'

const NewPassword: FC = () => {

    const [password, setPassword] = useState('');
    const [passwordUpdated, setPasswordUpdated] = useState(false);
    const [alert, setAlert] = useState<AlertType>({ type: '', msg: '' });

    const { token } = useParams<{ token: string }>();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!password || password.length < 6) {
            setAlert({
                type: 'alert',
                msg: 'Password is required and must be at least 6 characters'
            });
            return;
        }

        resetPassword();
    }

    const resetPassword = async () => {
        try {
            let response = await axiosClient.get(`/users/forget-password/${token}`);
            if (response.status !== 200) {
                setAlert({
                    type: 'alert',
                    msg: response.data.message
                });
                return;
            }
            response = await axiosClient.post(`/users/forget-password/${token}`, { password });
            if (response.status === 200) {
                setPassword('');
                setAlert({
                    type: 'success',
                    msg: response.data.message
                });
                setPasswordUpdated(true);
            }
            return;
        } catch (error: any) {
            setAlert({
                type: 'error',
                msg: error.response.data.message
            });
        }
    }

    return (
        <>
            <div className='flex justify-center mb-6'>
                <img src="./UTMA.png" alt="UTMA LOGO" />
            </div>
            <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
                {
                    alert.msg && <Alert type={alert.type} msg={alert.msg} />
                }
                <form onSubmit={handleSubmit}>
                    <div className="my-6">
                        <label htmlFor="password" className="uppercase text-gray-600 block text-xl font-bold">Password</label>
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} id="password" placeholder="Your password" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" />
                    </div>
                    <input type="submit" value="Change Password" className="bg-indigo-700 text-white font-bold rounded-xl w-full py-3 uppercase mt-5  hover:cursor-pointer hover:bg-indigo-900 md:w-auto px-16" />
                </form>
                {
                    passwordUpdated && (
                        <nav className='mt-10 text-center'>
                            <Link to="/" className="text-indigo-500 hover:text-indigo-900">Login</Link>
                        </nav>
                    )
                }
            </div>
        </>
    )
}

export default NewPassword
