import PropTypes from 'prop-types';
import AlertMsg from '../../atoms/AlertMsg/AlertMsg';
import * as sc from './DisplayError.style';

const DisplayError = props => {
  if (props.error.graphQLErrors && props.error.graphQLErrors.length) {
    return (
      <sc.ErrorList data-testid='DisplayError'>
        {props.error.graphQLErrors.map((error, i) => (
          <sc.ErrorItem key={`error${i}`}>
            <AlertMsg message={error.message} type='error' />
          </sc.ErrorItem>
        ))}
      </sc.ErrorList>
    );
  }

  if (props.error.message) {
    return (
      // <sc.DisplayError data-testid='DisplayError'>
      <AlertMsg message={props.error.message} type='error' />
      // </sc.DisplayError>
    );
  }

  return (
    // <sc.DisplayError data-testid='DisplayError'>
    <AlertMsg message='Opps, something went wrong.' type='error' />
    // </sc.DisplayError>
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
