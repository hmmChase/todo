import { useState } from 'react';
import Modal from './Modal';

const ForgotPassDialog = () => {
  const [modal, setModal] = useState('');

  return (
    <>
      <a
        className='forgotPassDialog'
        value='Forgot password?'
        onClick={() => setModal('requestReset')}
      >
        Forgot password?
      </a>

      {modal && (
        <Modal modal={modal} setModal={(modalName) => setModal(modalName)} />
      )}
    </>
  );
};

export default ForgotPassDialog;
