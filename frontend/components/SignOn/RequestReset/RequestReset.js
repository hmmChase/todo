import { Mutation } from 'react-apollo';
import DisplayError from '../../DisplayError/DisplayError';
import * as query from './RequestReset.query';
import * as Styled from './RequestReset.style';

class RequestReset extends React.PureComponent {
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
      >
        {(requestReset, { loading, error, called }) => (
          <Styled.formContainer>
            <form onSubmit={e => this.handleSubmitForm(e, requestReset)}>
              <fieldset disabled={loading} aria-busy={loading}>
                <h2>Request a password reset</h2>

                {error && <DisplayError error={error} />}

                {!error && !loading && called && (
                  <p>Check your email for a reset link.</p>
                )}

                <label htmlFor="email">
                  Email
                  <input
                    type="email"
                    name="email"
                    placeholder="email"
                    value={email}
                    onChange={this.handleChangeInput}
                  />
                </label>

                <Styled.submitInputBtn
                  value="Request Reset"
                  type="submit"
                  disabled={isInvalid}
                />
              </fieldset>
            </form>
          </Styled.formContainer>
        )}
      </Mutation>
    );
  }
}

export default RequestReset;
