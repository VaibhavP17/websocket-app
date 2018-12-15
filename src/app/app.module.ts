import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NewsReaderComponent } from './news-reader/news-reader.component';
import {WsService} from './ws.service';
import {NewsService} from './news.service';

@NgModule({
  declarations: [
    AppComponent,
    NewsReaderComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    WsService,
    NewsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
