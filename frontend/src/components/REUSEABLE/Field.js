import PropTypes from 'prop-types';

const Field = props => {
  const { name, label, required, type } = props;

  return (
    <div>
      <label id={[name, 'label'].join('-')} htmlFor={[name, 'input'].join('-')}>
        {label} {required ? <span title='Required'>*</span> : undefined}
      </label>

      <br />

      <input
        id={[name, 'input'].join('-')}
        name={name}
        required={required}
        type={type}
      />
    </div>
  );
};

Field.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  type: PropTypes.string.isRequired
};

export default Field;
