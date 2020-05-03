import { useQuery } from '@apollo/react-hooks';
// import { useQuery } from '@apollo/client';
import { ideasPerPage } from '../config';
import { CURRENT_USER_PAGINATED_IDEAS } from '../graphql/queries';
import IdeaCardList from './IdeaCardList';
import LoadMoreBtn from './LoadMoreBtn';

// https://www.apollographql.com/docs/react/data/pagination/

const Ideas = () => {
  const { error, data, fetchMore, networkStatus } = useQuery(
    CURRENT_USER_PAGINATED_IDEAS,
    {
      variables: { first: ideasPerPage },
      notifyOnNetworkStatusChange: true,

      onError(_error) {},
    }
  );

  if (networkStatus === 1) return <div>Loading</div>;
  if (error) return <p>{error}</p>;

  return (
    <>
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
    </>
  );
};

export default Ideas;
