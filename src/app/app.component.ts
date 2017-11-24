import { Component, OnInit, OnDestroy, NgZone, Renderer, ElementRef, ViewChild } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {
  private subscription: any;

  @ViewChild('spinnerElement')
  spinnerElement: ElementRef

  constructor(private router: Router, private ngZone: NgZone, private renderer: Renderer) {
    router.events.subscribe((event: RouterEvent) => {
      this._navigationInterceptor(event)
    })
  }

  ngOnInit() { }

  private _navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      
    }

    if(event instanceof NavigationEnd) {
      window.scrollTo(0, 0);
    }

    if(event instanceof NavigationCancel) {

    }

    if(event instanceof NavigationError) {

    }
  }

  ngOnDestroy(): any {
    this.subscription.unsubscribe();
  }
}
