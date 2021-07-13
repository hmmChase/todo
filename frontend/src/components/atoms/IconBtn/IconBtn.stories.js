import { action } from '@storybook/addon-actions';
import allCombos from '../../../.storybook/allCombos';
import { ExpandIconBtn, XIconBtn } from './IconBtn';

export default { title: 'Components|Atoms/IconBtn' };

const data = {};

const actions = {
  onClick: action('onClick')
};

export const expandIconBtn = () => allCombos(ExpandIconBtn, data);

export const xIconBtn = () => allCombos(XIconBtn, data, actions);
