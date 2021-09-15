const Field = props => {
  const { name, label, type, autoComplete, required, defaultValue } = props;

  return (
    <div>
      <label id={[name, 'label'].join('-')} htmlFor={[name, 'input'].join('-')}>
        {label} {required ? <span title='Required'>*</span> : undefined}
      </label>

      <br />

      <input
        autoComplete={autoComplete}
        id={[name, 'input'].join('-')}
        name={name}
        required={required}
        type={type}
        defaultValue={defaultValue}
      />
    </div>
  );
};

export default Field;
