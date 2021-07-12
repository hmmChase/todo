import allCombos from '../../../.storybook/allCombos';
import Input from './Input';

export default { title: 'Components|Atoms', component: Input };

const data = {
  value: 'some text'
};

export const input = () => allCombos(Input, data);
