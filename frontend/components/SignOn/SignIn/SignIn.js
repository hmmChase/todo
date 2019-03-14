import * as Styled from './SignIn.style';

class SignIn extends React.PureComponent {
  state = {
    login: '',
    password: ''
  };

  onChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  onSubmit = (e) => {
    e.preventDefault();
  };

  render() {
    const { login, password } = this.state;
    const isInvalid = password === '' || login === '';

    return (
      <Styled.div>
        <form onSubmit={e => this.onSubmit(e)}>
          <input
            name="login"
            value={login}
            onChange={this.onChange}
            type="text"
            placeholder="Email or Username"
          />
          <input
            name="password"
            value={password}
            onChange={this.onChange}
            type="password"
            placeholder="Password"
          />
          <button type="submit" disabled={isInvalid}>
            Sign In
          </button>

          {/* {error && <ErrorMessage error={error} />} */}
        </form>
      </Styled.div>
    );
  }
}

export default SignIn;
