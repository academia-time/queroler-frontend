import { faker } from '@faker-js/faker/locale/pt_BR';

export const gerarSenha = (): string => {
  const maiuscula = faker.string.alpha({ length: 1, casing: 'upper' });
  const minuscula = faker.string.alpha({ length: 2, casing: 'lower' });
  const especial = faker.helpers.arrayElement(['@', '#', '!', '$', '%']);
  const numero = faker.string.numeric({ length: 2 });
  const resto = faker.string.alphanumeric({ length: 3 });
  return faker.helpers
    .shuffle([...maiuscula, ...minuscula, ...numero, especial, ...resto])
    .join('');
};
