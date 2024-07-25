import axiosClient from "../../config/axios"
import { FC, useEffect, useState } from "react"
import UserPost from "../Home/Post"

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

const Posts:FC = () => {

    const [posts, setPosts] = useState<Post[]>([]);

    const jwt = localStorage.getItem('jwt');

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axiosClient.get('posts/me/posts', {
                    headers: {
                        Authorization: `Bearer ${jwt}`
                    }
                });
                setPosts(response.data.posts);
            } catch (error: any) {
                console.log(error.response.data.message || 'An error occurred');
            }
        }
        fetchPosts();
    }, [jwt]);


  return (
    <>
        {
            posts && posts.map(post => (
                <UserPost key={post.id} post={post} />
            )
        )
        }
    </>
  )
}

export default Posts
