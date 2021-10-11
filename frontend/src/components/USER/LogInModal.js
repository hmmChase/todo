// import PropTypes from 'prop-types';

import Modal from '../REUSEABLE/Modal';
import LogIn from './LogIn';

const LogInModal = props => {
  const { close } = props;

  return (
    <Modal close={close}>
      <LogIn />
    </Modal>
  );
};

// ModalLogin.propTypes = {
//   // myProp: PropTypes.string.isRequired
// };

export default LogInModal;
