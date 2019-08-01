import { Query } from 'react-apollo';

// import { SignOut, PopUps } from '..';
import SignOut from '../SignOut/SignOut';
import PopUps from './PopUps/PopUps';
import { IS_LOGGED_IN } from '../../graphql/queries';
import * as sc from './SignOn.style';

class SignOn extends React.PureComponent {
  state = { popUp: '' };

  render() {
    const { popUp } = this.state;

    return (
      <Query query={IS_LOGGED_IN}>
        {({ loading, error, data }) => (
          <sc.signOn>
            {data && data.isLoggedIn ? (
              <SignOut />
            ) : (
              <>
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
              </>
            )}
          </sc.signOn>
        )}
      </Query>
    );
  }
}

export default SignOn;
