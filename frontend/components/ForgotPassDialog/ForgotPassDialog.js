import { useState } from 'react';

import RequestReset from '../RequestReset/RequestReset';
import * as sc from './ForgotPassDialog.style';

const ForgotPassDialog = () => {
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);

  const handleCancel = () => setVisible(false);

  return (
    <sc.ForgotPassDialog>
      <sc.ModalLink onClick={showModal}>Forgot password?</sc.ModalLink>

      <sc.ForgotPassModal
        title="Request a password reset"
        visible={visible}
        width="364px"
        onCancel={handleCancel}
        footer={null}
      >
        <RequestReset />
      </sc.ForgotPassModal>
    </sc.ForgotPassDialog>
  );
};

export default ForgotPassDialog;
