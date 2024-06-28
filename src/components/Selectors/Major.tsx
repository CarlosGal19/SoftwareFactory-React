import{ FC, useEffect, useState, FormEvent } from 'react'
import axiosClient from '../../config/axios'
import useMajor from '../../hooks/useMajor'

interface Majors {
    id: number
    name: string
    description: string
}

const Major: FC = () => {

    const {major} = useMajor();
    const [majors, setMajors] = useState<Majors[]>([])

    useEffect(() => {
        async function fetchMajors(){
            try {
                const response = await axiosClient.get('/majors')
                setMajors(response.data.majors)
            } catch (error: any) {
                setMajors([])
            }
        }
        fetchMajors();
    }, [])

    const handleChange = (e: FormEvent) => {
        console.log(e.target)
    }

  return (
    <>
        <select name="major" id="major">
            {
                !majors.length ? <option value={major} onChange={handleChange}>No majors</option> : majors.map(major => (
                    <option key={major.id} value={major.id}>{major.name}</option>
                ))
            }
        </select>
    </>
  )
}

export default Major
