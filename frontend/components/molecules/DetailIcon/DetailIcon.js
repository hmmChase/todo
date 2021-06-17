import PropTypes from 'prop-types';
import Link from 'next/link';
import { ExpandIconBtn } from '../../atoms/IconBtn/IconBtn';

const DetailIcon = props => (
  <Link href='/idea/[id]' as={`/idea/${props.id}`}>
    <div>
      <ExpandIconBtn aria-label='idea detail' className={props.className} />
    </div>
  </Link>
);

DetailIcon.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string.isRequired
};

export default React.memo(DetailIcon);
