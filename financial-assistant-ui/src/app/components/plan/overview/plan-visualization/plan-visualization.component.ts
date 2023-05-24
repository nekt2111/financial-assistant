import {Component, Input, OnInit} from "@angular/core";
import {EChartsOption} from "echarts";
import {PlanRepresentation} from "../../../../models/plan/overview/plan-representation";
import {FinancialGoal} from "../../../../models/plan/financial-goal";
import {EchartsAdapterService} from "../../../../services/echarts-adapter.service";
import {PieChartData} from "../../../../models/charts/pie-chart-data";

@Component({
  selector: 'app-plan-visualization',
  templateUrl: './plan-visualization.component.html',
  styleUrls: ['./plan-visualization.component.css']
})
export class PlanVisualizationComponent implements OnInit {

  constructor(private echartsService: EchartsAdapterService) {
  }


  @Input()
  public planRepresentation: PlanRepresentation;

  private readonly FINANCIAL_GOAL_CHART_TITLE = 'Структура фінансових цілей';

  public financialGoalChartOptions: EChartsOption;
  public investChartOptions: EChartsOption;
  public planAssetsOptions: EChartsOption;

  public ngOnInit() {
    console.log(this.planRepresentation);
    this.financialGoalChartOptions = this.echartsService.createOptionsForPieChart(this.FINANCIAL_GOAL_CHART_TITLE, this.getFinancialGoalsNames(), this.getPieChartDataForFinancialGoal())
    const xAxisData = [];

    const ageRange = this.planRepresentation.financialPlan.endAge - this.planRepresentation.financialPlan.startAge;

    for (let i = this.planRepresentation.financialPlan.startAge; i < this.planRepresentation.financialPlan.endAge + (ageRange / 3); i++) {
      xAxisData.push(i);
    }

    this.investChartOptions = this.echartsService.createOptionsForSimpleChart(['Дохід від інвестування', 'Ціна портефелю'], xAxisData, this.getPortfolioIncomeForEachAge(), this.getPortfolioCostForEachAge());
    this.planAssetsOptions = this.echartsService.createOptionsForDataSet(this.getSourceDataForPlanAssetsChart());
  }

  private getSourceDataForPlanAssetsChart(): any[][] {
    const sourceData = [];
    const headers = ['asset', 'Номінальна сумма', 'Ліквідна сума'];
    sourceData.push(headers);

    const monetaryInstruments = ['Грошові інструменти', this.planRepresentation.financialPlan.planAssets.monetaryInstruments, 10000]
    sourceData.push(monetaryInstruments);

    const securities = ['Цінні папери', this.planRepresentation.financialPlan.planAssets.securities, 10000]
    sourceData.push(securities);


    const realEstate = ['Нерухомсіть', this.planRepresentation.financialPlan.planAssets.realEstate, 20000]
    sourceData.push(realEstate);

    const other = ['Інше', this.planRepresentation.financialPlan.planAssets.other, 1000]
    sourceData.push(other);
    return sourceData;
  }

  private getPortfolioCostForEachAge(): number[] {
    return this.planRepresentation.capitalRepresentation.ageCapitalRepresentationList.map(ageCapital => ageCapital.investCost);
  }

  private getPortfolioIncomeForEachAge(): number[] {
    return this.planRepresentation.capitalRepresentation.ageCapitalRepresentationList.map(ageCapital => ageCapital.investIncome);
  }

  private getFinancialGoalsNames(): string[] {
    if (this.planRepresentation.financialPlan) {
      return this.planRepresentation.financialPlan.financialGoals.map(goal => goal.name);
    }
    return [];
  }

  private getPieChartDataForFinancialGoal(): PieChartData[] {
    if (this.planRepresentation.financialPlan) {
    return this.planRepresentation.financialPlan.financialGoals.map(goal => this.buildRepresentationFromFinancialGoal(goal));
    }
    return [];
  }

  private buildRepresentationFromFinancialGoal(financialGoal: FinancialGoal): PieChartData {
    const representation = new PieChartData();
    representation.name = financialGoal.name;
    representation.value = financialGoal.amountOfMoney;
    return representation;
  }

}
