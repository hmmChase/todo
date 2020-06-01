import PropTypes from 'prop-types';
import IdeaCard from './IdeaCard';

const IdeaCardList = (props) => {
  const ideaCards = (ideas) =>
    ideas.map((idea) => (
      <IdeaCard key={`ideaCard${idea.node.id}`} {...idea.node} />
    ));

  return <ul>{ideaCards(props.ideas)}</ul>;
};

IdeaCardList.propTypes = {
  ideas: PropTypes.arrayOf(
    PropTypes.exact({
      __typename: PropTypes.string.isRequired,
      node: PropTypes.exact({
        __typename: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        author: PropTypes.exact({
          __typename: PropTypes.string.isRequired,
          id: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired,
    }).isRequired
  ).isRequired,
};

export default React.memo(IdeaCardList);
