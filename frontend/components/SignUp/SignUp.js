import { ApolloConsumer, Mutation } from 'react-apollo';

import DisplayLoading from '../DisplayLoading/DisplayLoading';
import DisplayError from '../DisplayError/DisplayError';
import { SIGN_UP_MUTATION } from '../../graphql/queries';
import * as sc from './SignUp.style';

class SignUp extends React.PureComponent {
  state = { email: '', password: '', confirmPassword: '' };

  handleChangeInput = e => this.setState({ [e.target.name]: e.target.value });

  handleSubmitForm = async (e, signUp) => {
    e.preventDefault();
    this.setState({ password: '', confirmPassword: '' });
    await signUp();
  };

  handleError = error => error;

  handleCompleted = apolloClient =>
    apolloClient.writeData({ data: { isLoggedIn: true } });

  render() {
    const { email, password, confirmPassword } = this.state;
    const isInvalid = email === '' || password === '' || confirmPassword === '';

    return (
      <ApolloConsumer>
        {apolloClient => (
          <Mutation
            mutation={SIGN_UP_MUTATION}
            variables={this.state}
            onError={this.handleError}
            onCompleted={() => this.handleCompleted(apolloClient)}
          >
            {(signUp, { loading, error }) => (
              <sc.SignUp>
                <sc.form onSubmit={e => this.handleSubmitForm(e, signUp)}>
                  <fieldset disabled={loading} aria-busy={loading}>
                    <h2>Create a new Account</h2>

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

                    <label htmlFor="confirmPassword">
                      Confirm Password
                      <sc.inputText
                        type="password"
                        name="confirmPassword"
                        placeholder="password"
                        value={confirmPassword}
                        onChange={this.handleChangeInput}
                      />
                    </label>

                    {loading && <DisplayLoading />}

                    {error && <DisplayError error={error} />}

                    <sc.h3PassTitle>Password must contain:</sc.h3PassTitle>

                    <sc.ulPassList aria-label="Password must contain:">
                      <li>at least 8 charactors</li>
                      <li>an uppercase letter</li>
                      <li>a lowercase letter</li>
                      <li>a number</li>
                    </sc.ulPassList>

                    <sc.inputSubmit
                      type="submit"
                      value="Sign Up"
                      disabled={isInvalid}
                    />
                  </fieldset>
                </sc.form>
              </sc.SignUp>
            )}
          </Mutation>
        )}
      </ApolloConsumer>
    );
  }
}

export default SignUp;
