import { FC, useState, useEffect } from 'react'
import { AlertType } from '../../Types/Types';

const Alert: FC<{alert: AlertType}> = ({alert}) => {

  const [visible, setVisible] = useState<boolean>(true);

  useEffect(()=> {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if(!visible) return null;

  return (
    <div className={`${alert.type === 'alert' ? 'bg-red-600' : 'bg-green-600'} py-4 rounded-3xl px-4 my-4`}>
        <p className="text-2xl font-bold">{alert.message}</p>
    </div>
  )
}

export default Alert
