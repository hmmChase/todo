import { FC } from 'react';
import { useQuery } from '@apollo/client';

import { Ideas as Ideass } from '@/models/index';
import { READ_IDEAS } from '@/graphql/queries/idea';
import IdeaList from '@/components/IDEA/IdeaList/IdeaList';
import QueryResult from '@/components/COMMON/QueryResult/QueryResult';

const Ideas: FC = () => {
  const { data, error, loading } = useQuery(READ_IDEAS);

  const ideas: Ideass = data?.ideas;

  return (
    <QueryResult
      error={error}
      loading={loading}
      showError={true}
      showLoading={true}
    >
      {ideas ? <IdeaList ideas={ideas} /> : <p>There are no ideas</p>}
    </QueryResult>
  );
};

export default Ideas;
