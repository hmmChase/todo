import PropTypes from 'prop-types';
import Link from 'next/link';
import { ExpandIconBtn } from '../../atoms/IconBtn/IconBtn';
// import { useRouter } from 'next/router';
// import * as sc from './DetailIcon.style';

const DetailIcon = props => {
  // const router = useRouter();

  // <Link href={{ pathname: '/idea', query: { id: props.id } }}>
  // as={`/idea/${props.id}`}

  return (
    <Link href={`/idea/${props.id}`}>
      {/* <a > */}
      <ExpandIconBtn
        aria-label='detail icon'
        // onClick={() =>
        //   router.push('/idea', `idea?id=${props.id}`, { id: props.id })
        // }
      />
      {/* </a> */}
    </Link>
  );
};

// http://localhost:8008/idea?id=ck5h7pmp1v1300b009uskbj2k

DetailIcon.propTypes = {
  id: PropTypes.string.isRequired
};

export default React.memo(DetailIcon);
