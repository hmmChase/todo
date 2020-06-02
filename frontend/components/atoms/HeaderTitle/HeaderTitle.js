import PropTypes from 'prop-types';
import * as sc from './HeaderTitle.style';

const HeaderTitle = (props) => (
  <sc.Title className={props.className}>{props.children}</sc.Title>
);

HeaderTitle.propTypes = {
  className: PropTypes.string,
  children: PropTypes.string.isRequired,
};

export default React.memo(HeaderTitle);
