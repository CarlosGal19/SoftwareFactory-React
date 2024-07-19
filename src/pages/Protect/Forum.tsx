import { useParams } from "react-router-dom"
import { useEffect, useState, FC } from "react";
import axiosClient from "../../config/axios";
import Alert from "../../components/Alert";
import Topics from "../../components/Topics";

type Forum = {
    id: number;
    name: string;
    description: string;
    creator_id: number;
    created_at: string;
    updated_at: string;
}

const Forum: FC = () => {

    const [forum, setForum] = useState<Forum | null>(null);
    const { id } = useParams<{ id: string }>();
    const [alert, setAlert] = useState({ msg: '', type: '' });

    const jwt = localStorage.getItem('jwt');

    useEffect(() => {
        const getForum = async () => {
            try {
                const response = await axiosClient.get(`forums/${id}`,{
                    headers: {
                        Authorization: `Bearer ${jwt}`
                    }
                });
                setForum(response.data.forum);
            } catch (error: any) {
                console.log(error.response.data.message);
                setAlert({ msg: error.response.data.message || 'An error occurred', type: 'alert' });
            }
        }
        getForum();
    }, [id, jwt])

    return (
        <>
        {
            alert.msg && <Alert msg={alert.msg} type={alert.type} />
        }
            <div className="w-3/4 mx-auto mt-24">
                <div className="bg-white p-8 shadow-lg rounded-lg">
                    <h1 className="text-6xl font-bold text-gray-800 my-8">{forum?.name}</h1>
                    <p className="text-gray-700 mb-12">{forum?.description}</p>
                    <div>
                        <Topics id={forum?.id}/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Forum
