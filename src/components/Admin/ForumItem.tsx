import { FC } from "react";
import axiosClient from "../../config/axios";

type Forum = {
    id: number;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
};

const ForumItem: FC<{ forum: Forum }> = ({ forum }) => {

    const jwt = localStorage.getItem('jwt');

    const handleDelete = async (id: number) => {
        try {
            const response = await axiosClient.delete(`/forums/${id}`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleEdit = (id: number) => {
        console.log(`Editing forum with id ${id}`);
    };



    return (
        <div
            key={forum.id}
            className="bg-white p-6 rounded-lg shadow-md flex justify-between items-center"
        >
            <div className="mr-8">
                <h2 className="text-xl font-semibold text-gray-800">{forum.name}</h2>
                <p className="text-gray-700">{forum.description}</p>
            </div>
            <div className="flex space-x-4">
                <button
                    onClick={() => handleEdit(forum.id)}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition duration-200"
                    >
                    Edit
                    </button>
                    <button
                    onClick={() => handleDelete(forum.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition duration-200"
                    >
                    Delete
                    </button>
            </div>
        </div>
    );
}

export default ForumItem;
