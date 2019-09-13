import { Query } from 'react-apollo';

// import DisplayLoading from '../DisplayLoading/DisplayLoading';
import DisplayError from '../DisplayError/DisplayError';
import CardList from '../CardList/CardList';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import { CURRENT_USER_PAGINATED_IDEAS } from '../../graphql/queries';
import { pageSize } from '../../config';
import * as sc from './IdeaList.style';

const IdeaList = React.memo(() => {
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
          <sc.IdeaList>
            {data.currentUserPaginatedIdeas
            && data.currentUserPaginatedIdeas.edges
            && data.currentUserPaginatedIdeas.edges.length ? (
              <CardList ideas={data.currentUserPaginatedIdeas.edges} />
              ) : (
                <p>Add an Idea!</p>
              )}

            {data.currentUserPaginatedIdeas
              && data.currentUserPaginatedIdeas.pageInfo
              && data.currentUserPaginatedIdeas.pageInfo.hasNextPage && (
                <LoadMoreBtn
                  loading={loading}
                  ideas={data.currentUserPaginatedIdeas}
                  fetchMore={fetchMore}
                />
            )}
          </sc.IdeaList>
        );
      }}
    </Query>
  );
});

export default IdeaList;
