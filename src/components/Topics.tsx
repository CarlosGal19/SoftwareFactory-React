import axiosClient from "../config/axios";
import { useEffect, useState, FC } from "react";
import Alert from "./Alert";
import { useNavigate } from "react-router-dom";

type Topic = {
    id: number;
    name: string;
    description: string;
    forum_id: number;
    creator_id: number;
    created_at: string;
    updated_at: string;
}

const Topics: FC<{ id: string }> = ({ id }) => {

    const [alert, setAlert] = useState({ type: '', msg: '' });
    const [topics, setTopics] = useState<Topic[]>([]);
    const navigate = useNavigate();

    const jwt = localStorage.getItem('jwt');

    useEffect(() => {
        const fetchTopics = async () => {
            try {
                const response = await axiosClient.get(`topics/all/${id}`, {
                    headers: {
                        Authorization: `Bearer ${jwt}`
                    }
                })
                setTopics(response.data.topics);
            } catch (error: any) {
                setAlert({ msg: error.response.data.message, type: 'alert' })
            }
        }
        fetchTopics();
    }, [id, jwt]);

    return (
        <>
            {
                alert.msg && <Alert msg={alert.msg} type={alert.type} />
            }
            {
                topics.map((topic: Topic) => (
                    <div key={topic.id} className="bg-gray-100 p-4 my-4 rounded-lg hover:shadow-blue-200 hover:cursor-pointer shadow-lg" onClick={() => {
                        navigate(`/topic/${topic.id}`)
                    } }>
                        <h2 className="text-2xl font-bold text-gray-800">{topic.name}</h2>
                        <p className="text-gray-700">{topic.description}</p>
                    </div>
                ))
            }
        </>
    )
}

export default Topics
