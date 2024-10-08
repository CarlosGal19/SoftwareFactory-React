import { FormEvent, useState } from 'react';
import axiosClient from '../../config/axios';
import { Link } from 'react-router-dom';
import useAuth from "../../hooks/useAuth";
import { AlertType } from '../../Types/Types';
import Alert from '../../components/Static/Alert';

const CreateForum = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<AlertType>({} as AlertType);

  const { jwt } = useAuth();

  const handleCreateForum = async (e: FormEvent) => {
    e.preventDefault();


    setLoading(true);

    try {
      const response = await axiosClient.post('/forums', {
        name,
        description,
      }, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        }
      });
      setAlert({ message: response.data.message, type: 'success' })
      resetForm();
    } catch (error: any) {
      setAlert({ message: error.response.data.message, type: 'alert' })
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setName('');
    setDescription('');
  };

  return (
    <div className="p-6 w-full">
      <h1 className="text-3xl font-bold mb-6">Create New Forum</h1>
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        {
          alert.message && <Alert alert={alert} />
        }
        <h2 className="text-2xl font-bold mb-4">New Forum</h2>
        {loading && <p>Loading...</p>}
        <form onSubmit={handleCreateForum} className="space-y-4">
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
            disabled={loading}
            className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-4 rounded-lg w-full transition ease-in-out duration-200"
          >
            {loading ? 'Creating...' : 'Create Forum'}
          </button>
          <Link to="/admin/manage-forums" className="mt-3 block text-center text-blue-500 hover:underline">
            <button
              type="button"
              className="mt-3 bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-lg w-full transition ease-in-out duration-200"
            >
              Back to Forums
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default CreateForum;
