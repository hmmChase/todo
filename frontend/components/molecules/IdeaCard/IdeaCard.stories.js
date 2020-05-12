// import { action } from '@storybook/addon-actions';
import allCombos from '../../../.storybook/allCombos';
import IdeaCard from './IdeaCard';

export default { title: 'Components|Molecules', component: IdeaCard };

const data = {
  id: '1',
  content: 'asdfdsa',
};

// const actions = {
//   onClick: action('onClick')
// };

export const ideaCard = () => allCombos(IdeaCard, data);
