/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
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

    const isInvalidPass = password === '' || confirmPassword === '';

    return (
      <Mutation
        mutation={query.RESET_PASSWORD_MUTATION}
        variables={{
          ...this.state,
          resetToken: this.props.resetToken
        }}
        onError={this.handleError}
        onCompleted={this.handleCompleted}
      >
        {(resetPassword, { loading, error, client }) => (
          <Styled.form
            onSubmit={e => this.handleSubmitForm(e, resetPassword, client)}
          >
            <fieldset disabled={loading} aria-busy={loading}>
              <h2>Reset Your Password</h2>

              {error && <DisplayError error={error} />}

              <label htmlFor="password">
                Password
                <Styled.inputText
                  type="password"
                  name="password"
                  placeholder="password"
                  value={password}
                  onChange={this.handleChangeInput}
                />
              </label>

              <label htmlFor="confirmPassword">
                Confirm Password
                <Styled.inputText
                  type="password"
                  name="confirmPassword"
                  placeholder="confirmPassword"
                  value={confirmPassword}
                  onChange={this.handleChangeInput}
                />
              </label>

              <Styled.h3PassTitle>Password must contain:</Styled.h3PassTitle>

              <Styled.ulPassList aria-label="Password must contain:">
                <li>at least 8 charactors</li>
                <li>an uppercase letter</li>
                <li>a lowercase letter</li>
                <li>a number</li>
              </Styled.ulPassList>

              <Styled.inputBtn
                value="Reset Your Password"
                type="submit"
                disabled={isInvalidPass}
              />
            </fieldset>
          </Styled.form>
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
