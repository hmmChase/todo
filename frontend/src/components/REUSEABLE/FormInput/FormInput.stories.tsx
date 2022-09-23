import { ChangeEvent, FocusEvent } from 'react';

import FormInput from './FormInput';

const story = { component: FormInput, title: 'REUSEABLE/FormInput' };

export const formInput = () => (
  <FormInput
    id={'id'}
    name={'name'}
    onBlur={function (event: FocusEvent<HTMLInputElement, Element>): void {
      throw new Error('Function not implemented.');
    }}
    onChange={function (event: ChangeEvent<HTMLInputElement>): void {
      throw new Error('Function not implemented.');
    }}
    type={'number'}
    value={'value'}
  />
);

export default story;
