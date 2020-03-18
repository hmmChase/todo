import PropTypes from 'prop-types';
import allCombos from '../../.storybook/allCombos';
import theme from '../../public/styles/theme.style';

const ColorComp = props => (
  <div
    style={{
      height: '100px',
      backgroundColor: props.color[1],
      textAlign: 'right'
    }}
  >
    <span style={{ backgroundColor: '#fff' }}>{props.color[0]}</span>
  </div>
);

ColorComp.propTypes = {
  color: PropTypes.array.isRequired
};

export default { title: 'Design', component: ColorComp };

const data = { color: Object.entries(theme.color) };

export const colors = () => allCombos(ColorComp, data);
