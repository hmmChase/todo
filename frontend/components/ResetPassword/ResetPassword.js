import PropTypes from 'prop-types';
import Router from 'next/router';
import { Mutation } from '@apollo/react-components';

import DisplayError from '../DisplayError/DisplayError';
import { RESET_PASSWORD_MUTATION } from '../../graphql/queries';
import * as sc from './ResetPassword.style';

class ResetPassword extends React.PureComponent {
  state = { password: '', confirmPassword: '' };

  handleChangeInput = e => this.setState({ [e.target.name]: e.target.value });

  handleSubmitForm = (e, resetPassword) => {
    e.preventDefault();
    this.setState({ password: '', confirmPassword: '' });
    resetPassword();
  };

  handleError = error => error;

  handleCompleted = () => Router.push({ pathname: '/' });

  render() {
    const { password, confirmPassword } = this.state;
    const { resetToken, resetTokenExpiry } = this.props;
    const isInvalidPass = password === '' || confirmPassword === '';

    const isTokenPresent = resetToken && resetTokenExpiry;
    const isTokenExpired = Date.now() > resetTokenExpiry;
    const isTokenValid = isTokenPresent && !isTokenExpired;

    const tokenMissingError = {
      message: 'Error: Please submit a new password reset request.'
    };
    const tokenExpiredError = {
      message: 'Your reset request is expired.  Please submit a new one.'
    };

    return (
      <Mutation
        mutation={RESET_PASSWORD_MUTATION}
        variables={{ ...this.state, resetToken: this.props.resetToken }}
        onError={this.handleError}
        onCompleted={this.handleCompleted}
      >
        {(resetPassword, { loading, error }) => (
          <sc.ResetPassword>
            <sc.form onSubmit={e => this.handleSubmitForm(e, resetPassword)}>
              <fieldset disabled={loading} aria-busy={loading}>
                <h2>Reset Your Password</h2>

                <label htmlFor="password">
                  Password
                  <sc.inputText
                    type="password"
                    name="password"
                    placeholder="password"
                    value={password}
                    onChange={this.handleChangeInput}
                  />
                </label>

                <label htmlFor="confirmPassword">
                  Confirm Password
                  <sc.inputText
                    type="password"
                    name="confirmPassword"
                    placeholder="confirmPassword"
                    value={confirmPassword}
                    onChange={this.handleChangeInput}
                  />
                </label>

                {!isTokenPresent && <DisplayError error={tokenMissingError} />}

                {isTokenPresent && isTokenExpired && (
                  <DisplayError error={tokenExpiredError} />
                )}

                {isTokenValid && error && <DisplayError error={error} />}

                <sc.h3PassTitle>Password must contain:</sc.h3PassTitle>

                <sc.ulPassList aria-label="Password must contain:">
                  <li>at least 8 charactors</li>
                  <li>an uppercase letter</li>
                  <li>a lowercase letter</li>
                  <li>a number</li>
                </sc.ulPassList>

                <sc.inputSubmit
                  value="Reset Your Password"
                  type="submit"
                  disabled={isInvalidPass}
                />
              </fieldset>
            </sc.form>
          </sc.ResetPassword>
        )}
      </Mutation>
    );
  }
}

ResetPassword.defaultProps = {
  resetToken: '',
  resetTokenExpiry: ''
};

ResetPassword.propTypes = {
  resetToken: PropTypes.string,
  resetTokenExpiry: PropTypes.string
};

export default ResetPassword;
