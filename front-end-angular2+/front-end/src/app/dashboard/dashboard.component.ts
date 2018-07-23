import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { Usuario } from '../entities/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user: Usuario;
  constructor(private router: Router,
              private authService: AuthenticationService ) {
    this.getUserAuth();
  }

  ngOnInit() { }

  getUserAuth() {
    this.user = this.authService.getUser();
    if (!this.user) {
      this.router.navigate(['/home']);
      alert('Faça o login primeiro!');
    }
  }
  alertRouterMsg() {
    alert('Volte sempre!');
  }
}
