import PropTypes from 'prop-types';

const PopupModal = props => (
  <div
    aria-label={props['aria-label']}
    data-testid={props['data-testid']}
    className={props.className}
    title={props.title}
    visible={props.visible}
    width={props.width}
    onCancel={props.onCancel}
    footer={props.footer}
  >
    {props.children}
  </div>
);

PopupModal.propTypes = {
  'aria-label': PropTypes.string,
  'data-testid': PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.element.isRequired,
  footer: PropTypes.element,
  onCancel: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  width: PropTypes.string.isRequired
};

export default React.memo(PopupModal);
