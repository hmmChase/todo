import { useQuery } from '@apollo/react-hooks';
import DisplayLoading from '../DisplayLoading/DisplayLoading';
import DisplayError from '../DisplayError/DisplayError';
import IdeaCardList from '../IdeaCardList/IdeaCardList';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import { CURRENT_USER_PAGINATED_IDEAS } from '../../graphql/queries';
import { pageSize } from '../../constants';
import * as sc from './Ideas.style';

const Ideas = () => {
  const { error, data, fetchMore, networkStatus } = useQuery(
    CURRENT_USER_PAGINATED_IDEAS,
    {
      variables: { first: pageSize },
      notifyOnNetworkStatusChange: true,
      onError(_err) {}
    }
  );

  if (networkStatus === 1) return <DisplayLoading />;

  if (error) return <DisplayError error={error} />;

  return (
    <sc.Ideas>
      {data &&
      data.currentUserPaginatedIdeas &&
      data.currentUserPaginatedIdeas.edges &&
      data.currentUserPaginatedIdeas.edges.length ? (
        <IdeaCardList
          loading={networkStatus === 1}
          ideas={data.currentUserPaginatedIdeas.edges}
        />
      ) : (
        <p>Add an Idea!</p>
      )}

      {data &&
        data.currentUserPaginatedIdeas &&
        data.currentUserPaginatedIdeas.pageInfo &&
        data.currentUserPaginatedIdeas.pageInfo.hasNextPage && (
          <LoadMoreBtn
            loading={networkStatus === 3}
            ideas={data.currentUserPaginatedIdeas}
            fetchMore={fetchMore}
          />
        )}
    </sc.Ideas>
  );
};

export default Ideas;
