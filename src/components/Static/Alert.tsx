interface AlertProps {
  type: string;
  msg: string;
}

const Alert: React.FC<AlertProps> = ({ type, msg }) => {
  return (
    <div className={`${type === 'alert' ? 'bg-red-600' : 'bg-indigo-600'} alert alert-danger text-center block text-white font-bold text-xl rounded-2xl py-5 my-8`} role="alert">
      {msg}
    </div>
  );
};

export default Alert;
