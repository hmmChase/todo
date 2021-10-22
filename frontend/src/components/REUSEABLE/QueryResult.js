import PropTypes from 'prop-types';

import DisplayLoading from './DisplayLoading';
import DisplayError from './DisplayError';
import DisplayInfo from './DisplayInfo';

// Conditionally renders Apollo hook states

const QueryResult = props => {
  const { loading, error, data, children } = props;

  if (loading) return <DisplayLoading />;

  if (error) return <DisplayError error={error} />;

  if (!data) return <DisplayInfo>Nothing to show...</DisplayInfo>;

  if (data) return children;

  return <DisplayError error={{ message: 'ERROR' }} />;
};

QueryResult.propTypes = {
  children: PropTypes.node.isRequired,
  data: PropTypes.any,
  error: PropTypes.object,
  loading: PropTypes.bool
};

export default QueryResult;
