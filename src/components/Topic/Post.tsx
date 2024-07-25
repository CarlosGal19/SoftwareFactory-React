import { FC } from "react";
import PostCreator from "../Home/PostCreator";

type Post = {
  id: number;
  title: string;
  content: string;
  topic_id: number;
  creator_id: number;
  url_img: string;
  created_at: string;
  updated_at: string;
};

const Post: FC<{ post: Post }> = ({ post }) => {
  return (
    <div key={post.id} className="bg-white p-8 my-8 rounded-xl shadow-lg w-full max-w-2xl mx-auto border-t-4 border-blue-500 transition-transform duration-300 hover:scale-105">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">{post.title}</h2>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <PostCreator id={post.creator_id} />
        </div>
        <p className="text-gray-500 text-sm">
          {new Date(post.created_at).toLocaleString()} {post.updated_at !== post.created_at && `(Updated: ${new Date(post.updated_at).toLocaleString()})`}
        </p>
      </div>
      <p className="text-gray-700 mb-6">{post.content}</p>
      {post.url_img && (
        <img src={post.url_img} alt="Post Image" className="w-full rounded-lg mb-6 shadow-md" />
      )}
    </div>
  );
};

export default Post;
