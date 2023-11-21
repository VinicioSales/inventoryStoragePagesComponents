export interface Produtos {
    quantidade: number,
    nomeProduto: string,
    centroCusto: string[]
    codigoProduto: string
    unidadeMedida: string[],
}

export interface Produto {
    quantidade: number,
    nomeProduto: string,
    centroCusto: string
    codigoProduto: string
    unidadeMedida: string,
}