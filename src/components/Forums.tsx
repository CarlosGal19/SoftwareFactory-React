import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from './Alert';
import axiosClient from '../config/axios';

type Forum = {
    id: number;
    name: string;
    description: string;
    creator_id: number;
    created_at: string;
    updated_at: string;
}

const Forums: FC = () => {

    const [alert, setAlert] = useState({ msg: '', type: '' });
    const [forums, setForums] = useState<Forum[]>([]);
    const navigate = useNavigate();

    const jwt = localStorage.getItem('jwt');

    useEffect(() => {
        const getForums = async () => {
            try {
                const response = await axiosClient.get('forums', {
                    headers: {
                        Authorization: `Bearer ${jwt}`
                    }
                });
                setForums(response.data);
            } catch (error: any) {
                setAlert({ msg: error.response.data.message || 'An error occurred', type: 'alert' });
            }
        }
        getForums();
    }, [jwt]);

    return (
        <>
            {alert.msg && <Alert msg={alert.msg} type={alert.type} />}
            <div className='my-36 w-1/5 ml-6 hidden md:block'>
                <h2 className='text-center font-bold text-4xl'>Forums</h2>
                {
                    forums.map(forum => (
                        <div onClick={()=> {
                            navigate(`/forum/${forum.id}`)
                        }} key={forum.id} className="mt-4 p-4 bg-white shadow-lg rounded-lg text-center hover:shadow-blue-200 hover:cursor-pointer">
                            <h1 className="text-2xl font-bold text-gray-800">{forum.name}</h1>
                            <p className="text-gray-700">{forum.description}</p>
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default Forums;
