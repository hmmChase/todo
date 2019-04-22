import SignIn from './SignIn/SignIn';
import SignOut from './SignOut/SignOut';
import SignUp from './SignUp/SignUp';
import RequestReset from './RequestReset/RequestReset';
import WithUser from '../wrappers/WithUser/WithUser';
import * as Styled from './SignOn.style';

class SignOn extends React.PureComponent {
  state = {
    showPopup: ''
  };

  render() {
    const { showPopup } = this.state;

    return (
      <WithUser>
        {me => (
          <Styled.div>
            {me ? (
              <SignOut />
            ) : (
              <>
                <Styled.purpleBtn
                  onClick={() => this.setState({ showPopup: 'signIn' })}
                >
                  Sign In
                </Styled.purpleBtn>

                <Styled.orangeBtn
                  onClick={() => this.setState({ showPopup: 'signUp' })}
                >
                  Sign Up
                </Styled.orangeBtn>

                {showPopup && (
                  <Styled.divPopup>
                    <Styled.divOuter
                      onClick={() => this.setState({ showPopup: '' })}
                    />

                    <Styled.divInner>
                      {showPopup === 'signIn' && (
                        <SignIn
                          close={() => this.setState({ showPopup: '' })}
                          requestReset={() =>
                            this.setState({ showPopup: 'requestReset' })
                          }
                        />
                      )}

                      {showPopup === 'signUp' && (
                        <SignUp
                          close={() => this.setState({ showPopup: '' })}
                        />
                      )}

                      {showPopup === 'requestReset' && (
                        <RequestReset
                          close={() => this.setState({ showPopup: '' })}
                        />
                      )}
                    </Styled.divInner>
                  </Styled.divPopup>
                )}
              </>
            )}
          </Styled.div>
        )}
      </WithUser>
    );
  }
}

export default SignOn;
