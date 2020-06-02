import PropTypes from 'prop-types';
import * as sc from './TextArea.style';

const TextArea = (props) => (
  <sc.InputTextArea
    className={props.className}
    autoSize={props.autoSize}
    // name={props.name}
    defaultValue={props.defaultValue}
    // type={props.type}
    // placeholder={props.placeholder}
    value={props.value}
    onChange={props.onChange}
  />
);

TextArea.propTypes = {
  className: PropTypes.string,
  autoSize: PropTypes.shape({
    minRows: PropTypes.number.isRequired,
    maxRows: PropTypes.number.isRequired,
  }),
  defaultValue: PropTypes.string,
  // name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  // placeholder: PropTypes.string.isRequired,
  // type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default React.memo(TextArea);
