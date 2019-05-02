import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import DisplayLoading from '../../DisplayLoading/DisplayLoading';
import DisplayError from '../../DisplayError/DisplayError';
import * as query from './WithUser.query';

const WithUser = React.memo(props => (
  <Query query={query.ME_QUERY} errorPolicy="all">
    {({ loading, error, data }) => {
      if (loading) return <DisplayLoading />;
      if (error) return <DisplayError error={error} />;

      return props.children(data.me);
    }}
  </Query>
));

WithUser.propTypes = {
  children: PropTypes.func.isRequired
};

export default WithUser;
