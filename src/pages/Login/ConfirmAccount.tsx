import { useParams, Link } from "react-router-dom";
import { useEffect, useState, useRef, FC } from "react";
import axiosClient from "../../config/axios";
import Alert from "../../components/Static/Alert";

interface AlertType {
  type: string;
  msg: string;
}

const ConfirmAccount: FC = () => {
  const [alert, setAlert] = useState<AlertType>({ type: '', msg: '' });
  const [loading, setLoading] = useState(true);
  const [confirm, setConfirm] = useState(false);
  const { id } = useParams<{ id: string }>();

  const hasFetched = useRef(false);

  useEffect(() => {
    const checkToken = async () => {
      if (hasFetched.current) {
        return;
      }
      hasFetched.current = true;
      try {
        const response = await axiosClient.get(`/users/confirm/${id}`);
        if (response.status === 200) {
          setConfirm(true);
          setAlert({
            type: 'success',
            msg: response.data.message,
          });
        }
      } catch (error: any) {
        setAlert({
          type: 'alert',
          msg: error.response?.data?.message || 'An error occurred',
        });
      } finally {
        setLoading(false);
      }
    };
    checkToken();
  }, [id]);

  return (
    <>
      <div className="shadow-lg px-5 py-10 rounded-xl bg-white">
        <div className='flex justify-center mb-6'>
          <img src="./utma.png" alt="UTMA LOGO" />
        </div>
        <div className='mt-20 md:mt-5 px-5 py-10 rounded-xl bg-white'>
          {!loading && <Alert type={alert.type} msg={alert.msg} />}
          {confirm && (
            <>
              <nav className='mt-10 text-center'>
                <Link to="/" className="text-indigo-500 hover:text-indigo-900">Login</Link>
              </nav>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ConfirmAccount;
