import { render, screen } from '@testing-library/react';
import { AuthProvider, AuthContext } from './AuthContext';
import { useContext } from 'react';

const TestComponent = () => {
  const { isAuthenticated } = useContext(AuthContext);
  return <div>{isAuthenticated ? 'Authenticated' : 'Not Authenticated'}</div>;
};

describe('AuthContext', () => {
  it('provides the correct authentication status', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    expect(screen.getByText('Not Authenticated')).toBeInTheDocument();
  });
});