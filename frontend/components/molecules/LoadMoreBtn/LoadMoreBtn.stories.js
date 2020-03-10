import { action } from '@storybook/addon-actions';
import allCombos from '../../../.storybook/allCombos';
import LoadMoreBtn from './LoadMoreBtn';

export default { title: 'Molecules', component: LoadMoreBtn };

const data = {
  ariaLabel: 'load more button',
  loading: [false, true],
  fetchMore: () => '',
  ideas: {
    edges: [
      { node: { id: '1', content: 'a', author: { id: '1' } } },
      { node: { id: '2', content: 'b', author: { id: '2' } } },
      { node: { id: '3', content: 'c', author: { id: '3' } } },
      { node: { id: '4', content: 'd', author: { id: '4' } } },
      { node: { id: '5', content: 'e', author: { id: '5' } } }
    ],
    pageInfo: { endCursor: '87cvybx', hasNextPage: true }
  },
  type: 'primary'
};

const actions = {
  onClick: action('onClick')
};

export const loadMoreBtn = () => allCombos(LoadMoreBtn, data, actions);
