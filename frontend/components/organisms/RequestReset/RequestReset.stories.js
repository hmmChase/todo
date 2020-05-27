// import { action } from '@storybook/addon-actions';
import allCombos from '../../../.storybook/allCombos';
import RequestReset from './RequestReset';

export default { title: 'Components|Organisms', component: RequestReset };

const data = {
  // id: ['1']
};

// const actions = {
//   onClick: action('onClick')
// };

export const requestReset = () => allCombos(RequestReset, data);
