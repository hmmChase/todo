import PropTypes from 'prop-types';

const LoadMoreBtn = (props) => {
  const onClick = () =>
    props.fetchMore({
      variables: { after: props.ideas.pageInfo.endCursor },

      updateQuery: (previousResult, { fetchMoreResult }) => {
        const moreEdges = fetchMoreResult.currentUserPaginatedIdeas.edges;
        const nextPageInfo = fetchMoreResult.currentUserPaginatedIdeas.pageInfo;

        return moreEdges.length
          ? {
              ...previousResult,
              currentUserPaginatedIdeas: {
                ...previousResult.currentUserPaginatedIdeas,
                edges: [
                  ...previousResult.currentUserPaginatedIdeas.edges,
                  ...moreEdges,
                ],
                pageInfo: nextPageInfo,
              },
            }
          : previousResult;
      },
    });

  return (
    <button aria-label='load more' onClick={onClick}>
      Load More
    </button>
  );
};

LoadMoreBtn.propTypes = {
  loading: PropTypes.bool.isRequired,
  fetchMore: PropTypes.func.isRequired,
  ideas: PropTypes.exact({
    __typename: PropTypes.string.isRequired,
    edges: PropTypes.arrayOf(
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
    pageInfo: PropTypes.exact({
      __typename: PropTypes.string.isRequired,
      endCursor: PropTypes.string.isRequired,
      hasNextPage: PropTypes.bool.isRequired,
    }).isRequired,
  }).isRequired,
};

export default React.memo(LoadMoreBtn);
