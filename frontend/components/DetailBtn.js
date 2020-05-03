import PropTypes from 'prop-types';
import Link from 'next/link';
// import { useRouter } from 'next/router';

const DetailIcon = (props) => {
  // const router = useRouter();

  // <Link href={{ pathname: '/idea', query: { id: props.id } }}>
  // as={`/idea/${props.id}`}

  return (
    // ex: http://localhost:8008/idea?id=ck5h7pmp1v1300b009uskbj2k
    <Link href={`/idea/${props.id}`}>
      <a aria-label='detail button'>
        <button
        // onClick={() =>
        //   router.push('/idea', `idea?id=${props.id}`, { id: props.id })
        // }
        >
          >
        </button>
      </a>
    </Link>
  );
};

DetailIcon.propTypes = {
  id: PropTypes.string.isRequired,
};

export default React.memo(DetailIcon);
