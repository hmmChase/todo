import PropTypes from 'prop-types';
import * as sc from './TextArea.style';

const TextArea = props => (
  <sc.InputTextArea
    aria-label={props['aria-label']}
    data-testid={props['data-testid']}
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
  'aria-label': PropTypes.string,
  'data-testid': PropTypes.string,
  className: PropTypes.string,
  autoSize: PropTypes.exact({
    minRows: PropTypes.number.isRequired,
    maxRows: PropTypes.number.isRequired
  }),
  defaultValue: PropTypes.string,
  // name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  // placeholder: PropTypes.string.isRequired,
  // type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
};

export default React.memo(TextArea);
