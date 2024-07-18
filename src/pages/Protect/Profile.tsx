import { FC } from "react";
import { useState, useEffect } from "react";
import Alert from "../../components/Alert";
import axiosClient from "../../config/axios";

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

const Profile: FC = () => {

  const [user, setUser] = useState<User>({} as User);
  const [alert, setAlert] = useState({ msg: '', type: '' });

  const jwt = localStorage.getItem('jwt');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axiosClient.get('posts/me/posts', {
          headers: {
            Authorization: `Bearer ${jwt}`
          }
        });
        setUser(response.data.user);
      } catch (error: any) {
        setAlert({ msg: error.response.data.message || 'An error occurred', type: 'alert' });
      }
    }
    fetchProfile();
  }, []);

  return (
    <>
      {alert.msg && <Alert msg={alert.msg} type={alert.type} />}
      {user.id && (
        <div className="mt-24 p-8 max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
          <h1 className="text-center text-6xl font-bold text-gray-800 mb-8">Profile</h1>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex flex-col items-center">
              <img src={user.profile_photo || './user.svg'} alt="Profile" className="w-48 h-48 rounded-full object-cover mb-4 shadow-md" />
              <h1 className="text-center text-4xl font-bold text-gray-800">{user.name} {user.last_name}</h1>
            </div>
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Personal Information</h2>
              <div className="text-xl text-gray-700 space-y-4">
                <p><span className="font-semibold">Email:</span> {user.email}</p>
                <p><span className="font-semibold">Username:</span> {user.user_name}</p>
                <p><span className="font-semibold">Genre:</span> {user.genre}</p>
                <p><span className="font-semibold">Birth Date:</span> {user.birth_date}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Profile
