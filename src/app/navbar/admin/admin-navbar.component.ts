import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'admin-navbar',
  templateUrl: './admin-navbar.component.html'
})
export class AdminNavbarComponent implements OnInit {

  @Input() sidenav;

  constructor() { }

  ngOnInit() {}
}
