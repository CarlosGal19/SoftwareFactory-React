import axiosClient from "../../config/axios"
import { useEffect, useState, FC } from "react"
import Admin from "./Admin"
import { AlertType, UserType } from "../../Types/Types"
import useAuth from '../../hooks/useAuth'
import Alert from "../Static/Alert"

const Admins: FC = () => {

  const { jwt } = useAuth();

  const [admins, setAdmins] = useState<UserType[]>([]);
  const [alert, setAlert] = useState<AlertType>({} as AlertType)

  useEffect(() => {
    async function fectAdmins() {
      try {
        const response = await axiosClient.get('/users/admin/all', {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        })
        setAdmins(response.data.admins);
        setAlert({message: '', type: 'success'})
      } catch (error: any) {
        setAlert({message: error.response.data.message, type:'alert'})
      }
    }
    fectAdmins();
  }, [jwt]);

  if(!admins) return <p>There is no admins yet</p>

  return (
    <div>
      {
        alert.message && <Alert alert={alert} />
      }
      {
        admins.map((admin: UserType) => (
          <Admin key={admin.id} admin={admin} />
        ))
      }
    </div>
  )
}

export default Admins
