import { useParams, Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axiosClient from "../../config/axios";
import Alert from "../../components/Alert";

interface AlertType {
  type: string;
  msg: string;
}

const ConfirmAccount = () => {
  const [alert, setAlert] = useState<AlertType>({ type: '', msg: '' });
  const [loading, setLoading] = useState(true);
  const [confirm, setConfirm] = useState(false);
  const { id } = useParams<{ id: string }>();

  // Ref to track if the checkToken function has already been called
  const hasFetched = useRef(false);

  useEffect(() => {
    const checkToken = async () => {
      if (hasFetched.current) {
        return;
      }
      hasFetched.current = true;
      try {
        const response = await axiosClient.get(`/users/confirm/${id}`);
        console.log('Confirm account response:', response);
        if (response.status === 200) {
          setConfirm(true);
          setAlert({
            type: 'success',
            msg: response.data.message,
          });
        }
      } catch (error: any) {
        console.log('Confirm account error:', error);
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
      <div>
        <h1 className="text-6xl font-bold text-black">
          Confirm your account and watch the newest <span className="text-blue-700">UTMA</span> info
        </h1>
      </div>
      <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
        {!loading && <Alert type={alert.type} msg={alert.msg} />}
        {confirm && (
          <>
            <nav className='mt-10 text-center'>
              <Link to="/" className="text-indigo-500 hover:text-indigo-900">Login</Link>
            </nav>
          </>
        )}
      </div>
    </>
  );
};

export default ConfirmAccount;
