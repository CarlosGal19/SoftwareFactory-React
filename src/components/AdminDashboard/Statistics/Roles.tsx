import { FC, useState, useEffect } from 'react'
import axiosClient from '../../../config/axios'

const Roles: FC = () => {

  const [roles, setRoles] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(true)

  const jwt = localStorage.getItem('jwt');

  useEffect(() => {
    const getCount = async () => {
      try {
        const response = await axiosClient.get('/user-types/count/all', {
          headers: {
            Authorization: `Bearer ${jwt}`
          }
        });
        setRoles(response.data.count);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    getCount();
  }, []);

  if (loading) return <p className="text-2xl">...</p>

  return (
    <p className="text-2xl">{roles}</p>
  )
}

export default Roles
