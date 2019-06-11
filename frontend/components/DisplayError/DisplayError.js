/* eslint-disable react/no-array-index-key */
import PropTypes from 'prop-types';
import * as sc from './DisplayError.style';

const DisplayError = React.memo(props => {
  if (props.error.graphQLErrors) {
    return (
      <sc.divError snapshot="DisplayError">
        {props.error.graphQLErrors.map((e, i) => (
          <p key={e.message.length + i}>{e.message}</p>
        ))}
      </sc.divError>
    );
  }

  if (props.error.message)
    return (
      <sc.divError snapshot="DisplayError">
        <p>{props.error.message}</p>
      </sc.divError>
    );

  return (
    <sc.divError snapshot="DisplayError">
      Opps, something went wrong.
    </sc.divError>
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
