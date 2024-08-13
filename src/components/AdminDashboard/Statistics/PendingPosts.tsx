import { FC, useState, useEffect } from 'react'
import axiosClient from '../../../config/axios'
import useAuth from '../../../hooks/useAuth'
import { AlertType } from '../../../Types/Types'
import Alert from '../../Static/Alert'

const PendingPosts: FC = () => {

  const [posts, setPosts] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(true)
  const [alert, setAlert] = useState<AlertType>({} as AlertType);

  const { jwt } = useAuth()

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await axiosClient.get('/posts/validated/no/count', {
          headers: {
            Authorization: `Bearer ${jwt}`
          }
        })
        setPosts(response.data.posts)
        setAlert({message: response.data.message, type: 'success'})
      } catch (error: any) {
        setAlert({message: error.response.data.message, type:'alert'})
      } finally {
        setLoading(false)
      }
    }
    getPosts();
  }, [jwt]);

  if (loading) return <p className="text-2xl">...</p>

  if(alert.message) return <Alert alert={alert}/>

  return (
    <p className="text-2xl">{posts}</p>
  )
}

export default PendingPosts
