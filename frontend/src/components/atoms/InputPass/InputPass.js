import PropTypes from 'prop-types';

const InputPass = props => (
  <input
    aria-label={props['aria-label']}
    data-testid={props['data-testid']}
    className={props.className}
    id={props.id}
    name={props.name}
    value={props.value}
    onChange={props.onChange}
    onBlur={props.onBlur}
    visibilityToggle={true}
    type='password'
  />
);

InputPass.propTypes = {
  'aria-label': PropTypes.string,
  'data-testid': PropTypes.string,
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  onBlur: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
};

export default React.memo(InputPass);
