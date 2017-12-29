import { Component, OnInit, ViewChild }      from '@angular/core';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html'
  })
  export class FooterComponent {

    private blackLogo: string = "assets/images/tradekraft-logo-black.png";
    
    constructor() { }
  }