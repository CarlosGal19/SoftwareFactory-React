import axiosClient from "../../config/axios";
import { useEffect, useState, FC } from "react";
import Alert from "../Static/Alert";
import Topic from "./Topic";

type OneTopic = {
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
                setAlert({ msg: '', type: '' });
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
                topics.map((topic: OneTopic) => (
                    <Topic key={topic.id} topic={topic} />
                ))
            }
        </>
    )
}

export default Topics
