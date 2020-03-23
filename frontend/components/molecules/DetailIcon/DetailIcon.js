import PropTypes from 'prop-types';
import Link from 'next/link';
import { ExpandIconBtn } from '../../atoms/IconBtn/IconBtn';
// import { useRouter } from 'next/router';
// import * as sc from './DetailIcon.style';

const Icon = (props, ref) => {
  // const router = useRouter();

  return (
    <Link
      href={{ pathname: '/idea', query: { id: props.id } }}
      as={`/idea/${props.id}`}
    >
      <ExpandIconBtn
        className={props.className}
        aria-label='detail icon'
        // onClick={() =>
        // router.push('/idea', `idea?id=${props.id}`, { id: props.id })
        // }
      />
    </Link>
  );
};

const IconRef = React.forwardRef(Icon);

const DetailIcon = props => <IconRef {...props} />;

Icon.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string
};

DetailIcon.propTypes = {
  id: PropTypes.string.isRequired
};

export default React.memo(DetailIcon);
