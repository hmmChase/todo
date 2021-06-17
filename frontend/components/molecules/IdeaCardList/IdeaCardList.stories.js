import allCombos from '../../../.storybook/allCombos';
import IdeaCardList from './IdeaCardList';

export default { title: 'Components|Molecules', component: IdeaCardList };

const data = {
  loading: [false, true],
  ideas: [
    [],
    [
      { node: { id: '1', content: 'a', author: { id: '1' } } },
      { node: { id: '2', content: 'b', author: { id: '2' } } },
      { node: { id: '3', content: 'c', author: { id: '3' } } },
      { node: { id: '4', content: 'd', author: { id: '4' } } },
      { node: { id: '5', content: 'e', author: { id: '5' } } }
    ]
  ]
};

export const ideaCardList = () => allCombos(IdeaCardList, data);
