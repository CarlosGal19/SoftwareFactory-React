import { FC } from "react"
import PostCreator from "../Home/PostCreator"

type Post = {
    id: number;
    title: string;
    content: string;
    topic_id: number;
    creator_id: number;
    url_img: string;
    created_at: string;
    updated_at: string;
}

const Post: FC<{ post: Post }> = ({ post }) => {
    return (
        <>
            <div key={post.id} className="bg-gray-100 p-4 my-4 rounded-lg hover:shadow-blue-200 shadow-lg w-5/6 m-auto">
                <PostCreator id={post.creator_id} />
                <h2 className="text-4xl font-bold text-gray-800 my-6">{post.title}</h2>
                <h3 className="text-2xl font-semibold text-gray-800 my-4">{post.content}</h3>
                <img src={post.url_img} alt="Image" className="w-48" />
                <p className="text-gray-600 my-4">Created at: {post.created_at}</p>
            </div>
        </>
    )
}

export default Post
