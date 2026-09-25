import { faker } from '@faker-js/faker/locale/pt_BR';

export type DadosLivro = {
  isbn?: string;
  titulo?: string;
  autor?: string;
  editora?: string;
  ano?: string;
  paginas?: string;
  sinopse?: string;
};

export class GeradorDadosLivro {
  static criar(override: DadosLivro = {}): DadosLivro {
    return {
      isbn:
        override.isbn ??
        faker.helpers.arrayElement([
          faker.string.numeric(10),
          faker.string.numeric(13),
        ]),
      titulo: override.titulo,
      autor: override.autor,
      editora: override.editora,
      ano: override.ano,
      paginas: override.paginas,
      sinopse: override.sinopse,
    };
  }

  static criarCompleto(override: DadosLivro = {}): DadosLivro {
    return {
      isbn:
        override.isbn ??
        faker.helpers.arrayElement([
          faker.string.numeric(10),
          faker.string.numeric(13),
        ]),
      titulo: override.titulo ?? faker.lorem.words(3),
      autor:
        override.autor ??
        `${faker.person.firstName()} ${faker.person.lastName()}`,
      editora: override.editora ?? faker.company.name(),
      ano:
        override.ano ?? faker.date.past({ years: 30 }).getFullYear().toString(),
      paginas:
        override.paginas ?? faker.number.int({ min: 10, max: 2000 }).toString(),
      sinopse: override.sinopse ?? faker.lorem.sentences(3),
    };
  }

  static exibirDadosLivro(DadosLivro: DadosLivro): DadosLivro {
    return {
      isbn: DadosLivro.isbn,
      titulo: DadosLivro.titulo,
      autor: DadosLivro.autor,
      editora: DadosLivro.editora,
      ano: DadosLivro.ano,
      paginas: DadosLivro.paginas,
      sinopse: DadosLivro.sinopse,
    };
  }
}
