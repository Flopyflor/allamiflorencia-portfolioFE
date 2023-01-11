import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404Component } from './error404/error404.component';
import { CanDeactivateGuard } from './guards/can-deactivate.guard';
import { LogInFormComponent } from './log-in-form/log-in-form.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'inicio'},
  {path: 'inicio', component: MainComponent, canDeactivate:[CanDeactivateGuard]},
  {path: 'log-in', component: LogInFormComponent},
  {path: '**', component: Error404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
