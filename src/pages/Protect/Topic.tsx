import { FC, useEffect, useState } from "react";
import axiosClient from "../../config/axios";
import { useParams } from "react-router-dom";
import Alert from "../../components/Static/Alert";
import Post from "../../components/Topic/Post";
import CreatePost from "../../components/Topic/createPost";


type OnePost = {
  id: number;
  title: string;
  content: string;
  topic_id: number;
  creator_id: number;
  url_img: string;
  created_at: string;
  updated_at: string;
};

const Topic: FC = () => {
  const [posts, setPosts] = useState<OnePost[]>([]);
  const [alert, setAlert] = useState({ type: '', msg: '' });
  const [editingPost, setEditingPost] = useState<OnePost | null>(null);
  const [formData, setFormData] = useState({ title: '', content: '', url_img: '' });
  const { id, name } = useParams();
  const jwt = localStorage.getItem('jwt');

  const fetchPosts = async () => {
    try {
      const response = await axiosClient.get(`posts/all/${id}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      setPosts(response.data.posts);
    } catch (error: any) {
      setAlert({ msg: error.response.data.message, type: 'alert' });
    }
  };

  const handleEdit = (post: OnePost) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      content: post.content,
      url_img: post.url_img,
    });
  };

  const handleDelete = async (postId: number) => {
    try {
      await axiosClient.delete(`posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      fetchPosts(); // Refresh posts after deletion
    } catch (error: any) {
      setAlert({ msg: error.response.data.message, type: 'alert' });
    }
  };

  const handleUpdatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost) return;

    try {
      await axiosClient.put(`/posts/${editingPost.id}`, { ...formData }, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      setEditingPost(null);
      setFormData({ title: '', content: '', url_img: '' });
      fetchPosts(); // Refresh posts after update
    } catch (error: any) {
      setAlert({ msg: error.response.data.message, type: 'alert' });
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [jwt, id]);

  return (
    <>
      <div className="md:container md:mx-auto mt-16 p-6 bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-4xl font-semibold text-center text-gray-800 mb-6 border-b border-gray-300 pb-2">{name}</h2>
      </div>

      <div className="md:container md:mx-auto my-8 p-6 bg-gray-100 rounded-lg shadow-md">
        <CreatePost topicId={id!} onPostCreated={fetchPosts} />
      </div>

      <div className="md:container md:mx-auto my-8 p-6 bg-gray-100 rounded-lg shadow-md">
        {alert.msg && <Alert type={alert.type} msg={alert.msg} />}
        <div className="space-y-6">
          {posts && posts.map((post: OnePost) => (
            <Post
              key={post.id}
              post={post}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>

      {/* Modal for editing post */}
      {editingPost && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Edit Post</h2>
            <form onSubmit={handleUpdatePost} className="space-y-6">
              <div>
                <label className="block text-lg text-gray-700 mb-2">Title:</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  className="px-4 py-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
              <div>
                <label className="block text-lg text-gray-700 mb-2">Content:</label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  required
                  className="px-4 py-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
              <div>
                <label className="block text-lg text-gray-700 mb-2">Image URL (optional):</label>
                <input
                  type="text"
                  name="url_img"
                  value={formData.url_img}
                  onChange={(e) => setFormData({ ...formData, url_img: e.target.value })}
                  className="px-4 py-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
              <button
                type="submit"
                className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-4 rounded-lg w-full transition-colors duration-200"
              >
                Update Post
              </button>
              <button
                type="button"
                onClick={() => setEditingPost(null)}
                className="mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-lg w-full transition-colors duration-200"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Topic;
