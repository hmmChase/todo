import PropTypes from 'prop-types';

import IdeaCard from '../IdeaCard/IdeaCard';
import * as sc from './IdeaCardList.style';

const IdeaCardList = props => (
  <sc.IdeaCardList
    loading={props.loading}
    dataSource={props.ideas}
    rowKey={idea => `ideaCard${idea.node.id}`}
    renderItem={idea => <IdeaCard {...idea.node} />}
  />
);

IdeaCardList.propTypes = {
  loading: PropTypes.bool.isRequired,
  ideas: PropTypes.arrayOf(
    PropTypes.shape({
      node: PropTypes.shape({
        id: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        author: PropTypes.shape({
          id: PropTypes.string.isRequired
        }).isRequired
      }).isRequired
    }).isRequired
  ).isRequired
};

export default React.memo(IdeaCardList);
