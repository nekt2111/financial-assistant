package com.kpi.dyploma.planapi.model.create;

import lombok.Data;

@Data
public class PlanningStep {
    private String planName;
    private Integer currentAge;
    private Integer pensionAge;
    private Integer governmentPension;
    private Integer endAge;
    private Integer riskProfile;
    private Float paceOfIncreaseExpense;
    private Float paceOfIncreaseIncome;
    private Integer mediumIncomeOfPortfolio;
}
