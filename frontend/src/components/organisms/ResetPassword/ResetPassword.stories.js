// import { action } from '@storybook/addon-actions';
import allCombos from '../../../.storybook/allCombos';
import ResetPassword from './ResetPassword';

export default { title: 'Components|Organisms', component: ResetPassword };

const data = {
  // id: ['1']
};

// const actions = {
//   onClick: action('onClick')
// };

export const resetPassword = () => allCombos(ResetPassword, data);
