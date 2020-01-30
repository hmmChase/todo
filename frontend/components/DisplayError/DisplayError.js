import PropTypes from 'prop-types';
import * as sc from './DisplayError.style';

const DisplayError = props => {
  if (props.error.graphQLErrors && props.error.graphQLErrors.length) {
    return (
      <sc.DisplayError data-testid='DisplayError'>
        {props.error.graphQLErrors.map((error, i) => (
          <li key={`error${i}`}>{error.message}</li>
        ))}
      </sc.DisplayError>
    );
  }

  if (props.error.message) {
    return (
      <sc.DisplayError data-testid='DisplayError'>
        <li>{props.error.message}</li>
      </sc.DisplayError>
    );
  }

  return (
    <sc.DisplayError data-testid='DisplayError'>
      <li>Opps, something went wrong.</li>
    </sc.DisplayError>
  );
};

DisplayError.defaultProps = { error: {} };

DisplayError.propTypes = {
  error: PropTypes.shape({
    graphQLErrors: PropTypes.array,
    message: PropTypes.string
  })
};

export default React.memo(DisplayError);
