/* eslint-disable no-console */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import * as sc from './DisplayError.style';

const DisplayError = React.memo(error => {
  if (error.error.graphQLErrors) {
    return (
      <sc.divError>
        {error.error.graphQLErrors.map((e, i) => (
          <p key={i}>{e.message}</p>
        ))}
      </sc.divError>
    );
  }

  if (error.error)
    return (
      <sc.divError>
        <p>{error.error.message}</p>
      </sc.divError>
    );

  return (
    <>
      {console.log('Opps: ', error)}
      <sc.divError>Opps, something went wrong.</sc.divError>
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
