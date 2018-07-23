import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HttpBackendRequestService } from '../services/http-backend-request.service';
import { Auth } from '../entities/auth';
import { HttpEnum } from '../utils/httpEnum';
import { AuthenticationService } from '../services/authentication.service';
import { Usuario } from '../entities/user';

@Component({
  selector: 'app-login',
  providers: [HttpBackendRequestService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: string;
  senha: string;

  constructor( private httpBackendRequest: HttpBackendRequestService,
               private router: Router,
               private authService: AuthenticationService ) { }

  ngOnInit() {
  }

  submitForm() {
      const authData = new Auth(this.login, this.senha);
      this.httpBackendRequest.realizarHttpPost(HttpEnum.AUTH, authData)
      .subscribe(
        (result) => {
          if (result === null) {
            alert('Login e/ou senha inválidos, tente novamente.');
          } else {
            this.authService.setUser(result);
            this.router.navigate(['/dashboard']);
          }
        },
        (err) => alert('Ocorreu um erro: contate um suporte ou administrador!')
        // Verificar erro backend > (err) => alert('Ocorreu um erro: ' + err)
      );
    }
  }
