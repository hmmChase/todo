// import { action } from '@storybook/addon-actions';
import allCombos from '../../../.storybook/allCombos';
import InputPass from './InputPass';

export default { title: 'Components|Atoms', component: InputPass };

const data = { value: 'somepass' };

const actions = {
  // onPressEnter: action('onPressEnter'),
};

export const inputPass = () => allCombos(InputPass, data, actions);
