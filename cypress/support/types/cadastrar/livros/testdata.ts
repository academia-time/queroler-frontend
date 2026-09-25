export type LivroData = {
  nomeDoLivro: string;
};

export type CampoInvalidosData = {
  cadastrarLivroInvalidos: {
    ISBNInvalido: string;
    autorInvalido: string;
    anoPublicacaoFuturo: string;
    anoPublicacaoLetra: string;
    anoPublicacaoMenosDe4Digitos: string;
    numeroDePaginasComLetras: string;
    numeroDePaginasInvalido: string;
  };
};

export type ValidacaoIsbn = {
  isbnCadastrado: string;
};
