import { action } from '@storybook/addon-actions';
import allCombos from '../../../.storybook/allCombos';
import FormInput from './FormInput';

export default { title: 'Components|Atoms', component: FormInput };

const data = { value: 'somepass' };

const actions = {
  onPressEnter: action('onPressEnter'),
};

export const formInput = () => allCombos(FormInput, data, actions);
