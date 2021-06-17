// import { action } from '@storybook/addon-actions';
import allCombos from '../../../.storybook/allCombos';
import Ideas from './Ideas';

export default { title: 'Components|Organisms', component: Ideas };

const data = {
  ideas: [
    [
      { id: '1', content: 'a', author: { id: '1' } },
      { id: '2', content: 'b', author: { id: '2' } },
      { id: '3', content: 'c', author: { id: '3' } },
      { id: '4', content: 'd', author: { id: '4' } },
      { id: '5', content: 'e', author: { id: '5' } }
    ]
  ]
};

export const ideas = () => allCombos(Ideas, data);
