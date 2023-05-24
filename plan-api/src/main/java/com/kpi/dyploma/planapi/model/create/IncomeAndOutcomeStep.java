package com.kpi.dyploma.planapi.model.create;

import lombok.Data;

@Data
public class IncomeAndOutcomeStep {
    private Integer activeIncome;
    private Integer passiveIncome;
    private Integer activeOutcome;
    private Integer additionalOutcome;
}
