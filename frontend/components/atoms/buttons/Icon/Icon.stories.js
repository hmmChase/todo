import allCombos from '../../../../.storybook/allCombos';
import { action } from '@storybook/addon-actions';

import Icon from './Icon';

export default { title: 'Icon', component: Icon };

const data = {
  type: ['close-square', 'up-square']
};

const actions = {
  onClick: action('click')
};

export const all = () => allCombos(Icon, data, actions);
