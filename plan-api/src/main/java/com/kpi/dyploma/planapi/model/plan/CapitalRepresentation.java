package com.kpi.dyploma.planapi.model.plan;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CapitalRepresentation {
    private Integer income;
    private Integer activeAndAdditionOutcome;
    private Integer financialGoalsOutcome;
    private Integer investIncome;
    private Integer freeMoney;
    private Integer investCost;
}
