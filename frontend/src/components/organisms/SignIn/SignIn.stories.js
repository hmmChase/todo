// import { action } from '@storybook/addon-actions';
import allCombos from '../../../.storybook/allCombos';
import SignIn from './SignIn';

export default { title: 'Components|Organisms', component: SignIn };

const data = {
  // id: ['1']
};

// const actions = {
//   onClick: action('onClick')
// };

export const signIn = () => allCombos(SignIn, data);
