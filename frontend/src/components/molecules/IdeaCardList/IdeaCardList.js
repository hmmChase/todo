import PropTypes from 'prop-types';
import * as sc from './IdeaCardList.style';

const IdeaCardList = props => {
  const ideaCards = ideas =>
    ideas.map(idea => (
      <sc.IdeaCardd key={`ideaCard${idea.node.id}`} {...idea.node} />
    ));

  return <sc.Ul>{ideaCards(props.ideas)}</sc.Ul>;
};

IdeaCardList.propTypes = {
  className: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  ideas: PropTypes.arrayOf(
    PropTypes.exact({
      __typename: PropTypes.string.isRequired,
      node: PropTypes.exact({
        __typename: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        author: PropTypes.exact({
          __typename: PropTypes.string.isRequired,
          id: PropTypes.string.isRequired
        }).isRequired
      }).isRequired
    }).isRequired
  ).isRequired
};

export default React.memo(IdeaCardList);
