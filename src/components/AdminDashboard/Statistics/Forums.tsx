import { FC, useEffect, useState } from "react";
import axiosClient from "../../../config/axios";
import useAuth from '../../../hooks/useAuth'

const Forums: FC = () => {

  const [forums, setForums] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  const { jwt } = useAuth();

  useEffect(() => {
    const getCount = async () => {
      try {
        const response = await axiosClient.get('/forums/count', {
          headers: {
            Authorization: `Bearer ${jwt}`
          }
        });
        setForums(response.data.count);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    getCount();
  }, [])

  if (loading) return <p className="text-2xl">...</p>

  return (
    <p className="text-2xl">{forums}</p>
  )
}

export default Forums
