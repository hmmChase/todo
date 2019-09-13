import PropTypes from 'prop-types';

import IdeaCard from '../../containers/IdeaCard/IdeaCard';
import * as sc from './IdeaCardList.style';

const IdeaCardList = React.memo(props => {
  const displayIdeaCards = props.ideas.map(idea => (
    <IdeaCard key={`ideaCard${idea.node.id}`} {...idea.node} />
  ));

  return <sc.IdeaCardList>{displayIdeaCards}</sc.IdeaCardList>;
});

IdeaCardList.propTypes = {
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

export default IdeaCardList;
