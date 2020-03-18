import Header from './Header';
import allCombos from '../../../.storybook/allCombos';

export default { title: 'Organisms', component: Header };

const data = {
  ideaId: [null, '43kljkl4243ltsda98'],
  children: [null, <div key={1}>lkasdjglksdajglk;s;ajgls</div>]
};

export const header = allCombos(Header, data);
