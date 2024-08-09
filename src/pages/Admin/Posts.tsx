import { useState, useEffect } from 'react';
import axiosClient from '../../config/axios';
import ValidatePost from '../../components/Admin/ValidatePost';

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

  return (
    <div className="flex w-full h-full">
      <div className="w-full p-6">
        <h1 className="text-3xl font-bold mb-6">Validate Posts</h1>
        <div className="space-y-4">
          {loading && <p>Loading...</p>}
          {!loading && posts.length === 0 && <p>No posts found</p>}
          {posts.map((post: Post) => (
            <ValidatePost post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Posts;


