import PropTypes from 'prop-types';
import { Query } from 'react-apollo';

import DisplayLoading from '../../components/DisplayLoading/DisplayLoading';
import DisplayError from '../../components/DisplayError/DisplayError';
import SignOn from '../../components/SignOn/SignOn';
import { IS_LOGGED_IN } from '../../graphql/queries';
import * as sc from './Page.style';

const Authenticated = React.memo(props => props.children);

const UnAuthenticated = React.memo(() => <SignOn />);

const Page = React.memo(props => (
  <Query query={IS_LOGGED_IN}>
    {({ loading, error, data }) => {
      if (loading) return <DisplayLoading />;
      if (error) return <DisplayError error={error} />;

      return data.isLoggedIn ? (
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
