import PropTypes from 'prop-types';
import Link from 'next/link';

import * as sc from './DetailIcon.style';

// https://github.com/zeit/next.js/issues/7915
const DetailIconRef = React.forwardRef((props, ref) => (
  <sc.DetailIcon {...props} forwardedRef={ref} />
));

const DetailIcon = React.memo(props => (
  <Link prefetch href={{ pathname: '/idea', query: { id: props.id } }} passHref>
    <DetailIconRef />
  </Link>
));

DetailIcon.propTypes = {
  id: PropTypes.string.isRequired
};

export default DetailIcon;
