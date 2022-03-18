import { FC, HTMLInputTypeAttribute } from 'react';

interface Props {
  label?: string;
  name: string;
  required?: boolean;
  type: HTMLInputTypeAttribute;
}

const Field: FC<Props> = ({ label, name, required, type }) => (
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

export default Field;
