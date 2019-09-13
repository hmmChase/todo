/* eslint-disable react/no-unused-prop-types */
import PropTypes from 'prop-types';

import RequestReset from '../RequestReset/RequestReset';
import * as sc from './Modal.style';

const Modal = React.memo(props => {
  const showModal = () => {
    switch (props.modal) {
      case 'requestReset':
        return <RequestReset close={() => props.setModal('')} />;

      default:
        return null;
    }
  };

  return (
    <sc.Modal>
      <sc.Outer onClick={() => props.setModal('')} />

      <sc.Inner>{showModal()}</sc.Inner>
    </sc.Modal>
  );
});

Modal.propTypes = {
  modal: PropTypes.string.isRequired,
  setModal: PropTypes.func.isRequired
};

export default Modal;
