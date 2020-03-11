import React from 'react';
import PropTypes from 'prop-types';
import * as sc from './PopupModal.style';

const PopupModal = props => (
  <sc.AntModal
    className={props.className}
    title={props.title}
    visible={props.visible}
    width={props.width}
    onCancel={props.onCancel}
    footer={props.footer}
  >
    {props.children}
  </sc.AntModal>
);

PopupModal.propTypes = {
  children: PropTypes.element,
  className: PropTypes.string,
  footer: PropTypes.element,
  onCancel: PropTypes.func.isRequired,
  title: PropTypes.string,
  visible: PropTypes.bool,
  width: PropTypes.string
};

export default React.memo(PopupModal);
