import { FC, useState } from 'react';
import { useQuery } from '@apollo/client';

import { Ideas } from '../../models';
import { ideasPerPage } from '../../constants/config';
import { READ_IDEAS_PAGINATED_CURSOR } from '../../graphql/queries/idea';
import IdeaList from '../../components/IDEA/IdeaList';
import Loading from '../../components/REUSEABLE/Loading';
import QueryResult from '../../components/REUSEABLE/QueryResult';

const IdeasPageCursor: FC = () => {
  // const [page, setPage] = useState(0);

  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const { data, error, loading, fetchMore } = useQuery(
    READ_IDEAS_PAGINATED_CURSOR,
    {
      variables: { pageSize: ideasPerPage },

      // Allows component to rerender with loading:true whenever fetchMore is called
      notifyOnNetworkStatusChange: true
    }
  );

  const ideas: Ideas = data?.ideasPaginatedCursor.ideas;

  const hasMore = data?.ideasPaginatedCursor.hasMore;

  return (
    <QueryResult data={ideas} error={error} loading={loading}>
      <IdeaList ideas={ideas} />

      {ideas &&
        hasMore &&
        (isLoadingMore ? (
          <Loading />
        ) : (
          <button
            onClick={async () => {
              setIsLoadingMore(true);

              await fetchMore({
                variables: { after: data.ideasPaginatedCursor.cursor }
              });

              setIsLoadingMore(false);
            }}
          >
            Load More
          </button>
        ))}
    </QueryResult>
  );
};

export default IdeasPageCursor;
