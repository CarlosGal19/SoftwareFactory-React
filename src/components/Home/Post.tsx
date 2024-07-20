import { FC } from "react"

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
        <>
            <li key={post.id} className="mt-4 p-4 bg-white shadow-lg rounded-lg text-center w-2/3 m-auto">
                <h2 className="text-4xl font-bold my-4">{post.title}</h2>
                <h3 className="text-2xl my-2 font-semibold">{post.content}</h3>
                <img src={post.url_img} alt="Post Image" className="m-auto" />
            </li>
        </>
    )
}

export default Post
