package com.kpi.dyploma.planapi.model.plan;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;

@Data
@Entity
public class PlanAssets {
    @Id
    @GeneratedValue
    private Integer id;
    @OneToOne(fetch= FetchType.LAZY, cascade= CascadeType.ALL)
    @JsonBackReference
    @ToString.Exclude
    private FinancialPlan financialPlan;
    private Integer monetaryInstruments;
    private Integer securities;
    private Integer realEstate;
    private Integer other;
}
