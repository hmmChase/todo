import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import * as query from './UserWrapper.query';

const UserWrapper = props => (
  <Query {...props} query={query.ME_QUERY}>
    {payload => props.children(payload)}
  </Query>
);

UserWrapper.propTypes = {
  children: PropTypes.func.isRequired
};

export default UserWrapper;
