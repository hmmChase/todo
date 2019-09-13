import { Mutation } from '@apollo/react-components';

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
    // e.target.reset();
    signIn();
  };

  handleError = error => error;

  handleUpdate = cache => cache.writeData({ data: { isLoggedIn: true } });

  render() {
    const { email, password } = this.state;
    const isInvalid = email === '' || password === '';

    return (
      <Mutation
        mutation={SIGN_IN_MUTATION}
        variables={this.state}
        onError={this.handleError}
        update={this.handleUpdate}
      >
        {(signIn, { loading, error }) => (
          <sc.SignIn>
            <sc.form onSubmit={e => this.handleSubmitForm(e, signIn)}>
              <fieldset disabled={loading} aria-busy={loading}>
                <h2>Sign In</h2>

                <label htmlFor="email">
                  Email
                  <sc.InputText
                    type="email"
                    name="email"
                    placeholder="email"
                    value={email}
                    onChange={this.handleChangeInput}
                  />
                </label>

                <label htmlFor="password">
                  Password
                  <sc.InputText
                    type="password"
                    name="password"
                    placeholder="password"
                    value={password}
                    onChange={this.handleChangeInput}
                  />
                </label>

                {loading && <DisplayLoading />}

                {error && <DisplayError error={error} />}

                <sc.InputSubmit
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
    );
  }
}

export default SignIn;
