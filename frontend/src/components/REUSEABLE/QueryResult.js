import PropTypes from 'prop-types';

import DisplayStatus from '../REUSEABLE/DisplayStatus';

// Conditionally renders Apollo hook states

const QueryResult = props => {
  const { loading, error, data, children } = props;

  if (loading) return <DisplayStatus status='loading' />;

  if (error) return <DisplayStatus status='error' error={error} />;

  if (!data)
    return <DisplayStatus status='info'>Nothing to show...</DisplayStatus>;

  if (data) return children;

  return <DisplayStatus status='error' error={{ message: 'ERROR' }} />;
};

QueryResult.propTypes = {
  children: PropTypes.node.isRequired,
  data: PropTypes.any,
  error: PropTypes.object,
  loading: PropTypes.bool
};

export default QueryResult;
