import WithUser from '../wrappers/WithUser/WithUser';
import SignOut from './SignOut/SignOut';
import PopUps from './PopUps/PopUps';
import * as Styled from './SignOn.style';

class SignOn extends React.PureComponent {
  state = {
    popUp: ''
  };

  render() {
    const { popUp } = this.state;

    return (
      <WithUser>
        {me => (
          <Styled.divSignOn>
            {me ? (
              <SignOut />
            ) : (
              <>
                <Styled.purpleLinkBtn
                  onClick={() => this.setState({ popUp: 'signIn' })}
                >
                  Sign In
                </Styled.purpleLinkBtn>

                <Styled.orangeLinkBtn
                  onClick={() => this.setState({ popUp: 'signUp' })}
                >
                  Sign Up
                </Styled.orangeLinkBtn>

                {popUp && (
                  <PopUps
                    popUp={popUp}
                    setPopUp={popUpName => this.setState({ popUp: popUpName })}
                  />
                )}
              </>
            )}
          </Styled.divSignOn>
        )}
      </WithUser>
    );
  }
}

export default SignOn;
