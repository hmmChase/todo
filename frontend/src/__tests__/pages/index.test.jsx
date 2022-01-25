import React from 'react';
import { render, screen } from '@testing-library/react';

import IndexPage from '../../pages/index';
// import IndexPage from '@/pages/index';

describe('IndexPage', () => {
  it('renders homepage unchanged', () => {
    const { container } = render(<IndexPage />);

    expect(container).toMatchSnapshot();
  });

  it('renders IndexPage', () => {
    let screen = render(<IndexPage />);

    expect(screen.getByText(/hmmStart/i)).toBeInTheDocument();
  });

  it('renders a heading', () => {
    render(<IndexPage />);

    const heading = screen.getByRole('heading', {
      name: /welcome to next\.js!/i
    });

    expect(heading).toBeInTheDocument();
  });
});
