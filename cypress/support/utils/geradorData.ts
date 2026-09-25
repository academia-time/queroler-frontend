import { faker } from '@faker-js/faker/locale/pt_BR';

export const gerarDataNascimento = (): string => {
  const data = faker.date.birthdate({ min: 18, max: 80, mode: 'age' });
  return `${data.getFullYear()}-${String(data.getMonth() + 1).padStart(2, '0')}-${String(data.getDate()).padStart(2, '0')}`;
};
