// import PropTypes from 'prop-types';

import Modal from '../REUSEABLE/Modal';
import SignUp from './SignUp';

const SignUpModal = props => {
  const { close } = props;

  return (
    <Modal close={close}>
      <SignUp />
    </Modal>
  );
};

// ModalLogin.propTypes = {
//   // myProp: PropTypes.string.isRequired
// };

export default SignUpModal;
