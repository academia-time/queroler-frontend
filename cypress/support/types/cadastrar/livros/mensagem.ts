export type LivroMensagem = {
  mensagemToastNoCadastraLivro: {
    ISBNNaoEncontrado: string;
    registroDeLivroSucesso: string;
    registroDeLivroCancelado: string;
    ISBNJaCadastrado: string;
    ISBNEncontrado: string;
  };
};

export type CampoInvalidosMensagem = {
  campoObrigatorioCadastrarLivro: {
    ISBNObrigatorio: string;
    tituloObrigatorio: string;
    autorObrigatorio: string;
    editoraObrigatoria: string;
    anoPublicacaoObrigatorio: string;
    numeroDePaginasObrigatorio: string;
    sinopseObrigatorio: string;
  };
  avisoErro: {
    campoAutorNaoDeveConterNumerosEEspeciais: string;
    isbnDeveConterApenasNumeros: string;
    anoPublicacaoNaoPodeMaiorQueAtual: string;
    anoPublicacaoDeveTer4Digitos: string;
    anoPublicacaoDeveConterApenasNumeros: string;
    numeroDePaginasDeveConterApenasNumeros: string;
  };
};

export type EstruturaMensagem = {
  labelsCadastrarLivro: {
    isbn: string;
    tituloDoLivro: string;
    autores: string;
    editora: string;
    anoDePublicacao: string;
    numeroDePaginas: string;
    idioma: string;
    sinopse: string;
    capaDoLivro: string;
  };
};

export type UploadFormatoInvalido = {
  avisoErro: {
    formatoArquivoInvalido: string;
  };
};

export type UploadImagem = {
  avisoErro: {
    imagemMaiorQue10MB: string;
  };
};
