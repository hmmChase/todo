import { action } from '@storybook/addon-actions';
import allCombos from '../../../.storybook/allCombos';
import Button from './Button';

export default { title: 'Components|Atoms', component: Button };

const data = {
  children: [null, 'button text'],
  disabled: [false, true],
  htmlType: [null, 'submit'],
  loading: [false, true],
  type: ['default', 'primary', 'dashed', 'link']
};

const actions = {
  onClick: action('onClick')
};

export const button = () => allCombos(Button, data, actions);
