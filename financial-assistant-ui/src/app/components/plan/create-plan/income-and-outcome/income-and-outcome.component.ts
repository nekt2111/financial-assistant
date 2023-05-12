import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {Form, FormControl, FormGroup, Validators} from "@angular/forms";
import {IncomeAndOutcomeStep} from "../../../../models/plan/create/income-and-outcome-step";

@Component({
  selector: 'app-income-and-outcome-step',
  templateUrl: './income-and-outcome.component.html',
  styleUrls: ['../create-plan.component.css', './income-and-outcome.component.css']
})
export class IncomeAndOutcomeComponent implements OnInit {

  @Input()
  public incomeAndOutcomeStep: IncomeAndOutcomeStep;

  public form: FormGroup;

  @Output()
  public nextStepEmitter = new EventEmitter();

  @Output()
  public previousStepEmitter = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
    this.form = this.buildFormGroup();
  }

  public goToNextStep(): void {
    this.setIncomeAndOutcomeStepWithFormValues();
    this.nextStepEmitter.emit();
  }

  public goToPreviousStep(): void {
    this.setIncomeAndOutcomeStepWithFormValues();
    this.previousStepEmitter.emit();
  }

  public setIncomeAndOutcomeStepWithFormValues(): void {
    this.incomeAndOutcomeStep.activeIncome = +this.form.controls['activeIncome']?.value;
    this.incomeAndOutcomeStep.passiveIncome = +this.form.controls['passiveIncome']?.value;
    this.incomeAndOutcomeStep.activeOutcome = +this.form.controls['activeOutcome']?.value;
    this.incomeAndOutcomeStep.additionalOutcome = +this.form.controls['additionalOutcome']?.value;
  }

  private buildFormGroup(): FormGroup {
    return new FormGroup({
      activeIncome: this.getBasicFormControlForOutcomeOrIncome(this.incomeAndOutcomeStep.activeIncome),
      passiveIncome: this.getBasicFormControlForOutcomeOrIncome(this.incomeAndOutcomeStep.passiveIncome),
      activeOutcome: this.getBasicFormControlForOutcomeOrIncome(this.incomeAndOutcomeStep.activeOutcome),
      additionalOutcome: this.getBasicFormControlForOutcomeOrIncome(this.incomeAndOutcomeStep.additionalOutcome)
    })
  }

  private getBasicFormControlForOutcomeOrIncome(value: number): FormControl {
    return new FormControl(value,
      [Validators.required,
        Validators.min(1)
      ]);
  }

}
