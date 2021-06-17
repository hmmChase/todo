// import { action } from '@storybook/addon-actions';
import allCombos from '../../../.storybook/allCombos';
import IdeaDetail from './IdeaDetail';

export default { title: 'Components|Organisms', component: IdeaDetail };

const data1 = {
  ideaId: '1'
};

// const actions = {
//   onChange: action('onChange')
// };

export const ideaDetail = () => allCombos(IdeaDetail, data1);
