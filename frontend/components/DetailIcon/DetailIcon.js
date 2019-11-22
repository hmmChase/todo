import PropTypes from 'prop-types';
import Link from 'next/link';
import * as sc from './DetailIcon.style';

// https://github.com/zeit/next.js/issues/7915
const DetailIconRef = React.forwardRef((props, ref) => (
  <sc.DetailIcon
    {...props}
    forwardedRef={ref}
    type='up-square'
    theme='twoTone'
  />
));

DetailIconRef.displayName = 'DetailIconRef';

const DetailIcon = props => (
  <Link href={{ pathname: '/idea', query: { id: props.id } }} passHref>
    <DetailIconRef />
  </Link>
);

DetailIcon.propTypes = {
  id: PropTypes.string.isRequired
};

export default React.memo(DetailIcon);
