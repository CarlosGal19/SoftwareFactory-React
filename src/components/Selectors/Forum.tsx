import { FC, useEffect, useState, FormEvent } from 'react';
import axiosClient from '../../config/axios';
import { ForumType } from '../../Types/Types';

const Forum: FC<{ setForum: (forum: number) => void, forum: number }> = ({ setForum, forum }) => {

    const [forums, setForums] = useState<ForumType[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const jwt = localStorage.getItem('jwt');

    useEffect(() => {
        async function fetchMajors() {
            try {
                const response = await axiosClient.get('/forums', {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    }
                });
                setForums(response.data);
            } catch (error: any) {
                setForums([]);
            } finally {
                setLoading(false);
            }
        }
        fetchMajors();
    }, [jwt]);

    const handleChange = (e: FormEvent<HTMLSelectElement>) => {
        const value = parseInt(e.currentTarget.value);
        setForum(value);
    }

    if (loading) return <p>Loading...</p>;

    return (
        <>
            <select name="forum" id="forum" value={forum} onChange={handleChange}>
                {
                    !forums.length ? (
                        <option value="">No forums</option>
                    ) : (
                        <>
                            <option value="">Choose a forum</option>
                            {forums.map(forum => (
                                <option key={forum.id} value={forum.id}>{forum.name}</option>
                            ))}
                        </>
                    )
                }
            </select>
        </>
    );
}

export default Forum;
