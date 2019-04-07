/* eslint-disable react/no-array-index-key */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import * as Styled from './Error.style';

const Error = React.memo(() => {
  if (error.error.networkError) {
    return (
      <>
        {error.error.networkError.result.errors.map((e, i) => (
          <Styled.divError key={i}>
            <p>{e.message.replace('GraphQL error: ', '')}</p>
          </Styled.divError>
        ))}
      </>
    );
  }

  if (error.error.graphQLErrors) {
    return (
      <>
        {error.error.graphQLErrors.map((e, i) => (
          <Styled.divError key={i}>
            <p>{e.message.replace('GraphQL error: ', '')}</p>
          </Styled.divError>
        ))}
      </>
    );
  }

  if (error.error) {
    return <Styled.divError>{error.error.message}</Styled.divError>;
  }

  return <Styled.divError>Opps, something went wrong.</Styled.divError>;
});

Error.defaultProps = {
  error: {}
};

Error.propTypes = {
  error: PropTypes.object
};

export default Error;
