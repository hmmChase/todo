import React from 'react';
import PropTypes from 'prop-types';
import * as sc from './TextArea.style';

const TextArea = (props) => (
  <sc.InputTextArea
    className={props.className}
    aria-label={props.ariaLabel}
    autoSize={props.autoSize}
    name={props.name}
    // defaultValue={props.defaultValue}
    type={props.type}
    placeholder={props.placeholder}
    value={props.value}
    onChange={props.onChange}
  />
);

TextArea.propTypes = {
  ariaLabel: PropTypes.string,
  autoSize: PropTypes.object,
  className: PropTypes.string,
  defaultValue: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
};

export default React.memo(TextArea);
