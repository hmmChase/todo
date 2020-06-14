import allCombos from '../../../.storybook/allCombos';
import InputPass from './InputPass';

export default { title: 'Components|Atoms', component: InputPass };

const data = {
  value: 'somepass',
};

export const inputPass = () => allCombos(InputPass, data);
