import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {FinancialGoal} from "../../../../models/plan/create/financial-goal";
import {PlanningStep} from "../../../../models/plan/create/planning-step";

@Component({
  selector: 'app-financial-goals-step',
  templateUrl: './financial-goals-step.component.html',
  styleUrls: ['../create-plan.component.css', './financial-goals-step.component.css']
})
export class FinancialGoalsStepComponent implements OnInit {

  @Input()
  public financialGoals: FinancialGoal[];

  @Input()
  public currentAge: number;

  @Input()
  public pensionAge: number;

  @Input()
  public activeAndAdditionalOutcome: number;

  @Input()
  public activeOutcome: number;

  public newFinancialGoalName: string;

  constructor() {
  }

  @Output()
  public nextStepEmitter = new EventEmitter();

  @Output()
  public previousStepEmitter = new EventEmitter();

  public ngOnInit(): void {
    this.setUpBasicFinancialGoals();
  }

  public setUpBasicFinancialGoals(): void {
    this.financialGoals[0].achieveAge = this.pensionAge;
    this.financialGoals[0].amountOfMoney = this.activeAndAdditionalOutcome;
    this.financialGoals[1].achieveAge = this.currentAge;
    this.financialGoals[1].amountOfMoney = this.activeOutcome / 2;
  }


  public goToNextStep(): void {
    this.nextStepEmitter.emit();
  }

  public goToPreviousStep(): void {
    this.previousStepEmitter.emit();
  }

  public addFinancialGoal(): void {
    const goal = new FinancialGoal(this.newFinancialGoalName);
    this.financialGoals.push(goal);
  }

  public removeFinancialGoal(index: number): void {
    console.log(index);
    console.log(this.financialGoals.splice(index, 1));
  }

  public shouldShowErrorMessageForAmountOfMoney(goal: FinancialGoal): boolean {
    if (!goal.amountOfMoney) {
      return false;
    }
    return this.isGoalInvalid(goal);
  }

  public isFormInvalid(): boolean {
    return this.financialGoals.find(goal => this.isGoalInvalid(goal)) !== undefined;
  }

  public isGoalInvalid(goal: FinancialGoal): boolean {
    return isNaN(Number.parseFloat(goal.amountOfMoney)) || goal.amountOfMoney <= 0
  }

  public shouldShowErrorMessageForNewName(): boolean {
    if (!this.newFinancialGoalName) {
      return false;
    }

    return !this.isNewGoalNameValid();
  }


  public isNewGoalNameValid(): boolean {
    return this.newFinancialGoalName.length > 2 && this.newFinancialGoalName.length < 21;
  }
}
