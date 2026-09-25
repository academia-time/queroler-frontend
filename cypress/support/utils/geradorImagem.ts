import { Fixtures } from '../utils/fixtures';

/**
 * Gera uma imagem JPEG com pixels aleatórios coloridos.
 * O tamanho final em MB não é definido diretamente - é resultado de:
 * - resolução (largura x altura): mais pixels = mais dados
 * - qualidade (0 a 1): menor compressão = arquivo maior
 * - pixels aleatórios: dificultam a compressão do JPEG, garantindo peso maior
 *
 * Ajuste largura/altura/qualidade por tentativa até atingir o tamanho desejado.
 */
const gerarImagemComoArrayBuffer = (
  largura: number,
  altura: number,
  qualidade: number
): Promise<ArrayBuffer> => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    canvas.width = largura;
    canvas.height = altura;
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    for (let i = 0; i < largura; i++) {
      for (let j = 0; j < altura; j++) {
        ctx.fillStyle = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`;
        ctx.fillRect(i, j, 1, 1);
      }
    }

    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        blob.arrayBuffer().then((buffer) => resolve(buffer));
      },
      'image/jpeg',
      qualidade
    );
  });
};

const salvarImagem = (
  largura: number,
  altura: number,
  qualidade: number,
  caminho: string
): void => {
  cy.wrap(gerarImagemComoArrayBuffer(largura, altura, qualidade)).then(
    (buffer) => {
      cy.writeFile(caminho, Buffer.from(buffer as ArrayBuffer), 'binary');
    }
  );
};

export const gerarEsalvarImagemLeve = (): void => {
  cy.task('criarPasta', 'cypress/fixtures/imagens');
  cy.task('arquivoExiste', Fixtures.imagens.leve).then((existe) => {
    if (!existe) {
      salvarImagem(1000, 1000, 0.5, Fixtures.imagens.leve);
    }
  });
};

export const gerarESalvarImagemPesado = (): void => {
  cy.task('criarPasta', 'cypress/fixtures/imagens');
  cy.task('arquivoExiste', Fixtures.imagens.pesado).then((existe) => {
    if (!existe) {
      salvarImagem(4000, 4000, 0.9, Fixtures.imagens.pesado);
    }
  });
};
