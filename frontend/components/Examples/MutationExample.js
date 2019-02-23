import { gql } from 'apollo-boost';
import { Mutation } from 'react-apollo';
import { USERS_QUERY } from './QueryExample';

const CREATE_USER_MUTATION = gql`
  mutation CREATE_USER_MUTATION($name: String!) {
    createUser(name: $name) {
      id
      name
    }
  }
`;

class MutationExample extends React.Component {
  state = {
    name: ''
  };

  render() {
    return (
      <Mutation
        mutation={CREATE_USER_MUTATION}
        variables={{ name: this.state.name }}
        refetchQueries={[{ query: USERS_QUERY }]}
      >
        {createUser => (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              createUser();
            }}
          >
            <input onChange={e => this.setState({ name: e.target.value })} />
            <button type="submit">Submit</button>
          </form>
        )}
      </Mutation>
    );
  }
}

export default MutationExample;
