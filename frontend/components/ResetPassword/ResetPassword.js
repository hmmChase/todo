/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import Router from 'next/router';
import { Mutation } from 'react-apollo';
import DisplayError from '../DisplayError/DisplayError';
import * as query from './ResetPassword.query';
import * as Styled from './ResetPassword.style';

class ResetPassword extends React.PureComponent {
  state = {
    password: '',
    confirmPassword: ''
  };

  handleChangeInput = e => this.setState({ [e.target.name]: e.target.value });

  handleSubmitForm = async (e, resetPassword, client) => {
    e.preventDefault();
    this.setState({ password: '', confirmPassword: '' });
    await resetPassword();
    await client.resetStore();
  };

  handleError = error => error;

  handleCompleted = () => Router.push({ pathname: '/' });

  render() {
    const { password, confirmPassword } = this.state;
    const { resetToken, resetTokenExpiry } = this.props;
    const isInvalidPass = password === '' || confirmPassword === '';
    const isTokenExpired = Date.now() > resetTokenExpiry;
    const tokenError = {
      message: 'Your reset token is expired.  Please request a new one.'
    };

    if (isTokenExpired) return <DisplayError error={tokenError} />;

    return (
      <Mutation
        mutation={query.RESET_PASSWORD_MUTATION}
        variables={{
          ...this.state,
          resetToken
        }}
        onError={this.handleError}
        onCompleted={this.handleCompleted}
      >
        {(resetPassword, { loading, error, client }) => (
          <Styled.div>
            <form
              onSubmit={e => this.handleSubmitForm(e, resetPassword, client)}
            >
              <fieldset disabled={loading} aria-busy={loading}>
                <h2>Reset Your Password</h2>

                {error && <DisplayError error={error} />}

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
                    placeholder="confirmPassword"
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

                <button type="submit" disabled={isInvalidPass}>
                  Reset Your Password
                </button>
              </fieldset>
            </form>
          </Styled.div>
        )}
      </Mutation>
    );
  }
}

ResetPassword.propTypes = {
  resetToken: PropTypes.string.isRequired,
  resetTokenExpiry: PropTypes.string.isRequired
};

export default ResetPassword;
