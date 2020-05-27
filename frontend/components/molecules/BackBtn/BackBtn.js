import PropTypes from 'prop-types';
import Link from 'next/link';
import * as sc from './BackBtn.style';

const BackBtn = (props) => (
  <Link href={{ pathname: props.path }}>
    <div>
      <sc.AntButton className={props.className} ariaLabel='back' type='primary'>
        <sc.LeftIcon />
        Back
      </sc.AntButton>
    </div>
  </Link>
);

BackBtn.propTypes = {
  className: PropTypes.string,
  path: PropTypes.string.isRequired,
};

export default BackBtn;
