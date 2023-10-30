import type { HTMLInputTypeAttribute } from 'react';

interface Props {
  label?: string;
  name: string;
  required?: boolean;
  type: HTMLInputTypeAttribute;
}

const Field = ({ label, name, required, type }: Props) => (
  <div>
    <label htmlFor={[name, 'input'].join('-')} id={[name, 'label'].join('-')}>
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
