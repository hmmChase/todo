import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
// import * as sc from './PopupModal.style';

const PopupModal = props => {
  return (
    <Modal
      title={props.title}
      visible={props.visible}
      width={props.width}
      onCancel={props.onCancel}
      footer={props.footer}
    >
      {props.children}
    </Modal>
  );
};

PopupModal.propTypes = {
  children: PropTypes.element,
  footer: PropTypes.element,
  onCancel: PropTypes.func.isRequired,
  title: PropTypes.string,
  visible: PropTypes.bool,
  width: PropTypes.string
};

export default React.memo(PopupModal);
