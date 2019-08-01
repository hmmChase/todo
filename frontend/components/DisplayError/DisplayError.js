import PropTypes from 'prop-types';

import * as sc from './DisplayError.style';

const DisplayError = React.memo(props => {
  if (props.error.graphQLErrors) {
    return (
      <sc.ulError>
        {props.error.graphQLErrors.map((error, i) => (
          <li key={`error${i}`}>{error.message}</li>
        ))}
      </sc.ulError>
    );
  }

  if (props.error.message) {
    return (
      <sc.ulError>
        <li>{props.error.message}</li>
      </sc.ulError>
    );
  }

  return (
    <sc.ulError>
      <li>Opps, something went wrong.</li>
    </sc.ulError>
  );
});

DisplayError.defaultProps = {
  error: {}
};

DisplayError.propTypes = {
  error: PropTypes.shape({
    graphQLErrors: PropTypes.array,
    message: PropTypes.string
  })
};

export default DisplayError;
