package com.kpi.dyploma.planapi.model.plan;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;

@Data
@Entity
@Table(name = "financial_goals")
public class FinancialGoal {
    @Id
    @GeneratedValue
    private Integer id;
    @ManyToOne(fetch= FetchType.LAZY, cascade=CascadeType.ALL)
    @JsonBackReference
    @ToString.Exclude
    private FinancialPlan financialPlan;
    private String name;
    private Integer amountOfMoney;
    private Integer achieveAge;
}
