import { Mutation } from 'react-apollo';

import DisplayLoading from '../DisplayLoading/DisplayLoading';
import DisplayError from '../DisplayError/DisplayError';
import { REQUEST_RESET_MUTATION } from '../../graphql/queries';
import * as sc from './RequestReset.style';

class RequestReset extends React.PureComponent {
  state = { email: '' };

  handleChangeInput = e => this.setState({ [e.target.name]: e.target.value });

  handleSubmitForm = (e, requestReset) => {
    e.preventDefault();
    requestReset();
  };

  handleError = error => error;

  render() {
    const isInvalid = this.state.email === '';

    return (
      <Mutation
        mutation={REQUEST_RESET_MUTATION}
        variables={this.state}
        onError={this.handleError}
      >
        {(requestReset, { loading, error, called }) => (
          <sc.form onSubmit={e => this.handleSubmitForm(e, requestReset)}>
            <fieldset disabled={loading} aria-busy={loading}>
              <h2>Request a password reset</h2>

              <label htmlFor="email">
                Email
                <sc.InputText
                  type="email"
                  name="email"
                  placeholder="email"
                  value={this.state.email}
                  onChange={this.handleChangeInput}
                />
              </label>

              {loading && <DisplayLoading />}

              {error && <DisplayError error={error} />}

              {!error && !loading && called && (
                <p>Check your email for a reset link.</p>
              )}

              <sc.InputSubmit
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

export default RequestReset;
