import axiosClient from "../../config/axios";
import { FC, useState } from 'react';
import { AlertType, PostType } from "../../Types/Types";
import useAuth from '../../hooks/useAuth'
import Alert from "../Static/Alert";

const ValidatePost: FC<{ post: PostType }> = ({ post }) => {

  const [alert, setAlert] = useState<AlertType>({} as AlertType);

  const { jwt } = useAuth();

  const handleValidate = async (status: string, index: number) => {
    try {
      const response = await axiosClient.patch(`/posts/validate/${index}`, {
        status
      }, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      setAlert({ message: response.data.message, type: `${status === 'rejected' ? 'alert' : 'success'}` });
    } catch (error: any) {
      setAlert({ message: error.response.data.message, type: 'alert' })
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex justify-between items-center">
      {
        alert.message && <Alert alert={alert} />
      }
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
