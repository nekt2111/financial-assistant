package com.kpi.dyploma.planapi.model.plan;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AgeCapitalRepresentation {
    private Integer age;
    private Integer income;
    private Integer activeAndAdditionOutcome;
    private Integer financialGoalsOutcome;
    private Integer investIncome;
    private Integer freeMoney;
    private Integer investCost;
    @JsonIgnore
    private Integer pension;
    @JsonIgnore
    private Integer financialFreedom;
}
