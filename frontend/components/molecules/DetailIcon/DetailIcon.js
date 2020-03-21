import PropTypes from 'prop-types';
import Link from 'next/link';
import { ExpandIconBtn } from '../../atoms/IconBtn/IconBtn';
// import { useRouter } from 'next/router';
// import * as sc from './DetailIcon.style';

const Icon = (props, ref) => (
  // const router = useRouter();

  <ExpandIconBtn
    className={props.className}
    aria-label='detail icon'
    // onClick={() =>
    //   router.push('/idea', `idea?id=${props.id}`, { id: props.id })
    // }
  />
);

const IconRef = React.forwardRef(Icon);

const DetailIcon = props => (
  // <Link href={`/idea/${props.id}`}>
  // as={`/idea/${props.id}`}
  <Link href={{ pathname: '/idea', query: { id: props.id } }}>
    <IconRef {...props} />
  </Link>
);

// http://localhost:8008/idea?id=ck5h7pmp1v1300b009uskbj2k

Icon.propTypes = {
  className: PropTypes.string
};

DetailIcon.propTypes = {
  id: PropTypes.string.isRequired
};

export default React.memo(DetailIcon);
