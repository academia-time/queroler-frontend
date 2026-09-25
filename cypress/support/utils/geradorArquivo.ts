import { Fixtures } from '../utils/fixtures';

const gerarPdfFake = (): string => {
  return '%PDF-1.4\n1 0 obj\n<< /Type /Catalog >>\nendobj\n%%EOF';
};

export const gerarESalvarPdf = (): void => {
  cy.task('criarPasta', 'cypress/fixtures/arquivos');
  cy.task('arquivoExiste', Fixtures.documentos.pdf).then((existe) => {
    if (!existe) {
      const conteudo = gerarPdfFake();
      cy.writeFile(Fixtures.documentos.pdf, conteudo, 'binary');
    }
  });
};
