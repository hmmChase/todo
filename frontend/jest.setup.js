import 'jest-styled-components';
import '@testing-library/jest-dom/extend-expect';

window.fetch = () => {
  throw Error('You should mock fetch()');
};
