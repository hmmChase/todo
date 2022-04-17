import { FC } from 'react';
import { useQuery } from '@apollo/client';

import { Ideas as IdeasModel } from '../../models';
import { READ_IDEAS } from '../../graphql/queries/idea';
import IdeaList from '../../components/IDEA/IdeaList';
import QueryResult from '../REUSEABLE/QueryResult';

const Ideas: FC = () => {
  const { data, error, loading } = useQuery(READ_IDEAS);

  const ideas: IdeasModel = data?.ideas;

  return (
    <QueryResult data={data} error={error} loading={loading}>
      <IdeaList ideas={ideas} />
    </QueryResult>
  );
};

export default Ideas;
