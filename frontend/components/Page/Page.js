import PropTypes from 'prop-types';
import { Query } from 'react-apollo';

import DisplayLoading from '../DisplayLoading/DisplayLoading';
import DisplayError from '../DisplayError/DisplayError';
import Layout from '../Layout/Layout';
import SignOn from '../SignOn/SignOn';
import { IS_LOGGED_IN } from '../../graphql/queries';

const Authenticated = React.memo(props => <Layout {...props} />);

const UnAuthenticated = React.memo(() => <SignOn />);

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
