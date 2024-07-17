import axiosClient from "../../config/axios";
import { useEffect, useState, FC } from "react";

interface MajorProps {
  id: number;
}

type Major = {
    name: string;
    description: string;
}

const Major: FC<MajorProps> = ({ id }) => {
  const [majors, setMajors] = useState({} as Major);
  const jwt = localStorage.getItem('jwt');

  useEffect(() => {
    const fetchMajors = async () => {
      try {
        const response = await axiosClient.get(`majors/${id}`, {
          headers: {
            Authorization: `Bearer ${jwt}`
          }
        });
        setMajors(response.data.major);
        console.log(response.data.major);
      } catch (error: any) {
        console.error('Error:', error.response?.data || error.message);
      }
    };
    fetchMajors();
  }, [jwt, id]);

  return (
        <div>
            <h2 className="text-2xl my-4">{majors.name} : <span className="text-xl">{majors.description}</span></h2>
        </div>
  );
};

export default Major;
