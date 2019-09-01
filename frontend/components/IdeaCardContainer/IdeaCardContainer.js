/* eslint-disable operator-linebreak */
/* eslint-disable no-underscore-dangle */

import { Query } from 'react-apollo';

import DisplayLoading from '../DisplayLoading/DisplayLoading';
import DisplayError from '../DisplayError/DisplayError';
import IdeaCard from '../IdeaCard/IdeaCard';
import { CURRENT_USER_PAGINATED_IDEAS } from '../../graphql/queries';
import { pageSize } from '../../config';
import * as sc from './IdeaCardContainer.style';

const IdeaContainer = React.memo(() => {
  const displayIdeaCards = ideas =>
    ideas.map(idea => (
      <IdeaCard key={`ideaCard${idea.node.id}`} {...idea.node} />
    ));

  const handleError = error => error;

  const handleFetchMore = (fetchMore, data) => {
    fetchMore({
      variables: { after: data.currentUserPaginatedIdeas.pageInfo.endCursor },
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
    <Query
      query={CURRENT_USER_PAGINATED_IDEAS}
      variables={{ first: pageSize }}
      onError={handleError}
    >
      {({ loading, error, data, fetchMore }) => {
        if (loading) return <DisplayLoading />;
        if (error) return <DisplayError error={error} />;

        return (
          <sc.IdeaContainer>
            {data.currentUserPaginatedIdeas &&
            data.currentUserPaginatedIdeas.edges &&
            data.currentUserPaginatedIdeas.edges.length ? (
              <sc.ul>
                {displayIdeaCards(data.currentUserPaginatedIdeas.edges)}
              </sc.ul>
              ) : (
                <p>Add an Idea!</p>
              )}

            {data.currentUserPaginatedIdeas &&
              data.currentUserPaginatedIdeas.pageInfo &&
              data.currentUserPaginatedIdeas.pageInfo.hasNextPage && (
                <sc.loadMoreBtn
                  type="button"
                  onClick={() => handleFetchMore(fetchMore, data)}
                >
                  Load More
                </sc.loadMoreBtn>
            )}
          </sc.IdeaContainer>
        );
      }}
    </Query>
  );
});

export default IdeaContainer;
