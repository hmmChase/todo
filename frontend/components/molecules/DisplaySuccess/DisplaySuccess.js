import PropTypes from 'prop-types';
import AlertMsg from '../../atoms/AlertMsg/AlertMsg';
import * as sc from './DisplaySuccess.style';

const DisplaySuccess = props => (
  <sc.DisplaySuccess>
    <AlertMsg message={props.message} type='error' />
  </sc.DisplaySuccess>
);

DisplaySuccess.propTypes = { message: PropTypes.string.isRequired };

export default React.memo(DisplaySuccess);
