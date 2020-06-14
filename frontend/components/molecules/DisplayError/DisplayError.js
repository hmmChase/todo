import PropTypes from 'prop-types';
import AlertMsg from '../../atoms/AlertMsg/AlertMsg';
import * as sc from './DisplayError.style';

const DisplayError = (props) => {
  console.log('DisplayError -> props', props);

  if (props.error.graphQLErrors && props.error.graphQLErrors.length) {
    return (
      <sc.ErrorList>
        {props.error.graphQLErrors.map((error, i) => (
          <sc.ErrorItem key={`error${i}`}>
            <AlertMsg
              data-testid='AlertMsg'
              message={error.message}
              type='error'
            />
          </sc.ErrorItem>
        ))}
      </sc.ErrorList>
    );
  }

  if (props.error.message) {
    return (
      <AlertMsg
        data-testid='AlertMsg'
        message={props.error.message}
        type='error'
      />
    );
  }

  return (
    <AlertMsg
      data-testid='AlertMsg'
      message='Opps, something went wrong.'
      type='error'
    />
  );
};

DisplayError.propTypes = {
  error: PropTypes.exact({
    extraInfo: PropTypes.any,
    graphQLErrors: PropTypes.array,
    networkError: PropTypes.object,
    message: PropTypes.string,
  }),
};

export default React.memo(DisplayError);
