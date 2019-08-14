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
    const isInvalidPass = password === '' || confirmPassword === '';

    return (
      <Mutation
        mutation={RESET_PASSWORD_MUTATION}
        variables={{ ...this.state, resetToken: this.props.resetToken }}
        onError={this.handleError}
        onCompleted={this.handleCompleted}
      >
        {(resetPassword, { loading, error }) => (
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

              {error && <DisplayError error={error} />}

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
        )}
      </Mutation>
    );
  }
}

ResetPassword.propTypes = {
  resetToken: PropTypes.string.isRequired
};

export default ResetPassword;
