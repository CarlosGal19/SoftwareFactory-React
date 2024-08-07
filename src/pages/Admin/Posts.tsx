import { useState, useEffect } from 'react';
import axiosClient from '../../config/axios';

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


const Posts = () => {
  const [posts, setPosts] = useState([]);
  const jwt = localStorage.getItem('jwt');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchPosts(){
      try {
        const response = await axiosClient.get('/posts/validated/no', {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });
        console.log(response.data.posts);
        setPosts(response.data.posts);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, [jwt]);

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
    <div className="flex w-full h-full">
      <div className="w-full p-6">
        <h1 className="text-3xl font-bold mb-6">Validate Posts</h1>
        <div className="space-y-4">
          {loading && <p>Loading...</p>}
          {!loading && posts.length === 0 && <p>No posts found</p>}

          {posts.map((post: Post) => (
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default Posts;


