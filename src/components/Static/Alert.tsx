import React, { useEffect, useState } from 'react';

interface AlertProps {
  type: string;
  msg: string;
}

const Alert: React.FC<AlertProps> = ({ type, msg }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Ocultar la alerta después de 3 segundos
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);

    // Limpiar el temporizador si el componente se desmonta antes de que termine
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`${type === 'alert' ? 'bg-red-600' : 'bg-indigo-600'} text-center block text-white font-bold text-xl rounded-2xl py-5 my-8`}
      role="alert"
    >
      {msg}
    </div>
  );
};

export default Alert;
