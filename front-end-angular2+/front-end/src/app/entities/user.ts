import { Endereco } from './endereco';

export class Usuario {

    nome: string;
    email: string;
    senha: string;
    dataNascimento: string;
    endereco: Endereco;

    constructor() {
        this.endereco = new Endereco();
    }
}
