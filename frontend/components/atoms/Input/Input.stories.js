import { action } from '@storybook/addon-actions';
import allCombos from '../../../.storybook/allCombos';
import Input from './Input';

export default { title: 'Components|Atoms', component: Input };

const data = { value: 'some text' };

const actions = {
  onPressEnter: action('onPressEnter')
};

export const input = () => allCombos(Input, data, actions);
