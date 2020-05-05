import { useQuery } from '@apollo/react-hooks';
// import { useQuery } from '@apollo/client';
import { USERS } from '../graphql/queries';

const AllUsers = () => {
  const { data } = useQuery(USERS, { onError(_error) {} });

  return (
    <>
      <h3>Users:</h3>

      <ul>
        {data && data.users.map((user) => <li key={user.id}>{user.email}</li>)}
      </ul>
    </>
  );
};

export default AllUsers;
