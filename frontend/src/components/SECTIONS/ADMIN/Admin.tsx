import { FC } from 'react';
import { useQuery } from '@apollo/client';

import { READ_USERS } from '@/graphql/queries/user';
import { Users } from '@/models/index';
import QueryResult from '@/components/COMMON/QueryResult/QueryResult';
import UserList from '@/components/USER/UserList/UserList';

const Admin: FC = () => {
  const { data, error, loading } = useQuery(READ_USERS);

  const users: Users = data?.users;

  return (
    <>
      <h2>Admin</h2>

      <QueryResult data={users} error={error} loading={loading}>
        <UserList users={users} />
      </QueryResult>
    </>
  );
};

export default Admin;
