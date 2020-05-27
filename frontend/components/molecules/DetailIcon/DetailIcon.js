import PropTypes from 'prop-types';
import Link from 'next/link';
import { ExpandIconBtn } from '../../atoms/IconBtn/IconBtn';
// import * as sc from './DetailIcon.style';

const DetailIcon = (props) => (
  <Link
    // href={{ pathname: '/idea', query: { id: props.id } }}
    href='/idea/[id]'
    as={`/idea/${props.id}`}
  >
    <div>
      <ExpandIconBtn className={props.className} aria-label='idea detail' />
    </div>
  </Link>
);

DetailIcon.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
};

export default React.memo(DetailIcon);
