import PropTypes from 'prop-types';
import * as sc from './TextArea.style';

const TextArea = props => (
  <sc.InputTextArea
    name={props.name}
    type={props.type}
    placeholder={props.placeholder}
    value={props.value}
    onChange={props.onChange}
  />
);

TextArea.propTypes = {
  name: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string
};

export default React.memo(TextArea);
