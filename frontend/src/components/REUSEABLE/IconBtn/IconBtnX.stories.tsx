import { MouseEvent } from 'react';

import { ExpandIconBtn } from './IconBtn';
import { XIconBtn } from './IconBtn';

const story = { component: XIconBtn, title: 'REUSEABLE/XIconBtn' };

export const xIconBtn = () => (
  <XIconBtn name={'name'} onClick={(e: MouseEvent<HTMLButtonElement>) => {}} />
);

export const expandIconBtn = () => <ExpandIconBtn name={'name'} />;

export default story;
