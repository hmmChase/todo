import { Query } from 'react-apollo';
import SignIn from './SignIn/SignIn';
import SignUp from './SignUp/SignUp';
import * as Styled from './SignOn.style';
import * as user from '../../graphql/Queries/user';

class SignOn extends React.PureComponent {
  state = {
    showPopup: ''
  };

  render() {
    const { showPopup } = this.state;

    return (
    // <Query query={user.ME_QUERY}>
    //   {({ data }) => {
    // console.log(' : ---------------------------------');
    // console.log(' : SignOn -> render -> data', data);
    // console.log(' : ---------------------------------');
    // const me = data.me ? data.me : null;

      // return (
      <Styled.div>
        {/* {me && <button type="button">Sign Out</button>} */}
        {/* {!me && ( */}
        <>
          <Styled.aSignIn onClick={() => this.setState({ showPopup: 'signIn' })}>
            Sign In
          </Styled.aSignIn>
          <Styled.aSignUp onClick={() => this.setState({ showPopup: 'signUp' })}>
            Sign Up
          </Styled.aSignUp>
          {showPopup && (
            <Styled.divPopup>
              <Styled.divOuter onClick={() => this.setState({ showPopup: '' })} />
              <Styled.divInner>
                {showPopup === 'signIn' && <SignIn />}
                {showPopup === 'signUp' && <SignUp />}
              </Styled.divInner>
            </Styled.divPopup>
          )}
        </>
        {/* )} */}
      </Styled.div>
      // );
      //   }}
      // </Query>
    );
  }
}

export default SignOn;
