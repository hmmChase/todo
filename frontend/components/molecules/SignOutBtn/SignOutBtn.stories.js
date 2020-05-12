import { action } from '@storybook/addon-actions';
import allCombos from '../../../.storybook/allCombos';
import SignOutBtn from './SignOutBtn';

export default { title: 'Components|Molecules', component: SignOutBtn };

const data = {
  // id: ['1']
};

const actions = {
  onClick: action('onClick'),
};

export const signOutBtn = () => allCombos(SignOutBtn, data, actions);
