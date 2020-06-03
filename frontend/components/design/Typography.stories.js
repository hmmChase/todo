import PropTypes from 'prop-types';
import allCombos from '../../.storybook/allCombos';

const Typography = (props) => (
  <>
    <p style={{ fontFamily: 'Arial', fontSize: '1rem', margin: 0 }}>
      {props.fonts}:
    </p>

    <span style={{ fontFamily: props.fonts, fontSize: '1.9rem' }}>
      Lorem ipsum dolor sit amet.
    </span>

    <hr />
  </>
);

Typography.propTypes = {
  fonts: PropTypes.string.isRequired,
};

export default { title: 'Design', component: Typography };

const data = {
  fonts: ['initial', 'inherit', 'Open Sans', 'Play', 'Arial', 'sans-serif'],
};

export const typography = () => allCombos(Typography, data);
