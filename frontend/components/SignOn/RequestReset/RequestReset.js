import { Mutation } from 'react-apollo';
import Error from '../../Error/Error';
import * as query from './RequestReset.query';

class RequestReset extends React.PureComponent {
  state = {
    email: ''
  };

  onChangeEmail = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    return (
      <Mutation mutation={query.REQUEST_RESET_MUTATION} variables={this.state}>
        {(requestReset, { error, loading, called }) => (
          <form
            method="post"
            data-test="form"
            onSubmit={async e => {
              e.preventDefault();
              await requestReset();
              this.setState({ email: '' });
            }}
          >
            <fieldset disabled={loading} aria-busy={loading}>
              <h2>Request a password reset</h2>
              <Error error={error} />
              {!error && !loading && called && (
                <p>Check your email for a reset link.</p>
              )}

              <label htmlFor="email">
                Email
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  value={this.state.email}
                  onChange={this.onChangeEmail}
                />
              </label>

              <button type="submit">Request Reset</button>
            </fieldset>
          </form>
        )}
      </Mutation>
    );
  }
}

export default RequestReset;
