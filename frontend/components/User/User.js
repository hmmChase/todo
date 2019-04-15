import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import * as query from './User.query';

const User = props => (
  <Query {...props} query={query.ME_QUERY}>
    {payload => props.children(payload)}
  </Query>
);

User.propTypes = {
  children: PropTypes.func.isRequired
};

export default User;
