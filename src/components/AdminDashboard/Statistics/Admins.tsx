import { FC, useEffect, useState } from 'react'
import axiosClient from '../../../config/axios'
import useAuth from '../../../hooks/useAuth'
import { AlertType } from '../../../Types/Types'
import Alert from '../../Static/Alert'

const Admins: FC = () => {

  const [admins, setAdmins] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(true)
  const [alert, setAlert] = useState<AlertType>({} as AlertType);

  const { jwt } = useAuth()

  useEffect(() => {
    const getCount = async () => {
      try {
        const response = await axiosClient.get('/users/admin/count', {
          headers: {
            Authorization: `Bearer ${jwt}`
          }
        });
        setAdmins(response.data.count);
        setAlert({message: response.data.message, type: 'success'})
      } catch (error: any) {
        setAlert({message: error.response.data.message, type:'alert'})
      }
      setLoading(false);
    }
    getCount();
    }, []);

  if (loading) return <p className="text-2xl">...</p>

  if(alert.message) return <Alert alert={alert}/>

  return (
    <p className="text-2xl">{admins}</p>
  )
}

export default Admins
