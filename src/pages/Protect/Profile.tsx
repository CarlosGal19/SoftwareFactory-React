import axiosClient from "../../config/axios";
import { useEffect } from "react";

const Profile = () => {

    const jwt = localStorage.getItem('jwt');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axiosClient.get('users/profile', {
                    headers: {
                        Authorization: `Bearer ${jwt}`
                    }
                });
                console.log(response.data.user);
            } catch (error) {
                console.log(error);
            }
        }
        fetchProfile();
    }, []);

  return (
    <>
        <div className="my-32">
            Profile
        </div>
    </>
  )
}

export default Profile
