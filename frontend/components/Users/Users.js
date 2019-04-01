import { Query } from 'react-apollo';
import * as user from '../../graphql/queries/user';

class Users extends React.PureComponent {
  render() {
    return (
      <Query query={user.USERS_QUERY}>
        {({ data, loading, error }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error: {error.message}</p>;
          return (
            <ul>
              {data.users.map(user => (
                <li key={user.id}>{user.email}</li>
              ))}
            </ul>
          );
        }}
      </Query>
    );
  }
}

export default Users;
