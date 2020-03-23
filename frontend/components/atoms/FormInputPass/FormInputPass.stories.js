import { action } from '@storybook/addon-actions';
import allCombos from '../../../.storybook/allCombos';
import FormInputPass from './FormInputPass';

export default { title: 'Components|Atoms', component: FormInputPass };

const data = { value: 'somepass' };

const actions = {
  onPressEnter: action('onPressEnter')
};

export const formInputPass = () => allCombos(FormInputPass, data, actions);
