package com.kpi.dyploma.planapi.model.create;

import lombok.Data;

import java.util.List;

@Data
public class CreatePlanRequest {
    private PlanningStep planningStep;
    private IncomeAndOutcomeStep incomeAndOutcomeStep;
    private List<FinancialGoalStep> financialGoals;
    private AssetsAndLiabilitiesStep assetsAndLiabilities;
}
