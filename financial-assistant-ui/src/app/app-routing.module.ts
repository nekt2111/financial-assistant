import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthPageComponent} from "./components/auth/auth-page.component";
import {HomeComponent} from "./components/home/home.component";
import {AuthGuard} from "./auth.guard";
import {PlanComponent} from "./components/plan/plan.component";
import {PortfolioComponent} from "./components/portfolio/portfolio.component";
import {TaxComponent} from "./components/tax/tax.component";
import {CreatePlanComponent} from "./components/plan/create-plan/create-plan.component";

const routes: Routes = [
  {path: 'auth', component: AuthPageComponent},
  {path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'plan', component: PlanComponent, canActivate: [AuthGuard]},
  {path: 'portfolio', component: PortfolioComponent, canActivate: [AuthGuard]},
  {path: 'tax', component: TaxComponent, canActivate: [AuthGuard]},
  {path: 'create-plan', component: CreatePlanComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
