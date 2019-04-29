import WithUser from '../wrappers/WithUser/WithUser';
import SignOut from './SignOut/SignOut';
import PopUps from './PopUps/PopUps';
import * as sc from './SignOn.style';

class SignOn extends React.PureComponent {
  state = {
    popUp: ''
  };

  render() {
    const { popUp } = this.state;

    return (
      <WithUser>
        {me => (
          <>
            {me ? (
              <SignOut />
            ) : (
              <div>
                <sc.purpleBtn
                  onClick={() => this.setState({ popUp: 'signIn' })}
                >
                  Sign In
                </sc.purpleBtn>

                <sc.orangeBtn
                  onClick={() => this.setState({ popUp: 'signUp' })}
                >
                  Sign Up
                </sc.orangeBtn>

                {popUp && (
                  <PopUps
                    popUp={popUp}
                    setPopUp={popUpName => this.setState({ popUp: popUpName })}
                  />
                )}
              </div>
            )}
          </>
        )}
      </WithUser>
    );
  }
}

export default SignOn;
