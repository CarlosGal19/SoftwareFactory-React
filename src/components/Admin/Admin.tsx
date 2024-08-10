import { FC } from "react"
import { UserType } from "../../Types/Types"

const Admin: FC<{admin: UserType}> = ({admin}) => {
  return (
    <div className="w-2/3 mx-auto border-2 border-gray-100 mt-6 rounded-2xl flex justify-evenly shadow-lg">
        <div className="flex justify-center items-center">
            <img src={admin.profile_photo} alt="Profile photo" className="rounded-full w-28" />
        </div>
        <div>
            <p className="text-2xl font-semibold">{admin.user_name}</p>
            <p className="text-xl font-semibold">{admin.name}</p>
            <p className="text-lg font-semibold">{admin.email}</p>
        </div>
    </div>
  )
}

export default Admin
