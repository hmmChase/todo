/* eslint-disable no-console */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import * as Styled from './DisplayError.style';

const DisplayError = React.memo(error => {
  if (error.error.graphQLErrors) {
    return (
      <Styled.divError>
        {error.error.graphQLErrors.map((e, i) => (
          <p key={i}>{e.message}</p>
        ))}
      </Styled.divError>
    );
  }

  if (error.error)
    return (
      <Styled.divError>
        <p>{error.error.message}</p>
      </Styled.divError>
    );

  return (
    <>
      {console.log('Opps: ', error)}
      <Styled.divError>Opps, something went wrong.</Styled.divError>
    </>
  );
});

DisplayError.defaultProps = {
  error: {}
};

DisplayError.propTypes = {
  error: PropTypes.object
};

export default DisplayError;
