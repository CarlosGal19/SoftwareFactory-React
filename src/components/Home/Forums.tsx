import { FC, useEffect, useState } from 'react';
import Alert from '../Static/Alert';
import axiosClient from '../../config/axios';
import Forum from './Forum';
import { ForumType } from '../../Types/Types';
import useAuth from "../../hooks/useAuth";

const Forums: FC = () => {

    const [alert, setAlert] = useState({ msg: '', type: '' });
    const [forums, setForums] = useState<ForumType[]>([]);

    const { jwt } = useAuth();

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
            <div className='mt-16 w-full md:w-1/6 bg-sky-800 shadow-lg p-6 overflow-y-auto'>
                <h2 className='text-center text-3xl font-bold text-slate-300 mb-6'>Forums</h2>
                <ul className='space-y-4'>
                    {forums.map(forum => (
                        <Forum key={forum.id} forum={forum} />
                    ))}
                </ul>
            </div>
        </>
    );

}

export default Forums;
