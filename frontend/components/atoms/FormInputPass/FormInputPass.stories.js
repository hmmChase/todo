import allCombos from '../../../.storybook/allCombos';
import FormInputPass from './FormInputPass';

export default { title: 'Components|Atoms', component: FormInputPass };

const data = {
  value: 'somepass'
};

export const formInputPass = () => allCombos(FormInputPass, data);
