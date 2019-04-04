/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-console */
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import * as query from './SignIn.query';
import * as Styled from './SignIn.style';

class SignIn extends React.PureComponent {
  state = {
    email: '',
    password: ''
  };

  onChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  onSubmit = async (e, signIn) => {
    e.preventDefault();
    await signIn();
    this.setState({ email: '', password: '' });
    this.props.close();
  };

  render() {
    const { email, password } = this.state;
    const isInvalid = email === '' || password === '';

    return (
      <Mutation
        mutation={query.SIGN_IN_MUTATION}
        variables={this.state}
        refetchQueries={[{ query: query.ME_QUERY }]}
      >
        {(signIn, { loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error: {error.message}</p>;
          return (
            <Styled.div>
              <form onSubmit={e => this.onSubmit(e, signIn)}>
                <fieldset disabled={loading} aria-busy={loading}>
                  <h2>Sign In</h2>

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
                    Sign In
                  </button>
                </fieldset>
              </form>
              <a onClick={this.props.requestReset}>Forgot password?</a>
            </Styled.div>
          );
        }}
      </Mutation>
    );
  }
}

SignIn.propTypes = {
  close: PropTypes.func.isRequired,
  requestReset: PropTypes.func.isRequired
};

export default SignIn;
