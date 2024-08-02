import { FC, useEffect, useState } from 'react'
import axiosClient from '../../../config/axios'

const Admins: FC = () => {

  const [admins, setAdmins] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(true)

  const jwt = localStorage.getItem('jwt');

  useEffect(() => {
    const getCount = async () => {
      try {
        const response = await axiosClient.get('/users/admin/count', {
          headers: {
            Authorization: `Bearer ${jwt}`
          }
        });
        setAdmins(response.data.count);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
    getCount();
    }, []);

  if (loading) return <p className="text-2xl">...</p>

  return (
    <p className="text-2xl">{admins}</p>
  )
}

export default Admins
