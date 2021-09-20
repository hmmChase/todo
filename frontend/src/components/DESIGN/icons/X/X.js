import PropTypes from 'prop-types';

const X = props => (
  <svg
    aria-label={props['aria-label']}
    data-testid={props['data-testid']}
    className={props.className}
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 492 492'
  >
    <path d='M300.2 246L484.1 62c5.1-5.1 7.9-11.8 7.9-19 0-7.2-2.8-14-7.9-19L468 7.9C462.9 2.8 456.2 0 449 0c-7.2 0-14 2.8-19 7.9L246 191.8 62 7.9C56.9 2.8 50.2 0 43 0c-7.2 0-14 2.8-19 7.9L7.9 24c-10.5 10.5-10.5 27.6 0 38.1L191.8 246 7.9 430C2.8 435.1 0 441.8 0 449c0 7.2 2.8 14 7.9 19L24 484.1c5.1 5.1 11.8 7.9 19 7.9 7.2 0 14-2.8 19-7.9l184-184 184 184c5.1 5.1 11.8 7.9 19 7.9 7.2 0 14-2.8 19-7.9l16.1-16.1c5.1-5.1 7.9-11.8 7.9-19 0-7.2-2.8-14-7.9-19L300.2 246z' />
  </svg>
);

X.propTypes = {
  'aria-label': PropTypes.string,
  'data-testid': PropTypes.string,
  className: PropTypes.string
};

export default X;
