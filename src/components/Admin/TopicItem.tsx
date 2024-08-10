import { FC, useState } from "react";
import axiosClient from "../../config/axios";
import { TopicType } from "../../Types/Types";

const TopicItem: FC<{ topic: TopicType }> = ({ topic }) => {

    const [edit, setEdit] = useState<boolean>(false);
    const [name, setName] = useState<string>(topic.name);
    const [description, setDescription] = useState<string>(topic.description);

    const jwt = localStorage.getItem('jwt');

    const handleDelete = async (id: number) => {
        try {
            const response = await axiosClient.delete(`/topics/${id}`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleEdit = () => {
        setEdit(prev => !prev);
    };

    const handleUpdate = async () => {
        try {
            const response = await axiosClient.patch(`/topics/${topic.id}`, {
                name,
                description,
                forum_id: topic.forum_id
            }, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div
                key={topic.id}
                className="bg-white p-6 rounded-lg shadow-md flex justify-between items-center"
            >
                <div className="mr-8">
                    <h2 className="text-xl font-semibold text-gray-800">{topic.name}</h2>
                    <p className="text-gray-700">{topic.description}</p>
                </div>
                <div className="flex space-x-4">
                    <button
                        onClick={() => handleEdit()}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition duration-200"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => handleDelete(topic.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition duration-200"
                    >
                        Delete
                    </button>
                </div>
            </div>
            {
                edit && (
                    <div className="bg-white p-6 rounded-lg shadow-md mt-4">
                        <h2 className="text-xl font-semibold text-gray-800">Edit Topic</h2>
                        <form className="space-y-4" onSubmit={handleUpdate}>
                            <div>
                                <label className="block text-lg text-gray-700">Name:</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="mt-2 px-4 py-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-gray-300"
                                />
                            </div>
                            <div>
                                <label className="block text-lg text-gray-700">Description:</label>
                                <textarea
                                    name="description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="mt-2 px-4 py-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-gray-300"
                                />
                            </div>
                            <button
                                type="submit"
                                onClick={handleUpdate}
                                className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-4 rounded-lg w-full transition ease-in-out duration-200"
                            >
                                Update Topic
                            </button>
                            <button
                                type="button"
                                onClick={() => setEdit(false)}
                                className="mt-3 bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-lg w-full transition ease-in-out duration-200"
                            >
                                Cancel
                            </button>
                        </form>
                    </div>
                )
            }
        </>
    );
}

export default TopicItem;
