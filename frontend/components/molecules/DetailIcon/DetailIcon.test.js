import { render, cleanup } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import DetailIcon from './DetailIcon';
import theme from '../../../public/styles/theme.style';

const setup = (updatedProps = {}) => {
  const initialProps = { id: '1' };
  const mergedProps = { ...initialProps, ...updatedProps };

  const result = render(
    <ThemeProvider theme={theme}>
      <DetailIcon {...mergedProps} />
    </ThemeProvider>
  );

  const detailIcon = () => result.queryByLabelText('idea details');

  return { ...result, mergedProps, detailIcon };
};

describe('DetailIcon', () => {
  afterEach(cleanup);

  it('matches snapshot', () => {
    const utils = setup();

    expect(utils.baseElement).toMatchSnapshot();
  });

  it('renders elements', () => {
    const utils = setup();

    expect(utils.detailIcon()).toBeInTheDocument();
  });
});
