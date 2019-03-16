import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { USERS_QUERY } from './QueryExample';

export const CREATE_USER_MUTATION = gql`
  mutation CREATE_USER_MUTATION($name: String!) {
    createUser(name: $name) {
      id
      name
    }
  }
`;

class MutationExample extends React.PureComponent {
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
        {(createUser, { loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error: {error.message}</p>;
          // eslint-disable-next-line no-console
          if (data) console.log('data: ', data);
          return (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                createUser();
              }}
            >
              <input onChange={e => this.setState({ name: e.target.value })} />
              <button type="submit">Submit</button>
            </form>
          );
        }}
      </Mutation>
    );
  }
}

export default MutationExample;
