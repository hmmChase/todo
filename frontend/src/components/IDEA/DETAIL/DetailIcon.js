import PropTypes from 'prop-types';
import Link from 'next/link';

import { ExpandIconBtn } from '../../REUSEABLE/IconBtn';

const DetailIcon = props => {
  const { className, ideaId } = props;

  return (
    <Link href={`/idea/${ideaId}`}>
      <div className={className}>
        <ExpandIconBtn aria-label='idea detail' />
      </div>
    </Link>
  );
};

DetailIcon.propTypes = {
  className: PropTypes.string,
  ideaId: PropTypes.string.isRequired
};

export default DetailIcon;
