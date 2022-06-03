import { MouseEvent } from 'react';

import { XIconBtn } from './IconBtn';

const story = { component: XIconBtn, title: 'REUSEABLE/XIconBtn' };

export const xIconBtn = () => (
  <XIconBtn
    name={'name'}
    onClick={function (event: MouseEvent<HTMLButtonElement, MouseEvent>): void {
      throw new Error('Function not implemented.');
    }}
  />
);

export default story;
