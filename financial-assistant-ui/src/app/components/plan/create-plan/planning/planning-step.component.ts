import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {PlanningStep} from "../../../../models/plan/create/planning-step";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";

export class ValidationResult {
  valid: boolean;
  message: string;
}

@Component({
  selector: 'app-planning-step',
  templateUrl: './planning-step.component.html',
  styleUrls: ['./planning-step.component.css', '../create-plan.component.css']
})
export class PlanningStepComponent implements OnInit {

  @Input()
  public planningStep: PlanningStep;

  public riskProfiles = [10, 20, 30, 40, 50];
  public readonly DEFAULT_RISK_PROFILE = 10;

  public form: FormGroup;

  @Output()
  public nextStepEmitter = new EventEmitter();

  constructor() { }

  public ngOnInit() {
    this.setDefaultValues(this.planningStep);
    this.form = this.buildFormGroupForPlanningStep();
  }

  public goToNextStep(): void {
      this.setPlanningStepWithFormValues();
      this.nextStepEmitter.emit();
  }

  public onCurrentAgeChange(event: any): void {
    this.planningStep.currentAge = +event.target.value;
  }

  public onPensionAgeChange(event: any): void {
    this.planningStep.pensionAge = +event.target.value;
  }

  public onRiskProfileChange(): void {
    this.planningStep.mediumIncomeOfPortfolio = this.getMediumIncomeOfPortfolioByRiskProfile(this.planningStep.riskProfile);
  }


  private getMediumIncomeOfPortfolioByRiskProfile(profile: number): number {
    switch (profile) {
      case 10:
        return 5;
      case 20:
        return 6;
      case 30:
        return 7;
      case 40:
        return 8;
      case 50:
        return 9;
      default:
        return 5;
    }
  }

  private setDefaultValues(planningStep: PlanningStep): void {
    planningStep.planName = 'Мій фінансовий план'
    planningStep.paceOfIncreaseIncome = 2.4;
    planningStep.paceOfIncreaseExpense = 2.4;
    planningStep.riskProfile = this.DEFAULT_RISK_PROFILE;
    planningStep.mediumIncomeOfPortfolio = this.getMediumIncomeOfPortfolioByRiskProfile(this.DEFAULT_RISK_PROFILE);
    planningStep.governmentPension = 1400;
  }

  private buildFormGroupForPlanningStep(): FormGroup {
    return new FormGroup({
        planName: new FormControl(this.planningStep.planName, [
          Validators.required,
          Validators.minLength(3)
        ]),
        currentAge: new FormControl(this.planningStep.currentAge, [
          Validators.min(0),
          Validators.max(100),
          Validators.required
        ]),
        pensionAge: new FormControl(this.planningStep.pensionAge, [
          (control: AbstractControl) => Validators.min(this.planningStep.currentAge)(control),
          Validators.max(100)
        ]),
        governmentPension: new FormControl(this.planningStep.governmentPension, [
          Validators.min(0)
        ]),
        endAge: new FormControl(this.planningStep.endAge, [
          (control: AbstractControl) => Validators.min(this.planningStep.currentAge)(control),
          (control: AbstractControl) => Validators.min(this.planningStep.pensionAge)(control),
          Validators.max(100)
        ]),
        riskProfile: new FormControl(this.planningStep.riskProfile, [
          Validators.min(0)
        ]),
        paceOfIncreaseExpense: new FormControl(this.planningStep.paceOfIncreaseExpense, [
          Validators.min(0)
        ]),
        paceOfIncreaseIncome: new FormControl(this.planningStep.paceOfIncreaseIncome, [
          Validators.min(0)
        ])
      }
    )
  }

  private setPlanningStepWithFormValues(): void {
    this.planningStep.planName = this.form.controls['planName'].value;
    this.planningStep.governmentPension = +this.form.controls['governmentPension'].value;
    this.planningStep.endAge = +this.form.controls['endAge'].value;
    this.planningStep.paceOfIncreaseExpense = +this.form.controls['paceOfIncreaseExpense'].value;
    this.planningStep.paceOfIncreaseIncome = +this.form.controls['paceOfIncreaseIncome'].value;
  }

}
