import PropTypes from 'prop-types';

import * as sc from './LoadMoreBtn.style';

const LoadMoreBtn = props => {
  const handleFetchMore = (fetchMore, ideas) => {
    fetchMore({
      variables: { after: ideas.pageInfo.endCursor },
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
                ...moreEdges
              ],
              pageInfo: nextPageInfo
            }
          }
          : previousResult;
      }
    });
  };

  return (
    <sc.LoadMoreBtn
      type="primary"
      loading={props.loading}
      onClick={() => handleFetchMore(props.fetchMore, props.ideas)}
    >
      Load More
    </sc.LoadMoreBtn>
  );
};

LoadMoreBtn.propTypes = {
  loading: PropTypes.bool.isRequired,
  fetchMore: PropTypes.func.isRequired,
  ideas: PropTypes.shape({
    edges: PropTypes.arrayOf(
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
  }).isRequired
};

export default React.memo(LoadMoreBtn);
