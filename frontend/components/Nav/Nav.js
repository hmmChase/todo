import Link from 'next/link';

const Nav = () => (
  <nav>
    <Link href="/">
      <a>Home </a>
    </Link>
    <Link href="examples">
      <a>Examples</a>
    </Link>
  </nav>
);

export default Nav;
