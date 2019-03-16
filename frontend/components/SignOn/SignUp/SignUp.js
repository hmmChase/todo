import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import * as Styled from './SignUp.style';

export const SIGN_UP_MUTATION = gql`
  mutation SIGN_UP_MUTATION($email: String!, $password: String!) {
    signUp(email: $email, password: $password) {
      id
    }
  }
`;

class SignUp extends React.PureComponent {
  state = {
    email: '',
    password: ''
  };

  onChange = (e) => {
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
      <Mutation mutation={SIGN_UP_MUTATION} variables={this.state}>
        {(signUp, { loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error: {error.message}</p>;
          // eslint-disable-next-line no-console
          if (data) console.log('data: ', data);
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
