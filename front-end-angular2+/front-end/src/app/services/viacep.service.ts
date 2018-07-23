import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Endereco } from '../entities/endereco';

@Injectable({
  providedIn: 'root'
})
export class ViaCepService {

  private readonly BASE_URL = 'https://viacep.com.br/ws';

  constructor(private http: HttpClient) {}

  buscar(cep: string) {
    return this.http
      .get(`${this.BASE_URL}/${cep}/json/`);
    }

  converterRespostaParaCep(cepResposta): Endereco {
    const novoEndereco = new Endereco();
    novoEndereco.cep = cepResposta.cep;
    novoEndereco.logradouro = cepResposta.logradouro;
    novoEndereco.cidade = cepResposta.localidade;
    novoEndereco.estado = cepResposta.uf;
    return novoEndereco;
}

}
