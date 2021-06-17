import { action } from '@storybook/addon-actions';
import allCombos from '../../../.storybook/allCombos';
import BackBtn from './BackBtn';

export default { title: 'Components|Molecules', component: BackBtn };

const data = {};

const actions = {
  onClick: action('onClick')
};

export const backBtn = () => allCombos(BackBtn, data, actions);
