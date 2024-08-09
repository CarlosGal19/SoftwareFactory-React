import axiosClient from "../../config/axios"
import { useEffect, useState, FC } from "react"
import Admin from "./Admin"

type User = {
  id: number,
  name: string
}

const Admins: FC = () => {

  const jwt = localStorage.getItem('jwt');

  const [admins, setAdmins] = useState<User[]>([]);

  useEffect(() => {
    async function fectAdmins() {
      try {
        const response = await axiosClient.get('/users/admin/all', {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        })
        setAdmins(response.data.admins);
      } catch (error) {
        console.log(error)
      }
    }
    fectAdmins();
  }, [jwt]);

  if(!admins) return <p>There is no admins yet</p>

  return (
    <div>
      {
        admins.map((admin: User) => (
          <Admin key={admin.id} admin={admin} />
        ))
      }
    </div>
  )
}

export default Admins
