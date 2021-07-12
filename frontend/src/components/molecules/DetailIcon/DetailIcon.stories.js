import allCombos from '../../../.storybook/allCombos';
import DetailIcon from './DetailIcon';

export default { title: 'Components|Molecules', component: DetailIcon };

const data = {
  id: '1'
};

export const detailIcon = () => allCombos(DetailIcon, data);
