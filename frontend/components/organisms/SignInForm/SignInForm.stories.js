// import { action } from '@storybook/addon-actions';
import allCombos from '../../../.storybook/allCombos';
import SignInForm from './SignInForm';

export default { title: 'Components|Organisms', component: SignInForm };

const data = {
  // id: ['1']
};

// const actions = {
//   onClick: action('onClick')
// };

export const signInForm = () => allCombos(SignInForm, data);
