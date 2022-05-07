import { FC } from 'react';
import { useQuery } from '@apollo/client';

import { Ideas } from '../../models';
import { READ_IDEAS } from '../../graphql/queries/idea';
import IdeaList from '../../components/IDEA/IdeaList';
import QueryResult from '../REUSEABLE/QueryResult';

const Ideas: FC = () => {
  const { data, error, loading } = useQuery(READ_IDEAS);

  const ideas: Ideas = data?.ideas;

  return (
    <QueryResult data={ideas} error={error} loading={loading} loader={true}>
      <IdeaList ideas={ideas} />
    </QueryResult>
  );
};

export default Ideas;
