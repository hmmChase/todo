import PropTypes from 'prop-types';
import Link from 'next/link';

const BackBtn = (props) => (
  <Link href={{ pathname: props.path }}>
    <button aria-label='back'>&lt; Back</button>
  </Link>
);

BackBtn.propTypes = {
  path: PropTypes.string.isRequired,
};

export default BackBtn;
