import { render, cleanup, prettyDOM, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import Header from './Header';
import theme from '../../../public/styles/theme.style';

jest.mock('../SignOutBtn/SignOutBtn', () => () => <div>SignOutBtn</div>);

const arrage = (newProps = {}) => {
  const titleText = '3jd9k4jkf8n4';
  const defaultProps = { ideaId: titleText };
  const mockProps = { ...defaultProps, ...newProps };

  const result = render(
    <ThemeProvider theme={theme}>
      <Header {...mockProps} />
    </ThemeProvider>
  );

  const title = () => result.queryByText(titleText);
  const signOutBtn = () => result.queryByText('SignOutBtn');

  return { ...result, title, signOutBtn };
};

describe('Header', () => {
  afterEach(cleanup);

  it('renders elements', () => {
    const com = arrage();

    expect(com.title()).toBeInTheDocument();
    expect(com.signOutBtn()).toBeInTheDocument();
  });
});

// import { render, cleanup, prettyDOM, fireEvent } from '@testing-library/react';
// import { ThemeProvider } from 'styled-components';
// import TopMain from './TopMain';
// import theme from '../../../public/styles/theme.style';

// jest.mock('../SignOutBtn/SignOutBtn', () => () => <div>SignOutBtn</div>);
// jest.mock('../IdeaCardForm/IdeaCardForm', () => () => <div>IdeaCardForm</div>);

// const arrage = (newProps = {}) => {
//   const defaultProps = {};
//   const mockProps = { ...defaultProps, ...newProps };

//   const result = render(
//     <ThemeProvider theme={theme}>
//       <TopMain {...mockProps} />
//     </ThemeProvider>
//   );

//   const title = () => result.queryByText('Starter');
//   const signOutBtn = () => result.queryByText('SignOutBtn');
//   const ideaCardForm = () => result.queryByText('IdeaCardForm');

//   return { ...result, title, signOutBtn, ideaCardForm };
// };

// describe('TopMain', () => {
//   afterEach(cleanup);

//   it('renders elements', () => {
//     const com = arrage();

//     expect(com.title()).toBeInTheDocument();
//     expect(com.signOutBtn()).toBeInTheDocument();
//     expect(com.ideaCardForm()).toBeInTheDocument();
//   });
// });

// import { render, cleanup, prettyDOM, fireEvent } from '@testing-library/react';
// import { ThemeProvider } from 'styled-components';
// import TopDetail from './TopDetail';
// import theme from '../../../public/styles/theme.style';

// jest.mock('../SignOutBtn/SignOutBtn', () => () => <div>SignOutBtn</div>);

// const arrage = (newProps = {}) => {
//   const titleText = '3jd9k4jkf8n4';
//   const defaultProps = { ideaId: titleText };
//   const mockProps = { ...defaultProps, ...newProps };

//   const result = render(
//     <ThemeProvider theme={theme}>
//       <TopDetail {...mockProps} />
//     </ThemeProvider>
//   );

//   const title = () => result.queryByText(titleText);
//   const signOutBtn = () => result.queryByText('SignOutBtn');

//   return { ...result, title, signOutBtn };
// };

// describe('TopDetail', () => {
//   afterEach(cleanup);

//   it('renders elements', () => {
//     const com = arrage();

//     expect(com.title()).toBeInTheDocument();
//     expect(com.signOutBtn()).toBeInTheDocument();
//   });
// });
