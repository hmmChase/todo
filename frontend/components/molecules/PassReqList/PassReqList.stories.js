// import { action } from '@storybook/addon-actions';
import allCombos from '../../../.storybook/allCombos';
import PassReqList from './PassReqList';

export default { title: 'Components|Molecules', component: PassReqList };

const data = {};

// const actions = {
//   onClick: action('onClick')
// };

export const passReqList = () => allCombos(PassReqList, data);
