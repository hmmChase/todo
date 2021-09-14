import styled from 'styled-components';

/**
 * Query Results conditionally renders Apollo useQuery hooks states:
 * loading, error or its children when data is ready
 */

const QueryResult = props => {
  const { loading, error, data, children } = props;

  if (error) return <p>ERROR: {error}</p>;

  if (loading)
    return (
      <SpinnerContainer>
        <p>loading...</p>
      </SpinnerContainer>
    );

  if (!data) return <p>Nothing to show...</p>;

  if (data) return children;
};

export default QueryResult;

/* styled components */

const SpinnerContainer = styled.div({
  // display: 'flex',
  // justifyContent: 'center',
  // alignItems: 'center',
  // width: '100%',
  // height: '100vh'
});
