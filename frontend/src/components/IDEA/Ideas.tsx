import { FC } from 'react';
import { useQuery } from '@apollo/client';

import { Ideas as Ideass } from '@/models';
import { READ_IDEAS } from '@/graphql/queries/idea';
import IdeaList from '@/components/IDEA/IdeaList';
import QueryResult from '@/components/REUSEABLE/QueryResult';

const Ideas: FC = () => {
  const { data, error, loading } = useQuery(READ_IDEAS);

  const ideas: Ideass = data?.ideas;

  return (
    <QueryResult data={ideas} error={error} loading={loading} loader={true}>
      <IdeaList ideas={ideas} />
    </QueryResult>
  );
};

export default Ideas;
