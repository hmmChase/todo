import { action } from '@storybook/addon-actions';
import allCombos from '../../../.storybook/allCombos';
import IconBtn from './IconBtn';

export default { title: 'Atoms', component: IconBtn };

const data = {
  type: ['close-square', 'up-square']
};

const actions = {
  onClick: action('click')
};

export const iconBtn = () => allCombos(IconBtn, data, actions);
