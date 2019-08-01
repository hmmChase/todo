import PropTypes from 'prop-types';
import { Query } from 'react-apollo';

// import { Layout, SignIn, SignUp, DisplayLoading, DisplayError } from '..';
import Layout from '../Layout/Layout';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';
import DisplayLoading from '../DisplayLoading/DisplayLoading';
import DisplayError from '../DisplayError/DisplayError';
import { IS_LOGGED_IN } from '../../graphql/queries';

const Authenticated = React.memo(props => <Layout {...props} />);

const UnAuthenticated = React.memo(() => (
  <>
    <SignIn />
    <SignUp />
  </>
));

const Page = React.memo(props => (
  <Query query={IS_LOGGED_IN}>
    {({ loading, error, data }) => {
      if (loading) return <DisplayLoading />;
      if (error) return <DisplayError error={error} />;

      return data && data.isLoggedIn ? (
        <Authenticated {...props} />
      ) : (
        <UnAuthenticated {...props} />
      );
    }}
  </Query>
));

Authenticated.propTypes = {
  children: PropTypes.node.isRequired
};

Page.propTypes = {
  children: PropTypes.node.isRequired
};

export default Page;
