import { action } from '@storybook/addon-actions';
import allCombos from '../../../.storybook/allCombos';
import DeleteIcon from './DeleteIcon';

export default { title: 'Components|Molecules', component: DeleteIcon };

const data = {
  id: '1',
};

const actions = {
  onClick: action('onClick'),
};

export const deleteIcon = () => allCombos(DeleteIcon, data, actions);
