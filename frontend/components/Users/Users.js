import { Query } from 'react-apollo';
import Error from '../Error/Error';
import * as query from './Users.query';

class Users extends React.PureComponent {
  render() {
    return (
      <Query query={query.USERS_QUERY}>
        {({ data, loading, error }) => {
          if (loading) return <p>Loading...</p>;

          return (
            <>
              {error && <Error error={error} />}

              <ul>
                {data.users.map(user => (
                  <li key={user.id}>{user.email}</li>
                ))}
              </ul>
            </>
          );
        }}
      </Query>
    );
  }
}

export default Users;
