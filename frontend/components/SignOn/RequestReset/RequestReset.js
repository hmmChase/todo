import { Mutation } from 'react-apollo';
import Error from '../../Error/Error';
import * as query from './RequestReset.query';
import * as Styled from './RequestReset.style';

class RequestReset extends React.PureComponent {
  state = {
    email: ''
  };

  onChangeInput = e => this.setState({ [e.target.name]: e.target.value });

  onSubmitForm = async (e, requestReset) => {
    e.preventDefault();
    await requestReset();
    this.setState({ email: '' });
  };

  render() {
    const { email } = this.state;
    const isInvalid = email === '';

    return (
      <Mutation mutation={query.REQUEST_RESET_MUTATION} variables={this.state}>
        {(requestReset, { error, loading, called }) => (
          <Styled.div>
            <form method="post" onSubmit={e => onSubmitForm(e, requestReset)}>
              <fieldset disabled={loading} aria-busy={loading}>
                <h2>Request a password reset</h2>

                {error && <Error error={error} />}

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
                    onChange={this.onChangeInput}
                  />
                </label>

                <button type="submit" disabled={isInvalid}>
                  Request Reset
                </button>
              </fieldset>
            </form>
          </Styled.div>
        )}
      </Mutation>
    );
  }
}

export default RequestReset;
