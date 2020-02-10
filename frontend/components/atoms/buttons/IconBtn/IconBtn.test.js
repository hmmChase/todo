import { render, cleanup, prettyDOM, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import Icon from './IconBtn';
import theme from '../../../../public/styles/theme.style';

// jest.mock('../SomeComponent/SomeComponent', () => () => (
//   <div>SomeComponent</div>
// ));

const arrage = (newProps = {}) => {
  const defaultProps = { onClick: jest.fn() };
  const mockProps = { ...defaultProps, ...newProps };

  const result = render(
    <ThemeProvider theme={theme}>
      <Icon {...mockProps} />
    </ThemeProvider>
  );

  // const inputField = () => result.queryByLabelText('Input Field');
  const submitBtn = () => result.queryByLabelText('Submit');

  // const changeInputField = value =>
  //   fireEvent.change(inputField(), { target: { value } });
  const clickSubmitBtn = () => fireEvent.click(submitBtn());

  return {
    ...result
    // inputField,
    // submitBtn,
    // changeInputField,
    // clickSubmitBtn
  };
};

describe('Icon', () => {
  afterEach(cleanup);

  it('renders components', () => {
    const com = arrage();

    com.debug();

    // console.log(prettyDOM(com.baseElement, 10000));

    // expect(com.inputField()).toBeInTheDocument();
    // expect(com.submitBtn()).toBeInTheDocument();
  });
});
