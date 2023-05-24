package com.kpi.dyploma.planapi.model.plan;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PlanRepresentation {
    private LifeCapitalRepresentation capitalRepresentation;
    private FinancialPlan financialPlan;
}
