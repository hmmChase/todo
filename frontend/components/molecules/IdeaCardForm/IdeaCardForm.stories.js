// import { action } from '@storybook/addon-actions';
import allCombos from '../../../.storybook/allCombos';
import IdeaCardForm from './IdeaCardForm';

export default { title: 'Molecules', component: IdeaCardForm };

const data = {
  // id: ['1']
};

// const actions = {
//   onClick: action('click')
// };

export const ideaCardForm = () => allCombos(IdeaCardForm, data);
