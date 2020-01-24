import { render, cleanup, prettyDOM, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import DetailIcon from './DetailIcon';
import theme from '../../public/styles/theme.style';

const arrage = (props = {}) => {
  const defaultProps = { id: '1', ...props };

  const utils = render(
    <ThemeProvider theme={theme}>
      <DetailIcon {...defaultProps} />
    </ThemeProvider>
  );

  const detailIcon = () => utils.queryByLabelText('detail icon');

  return { ...utils, detailIcon };
};

describe('DetailIcon', () => {
  afterEach(cleanup);

  it('renders DetailIcon', () => {
    const com = arrage();

    expect(com.detailIcon()).toBeInTheDocument();
  });
});
