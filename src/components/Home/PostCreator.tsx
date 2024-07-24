import axiosClient from "../../config/axios"
import { FC, useEffect, useState } from "react"

const PostCreator: FC<{ id: number }> = ({ id }) => {
    const [creator, setCreator] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const jwt = localStorage.getItem('jwt');

    useEffect(() => {
        const getCreator = async () => {
            try {
                const response = await axiosClient.get(`/users/${id}`, {
                    headers: {
                        Authorization: `Bearer ${jwt}`
                    }
                });
                setCreator(response.data.user_name.user_name);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        getCreator();
    }, [id, jwt]);

    if (loading) {
        return <h2 className="text-4xl font-bold my-4 text-left">Loading...</h2>;
    }

    return (
        <h2 className="text-xl my-4 text-left">{creator}</h2>
    )
}

export default PostCreator

