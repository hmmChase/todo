/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import Error from '../../Error/Error';
import * as query from './SignUp.query';
import * as Styled from './SignUp.style';

class SignUp extends React.PureComponent {
  state = {
    email: '',
    password: '',
    confirmPassword: ''
  };

  handleChangeInput = e => this.setState({ [e.target.name]: e.target.value });

  handleSubmitForm = async (e, signUp, client) => {
    e.preventDefault();
    this.setState({ password: '', confirmPassword: '' });
    await signUp();
    await client.resetStore();
  };

  handleError = error => error;

  handleCompleted = () => this.props.close();

  render() {
    const { email, password, confirmPassword } = this.state;
    const isInvalid = email === '' || password === '' || confirmPassword === '';

    return (
      <Mutation
        mutation={query.SIGN_UP_MUTATION}
        variables={this.state}
        onError={this.handleError}
        onCompleted={this.handleCompleted}
      >
        {(signUp, { error, loading, client }) => {
          return (
            <Styled.div>
              <form onSubmit={e => this.handleSubmitForm(e, signUp, client)}>
                <fieldset disabled={loading} aria-busy={loading}>
                  <h2>Create a new Account</h2>

                  {error && <Error error={error} />}

                  <label htmlFor="email">
                    Email
                    <input
                      type="email"
                      name="email"
                      placeholder="email"
                      value={email}
                      onChange={this.handleChangeInput}
                    />
                  </label>

                  <label htmlFor="password">
                    Password
                    <input
                      type="password"
                      name="password"
                      placeholder="password"
                      value={password}
                      onChange={this.handleChangeInput}
                    />
                  </label>

                  <label htmlFor="confirmPassword">
                    Confirm Your Password
                    <input
                      type="password"
                      name="confirmPassword"
                      placeholder="password"
                      value={confirmPassword}
                      onChange={this.handleChangeInput}
                    />
                  </label>

                  <p>Password must contain:</p>

                  <ul>
                    <li>at least 8 charactors</li>
                    <li>an uppercase letter</li>
                    <li>a lowercase letter</li>
                    <li>a number</li>
                  </ul>

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

SignUp.propTypes = {
  close: PropTypes.func.isRequired
};

export default SignUp;
