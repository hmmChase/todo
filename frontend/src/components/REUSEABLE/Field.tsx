import { FC } from 'react';

interface Props {
  label?: string;
  name: string;
  required?: boolean;
  type: string;
}

const Field: FC<Props> = props => {
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

export default Field;
