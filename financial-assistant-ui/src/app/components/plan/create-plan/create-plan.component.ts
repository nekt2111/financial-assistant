import {Component, OnInit} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CreatePlanRequest} from "../../../models/plan/create/create-plan-request";
import {PlanningStep} from "../../../models/plan/create/planning-step";
import {CreationStatus, CreationStatusUtils} from "../../../models/plan/create/creation-status";
import {IncomeAndOutcomeStep} from "../../../models/plan/create/income-and-outcome-step";
import {FinancialGoal} from "../../../models/plan/create/financial-goal";


@Component({
  selector: 'app-create-plan',
  templateUrl: './create-plan.component.html',
  styleUrls: ['./create-plan.component.css']
})
export class CreatePlanComponent implements OnInit {
  constructor() { }

  public currentStatus: CreationStatus;
  public createPlanRequest: CreatePlanRequest;

  public get CreationStatus(): typeof CreationStatus {
    return CreationStatus;
  }



  public ngOnInit() {
    this.currentStatus = CreationStatus.PLANNING;
    this.createPlanRequest = new CreatePlanRequest();
    this.createPlanRequest.planningStep = new PlanningStep();
    this.createPlanRequest.financialGoals = this.getDefaultFinancialGoals();
    this.createPlanRequest.incomeAndOutcomeStep = new IncomeAndOutcomeStep();
  }

  public onNextStep(): void {
    this.currentStatus = this.getNextStep(this.currentStatus);
    console.log(this.createPlanRequest)
  }

  public onPreviousStep(): void {
    this.currentStatus = this.getPreviousStep(this.currentStatus);
    console.log(this.createPlanRequest)
  }

  private getNextStep(status: CreationStatus): CreationStatus {
    const nextStepId = status.valueOf() + 1;
    return CreationStatusUtils.getStatusById(nextStepId);
  }

  private getPreviousStep(status: CreationStatus): CreationStatus {
    const prevStepId = status.valueOf() - 1;
    return CreationStatusUtils.getStatusById(prevStepId);
  }

  private getDefaultFinancialGoals(): FinancialGoal[] {
    const reserveFund = new FinancialGoal('Резервний фонд');
    const financialFreedom = new FinancialGoal('Фінансова свобода');
    const appartement = new FinancialGoal('Житло');
    const car = new FinancialGoal('Авто');
    return [reserveFund, financialFreedom, appartement, car];
  }


}
