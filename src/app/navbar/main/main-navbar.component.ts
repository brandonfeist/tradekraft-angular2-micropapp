import { AuthService } from './../../services/auth.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'main-navbar',
  templateUrl: './main-navbar.component.html'
})
export class MainNavbarComponent implements OnInit {

  @Input() sidenav;
  
  private adminPanelPermissions: string[] = ['VIEW_ADMIN_PANEL_PERMISSION'];

  constructor(private authService: AuthService) { }

  ngOnInit() {}
}
