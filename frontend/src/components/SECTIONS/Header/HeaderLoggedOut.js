import Link from 'next/link';
import { useRouter } from 'next/router';

const HeaderLoggedOut = props => {
  const router = useRouter();

  const isActive = pathname => router.pathname === pathname;

  return (
    <ul>
      <li>
        <Link href='/login'>
          <a data-active={isActive('/login')}>Log in</a>
        </Link>
      </li>

      <li>
        <Link href='/signup'>
          <a data-active={isActive('/signup')}>Sign up</a>
        </Link>
      </li>

      <style jsx>{`
        a[data-active='true'] {
          color: red;
        }
      `}</style>
    </ul>
  );
};

export default HeaderLoggedOut;
