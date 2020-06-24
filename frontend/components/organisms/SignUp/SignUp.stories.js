// import { action } from '@storybook/addon-actions';
import allCombos from '../../../.storybook/allCombos';
import SignUp from './SignUp';

export default { title: 'Components|Organisms', component: SignUp };

const data = {
  // id: ['1']
};

// const actions = {
//   onClick: action('onClick')
// };

export const signUp = () => allCombos(SignUp, data);
