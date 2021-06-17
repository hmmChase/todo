// import { action } from '@storybook/addon-actions';
import allCombos from '../../../.storybook/allCombos';
import ResetPassError from './ResetPassError';

export default { title: 'Components|Molecules', component: ResetPassError };

const data = {
  isTokenPresent: [false, true],
  isTokenExpired: [false, true]
};

// const actions = {
//   onClick: action('onClick')
// };

export const resetPassError = () => allCombos(ResetPassError, data);
