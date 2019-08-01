import { ApolloConsumer, Mutation } from 'react-apollo';

// import { DisplayLoading, DisplayError } from '..';
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

  handleCompleted = client => client.writeData({ data: { isLoggedIn: true } });

  render() {
    const { email, password, confirmPassword } = this.state;
    const isInvalid = email === '' || password === '' || confirmPassword === '';

    return (
      <ApolloConsumer>
        {client => (
          <Mutation
            mutation={SIGN_UP_MUTATION}
            variables={this.state}
            onError={this.handleError}
            onCompleted={() => this.handleCompleted(client)}
          >
            {(signUp, { loading, error }) => (
              <sc.form onSubmit={e => this.handleSubmitForm(e, signUp)}>
                <fieldset disabled={loading} aria-busy={loading}>
                  <h2>Create a new Account</h2>

                  {loading && <DisplayLoading />}

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

                  <sc.h3PassTitle>Password must contain:</sc.h3PassTitle>

                  <sc.ulPassList aria-label="Password must contain:">
                    <li>at least 8 charactors</li>
                    <li>an uppercase letter</li>
                    <li>a lowercase letter</li>
                    <li>a number</li>
                  </sc.ulPassList>

                  <sc.inputBtn
                    type="submit"
                    value="Sign Up"
                    disabled={isInvalid}
                  />
                </fieldset>
              </sc.form>
            )}
          </Mutation>
        )}
      </ApolloConsumer>
    );
  }
}

export default SignUp;
