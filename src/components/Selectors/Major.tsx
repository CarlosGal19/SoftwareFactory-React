import { FC, useEffect, useState, FormEvent } from 'react';
import axiosClient from '../../config/axios';
import { AlertType, MajorType } from '../../Types/Types';
import Alert from '../Static/Alert';

const Major: FC<{major: number, setMajor: (major: number) => void}> = ({major, setMajor}) => {

    const [majors, setMajors] = useState<MajorType[]>([]);
    const [alert, setAlert] = useState<AlertType>({} as AlertType);

    useEffect(() => {
        async function fetchMajors() {
            try {
                const response = await axiosClient.get('/majors');
                setMajors(response.data.majors);
                setAlert({message: response.data.message, type: 'success'})
            } catch (error: any) {
                setMajors([]);
                setAlert({message: error.response.data.message, type:'alert'})
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
                alert.message && <Alert alert={alert} />
            }
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
