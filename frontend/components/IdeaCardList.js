import PropTypes from 'prop-types';
import IdeaCard from './IdeaCard';

const IdeaCardList = (props) => {
  const displayIdeaCards = (ideas) =>
    ideas.map((idea) => <IdeaCard key={`ideaCard${idea.node.id}`} {...idea} />);

  // if (props.error) return <p>{props.error}</p>;
  if (props.loading) return <p>loading</p>;

  return (
    <div>
      {props.ideas && props.ideas.length ? (
        <ul>{displayIdeaCards(props.ideas)}</ul>
      ) : (
        <p>Think of something!</p>
      )}
    </div>
  );
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
        }),
      }),
    })
  ),
  loading: PropTypes.bool.isRequired,
};

export default React.memo(IdeaCardList);
