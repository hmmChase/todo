import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-styled-components';
import '@testing-library/jest-dom/extend-expect';

configure({ adapter: new Adapter() });

window.fetch = () => {
  throw Error('You should mock fetch()');
};
