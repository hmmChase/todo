import allCombos from '../../.storybook/allCombos';
import DeleteIcon from './DeleteIcon';

export default { title: 'DeleteIcon', component: DeleteIcon };

const props = {
  // id: ['1']
};

export const all = () => allCombos(DeleteIcon, props);
