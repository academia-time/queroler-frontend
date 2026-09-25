import fs from 'node:fs';

export const fsTasks = {
  criarPasta(caminho: string) {
    if (!fs.existsSync(caminho)) {
      fs.mkdirSync(caminho, { recursive: true });
    }
    return null;
  },

  arquivoExiste(caminho: string) {
    return fs.existsSync(caminho);
  },
};
