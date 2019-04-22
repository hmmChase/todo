import { Query } from 'react-apollo';
import DisplayLoading from '../DisplayLoading/DisplayLoading';
import DisplayError from '../DisplayError/DisplayError';
import WithUser from '../wrappers/WithUser/WithUser';
import * as query from './Users.query';

const Users = React.memo(() => (
  <WithUser>
    {me =>
      me && (
        <Query query={query.USERS_QUERY}>
          {({ loading, error, data }) => {
            if (loading) return <DisplayLoading />;
            if (error) return <DisplayError error={error} />;
            if (!data) return <p>No users found</p>;

            return (
              <ul>
                {data.users.map(user => (
                  <li key={user.id}>{user.email}</li>
                ))}
              </ul>
            );
          }}
        </Query>
      )
    }
  </WithUser>
));

export default Users;
