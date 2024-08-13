import axiosClient from "../../config/axios";
import { useEffect, useState, FC } from "react";
import Topic from "./Topic";
import { AlertType, TopicType } from "../../Types/Types";
import useAuth from "../../hooks/useAuth";
import Alert from "../Static/Alert";

const Topics: FC<{ id: string }> = ({ id }) => {

    const [topics, setTopics] = useState<TopicType[]>([]);
    const [alert, setAlert] = useState<AlertType>({} as AlertType);

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
                setAlert({message: response.data.message, type: 'success'})
            } catch (error: any) {
                setAlert({message: error.response.data.message, type:'alert'})
            }
        }
        fetchTopics();
    }, [id, jwt]);

    return (
        <div className="space-y-4">
            {
                alert.message && <Alert alert={alert} />
            }
            { topics.length > 0 && topics.map((topic: TopicType) => (
                <Topic key={topic.id} topic={topic} />
            ))}
        </div>
    );
}

export default Topics
