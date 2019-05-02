import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import DisplayError from '../../DisplayError/DisplayError';
import * as query from './PopUpSignIn.query';
import * as sc from './PopUpSignIn.style';

class PopUpSignIn extends React.PureComponent {
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
        errorPolicy="all"
        onCompleted={this.handleCompleted}
      >
        {(signIn, { loading, error, client }) => (
          <>
            <sc.form onSubmit={e => this.handleSubmitForm(e, signIn, client)}>
              <fieldset disabled={loading} aria-busy={loading}>
                <h2>Sign In</h2>

                {error && <DisplayError error={error} />}

                <label htmlFor="email">
                  Email
                  <sc.inputText
                    type="email"
                    name="email"
                    placeholder="email"
                    value={email}
                    onChange={this.handleChangeInput}
                  />
                </label>

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

                <sc.inputBtn
                  value="Sign In"
                  type="submit"
                  disabled={isInvalid}
                />
              </fieldset>
            </sc.form>

            <sc.aForgotPass
              value="Forgot password?"
              onClick={this.props.requestReset}
            >
              Forgot password?
            </sc.aForgotPass>
          </>
        )}
      </Mutation>
    );
  }
}

PopUpSignIn.propTypes = {
  close: PropTypes.func.isRequired,
  requestReset: PropTypes.func.isRequired
};

export default PopUpSignIn;
