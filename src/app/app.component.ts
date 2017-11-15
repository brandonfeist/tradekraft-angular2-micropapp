import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {
  private subscription: any;

  constructor(private router: Router) {}

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
