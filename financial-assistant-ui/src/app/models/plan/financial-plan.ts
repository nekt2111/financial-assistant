import {FinancialGoal} from "./financial-goal";
import {PlanAssets} from "./plan-assets";
import {Portfolio} from "./portfolio/portfolio";

export class FinancialPlan {
  public id: number;
  public userId: number;
  public startAge: number;
  public pensionAge: number;
  public governmentPension: number;
  public endAge: number;
  public riskProfile: number;
  public paceIncreaseOfExpense: number;
  public paceIncreaseOfIncome: number;
  public mediumIncomeOfPortfolio: number;
  public activeIncome: number;
  public passiveIncome: number;
  public activeOutcome: number;
  public additionalOutcome: number;
  public financialGoals: FinancialGoal[];
  public planAssets: PlanAssets;
  public portfolio: Portfolio;

}
