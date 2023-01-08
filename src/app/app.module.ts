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
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LogInComponent } from './log-in/log-in.component';
import { LogInFormComponent } from './log-in-form/log-in-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InterceptorService } from './services/interceptor.service';
import { EditBtnComponent } from './edit-btn/edit-btn.component';
import { PersonaComponent } from './vis/persona/persona.component';
import { AddInfoComponent } from './vis/add-info/add-info.component';
import { AddSectionComponent } from './add-section/add-section.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

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
    ProjectComponent,
    LogInComponent,
    LogInFormComponent,
    EditBtnComponent,
    PersonaComponent,
    AddInfoComponent,
    AddSectionComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
