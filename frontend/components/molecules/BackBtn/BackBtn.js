import PropTypes from 'prop-types';
import Link from 'next/link';
import * as sc from './BackBtn.style';

const Button = (props, ref) => (
  <sc.AntButton
    className={props.className}
    ariaLabel='back button'
    type='primary'
  >
    <sc.LeftIcon />
    Back
  </sc.AntButton>
);

const ButtonRef = React.forwardRef(Button);

const BackBtn = props => (
  <Link href={{ pathname: '/' }}>
    <ButtonRef {...props} />
  </Link>
);

Button.propTypes = {
  className: PropTypes.string
};

export default BackBtn;
