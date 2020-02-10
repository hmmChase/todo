import PropTypes from 'prop-types';
import Link from 'next/link';
// import { useRouter } from 'next/router';

import IconBtn from '../atoms/buttons/IconBtn/IconBtn';
import * as sc from './DetailIcon.style';

const DetailIcon = props => {
  // const router = useRouter();

  // <Link href={{ pathname: '/idea', query: { id: props.id } }}>
  // as={`/idea/${props.id}`}

  return (
    <Link href={`/idea/${props.id}`}>
      <sc.aLink aria-label='detail icon'>
        <IconBtn
          type='up-square'
          // onClick={() =>
          //   router.push('/idea', `idea?id=${props.id}`, { id: props.id })
          // }
        />
      </sc.aLink>
    </Link>
  );
};

// http://localhost:8008/idea?id=ck5h7pmp1v1300b009uskbj2k

DetailIcon.propTypes = {
  id: PropTypes.string.isRequired
};

export default React.memo(DetailIcon);
