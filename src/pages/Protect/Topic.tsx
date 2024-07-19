// import { useParams } from "react-router-dom"
import { FC, useEffect, useState } from "react"
import axiosClient from "../../config/axios";
import { useParams } from "react-router-dom";

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

const Topic: FC = () => {

    const [posts, setPosts] = useState<Post[]>([]);

    const { id } = useParams();
    const jwt = localStorage.getItem('jwt');

    useEffect(() => {
        const fetchTopic = async () => {
            try {
                const response = await axiosClient.get(`posts/all/${id}`, {
                    headers: {
                        Authorization: `Bearer ${jwt}`
                    }
                })
                setPosts(response.data.posts);
            } catch (error: any) {
                console.log(error.response.data.message)
            }
        }
        fetchTopic();
    }, [jwt, id]);

    return (
        <>
            <div className="my-32">
                {
                    posts.map((post: Post) => (
                        <div key={post.id} className="bg-gray-100 p-4 my-4 rounded-lg hover:shadow-blue-200 hover:cursor-pointer shadow-lg">
                            <h2 className="text-4xl font-bold text-gray-800">{post.title}</h2>
                            <h3 className="text-2xl font-bold text-gray-800">{post.content}</h3>
                            <img src={post.url_img} alt="Image" className="w-24" />
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default Topic
