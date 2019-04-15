import SignIn from './SignIn/SignIn';
import SignOut from './SignOut/SignOut';
import SignUp from './SignUp/SignUp';
import RequestReset from './RequestReset/RequestReset';
import UserWrapper from '../wrappers/UserWrapper/UserWrapper';
import * as Styled from './SignOn.style';

class SignOn extends React.PureComponent {
  state = {
    showPopup: ''
  };

  render() {
    const { showPopup } = this.state;

    return (
      <UserWrapper>
        {({ data }) => (
          <Styled.div>
            {data.me ? (
              <SignOut />
            ) : (
              <>
                <Styled.aSignIn
                  onClick={() => this.setState({ showPopup: 'signIn' })}
                >
                  Sign In
                </Styled.aSignIn>

                <Styled.aSignUp
                  onClick={() => this.setState({ showPopup: 'signUp' })}
                >
                  Sign Up
                </Styled.aSignUp>

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
      </UserWrapper>
    );
  }
}

export default SignOn;
