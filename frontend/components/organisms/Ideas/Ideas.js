import { useQuery } from '@apollo/react-hooks';
import { ideasPerPage } from '../../../config';
import { CURRENT_USER_PAGINATED_IDEAS } from '../../../graphql/queries';
import DisplayLoading from '../../molecules/DisplayLoading/DisplayLoading';
import DisplayError from '../../molecules/DisplayError/DisplayError';
import * as sc from './Ideas.style';

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

  if (networkStatus === 1) return <DisplayLoading />;

  if (error) return <DisplayError error={error} />;

  return (
    <sc.Ideas>
      {data &&
      data.currentUserPaginatedIdeas &&
      data.currentUserPaginatedIdeas.edges &&
      data.currentUserPaginatedIdeas.edges.length ? (
        <sc.IdeaCardListt
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
          <sc.ShowMoreBtnn
            loading={networkStatus === 3}
            ideas={data.currentUserPaginatedIdeas}
            fetchMore={fetchMore}
          />
        )}
    </sc.Ideas>
  );
};

export default Ideas;
