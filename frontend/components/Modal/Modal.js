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
    <sc.divModal>
      <sc.divOuter onClick={() => props.setModal('')} />

      <sc.divInner>{showModal()}</sc.divInner>
    </sc.divModal>
  );
});

Modal.propTypes = {
  modal: PropTypes.string.isRequired,
  setModal: PropTypes.func.isRequired
};

export default Modal;
