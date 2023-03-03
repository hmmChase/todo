import { ideasPerPage } from '@/constants/config';
import { READ_IDEAS_PAGINATED_CURSOR } from '@/graphql/queries/idea';
import { useQuery } from '@apollo/client';
import { useState } from 'react';
import Ideas from '@/components/IDEA/Ideas/Ideas';
import Loading from '@/components/COMMON/Loading/Loading';
import QueryResult from '@/components/COMMON/QueryResult/QueryResult';
import type { FC } from 'react';
import type { Ideas as Ideass } from '@/models/index';

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

  const ideas: Ideass = data?.ideasPaginatedCursor.ideas;

  const hasMore = data?.ideasPaginatedCursor.hasMore;

  return (
    <QueryResult
      error={error}
      loading={loading}
      showError={true}
      showLoading={true}
    >
      {ideas ? <Ideas ideas={ideas} /> : <p>There are no ideas</p>}

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
