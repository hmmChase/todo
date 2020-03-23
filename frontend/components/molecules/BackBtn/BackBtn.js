import PropTypes from 'prop-types';
import Link from 'next/link';
import * as sc from './BackBtn.style';

const Button = (props, ref) => (
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

const ButtonRef = React.forwardRef(Button);

const BackBtn = props => <ButtonRef {...props} />;

Button.propTypes = {
  className: PropTypes.string
};

export default BackBtn;
