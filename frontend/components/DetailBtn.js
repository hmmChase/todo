import PropTypes from 'prop-types';
import Link from 'next/link';

const DetailBtn = (props) => (
  <Link href='/idea/[id]' as={`/idea/${props.id}`}>
    <button aria-label='detail button'>></button>
  </Link>
);

DetailBtn.propTypes = {
  id: PropTypes.string.isRequired,
};

export default React.memo(DetailBtn);
