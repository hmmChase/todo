/**
 * Conditionally renders Apollo useQuery hook states
 */

const QueryResult = props => {
  const { loading, error, data, children } = props;

  if (loading) return <p>loading...</p>;

  if (error) return <p>ERROR: {error}</p>;

  if (!data) return <p>Nothing to show...</p>;

  if (data) return children;
};

export default QueryResult;
