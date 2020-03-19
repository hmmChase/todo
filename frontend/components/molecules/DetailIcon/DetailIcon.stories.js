// import { action } from '@storybook/addon-actions';
// import allCombos from '../../../.storybook/allCombos';
import DetailIcon from './DetailIcon';

export default { title: 'Components|Molecules', component: DetailIcon };

const data = {
  id: '1'
};

// const actions = {
//   onClick: action('onClick')
// };

// export const detailIcon = () => allCombos(DetailIcon, data, actions);

export const detailIcon = () => <DetailIcon {...data} />;
