import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';

import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {
  private subscription: any;

  constructor(private slimLoadingBarService: SlimLoadingBarService, private router: Router) {
    this.subscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
          this.slimLoadingBarService.start();
      } else if ( event instanceof NavigationEnd ||
                  event instanceof NavigationCancel ||
                  event instanceof NavigationError) {
          this.slimLoadingBarService.complete();
      }
    }, (error: any) => {
        this.slimLoadingBarService.complete();
    });
  }

  ngOnInit() {
    this.router.events.subscribe((event: NavigationEnd) => {
      if(event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    })
  }

  ngOnDestroy(): any {
    this.subscription.unsubscribe();
  }
}
