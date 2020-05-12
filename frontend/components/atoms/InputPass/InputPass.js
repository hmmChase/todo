import React from 'react';
import PropTypes from 'prop-types';
import * as sc from './InputPass.style';

const InputPass = (props) => (
  <sc.Inputt
    id={props.id}
    name={props.name}
    type={props.type}
    value={props.value}
    onChange={props.onChange}
    onBlur={props.onBlur}
    onPressEnter={props.onPressEnter}
  />
);

InputPass.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onPressEnter: PropTypes.func,
  type: PropTypes.string,
  value: PropTypes.string,
};

export default React.memo(InputPass);
