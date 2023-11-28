import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import SignIn from './SignIn'; // Adjust the path accordingly

// Mocking next/router
jest.mock('next/router', () => ({
  useRouter() {
    return { push: jest.fn() };
  }
}));

// Mocking @apollo/client's useMutation
const mockLogInMutation = jest.fn();
jest.mock('@apollo/client', () => ({
  useMutation: () => [mockLogInMutation, { loading: false }]
}));

// Mocking UserCtx
const mockSetUser = jest.fn();
jest.mock('@/context/User', () => ({
  useContext() {
    return {
      setUser: mockSetUser
    };
  }
}));

describe('<SignIn />', () => {
  it('renders without crashing', () => {
    render(<SignIn />);
  });

  it('changes input values and displays validation errors', async () => {
    render(<SignIn />);

    // Assuming email and password validations fail if empty
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');

    // Clear and trigger validation
    fireEvent.change(emailInput, { target: { value: '' } });
    fireEvent.blur(emailInput);

    fireEvent.change(passwordInput, { target: { value: '' } });
    fireEvent.blur(passwordInput);

    await waitFor(() => {
      expect(screen.getByText(/some email error text/i)).toBeInTheDocument();
      // expect(screen.getByText(/some password error text/i)).toBeInTheDocument();
    });
  });

  it('submits the form', async () => {
    render(<SignIn />);

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const loginButton = screen.getByRole('button', { name: /log in/i });

    // Fill out the form
    fireEvent.change(emailInput, { target: { value: 'test@email.com' } });
    fireEvent.change(passwordInput, { target: { value: 'testPass123$' } });

    // Submit the form
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(mockLogInMutation).toHaveBeenCalledWith({
        variables: {
          email: 'test@email.com',
          password: 'testPass123$'
        }
      });
    });
  });

  // Write more tests as needed (e.g., testing Apollo errors, navigation, etc.)
});
