import { faker } from '@faker-js/faker/locale/pt_BR';
import { gerarCpf } from '../../support/utils/geradorCpf';
import { gerarSenha } from '../../support/utils/geradorSenha';
import { gerarDataNascimento } from '../../support/utils/geradorData';

export class GeradorDadosLeitor {
  static gerarDadosCadastro() {
    const senha = gerarSenha();
    return {
      nome: faker.person.firstName(),
      email: faker.internet.email(),
      senha,
      confirmacaoSenha: senha,
      cpf: gerarCpf(),
      dataNascimento: gerarDataNascimento(),
    };
  }
}
