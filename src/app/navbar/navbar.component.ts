import { Component, OnInit, HostListener } from '@angular/core';
import { AuthService } from 'app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {

  private INDEX_PAGES = ['/releases', '/artists', '/events', '/login', 
    '/accounts/reset', '/accounts/register'];

  private adminPanelPermissions: string[] = ['VIEW_ADMIN_PANEL_PERMISSION'];

  private NAVBAR_CHANGE_HEIGHT: number = 50;

  private navbarTransparent: boolean = true;

  constructor(private authService: AuthService, private  _router : Router) { }

  ngOnInit() {}

  isAdminNavbar(): boolean {
    return this._router.url.startsWith('/admin');
  }

  onIndexPage(): boolean {
    for(let index = 0; index < this.INDEX_PAGES.length; index++) {
      if(this._router.url.replace(/\?(\S)*/, "") === this.INDEX_PAGES[index]) {
        return true;
      }
    }

    return false;
  }

  @HostListener("window:scroll", [])
  onScroll(): void {
    this.navbarTransparent = (window.scrollY <= this.NAVBAR_CHANGE_HEIGHT);
  }
}
