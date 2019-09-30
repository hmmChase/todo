import PropTypes from 'prop-types';

import * as sc from './DisplaySuccess.style';

const DisplaySuccess = React.memo(props => (
  <sc.DisplaySuccess>
    <li>{props.message}</li>
  </sc.DisplaySuccess>
));

DisplaySuccess.propTypes = {
  message: PropTypes.string.isRequired
};

export default DisplaySuccess;
