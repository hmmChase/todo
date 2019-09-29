import PropTypes from 'prop-types';

import * as sc from './DisplaySuccess.style';

const DisplayError = React.memo(props => {
  if (props.error.graphQLErrors) {
    return (
      <sc.DisplayError>
        {props.error.graphQLErrors.map((error, i) => (
          <li key={`error${i}`}>{error.message}</li>
        ))}
      </sc.DisplayError>
    );
  }

  if (props.error.message) {
    return (
      <sc.DisplayError>
        <li>{props.error.message}</li>
      </sc.DisplayError>
    );
  }

  return (
    <sc.DisplayError>
      <li>Opps, something went wrong.</li>
    </sc.DisplayError>
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
