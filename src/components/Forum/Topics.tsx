import axiosClient from "../../config/axios";
import { useEffect, useState, FC } from "react";
import Topic from "./Topic";
import { TopicType } from "../../Types/Types";
import useAuth from "../../hooks/useAuth";

const Topics: FC<{ id: string }> = ({ id }) => {

    const [topics, setTopics] = useState<TopicType[]>([]);

    const { jwt } = useAuth();

    useEffect(() => {
        const fetchTopics = async () => {
            try {
                const response = await axiosClient.get(`topics/all/${parseInt(id)}`, {
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
            { topics.length > 0 && topics.map((topic: TopicType) => (
                <Topic key={topic.id} topic={topic} />
            ))}
        </div>
    );
}

export default Topics
