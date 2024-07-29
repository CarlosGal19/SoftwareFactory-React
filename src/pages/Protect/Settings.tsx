import axiosClient from "../../config/axios";
import { useEffect, FC, useState } from "react";
import Alert from "../../components/Static/Alert";

type User = {
    id: number;
    name: string;
    last_name: string;
    email: string;
    user_name: string;
    user_type_id: number;
    gender: string;
    major_id: number;
    birth_date: string;
    profile_photo: string;
    created_at: string;
    updated_at: string;
}

const Settings: FC = () => {
    const [user, setUser] = useState<User>({} as User);
    const [major, setMajor] = useState({ name: '', description: '' });
    const [alert, setAlert] = useState({ msg: '', type: '' });
    const [edit, setEdit] = useState<boolean>(false);

    const jwt = localStorage.getItem('jwt');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axiosClient.get('majors/me', {
                    headers: {
                        Authorization: `Bearer ${jwt}`
                    }
                });
                setUser(response.data.user);
                setMajor(response.data.major);
                setAlert({ msg: '', type: '' });
            } catch (error: any) {
                setAlert({ msg: error.response.data.message || 'An error occurred', type: 'alert' });
            }
        }
        fetchProfile();
    }, [jwt]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const name = (e.currentTarget.name as unknown as HTMLInputElement).value;
        const last_name = (e.currentTarget.last_name as HTMLInputElement).value;
        const user_name = (e.currentTarget.user_name as HTMLInputElement).value;
        try {
            const response = await axiosClient.patch('users/update', {
                name,
                last_name,
                user_name
            }, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            });
            setUser(response.data.user);
            setAlert({ msg: response.data.message, type: 'success' });
            setEdit(false);
        } catch (error: any) {
            setAlert({ msg: error.response.data.message || 'An error occurred', type: 'alert' });
        }

    }

    return (
        <>
            {alert.msg && <Alert msg={alert.msg} type={alert.type} />}
            {user.id && (
                <div className="mt-24 p-8 max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
                    <h1 className="text-center text-6xl font-bold text-gray-800 mb-8">Account Settings</h1>
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
                                <p><span className="font-semibold">Gender:</span> {user.gender}</p>
                                <p><span className="font-semibold">Major:</span> {major.name} - {major.description}</p>
                                <p><span className="font-semibold">Birth Date:</span> {user.birth_date}</p>
                            </div>
                        </div>
                    </div>
                    {
                        edit && (
                            <>
                                <form onSubmit={handleSubmit}>
                                    {/* Form to edit username, name and last name */}
                                    <div className="flex flex-col space-y-4">
                                        <label htmlFor="name" className="text-xl font-semibold">Name</label>
                                        <input type="text" name="name" id="name" className="border border-gray-300 rounded-lg p-2" />
                                    </div>
                                    <div className="flex flex-col space-y-4">
                                        <label htmlFor="last_name" className="text-xl font-semibold">Last Name</label>
                                        <input type="text" name="last_name" id="last_name" className="border border-gray-300 rounded-lg p-2" />
                                    </div>
                                    <div className="flex flex-col space-y-4">
                                        <label htmlFor="user_name" className="text-xl font-semibold">Username</label>
                                        <input type="text" name="user_name" id="user_name" className="border border-gray-300 rounded-lg p-2" />
                                    </div>
                                    <div className="flex justify-center my-8">
                                        <button className="bg-gray-800 rounded-xl text-xl p-2 font-bold hover:bg-gray-950 text-white">Save</button>
                                    </div>
                                </form>
                            </>
                        )
                    }
                    <div className="flex justify-center my-8">
                        <button className="bg-gray-800 rounded-xl text-xl p-2 font-bold hover:bg-gray-950 text-white" onClick={() => setEdit(prev => !prev)}>Edit profile</button>
                    </div>
                </div>
            )}
        </>
    );
}

export default Settings;

