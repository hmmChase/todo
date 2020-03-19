import allCombos from '../../../.storybook/allCombos';
import { ExpandIconBtn, LeftIconBtn, XIconBtn } from './IconBtn';

export default { title: 'Components|Atoms/IconBtn' };

const data = {};

export const expandIconBtn = () => allCombos(ExpandIconBtn, data);

export const leftIconBtn = () => allCombos(LeftIconBtn, data);

export const xIconBtn = () => allCombos(XIconBtn, data);
