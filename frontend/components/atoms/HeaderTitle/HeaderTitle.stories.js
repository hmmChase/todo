import allCombos from '../../../.storybook/allCombos';
import HeaderTitle from './HeaderTitle';

export default { title: 'Atoms', component: HeaderTitle };

const data = {
  children: 'my title'
};

export const headerTitle = () => allCombos(HeaderTitle, data);
