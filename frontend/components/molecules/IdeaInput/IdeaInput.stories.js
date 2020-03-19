import { action } from '@storybook/addon-actions';
import allCombos from '../../../.storybook/allCombos';
import IdeaInput from './IdeaInput';

export default { title: 'Components|Molecules', component: IdeaInput };

const data = {
  id: '1',
  content: 'something'
};

const actions = {
  onChange: action('onChange')
};

export const ideaInput = () => allCombos(IdeaInput, data, actions);
