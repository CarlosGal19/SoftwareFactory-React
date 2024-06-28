import{ FC, useEffect, useState } from 'react'
import axiosClient from '../../config/axios'

interface Majors {
    id: number
    name: string
    description: string
}

const Major: FC = () => {

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

  return (
    <>
        <select name="major" id="major">
            {
                !majors.length ? <option value="">No majors</option> : majors.map(major => (
                    <option key={major.id} value={major.id}>{major.name}</option>
                ))
            }
        </select>
    </>
  )
}

export default Major
