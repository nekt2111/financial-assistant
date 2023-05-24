import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
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
import {
  FinancialGoalsStepComponent
} from "./components/plan/create-plan/financial-goals/financial-goals-step.component";
import {
  IncomeAndOutcomeComponent
} from "./components/plan/create-plan/income-and-outcome/income-and-outcome.component";
import {
  AssetsAndLiabilitiesComponent
} from "./components/plan/create-plan/assets-and-liabilities/assets-and-liabilities.component";
import {NgxEchartsModule} from "ngx-echarts";
import {PlanOverviewComponent} from "./components/plan/overview/plan-overview.component";
import {PlanVisualizationComponent} from "./components/plan/overview/plan-visualization/plan-visualization.component";
import {PlanPortfolioComponent} from "./components/plan/overview/portoflio/plan-portfolio.component";
import {LivingCapitalComponent} from "./components/plan/overview/living-capital/living-capital.component";
import {PlanReviewComponent} from "./components/plan/overview/plan-review/plan-review.component";

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
    IncomeAndOutcomeComponent,
    AssetsAndLiabilitiesComponent,
    PlanOverviewComponent,
    PlanVisualizationComponent,
    PlanPortfolioComponent,
    LivingCapitalComponent,
    PlanReviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    })
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
