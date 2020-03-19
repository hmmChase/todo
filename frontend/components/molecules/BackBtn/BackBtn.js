import PropTypes from 'prop-types';
import Link from 'next/link';
import * as sc from './BackBtn.style';

const BackBtn = props => (
  <Link href={{ pathname: '/' }}>
    <sc.AntButton
      className={props.className}
      ariaLabel='back button'
      type='primary'
    >
      <sc.LeftIcon />
      Back
    </sc.AntButton>
  </Link>
);

BackBtn.propTypes = {
  className: PropTypes.string
};

export default BackBtn;
