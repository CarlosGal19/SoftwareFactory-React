import { FC, useEffect, useState } from 'react';
import Alert from '../Static/Alert';
import axiosClient from '../../config/axios';
import Forum from './Forum';

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
                setAlert({ msg: '', type: '' });
            } catch (error: any) {
                setAlert({ msg: error.response.data.message || 'An error occurred', type: 'alert' });
            }
        }
        getForums();
    }, [jwt]);

    return (
        <>
            {alert.msg && <Alert msg={alert.msg} type={alert.type} />}
            <div className='mt-16 w-1/6 hidden md:block bg-teal-500'>
                <h2 className='text-5xl font-bold text-center mt-4'>Forums</h2>
                {
                    forums.map(forum => (
                        <Forum key={forum.id} forum={forum} />
                    ))
                }
            </div>
        </>
    )
}

export default Forums;
