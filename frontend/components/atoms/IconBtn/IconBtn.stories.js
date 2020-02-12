import allCombos from '../../../.storybook/allCombos';
import { action } from '@storybook/addon-actions';

import IconBtn from './IconBtn';

export default { title: 'IconBtn', component: IconBtn };

const data = {
  type: ['close-square', 'up-square']
};

const actions = {
  onClick: action('click')
};

export const all = () => allCombos(IconBtn, data, actions);
