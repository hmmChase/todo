import Link from 'next/link';

const BackBtn = () => (
  <Link href={{ pathname: '/' }}>
    <button aria-label='back'>Back</button>
  </Link>
);

export default BackBtn;
