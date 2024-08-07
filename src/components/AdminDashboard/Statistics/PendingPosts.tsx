import { FC, useState, useEffect } from 'react'
import axiosClient from '../../../config/axios'
import { AxiosError } from 'axios'

const PendingPosts: FC = () => {

  const [posts, setPosts] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(true)

  const jwt = localStorage.getItem('jwt')

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await axiosClient.get('/posts/validated/no/count', {
          headers: {
            Authorization: `Bearer ${jwt}`
          }
        })
        console.log(response.data.posts)
        setPosts(response.data.count)
      } catch (error) {
        const err = error as AxiosError
        console.log(err.response?.data)
      } finally {
        setLoading(false)
      }
    }
    getPosts();
  }, [jwt]);

  if (loading) return <p className="text-2xl">...</p>

  return (
    <p className="text-2xl">{posts}</p>
  )
}

export default PendingPosts
