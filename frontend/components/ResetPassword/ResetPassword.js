import Router from 'next/router';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import DisplayError from '../DisplayError/DisplayError';
import * as query from './ResetPassword.query';
import * as sc from './ResetPassword.style';

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

    const isInvalidPass = password === '' || confirmPassword === '';

    return (
      <Mutation
        mutation={query.RESET_PASSWORD_MUTATION}
        variables={{
          ...this.state,
          resetToken: this.props.resetToken
        }}
        onError={this.handleError}
        // onCompleted={this.handleCompleted}
      >
        {(resetPassword, { loading, error, client }) => (
          <sc.form
            onSubmit={e => this.handleSubmitForm(e, resetPassword, client)}
          >
            <fieldset disabled={loading} aria-busy={loading}>
              <h2>Reset Your Password</h2>

              {error && <DisplayError error={error} />}

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

              <sc.h3PassTitle>Password must contain:</sc.h3PassTitle>

              <sc.ulPassList aria-label="Password must contain:">
                <li>at least 8 charactors</li>
                <li>an uppercase letter</li>
                <li>a lowercase letter</li>
                <li>a number</li>
              </sc.ulPassList>

              <sc.inputBtn
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

ResetPassword.defaultProps = {
  resetToken: ''
};

ResetPassword.propTypes = {
  resetToken: PropTypes.string
};

export default ResetPassword;
