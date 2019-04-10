/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import Router from 'next/router';
import { Mutation } from 'react-apollo';
import Error from '../Error/Error';
import * as query from './ResetPassword.query';
import * as Styled from './ResetPassword.style';

class ResetPassword extends React.PureComponent {
  state = {
    password: '',
    confirmPassword: ''
  };

  onChangeInput = e => this.setState({ [e.target.name]: e.target.value });

  onSubmitForm = async (e, resetPassword) => {
    e.preventDefault();
    await resetPassword();
    this.setState({ password: '', confirmPassword: '' });
    Router.push({
      pathname: '/'
    });
  };

  render() {
    const { password, confirmPassword } = this.state;
    const isInvalid = password === '' || confirmPassword === '';

    return (
      <Mutation
        mutation={query.RESET_PASSWORD_MUTATION}
        variables={{
          ...this.state,
          resetToken: this.props.resetToken
        }}
        refetchQueries={[{ query: query.ME_QUERY }]}
      >
        {(resetPassword, { error, loading }) => (
          <Styled.div>
            <form onSubmit={e => this.onSubmitForm(e, resetPassword)}>
              <fieldset disabled={loading} aria-busy={loading}>
                <h2>Reset Your Password</h2>

                {error && <Error error={error} />}

                <label htmlFor="password">
                  Password
                  <input
                    type="password"
                    name="password"
                    placeholder="password"
                    value={password}
                    onChange={this.onChangeInput}
                  />
                </label>

                <label htmlFor="confirmPassword">
                  Confirm Your Password
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="confirmPassword"
                    value={confirmPassword}
                    onChange={this.onChangeInput}
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
  resetToken: PropTypes.string.isRequired
};

export default ResetPassword;
