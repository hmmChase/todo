import DisplayLoading from './DisplayLoading';
import DisplayError from './DisplayError';
import DisplayInfo from './DisplayInfo';

/**
 * Conditionally renders Apollo useQuery hook states
 */

const QueryResult = props => {
  const { loading, error, data, children } = props;

  if (loading) return <DisplayLoading />;

  if (error) return <DisplayError error={error} />;

  if (!data) return <DisplayInfo>Nothing to show...</DisplayInfo>;

  if (data) return children;

  return <DisplayError error={{ message: 'ERROR' }} />;
};

export default QueryResult;
