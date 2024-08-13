import { useParams } from "react-router-dom"
import { useEffect, useState, FC } from "react";
import axiosClient from "../../config/axios";
import Alert from "../../components/Static/Alert";
import Topics from "../../components/Forum/Topics";
import { AlertType, ForumType } from "../../Types/Types";
import useAuth from "../../hooks/useAuth";

const Forum: FC = () => {

    const [forum, setForum] = useState<ForumType | null>(null);
    const { id } = useParams<{ id: string }>();
    const [alert, setAlert] = useState<AlertType>({} as AlertType);

    const { jwt } = useAuth();

    useEffect(() => {
        const getForum = async () => {
            try {
                const response = await axiosClient.get(`forums/${id}`, {
                    headers: {
                        Authorization: `Bearer ${jwt}`
                    }
                });
                setForum(response.data.forum);
                setAlert({ message: '', type: '' });
            } catch (error: any) {
                setAlert({ message: error.response.data.message || 'An error occurred', type: 'alert' });
            }
        }
        getForum();
    }, [id, jwt])

    return (
        <>
            {alert.message && <Alert alert={alert} />}
            <div className="w-full max-w-3xl mx-auto mt-16 px-4">
                <div className="bg-white p-6 md:p-8 shadow-lg rounded-lg">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">{forum?.name}</h1>
                    <p className="text-gray-700 mb-8 text-base md:text-lg">{forum?.description}</p>
                    <div>
                        <Topics id={forum?.id?.toString() ?? ''} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Forum
