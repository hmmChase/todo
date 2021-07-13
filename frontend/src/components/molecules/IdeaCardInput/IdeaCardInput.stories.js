import { action } from '@storybook/addon-actions';
import allCombos from '../../../.storybook/allCombos';
import IdeaCardInput from './IdeaCardInput';

export default { title: 'Components|Molecules', component: IdeaCardInput };

const data = {
  id: '1',
  content: 'something'
};

const actions = {
  onChange: action('onChange')
};

export const ideaCardInput = () => allCombos(IdeaCardInput, data, actions);
