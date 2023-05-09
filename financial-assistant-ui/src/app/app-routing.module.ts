import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthPageComponent} from "./components/auth/auth-page.component";
import {HomeComponent} from "./components/home/home.component";
import {AuthGuard} from "./auth.guard";

const routes: Routes = [
  {path: '', component: AuthPageComponent},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
