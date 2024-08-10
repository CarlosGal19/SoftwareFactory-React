import { FormEvent, useState } from 'react';
import axiosClient from '../../config/axios';
import { Link } from 'react-router-dom';
import  Forum from '../../components/Selectors/Forum';
import useAuth from "../../hooks/useAuth";

const CreateTopic = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [forum, setForum] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  const { jwt } = useAuth();

  const handleCreateTopic = async (e: FormEvent) => {
    e.preventDefault();


    setLoading(true);

    try {
      const response = await axiosClient.post('/topics', {
        name,
        description,
        forum_id: forum
      }, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        }
      });
      console.log(response.data);
      resetForm();
    } catch (error) {
      console.log(error);
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
      <h1 className="text-3xl font-bold mb-6">Create New Topic</h1>
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">New Topic</h2>
        {loading && <p>Loading...</p>}
        <form onSubmit={handleCreateTopic} className="space-y-4">
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
          <div>
            <label className="block text-lg text-gray-700">Forum:</label>
            <Forum setForum={setForum} forum={forum}/>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-4 rounded-lg w-full transition ease-in-out duration-200"
          >
            {loading ? 'Creating...' : 'Create Topic'}
          </button>
          <Link to="/admin/manage-topics">


            <button
              type="button"
              className="mt-3 bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-lg w-full transition ease-in-out duration-200"
            >
              Go back to Topics
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default CreateTopic;
