import Link from 'next/link';
import { passResetSuccessful } from '../../../config';

const ResetPassSuccess = () => (
  <fieldset>
    <h2>Reset Password</h2>

    <p>{passResetSuccessful}</p>

    <Link href={{ pathname: '/' }}>
      <button aria-label='home button'>Home</button>
    </Link>
  </fieldset>
);

export default ResetPassSuccess;
