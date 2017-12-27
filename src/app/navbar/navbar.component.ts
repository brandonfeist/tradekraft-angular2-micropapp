import { NewsletterDialog } from './../shared/dialogs/newsletter/newsletter.component';
import { Component, OnInit, HostListener } from '@angular/core';
import { AuthService } from 'app/services/auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {

  private INDEX_PAGES = [/\/releases/, /\/artists/, /\/events/, /\/login/, 
  /\/accounts\/reset/, /\/accounts\/register/, /\/about/, /\/admin(\/)?(\S)*/];

  private adminPanelPermissions: string[] = ['VIEW_ADMIN_PANEL_PERMISSION'];

  private NAVBAR_CHANGE_HEIGHT: number = 50;

  private navbarTransparent: boolean = true;

  constructor(private authService: AuthService, private  _router : Router, public dialog: MatDialog) { }

  ngOnInit() {}

  isAdminNavbar(): boolean {
    return this._router.url.startsWith('/admin');
  }

  onIndexPage(): boolean {
    for(let index = 0; index < this.INDEX_PAGES.length; index++) {
      let originalString = this.INDEX_PAGES[index];
      let match = this._router.url.match(originalString);

      if(match != null && match[0] == this._router.url) {
        return true;
      }
    }

    return false;
  }

  @HostListener("window:scroll", [])
  onScroll(): void {
    this.navbarTransparent = (window.scrollY <= this.NAVBAR_CHANGE_HEIGHT);
  }

  private isTransparent(sideNav): boolean {
    return (this.navbarTransparent && !sideNav.opened && !this.onIndexPage());
  }

  private openNewsletterDialog() {
    this.dialog.open(NewsletterDialog);
  }
}
