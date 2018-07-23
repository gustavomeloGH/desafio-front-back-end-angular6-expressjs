import { Component, OnInit } from '@angular/core';

import { ViaCepService } from '../services/viacep.service';
import { Usuario } from '../entities/user';
import { Endereco } from '../entities/endereco';

import { DatePipe } from '@angular/common';
import { HttpBackendRequestService } from '../services/http-backend-request.service';
import { HttpEnum } from '../utils/httpEnum';


@Component({
  selector: 'app-cadastro',
  providers: [ViaCepService, HttpBackendRequestService],
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  isDisableAddress: boolean;
  showAlertCep: boolean;
  user: Usuario;
  confirmacaoSenha: string;
  dataNasc: Date;

  constructor( private viaCepService: ViaCepService,
               private datepipe: DatePipe,
               private httpBackendRequest: HttpBackendRequestService ) {
    this.isDisableAddress = true;
    this.showAlertCep = false;
    this.initializeUser();
  }

  ngOnInit() {
  }

  initializeUser() {
    this.user = new Usuario();
    this.dataNasc = null;
    this.confirmacaoSenha = '';
  }

  isDisabled() {
    return this.isDisableAddress;
  }

  eneableAddress() {
    this.isDisableAddress = false;
  }

  disableAddress() {
    this.isDisableAddress = true;
  }
  checkShowAlertCep() {
    if (this.isDisableAddress) {
      this.showAlertCep = true;
    }
  }

  cleanAlert() {
    this.showAlertCep = false;
  }

  searchCep() {
    if (this.user.endereco.cep) {
      if (this.user.endereco.cep.length >= 8) {
        this.cleanAlert();
        this.viaCepService.buscar(this.user.endereco.cep)
        .subscribe(data => {
            this.user.endereco = this.viaCepService.converterRespostaParaCep(data);
            this.eneableAddress();
          });
      }

      if (!this.isDisableAddress && this.user.endereco.cep.length < 9) {
        this.user.endereco = new Endereco();
        this.disableAddress();
      }
    }
  }

  submitForm() {
    const alertErrorMsg = this.validateData();
    if (!alertErrorMsg) {
      this.user.dataNascimento = this.datepipe.transform(this.dataNasc, 'dd/MM/yyyy');
      this.httpBackendRequest.realizarHttpPost(HttpEnum.ADDUSER, this.user)
        .subscribe(
          (result) => {
            console.log(result + ' pegou');
            this.initializeUser();
            alert('Usuário cadastrado com sucesso!');
          },
          (err) => {
            alert('Ocorreu um erro: ' + err.error.sqlMessage);
          }
        );
    } else {
      alert(alertErrorMsg);
    }
  }

  isDataNascSmallerCurrentDate() {
    return this.dataNasc < new Date();
  }

  validateData() {
      let alertMsg = null;
      console.log(this.dataNasc.toString());
      if (this.user.senha !== this.confirmacaoSenha) {
        alertMsg = 'A senhas não conferem! Por favor, digite novamente as senhas.';
      } else
      if (this.dataNasc.toString() === 'Invalid Date') {
        alertMsg = 'Digite uma data de nascimento válida!';
      } else
      if (!this.isDataNascSmallerCurrentDate()) {
        alertMsg = 'A data de nascimento deve ser menor que a data atual!';
      }
      return alertMsg;
  }

}
