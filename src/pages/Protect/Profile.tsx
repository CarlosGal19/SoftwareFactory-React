import { FC } from "react";
import { useState, useEffect } from "react";
import Alert from "../../components/Static/Alert";
import axiosClient from "../../config/axios";
import Friends from "../../components/Profile/Friends";
import Posts from "../../components/Profile/Posts";
import { AlertType, UserType } from "../../Types/Types";
import useAuth from "../../hooks/useAuth";

const Profile: FC = () => {

  const [user, setUser] = useState<UserType>({} as UserType);
  const [alert, setAlert] = useState<AlertType>({} as AlertType);

  const { jwt } = useAuth();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axiosClient.get('posts/me/posts', {
          headers: {
            Authorization: `Bearer ${jwt}`
          }
        });
        setUser(response.data.user);
        setAlert({ message: '', type: '' });
      } catch (error: any) {
        setAlert({ message: error.response.data.message || 'An error occurred', type: 'alert' });
      }
    }
    fetchProfile();
  }, [jwt]);

  return (
    <>
      {alert.message && <Alert alert={alert} />}
      {user.id && (
        <div className="mt-20 p-8 w-5/6 mx-auto bg-white rounded-lg shadow-lg grid md:grid-cols-2 gap-8">
          <div>
            <div className="flex flex-col items-center">
              <img src={user.profile_photo || './user.svg'} alt="Profile" className="w-48 h-48 rounded-full object-cover mb-4 shadow-md" />
              <h2 className="text-center text-3xl font-bold text-gray-800">{user.name} {user.last_name}</h2>
              <p className="my-2"> {user.user_name}</p>
            </div>
            <div className="my-4 flex flex-col items-center shadow-sm rounded-2xl">
              <div className="text-xl text-gray-700 space-y-4">
                <p><span className="font-semibold">Email:</span> {user.email}</p>
                <p><span className="font-semibold">Gender:</span> {user.gender}</p>
                <p><span className="font-semibold">Birth Date:</span> {user.birth_date}</p>
              </div>
            </div>
            <Friends />
          </div>
          <Posts />
        </div>
      )}
    </>
  )
}

export default Profile
