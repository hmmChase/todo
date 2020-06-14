import allCombos from '../../../.storybook/allCombos';
import FormInput from './FormInput';

export default { title: 'Components|Atoms', component: FormInput };

const data = { value: 'somepass' };

export const formInput = () => allCombos(FormInput, data);
