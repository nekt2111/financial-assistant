package com.kpi.dyploma.planapi.model.plan;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FinancialPlanSummary {
    private Integer id;
    private String name;
    private Integer startAge;
    private Integer endAge;

    public static FinancialPlanSummary buildSummaryFromFinancialPlan(FinancialPlan plan) {
        return new FinancialPlanSummary(
                plan.getId(),
                plan.getName(),
                plan.getStartAge(),
                plan.getEndAge()
        );
    }
}
