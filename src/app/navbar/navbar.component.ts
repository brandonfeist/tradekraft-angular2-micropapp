import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {

  private adminPanelPermissions: string[] = ['VIEW_ADMIN_PANEL_PERMISSION']

  constructor(private authService: AuthService, private  _router : Router) { }

  ngOnInit() {}

  isAdminNavbar(): boolean {
    return this._router.url.startsWith('/admin');
  }
}
