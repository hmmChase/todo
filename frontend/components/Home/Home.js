import { Query } from 'react-apollo';
import * as Styled from './Home.style';
import * as user from '../../graphql/Queries/user';

class Home extends React.PureComponent {
  render() {
    return (
      <Query query={user.USERS_QUERY}>
        {res => (
          <Styled.div>
            <ul>
              {res.data.users.map(dataUser => (
                <li key={dataUser.id}>{dataUser.email}</li>
              ))}
            </ul>
          </Styled.div>
        )}
      </Query>
    );
  }
}

export default Home;
