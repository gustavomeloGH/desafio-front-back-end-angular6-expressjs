import { Injectable } from '@angular/core';
import { Usuario } from '../entities/user';
import { Utils } from '../utils/utils';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private userAuth: Usuario;

  getUser(): Usuario {
    return this.userAuth;
  }

  setUser(userAuth: Object) {
    this.userAuth = Utils.convertDatabaseUserToUser(userAuth);
  }



}
