import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import axiosClient from '../../config/axios';

interface FormData {
  title: string;
  content: string;
  url_img?: string;
}

interface CreatePostProps {
  topicId: string;
  onPostCreated: () => void;
}

const CreatePost: React.FC<CreatePostProps> = ({ topicId, onPostCreated }) => {
  const [formData, setFormData] = useState<FormData>({ title: '', content: '', url_img: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  useEffect(() => {
    if (showSuccessAlert) {
      const timer = setTimeout(() => {
        setShowSuccessAlert(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showSuccessAlert]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const token = localStorage.getItem('jwt');

    try {
      await axiosClient.post('/posts', { ...formData, topic_id: topicId }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFormData({ title: '', content: '', url_img: '' });
      setShowForm(false);
      setShowSuccessAlert(true);
      onPostCreated(); // Llama a la función para actualizar la lista de posts
    } catch (error: any) {
      console.error('Error while creating the post:', error.response.data.message || 'Unknown error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {!showForm ? (
        <div className="flex justify-center py-4">
          <input
            type="text"
            placeholder="Create a new post"
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-300 rounded-full shadow-md cursor-pointer w-80 transition ease-in-out duration-200 transform hover:scale-105"
            onClick={() => setShowForm(true)}
            readOnly
          />
        </div>
      ) : (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-lg">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Create a new post</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-lg text-gray-700">Title:</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="mt-2 px-4 py-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-gray-300"
                />
              </div>
              <div>
                <label className="block text-lg text-gray-700">Content:</label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  required
                  className="mt-2 px-4 py-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-gray-300"
                />
              </div>
              <div>
                <label className="block text-lg text-gray-700">Image URL (optional):</label>
                <input
                  type="text"
                  name="url_img"
                  value={formData.url_img}
                  onChange={handleInputChange}
                  className="mt-2 px-4 py-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-gray-300"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-4 rounded-lg w-full transition ease-in-out duration-200"
              >
                {isSubmitting ? 'Creating...' : 'Create post'}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="mt-3 bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-lg w-full transition ease-in-out duration-200"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      {showSuccessAlert && (
        <div className="fixed top-16 right-5 z-50">
          <div className="bg-green-500 text-white p-4 rounded-lg shadow-xl">
            Post has been created successfully
          </div>
        </div>
      )}
    </>
  );
};

export default CreatePost;
