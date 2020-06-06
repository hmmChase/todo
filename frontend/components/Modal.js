import PropTypes from 'prop-types';
import RequestReset from './RequestReset';

const Modal = (props) => {
  const showModal = () => {
    switch (props.modal) {
      case 'requestReset':
        return <RequestReset close={() => props.setModal('')} />;

      default:
        return null;
    }
  };

  return (
    <div className='modal'>
      <div className='outer' onClick={() => props.setModal('')} />

      <div className='inner'>{showModal()}</div>
    </div>
  );
};

Modal.propTypes = {
  modal: PropTypes.string.isRequired,
  setModal: PropTypes.func.isRequired,
};

export default React.memo(Modal);
