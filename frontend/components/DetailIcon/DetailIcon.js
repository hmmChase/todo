import PropTypes from 'prop-types';
import Link from 'next/link';
import * as sc from './DetailIcon.style';

const DetailIcon = props => (
  <Link href={{ pathname: '/idea', query: { id: props.id } }}>
    <sc.aLink aria-label='detail icon'>
      <sc.DetailIcon type='up-square' theme='twoTone' />
    </sc.aLink>
  </Link>
);

DetailIcon.propTypes = {
  id: PropTypes.string.isRequired
};

export default React.memo(DetailIcon);
