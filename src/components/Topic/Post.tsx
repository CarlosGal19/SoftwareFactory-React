// src/components/Topic/Post.tsx

import { FC } from "react";
import PostCreator from "../Home/PostCreator";

type PostProps = {
  id: number;
  title: string;
  content: string;
  topic_id: number;
  creator_id: number;
  url_img: string;
  created_at: string;
  updated_at: string;
};

const Post: FC<{ post: PostProps }> = ({ post }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-6 border-t-4 border-sky-500 hover:shadow-2xl transition-transform duration-300 transform hover:scale-105">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">{post.title}</h2>
      <div className="flex items-center justify-between mb-4">
        <PostCreator id={post.creator_id} />
        <p className="text-gray-500 text-sm">
          {new Date(post.created_at).toLocaleString()}
          {post.updated_at !== post.created_at && ` (Updated: ${new Date(post.updated_at).toLocaleString()})`}
        </p>
      </div>
      <p className="text-gray-700 mb-4">{post.content}</p>
      {post.url_img && (
        <img
          src={post.url_img}
          alt="Post Image"
          className="w-full h-64 object-cover rounded-lg shadow-md"
        />
      )}
    </div>
  );
};

export default Post;
