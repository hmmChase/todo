import { action } from '@storybook/addon-actions';
import allCombos from '../../../.storybook/allCombos';
import Button from './Button';

export default { title: 'Atoms', component: Button };

const data = {
  ariaBusy: [false, true],
  ariaLabel: 'mock label',
  children: ['', 'button text'],
  disabled: [false, true],
  htmlType: 'submit',
  type: 'primary'
};

const actions = {
  onClick: action('onClick')
};

export const button = () => allCombos(Button, data, actions);
