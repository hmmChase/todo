import PropTypes from 'prop-types';
import * as Styled from './Error.style';

const DisplayError = ({ error }) => {
  if (!error || !error.message) return null;
  if (
    error.networkError &&
    error.networkError.result &&
    error.networkError.result.errors.length
  ) {
    return error.networkError.result.errors.map((e, i) => (
      <Styled.divError key={i}>
        <p>
          <strong>Shoot!</strong>
          {e.message.replace('GraphQL error: ', '')}
        </p>
      </Styled.divError>
    ));
  }

  return (
    <Styled.divError>
      <p>{error.message.replace('GraphQL error: ', '')}</p>
    </Styled.divError>
  );
};

DisplayError.defaultProps = {
  error: {}
};

DisplayError.propTypes = {
  error: PropTypes.object
};

export default DisplayError;
