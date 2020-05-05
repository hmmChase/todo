import PropTypes from 'prop-types';
import IdeaCard from './IdeaCard';

const IdeaCardList = (props) => {
  const ideaCards = (ideas) =>
    ideas.map((idea) => <IdeaCard key={`ideaCard${idea.node.id}`} {...idea} />);

  // if (props.error) return <p>{props.error}</p>;
  if (props.loading) return <p>loading</p>;

  return (
    <div>
      {props.ideas && props.ideas.length ? (
        <ul>{ideaCards(props.ideas)}</ul>
      ) : (
        <p>Think of something!</p>
      )}
    </div>
  );
};

IdeaCardList.propTypes = {
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
          id: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired,
    }).isRequired
  ).isRequired,
};

export default React.memo(IdeaCardList);
