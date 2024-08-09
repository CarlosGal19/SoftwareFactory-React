import axiosClient from "../../config/axios";
import { FC } from 'react';


type Post = {
    id: number;
    title: string;
    content: string;
    status: string;
    imageUrl: string;
    creator_id: number;
    created_at: string;
    updated_at: string;
};

const ValidatePost: FC<{ post: Post }> = ({ post }) => {

    const jwt = localStorage.getItem('jwt');

    const handleValidate = async (status: string, index: number) => {
        try {
          const response = await axiosClient.patch(`/posts/validate/${index}`, {
            status
          }, {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          });
          console.log(response.data);
        } catch (error) {
          console.log(error);
        }
      };

    return (
        <div key={post.id} className="bg-white p-6 rounded-lg shadow-md flex justify-between items-center">
            <div className="mr-8">
                <h2 className="text-xl font-semibold text-gray-800">{post.title}</h2>
                <p className="text-gray-500 mt-2">{post.content}</p>
            </div>
            <div className="flex items-center">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200" onClick={() => handleValidate('accepted', post.id)}>Validate</button>
                <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-200 ml-4" onClick={() => handleValidate('rejected', post.id)}>Delete</button>
            </div>
        </div>
    )
}

export default ValidatePost
