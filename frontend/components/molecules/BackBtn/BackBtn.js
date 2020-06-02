import PropTypes from 'prop-types';
import Link from 'next/link';
import * as sc from './BackBtn.style';

const BackBtn = (props) => (
  <Link href={{ pathname: props.path }}>
    <div>
      <sc.Buttonn className={props.className} aria-label='back' type='primary'>
        <sc.Leftt />
        Back
      </sc.Buttonn>
    </div>
  </Link>
);

BackBtn.propTypes = {
  className: PropTypes.string,
  path: PropTypes.string.isRequired,
};

export default BackBtn;
