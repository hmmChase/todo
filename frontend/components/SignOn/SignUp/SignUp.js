import { Mutation } from 'react-apollo';
import * as userQL from '../../../graphql/Queries/user';
import * as Styled from './SignUp.style';

class SignUp extends React.PureComponent {
  state = {
    email: '',
    password: ''
  };

  onChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  onSubmit = async (e, signUp) => {
    e.preventDefault();
    await signUp();
    this.setState({ email: '', password: '' });
  };

  render() {
    const { email, password } = this.state;
    const isInvalid = email === '' || password === '';

    return (
      <Mutation
        mutation={userQL.SIGN_UP_MUTATION}
        variables={this.state}
        refetchQueries={[{ query: userQL.USERS_QUERY }]}
      >
        {(signUp, { loading, error }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error: {error.message}</p>;
          return (
            <Styled.div>
              <form onSubmit={e => this.onSubmit(e, signUp)}>
                <fieldset disabled={loading} aria-busy={loading}>
                  <h2>Create a new Account</h2>

                  <label htmlFor="email">
                    Email
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={email}
                      onChange={this.onChange}
                    />
                  </label>

                  <label htmlFor="password">
                    Password
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={password}
                      onChange={this.onChange}
                    />
                  </label>

                  <button type="submit" disabled={isInvalid}>
                    Sign Up
                  </button>
                </fieldset>
              </form>
            </Styled.div>
          );
        }}
      </Mutation>
    );
  }
}

export default SignUp;
