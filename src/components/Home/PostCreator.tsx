import axiosClient from "../../config/axios";
import { FC, useEffect, useState } from "react";

const PostCreator: FC<{ id: number }> = ({ id }) => {
    const [creator, setCreator] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const jwt = localStorage.getItem("jwt");

    useEffect(() => {
        const getCreator = async () => {
            try {
                const response = await axiosClient.get(`/users/${id}`, {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                });
                setCreator(response.data.user_name.user_name);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        getCreator();
    }, [id, jwt]);

    if (loading) {
        return <h2 className="text-lg font-semibold my-2 text-gray-600">Loading...</h2>;
    }

    return (
        <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-gray-500 font-bold">{creator.charAt(0)}</span>
            </div>
            <h2 className="text-lg font-semibold text-gray-700">{creator}</h2>
        </div>
    );
};

export default PostCreator;
