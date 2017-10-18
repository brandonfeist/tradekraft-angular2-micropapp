import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { CollapseModule } from 'ngx-bootstrap';
import {SlimLoadingBarModule} from 'ng2-slim-loading-bar';

import { AppComponent } from './app.component';

import { HomeModule }    from './home/home.module';
import { NavbarComponent } from './navbar/navbar.component';

import { EventService } from './services/event.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    HomeModule,
    FormsModule,
    HttpModule,
    CollapseModule,
    SlimLoadingBarModule.forRoot(),
    AppRoutingModule
  ],
  providers: [ 
    EventService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
