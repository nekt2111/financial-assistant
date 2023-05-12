import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "./services/auth.interceptor";
import {AuthPageComponent} from "./components/auth/auth-page.component";
import {HomeComponent} from "./components/home/home.component";
import {PlanComponent} from "./components/plan/plan.component";
import {NoPlanComponent} from "./components/plan/no-plan/no-plan.component";
import {PortfolioComponent} from "./components/portfolio/portfolio.component";
import {TaxComponent} from "./components/tax/tax.component";
import {PlanningStepComponent} from "./components/plan/create-plan/planning/planning-step.component";
import {CreatePlanComponent} from "./components/plan/create-plan/create-plan.component";
import {FinancialGoalsStepComponent} from "./components/plan/create-plan/financial-goals/financial-goals-step.component";
import {
  IncomeAndOutcomeComponent
} from "./components/plan/create-plan/income-and-outcome/income-and-outcome.component";

@NgModule({
  declarations: [
    AppComponent,
    AuthPageComponent,
    HomeComponent,
    PlanComponent,
    NoPlanComponent,
    PortfolioComponent,
    TaxComponent,
    CreatePlanComponent,
    PlanningStepComponent,
    FinancialGoalsStepComponent,
    IncomeAndOutcomeComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule
    ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
