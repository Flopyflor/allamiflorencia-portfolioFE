import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { Error404Component } from './error404/error404.component';
import { MainComponent } from './main/main.component';
import { HeaderComponent } from './header/header.component';
import { SectionComponent } from './section/section.component';
import { CardComponent } from './vis/card/card.component';
import { ProgressBarComponent } from './vis/progress-bar/progress-bar.component';
import { ProjectComponent } from './vis/project/project.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    Error404Component,
    MainComponent,
    HeaderComponent,
    SectionComponent,
    CardComponent,
    ProgressBarComponent,
    ProjectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
