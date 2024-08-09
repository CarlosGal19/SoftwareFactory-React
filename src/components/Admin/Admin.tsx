import { FC } from "react"

type User = {
    id: number,
    name: string
  }

const Admin: FC<{admin: User}> = ({admin}) => {
  return (
    <div>
        {
            admin.name
        }
    </div>
  )
}

export default Admin
