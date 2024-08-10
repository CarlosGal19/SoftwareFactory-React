import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import axiosClient from '../../config/axios';

import ForumItem from '../../components/Admin/ForumItem';
import { ForumType } from '../../Types/Types';

const Forums = () => {
  const [forums, setForums] = useState([] as ForumType[]);
  const [loading, setLoading] = useState<boolean>(true);

  const jwt = localStorage.getItem('jwt');

  useEffect(() => {
    async function fetchForums() {
      try {
        const response = await axiosClient.get('/forums', {
          headers: {
            Authorization: `Bearer ${jwt}`,
          }
        });
        setForums(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchForums();
  }, [jwt]);

  return (
    <div className="flex w-full h-full">
      <div className="w-full p-6">
        <h1 className="text-3xl font-bold mb-6">Manage Forums</h1>
        <Link
          to="/admin/create-forum"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200 mb-4 inline-block"
        >
          Create New Forum
        </Link>
        <div className="space-y-4">
          {
            loading && <p>Loading...</p>
          }
          {
            !loading && forums.length === 0 && <p>No forums found</p>
          }
          {
            !loading && forums.length > 0 &&

            forums.map((forum: ForumType) => (
              <ForumItem key={forum.id} forum={forum} />
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default Forums;
