import { FC, useEffect, useState } from "react"
import axiosClient from "../../../config/axios";

const Topics: FC = () => {

  const [topics, setTopics] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  const jwt = localStorage.getItem('jwt');

  useEffect(() => {
    const getCount = async () => {
      try {
        const response = await axiosClient.get('/topics/count/all', {
          headers: {
            Authorization: `Bearer ${jwt}`
          }
        });
        setTopics(response.data.count);
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
    <p className="text-2xl">{topics}</p>
  )
}

export default Topics
