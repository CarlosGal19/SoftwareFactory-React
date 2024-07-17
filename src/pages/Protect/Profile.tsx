import axiosClient from "../../config/axios";
import { useEffect, useState, FC } from "react";
import Alert from "../../components/Alert";
import Major from '../../components/Descriptions/Major';

type User = {
    id: number;
    name: string;
    last_name: string;
    email: string;
    user_name: string;
    user_type_id: number;
    genre: string;
    major_id: number;
    birth_date: string;
    profile_photo: string;
    created_at: string;
    updated_at: string;
}


const Profile : FC = () => {

    const [user, setUser] = useState<User>({} as User);
    const [alert, setAlert] = useState({ msg: '', type: '' });

    const jwt = localStorage.getItem('jwt');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axiosClient.get('users/profile', {
                    headers: {
                        Authorization: `Bearer ${jwt}`
                    }
                });
                setUser(response.data.user);
            } catch (error: any) {
                console.error('Error:', error.response.data);
                setAlert({ msg: error.response.data.message || 'An error occurred', type: 'alert' });
              }
        }
        fetchProfile();
    }, [jwt]);

  return (
    <>
        {
            alert.msg && <Alert msg={alert.msg} type={alert.type} />
        }
        {
            user.id && (
                <div className="mt-24">
                    <h1 className="text-center text-6xl font-bold">Account settings</h1>
                    <div className="grid md:grid-cols-2 grid-cols-1">
                        <div className="my-12">
                            <img src={user.profile_photo || './user.svg'} alt="Profile photo" className="w-72 m-auto" />
                            <h1 className="text-center text-4xl font-bold my-16">{user.name} {user.last_name}</h1>
                        </div>
                        <div className="my-12">
                            <h2 className="text-4xl font-bold my-8">Personal information</h2>
                            <p className="text-2xl my-4">Email: {user.email}</p>
                            <p className="text-2xl my-4">Username: {user.user_name}</p>
                            <p className="text-2xl my-4">Gender: {user.genre}</p>
                            <Major id={user.major_id} />
                            <p className="text-2xl my-4">Birth date: {user.birth_date}</p>
                        </div>
                    </div>
                </div>
            )
        }
    </>
  )
}

export default Profile
