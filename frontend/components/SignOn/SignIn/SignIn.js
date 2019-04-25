/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-console */
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import DisplayError from '../../DisplayError/DisplayError';
import * as query from './SignIn.query';
import * as Styled from './SignIn.style';

class SignIn extends React.PureComponent {
  state = {
    email: '',
    password: ''
  };

  handleChangeInput = e => this.setState({ [e.target.name]: e.target.value });

  handleSubmitForm = async (e, signIn, client) => {
    e.preventDefault();
    this.setState({ password: '' });
    await signIn();
    await client.resetStore();
  };

  handleError = error => error;

  handleCompleted = () => this.props.close();

  render() {
    const { email, password } = this.state;
    const isInvalid = email === '' || password === '';

    return (
      <Mutation
        mutation={query.SIGN_IN_MUTATION}
        variables={this.state}
        onError={this.handleError}
        onCompleted={this.handleCompleted}
      >
        {(signIn, { loading, error, client }) => (
          <>
            <Styled.form
              onSubmit={e => this.handleSubmitForm(e, signIn, client)}
            >
              <fieldset disabled={loading} aria-busy={loading}>
                <h2>Sign In</h2>

                {error && <DisplayError error={error} />}

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

                <Styled.submitInputBtn
                  value="Sign In"
                  type="submit"
                  disabled={isInvalid}
                />
              </fieldset>
            </Styled.form>

            <a
              value="Forgot password?"
              css="cursor: pointer;"
              onClick={this.props.requestReset}
            >
              Forgot password?
            </a>
          </>
        )}
      </Mutation>
    );
  }
}

SignIn.propTypes = {
  close: PropTypes.func.isRequired,
  requestReset: PropTypes.func.isRequired
};

export default SignIn;
