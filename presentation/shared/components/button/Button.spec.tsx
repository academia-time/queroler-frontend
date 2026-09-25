import {
  render,
  screen,
  fireEvent,
} from '@/presentation/shared/lib/test-utils';
import { Button } from '@/presentation/shared/components/button/Button';
import { ArrowRight } from 'lucide-react';

const makeSut = (props = {}) => {
  return render(<Button {...props} />);
};

describe('Button', () => {
  it('deve renderizar o texto corretamente', () => {
    makeSut({ children: 'Entrar' });
    expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument();
  });

  it('deve chamar onClick ao clicar', () => {
    const handleClick = jest.fn();
    makeSut({ onClick: handleClick, children: 'Clique' });
    fireEvent.click(screen.getByRole('button', { name: /clique/i }));
    expect(handleClick).toHaveBeenCalled();
  });

  it('deve renderizar ícone à direita', () => {
    makeSut({
      iconRight: <ArrowRight data-testid="icon-right" />,
      children: 'Avançar',
    });
    expect(screen.getByTestId('icon-right')).toBeInTheDocument();
  });

  it('deve renderizar ícone à esquerda', () => {
    makeSut({
      iconLeft: <ArrowRight data-testid="icon-left" />,
      children: 'Voltar',
    });
    expect(screen.getByTestId('icon-left')).toBeInTheDocument();
  });

  it('deve aplicar a variante primary', () => {
    makeSut({ variant: 'primary', children: 'Primary' });
    const btn = screen.getByRole('button', { name: /primary/i });
    expect(btn).toHaveClass('bg-primary-button');
  });

  it('deve aplicar a variante secondary', () => {
    makeSut({ variant: 'secondary', children: 'Secondary' });
    const btn = screen.getByRole('button', { name: /secondary/i });
    expect(btn).toHaveClass('bg-secondary-button');
  });

  it('não deve permitir clique quando desabilitado', () => {
    const handleClick = jest.fn();
    makeSut({ disabled: true, onClick: handleClick, children: 'Desabilitado' });
    const btn = screen.getByRole('button', { name: /desabilitado/i });
    expect(btn).toBeDisabled();
    fireEvent.click(btn);
    expect(handleClick).not.toHaveBeenCalled();
  });
});
