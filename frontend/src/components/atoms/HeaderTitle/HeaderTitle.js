import PropTypes from 'prop-types';
import * as sc from './HeaderTitle.style';

const HeaderTitle = props => (
  <sc.Title
    aria-label={props['aria-label']}
    data-testid={props['data-testid']}
    className={props.className}
  >
    {props.children}
  </sc.Title>
);

HeaderTitle.propTypes = {
  'aria-label': PropTypes.string,
  'data-testid': PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.string.isRequired
};

export default React.memo(HeaderTitle);
