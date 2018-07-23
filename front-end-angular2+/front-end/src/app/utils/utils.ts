import { Usuario } from '../entities/user';

export class Utils {

    constructor() { }
    public static convertDatabaseUserToUser(dataUser: any): Usuario {

        const user = new Usuario();
        user.nome = dataUser.nome;
        user.email = dataUser.email;
        user.dataNascimento = dataUser.dataNascimento;
        user.endereco.cep = dataUser.endereco.cep;
        user.endereco.cidade = dataUser.endereco.cidade;
        user.endereco.estado = dataUser.endereco.estado;
        user.endereco.logradouro = dataUser.endereco.logradouro;

        return user;
    }
}
