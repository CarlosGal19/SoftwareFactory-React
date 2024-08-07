import axiosClient from "../../config/axios";
import { useEffect, useState, FC } from "react";
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
            } catch (error: any) {
                console.log(error.response.data.message || 'An error occurred');
            }
        }
        fetchTopics();
    }, [id, jwt]);

    return (
        <div className="space-y-4">
            {topics.map((topic: OneTopic) => (
                <Topic key={topic.id} topic={topic} />
            ))}
        </div>
    );
}

export default Topics
