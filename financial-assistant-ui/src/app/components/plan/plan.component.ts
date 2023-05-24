import {Component, OnInit} from "@angular/core";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {PlanService} from "../../services/plan.service";
import {FinancialPlanSummary} from "../../models/plan/financial-plan-summary";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})
export class PlanComponent implements OnInit {

  public planExists = true;
  public financialPlansSummaries: FinancialPlanSummary[];
  constructor(private router: Router,
              private planService: PlanService,
              private userService: UserService) { }

  public ngOnInit() {
    this.planService.getPlansSummariesByUserId(this.userService.getCurrentUser().id).subscribe((summaries) => {
      if (summaries && summaries.length > 0) {
        this.financialPlansSummaries = summaries;
        this.planExists = true;
      }
    })
  }

  public navigateToCreatePlan(): void {
    this.router.navigate(['/create-plan']);
  }

  public navigateToPlan(id: number): void {
    this.router.navigate(['/plan', id]);
  }

  public deletePlan(id: number): void {
    this.planService.deletePlanById(id).subscribe(() => {
      this.financialPlansSummaries = this.financialPlansSummaries.filter(summary => summary.id !== id);
    })
  }

}
