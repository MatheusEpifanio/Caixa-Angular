export class Caixas
{
    constructor
    (
        // public id: number,
        public nome: string,
        public codigo: string,
        public usuarios = {},
        public ativo: boolean
    )
    {}
}