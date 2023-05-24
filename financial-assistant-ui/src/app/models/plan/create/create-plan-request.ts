import {PlanningStep} from "./planning-step";
import {IncomeAndOutcomeStep} from "./income-and-outcome-step";
import {FinancialGoal} from "./financial-goal";
import {AssetsAndLiabilities} from "./assets-and-liabilities";

export class CreatePlanRequest {
  planningStep: PlanningStep;
  incomeAndOutcomeStep: IncomeAndOutcomeStep;
  financialGoals: FinancialGoal[];
  assetsAndLiabilities: AssetsAndLiabilities;
}
