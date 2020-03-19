// import { action } from '@storybook/addon-actions';
import allCombos from '../../../.storybook/allCombos';
import SignOn from './SignOn';

export default { title: 'Components|Organisms', component: SignOn };

const data = {
  // id: ['1']
};

// const actions = {
//   onClick: action('onClick')
// };

export const signOn = () => allCombos(SignOn, data);
