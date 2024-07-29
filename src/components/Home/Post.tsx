import { FC } from "react"
import PostCreator from "./PostCreator"

type Post = {
    id: number;
    topic_id: number;
    creator_id: number;
    title: string;
    content: string;
    url_img: string;
    created_at: string;
    updated_at: string;
}

const Post: FC<{ post: Post }> = ({ post }) => {
    return (
        <li key={post.id} className="mt-4 p-4 bg-white shadow-lg rounded-lg text-center w-5/6 m-auto list-none">
            <PostCreator id={post.creator_id} />
            <h2 className="text-4xl font-bold my-4">{post.title}</h2>
            <h3 className="text-2xl my-2">{post.content}</h3>
            <img src={post.url_img} alt="Post Image" className="m-auto" />
            <h3 className="text-xl font-semibold my-2 text-left">{post.created_at}</h3>
        </li>
    )
}

export default Post
