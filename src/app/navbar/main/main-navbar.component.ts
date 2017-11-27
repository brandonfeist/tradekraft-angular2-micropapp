import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'main-navbar',
  templateUrl: './main-navbar.component.html'
})
export class MainNavbarComponent implements OnInit {

  @Input() sidenav;

  constructor() { }

  ngOnInit() {}
}
