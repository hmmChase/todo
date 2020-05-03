import PropTypes from 'prop-types';

const LoadMoreBtn = (props) => {
  const fetchMore = () => {
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
  };

  return (
    <button aria-label='load more button' onClick={fetchMore}>
      Load More
    </button>
  );
};

LoadMoreBtn.propTypes = {
  loading: PropTypes.bool,
  fetchMore: PropTypes.func.isRequired,
  ideas: PropTypes.shape({
    edges: PropTypes.arrayOf(
      PropTypes.shape({
        node: PropTypes.shape({
          id: PropTypes.string.isRequired,
          content: PropTypes.string.isRequired,
          author: PropTypes.shape({ id: PropTypes.string.isRequired })
            .isRequired,
        }).isRequired,
      }).isRequired
    ).isRequired,
    pageInfo: PropTypes.shape({ endCursor: PropTypes.string.isRequired })
      .isRequired,
  }).isRequired,
};

export default React.memo(LoadMoreBtn);
