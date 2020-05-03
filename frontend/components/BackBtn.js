import Link from 'next/link';

// const Button = (props, ref) => (
//   <Link href={{ pathname: '/' }}>
//     <button ariaLabel='back button'>Back</button>
//   </Link>
// );

// const ButtonRef = React.forwardRef(Button);

const BackBtn = () => (
  <Link href={{ pathname: '/' }}>
    <button aria-label='back button'>Back</button>
  </Link>
);

export default BackBtn;
