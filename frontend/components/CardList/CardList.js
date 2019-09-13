import PropTypes from 'prop-types';

import IdeaCard from '../../containers/IdeaCard/IdeaCard';
import * as sc from './CardList.style';

const CardList = React.memo(props => {
  console.log('TCL: props', props);
  const displayIdeaCards = props.ideas.map(idea => (
    <IdeaCard key={`ideaCard${idea.node.id}`} {...idea.node} />
  ));

  return <sc.CardList>{displayIdeaCards}</sc.CardList>;
});

CardList.propTypes = {
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

export default CardList;
