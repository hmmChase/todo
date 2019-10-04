import { Query } from 'react-apollo';

// import DisplayLoading from '../DisplayLoading/DisplayLoading';
import DisplayError from '../DisplayError/DisplayError';
import IdeaCardList from '../IdeaCardList/IdeaCardList';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import { CURRENT_USER_PAGINATED_IDEAS } from '../../graphql/queries';
import { pageSize } from '../../constants';
import * as sc from './Ideas.style';

const Ideas = React.memo(() => {
  const handleError = error => error;

  return (
    <Query
      query={CURRENT_USER_PAGINATED_IDEAS}
      variables={{ first: pageSize }}
      onError={handleError}
      notifyOnNetworkStatusChange
    >
      {({ loading, error, data, fetchMore }) => {
        /* if (loading) return <DisplayLoading />; */
        if (error) return <DisplayError error={error} />;

        return (
          <sc.Ideas>
            {data
            && data.currentUserPaginatedIdeas
            && data.currentUserPaginatedIdeas.edges
            && data.currentUserPaginatedIdeas.edges.length ? (
              <IdeaCardList
                loading={loading}
                ideas={data.currentUserPaginatedIdeas.edges}
              />
              ) : (
                <p>Add an Idea!</p>
              )}

            {data
              && data.currentUserPaginatedIdeas
              && data.currentUserPaginatedIdeas.pageInfo
              && data.currentUserPaginatedIdeas.pageInfo.hasNextPage && (
                <LoadMoreBtn
                  loading={loading}
                  ideas={data.currentUserPaginatedIdeas}
                  fetchMore={fetchMore}
                />
            )}
          </sc.Ideas>
        );
      }}
    </Query>
  );
});

export default Ideas;
