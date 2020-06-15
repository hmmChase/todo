import { render, cleanup } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import BackBtn from './BackBtn';
import theme from '../../../public/styles/theme.style';

const setup = (updatedProps = {}) => {
  // define initial props
  const initProps = { path: '/' };
  const mergedProps = { ...initProps, ...updatedProps };

  // render component
  const result = render(
    <ThemeProvider theme={theme}>
      <BackBtn {...mergedProps} />
    </ThemeProvider>
  );

  // target elements
  const backBtn = () => result.queryByLabelText('back');

  return { ...result, mergedProps, backBtn };
};

describe('BackBtn', () => {
  afterEach(cleanup);

  it('matches snapshot', () => {
    const utils = setup();

    expect(utils.baseElement).toMatchSnapshot();
  });

  it('renders elements', () => {
    const utils = setup();

    expect(utils.backBtn()).toBeInTheDocument();
  });
});
