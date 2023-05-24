package com.kpi.dyploma.planapi.model.portfolio;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.kpi.dyploma.planapi.model.plan.FinancialPlan;
import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;

import java.util.List;

@Data
@Entity
@Table(name = "portfolio")
public class Portfolio {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    @OneToMany(mappedBy = "portfolio", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<PortfolioAsset> assets;
    @Enumerated(EnumType.STRING)
    private PortfolioType portfolioType;
    private Float historicalCompoundAnnualReturn;
}
