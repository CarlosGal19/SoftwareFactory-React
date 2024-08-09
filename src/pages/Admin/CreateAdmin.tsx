import { FC } from "react"
import Admins from "../../components/Admin/Admins";
import FormAdmin from "../../components/Admin/FormAdmin";

const CreateAdmin: FC = () => {

  return (
    <>
    <div className="p-6 w-full">
      <h1 className="text-3xl font-bold mb-6">Manage Admins</h1>
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Admins: </h2>
        <Admins />
      </div>
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Create admin: </h2>
        <FormAdmin />
      </div>
    </div>
    </>

  )
}

export default CreateAdmin
