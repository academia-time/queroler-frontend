import userEvent from '@testing-library/user-event';

import { InputProps } from '@/presentation/shared/ui-model/shared.model';
import { render, screen } from '@/presentation/shared/lib/test-utils';
import { Input } from '@/presentation/shared/components';

const defaultProps: InputProps = {
  label: 'Label padrão',
  id: 'input-id',
};

const makeSut = (props?: Partial<InputProps>) => {
  return render(<Input {...defaultProps} {...props} />);
};

describe('Input', () => {
  it('deve renderizar com label e placeholder', () => {
    makeSut({ label: 'E-mail', id: 'email', placeholder: 'Digite seu e-mail' });
    expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/digite seu e-mail/i)
    ).toBeInTheDocument();
  });

  it('deve renderizar com ícone', () => {
    makeSut({
      label: 'Senha',
      id: 'senha',
      icon: <span data-testid="icon">icon</span>,
    });
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('deve chamar onChange ao digitar', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    makeSut({ label: 'Nome', id: 'nome', onChange: handleChange });
    const input = screen.getByLabelText(/nome/i);
    await user.type(input, 'abc');
    expect(handleChange).toHaveBeenCalled();
  });

  it('deve ficar desabilitado quando recebe prop disabled', () => {
    makeSut({ label: 'Desabilitado', id: 'disabled', disabled: true });
    expect(screen.getByLabelText(/desabilitado/i)).toBeDisabled();
  });

  it('deve aplicar className customizado', () => {
    makeSut({ label: 'Classe', id: 'classe', className: 'classe-custom' });
    const input = screen.getByLabelText(/classe/i);
    expect(input).toHaveClass('classe-custom');
  });

  it('deve alternar a visibilidade da senha quando habilitado', async () => {
    const user = userEvent.setup();

    makeSut({
      label: 'Senha',
      id: 'senha',
      type: 'password',
      showPasswordToggle: true,
    });

    const input = screen.getByLabelText(/senha/i, { selector: 'input' });
    const toggleButton = screen.getByRole('button', {
      name: /mostrar senha/i,
    });

    expect(input).toHaveAttribute('type', 'password');

    await user.click(toggleButton);

    expect(input).toHaveAttribute('type', 'text');
    expect(
      screen.getByRole('button', { name: /ocultar senha/i })
    ).toBeInTheDocument();
  });
});
