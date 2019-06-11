import { Mutation } from 'react-apollo';
import DisplayError from '../../DisplayError/DisplayError';
import * as query from './PopUpRequestReset.query';
import * as sc from './PopUpRequestReset.style';

class PopUpRequestReset extends React.PureComponent {
  state = {
    email: ''
  };

  handleChangeInput = e => this.setState({ [e.target.name]: e.target.value });

  handleSubmitForm = async (e, requestReset) => {
    e.preventDefault();
    await requestReset();
  };

  handleError = error => error;

  render() {
    const { email } = this.state;
    const isInvalid = email === '';

    return (
      <Mutation
        mutation={query.REQUEST_RESET_MUTATION}
        variables={this.state}
        onError={this.handleError}
        errorPolicy="all"
      >
        {(requestReset, { loading, error, called }) => (
          <sc.form
            snapshot="PopUpRequestReset"
            onSubmit={e => this.handleSubmitForm(e, requestReset)}
          >
            <fieldset disabled={loading} aria-busy={loading}>
              <h2>Request a password reset</h2>

              {error && <DisplayError error={error} />}

              {!error && !loading && called && (
                <p>Check your email for a reset link.</p>
              )}

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

              <sc.inputBtn
                value="Request Reset"
                type="submit"
                disabled={isInvalid}
              />
            </fieldset>
          </sc.form>
        )}
      </Mutation>
    );
  }
}

export default PopUpRequestReset;
