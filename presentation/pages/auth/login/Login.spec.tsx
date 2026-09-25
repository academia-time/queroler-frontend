import { render, screen } from '@/presentation/shared/lib/test-utils';
import { Login } from '@/presentation/pages/auth';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    refresh: jest.fn(),
  }),
}));

jest.mock('@/presentation/shared/lib/auth-context', () => ({
  useAuth: () => ({
    isAuthenticated: false,
    setAuthenticated: jest.fn(),
  }),
}));

describe('Login page', () => {
  it('deve renderizar o heading de boas-vindas', () => {
    render(<Login />);

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /bem-vindo/i,
      })
    ).toBeInTheDocument();
  });
});
