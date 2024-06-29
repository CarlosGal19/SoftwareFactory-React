import { FC, useEffect, useState, FormEvent } from 'react';
import axiosClient from '../../config/axios';
import useMajor from '../../hooks/useMajor';

interface Majors {
    id: number;
    name: string;
    description: string;
}

const Major: FC = () => {
    const { major, setMajor } = useMajor();
    const [majors, setMajors] = useState<Majors[]>([]);

    useEffect(() => {
        async function fetchMajors() {
            try {
                const response = await axiosClient.get('/majors');
                setMajors(response.data.majors);
            } catch (error: any) {
                setMajors([]);
            }
        }
        fetchMajors();
    }, []);

    const handleChange = (e: FormEvent<HTMLSelectElement>) => {
        const value = parseInt(e.currentTarget.value);
        setMajor(value);
    }

    return (
        <>
            <select name="major" id="major" value={major} onChange={handleChange}>
                {
                    !majors.length ? (
                        <option value="">No majors</option>
                    ) : (
                        <>
                            <option value="">Choose a major</option>
                            {majors.map(major => (
                                <option key={major.id} value={major.id}>{major.name}</option>
                            ))}
                        </>
                    )
                }
            </select>
        </>
    );
}

export default Major;
