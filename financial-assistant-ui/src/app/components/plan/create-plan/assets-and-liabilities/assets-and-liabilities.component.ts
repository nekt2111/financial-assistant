import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AssetsAndLiabilities} from "../../../../models/plan/create/assets-and-liabilities";

@Component({
  selector: 'app-assets-and-liabilities-step',
  templateUrl: './assets-and-liabilities.component.html',
  styleUrls: ['../create-plan.component.css', './assets-and-liabilities.component.css']
})
export class AssetsAndLiabilitiesComponent implements OnInit {
  public form: FormGroup;

  @Input()
  public assetsAndLiabilities: AssetsAndLiabilities;

  @Output()
  public createPlanEmitter = new EventEmitter();
  @Output()
  public previousStepEmitter = new EventEmitter();

  public ngOnInit(): void {
    this.form = this.buildFormGroup();
  }

  public createPlan(): void {
    this.setAssetsAndLiabilitiesStepWithFormValues();
    this.createPlanEmitter.emit();
  }

  public goToPreviousStep(): void {
    this.setAssetsAndLiabilitiesStepWithFormValues();
    this.previousStepEmitter.emit();
  }

  public setAssetsAndLiabilitiesStepWithFormValues(): void {
    this.assetsAndLiabilities.monetaryInstruments = this.form.controls['monetaryInstruments'].value;
    this.assetsAndLiabilities.securities = this.form.controls['securities'].value;
    this.assetsAndLiabilities.realEstate = this.form.controls['realEstate'].value;
    this.assetsAndLiabilities.other = this.form.controls['other'].value;
  }

  private buildFormGroup(): FormGroup {
    return new FormGroup({
      monetaryInstruments: this.buildBasicFormControlForAsset(this.assetsAndLiabilities.monetaryInstruments),
      securities: this.buildBasicFormControlForAsset(this.assetsAndLiabilities.securities),
      realEstate: this.buildBasicFormControlForAsset(this.assetsAndLiabilities.realEstate),
      other: this.buildBasicFormControlForAsset(this.assetsAndLiabilities.other)
    })
  }

  private buildBasicFormControlForAsset(value: number): FormControl {
    return new FormControl(value,
      [Validators.required,
        Validators.min(0)
      ]);
  }
}
