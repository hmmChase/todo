import { ApolloConsumer, Mutation } from '@apollo/react-components';

import DisplayLoading from '../DisplayLoading/DisplayLoading';
import DisplayError from '../DisplayError/DisplayError';
import ForgotPassDialog from '../ForgotPassDialog/ForgotPassDialog';
import { SIGN_IN_MUTATION } from '../../graphql/queries';
import * as sc from './SignIn.style';

class SignIn extends React.PureComponent {
  state = { email: '', password: '' };

  handleChangeInput = e => this.setState({ [e.target.name]: e.target.value });

  handleSubmitForm = (e, signIn) => {
    e.preventDefault();
    this.setState({ password: '' });
    signIn();
  };

  handleError = error => error;

  handleCompleted = apolloClient =>
    apolloClient.writeData({ data: { isLoggedIn: true } });

  render() {
    const { email, password } = this.state;
    const isInvalid = email === '' || password === '';

    return (
      <ApolloConsumer>
        {apolloClient => (
          <Mutation
            mutation={SIGN_IN_MUTATION}
            variables={this.state}
            onError={this.handleError}
            onCompleted={() => this.handleCompleted(apolloClient)}
          >
            {(signIn, { loading, error }) => (
              <sc.SignIn>
                <sc.form onSubmit={e => this.handleSubmitForm(e, signIn)}>
                  <fieldset disabled={loading} aria-busy={loading}>
                    <h2>Sign In</h2>

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

                    {loading && <DisplayLoading />}

                    {error && <DisplayError error={error} />}

                    <sc.inputSubmit
                      value="Sign In"
                      type="submit"
                      disabled={isInvalid}
                    />
                  </fieldset>
                </sc.form>

                <ForgotPassDialog />
              </sc.SignIn>
            )}
          </Mutation>
        )}
      </ApolloConsumer>
    );
  }
}

export default SignIn;
