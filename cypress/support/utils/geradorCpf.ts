import { faker } from '@faker-js/faker/locale/pt_BR';

export const gerarCpf = (): string => {
  const n = Array.from({ length: 9 }, () =>
    faker.number.int({ min: 0, max: 9 })
  );
  const d1 = 11 - (n.reduce((acc, val, i) => acc + val * (10 - i), 0) % 11);
  const dig1 = d1 >= 10 ? 0 : d1;
  const d2 =
    11 - ([...n, dig1].reduce((acc, val, i) => acc + val * (11 - i), 0) % 11);
  const dig2 = d2 >= 10 ? 0 : d2;
  const [a, b, c, d, e, f, g, h, i] = n;

  return `${a}${b}${c}.${d}${e}${f}.${g}${h}${i}-${dig1}${dig2}`;
};
