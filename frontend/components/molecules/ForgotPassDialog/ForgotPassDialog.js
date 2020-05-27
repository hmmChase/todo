import { useState } from 'react';
import PopupModal from '../../atoms/PopupModal/PopupModal';
import RequestReset from '../../organisms/RequestReset/RequestReset';
import * as sc from './ForgotPassDialog.style';

const ForgotPassDialog = () => {
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);

  const handleCancel = () => setVisible(false);

  return (
    <>
      <sc.ModalLink onClick={showModal}>Forgot password?</sc.ModalLink>

      <PopupModal
        title='Request a password reset'
        visible={visible}
        width='20rem'
        onCancel={handleCancel}
        footer={null}
      >
        <RequestReset />
      </PopupModal>
    </>
  );
};

export default ForgotPassDialog;
