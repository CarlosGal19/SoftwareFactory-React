import { FC } from "react";
import PostCreator from "../Home/PostCreator";

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

interface PostProps {
  post: OnePost;
  onEdit: (post: OnePost) => void;
  onDelete: (postId: number) => void;
}

const Post: FC<PostProps> = ({ post, onEdit, onDelete }) => {
  return (
    <div key={post.id} className="bg-white p-6 my-4 rounded-lg shadow-md w-full max-w-xl mx-auto border-t-4 border-sky-500 transition-transform duration-300 hover:scale-105">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">{post.title}</h2>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <PostCreator id={post.creator_id} />
        </div>
        <p className="text-gray-500 text-sm">
          {new Date(post.created_at).toLocaleDateString()} {post.updated_at !== post.created_at && `(Updated: ${new Date(post.updated_at).toLocaleDateString()})`}
        </p>
      </div>
      <p className="text-gray-700 mb-4 text-sm">{post.content}</p>
      {post.url_img && (
        <img src={post.url_img} alt="Post Image" className="w-full h-48 object-cover rounded-lg mb-4 shadow-md" />
      )}
      <div className="flex justify-end space-x-4 mt-4">
        <button
          onClick={() => onEdit(post)}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-150"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(post.id)}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md transition duration-150"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Post;
