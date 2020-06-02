import PropTypes from 'prop-types';
import { Modal } from 'antd';

const PopupModal = (props) => (
  <Modal
    className={props.className}
    title={props.title}
    visible={props.visible}
    width={props.width}
    onCancel={props.onCancel}
    footer={props.footer}
  >
    {props.children}
  </Modal>
);

PopupModal.propTypes = {
  className: PropTypes.string,
  children: PropTypes.element.isRequired,
  footer: PropTypes.element,
  onCancel: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  width: PropTypes.string.isRequired,
};

export default React.memo(PopupModal);
