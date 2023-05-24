package com.kpi.dyploma.planapi.model.plan;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.kpi.dyploma.planapi.model.portfolio.Portfolio;
import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;

import java.util.List;

@Entity
@Data
@Table(name = "financial_plan")
public class FinancialPlan {
    private String name;
    @Id
    @GeneratedValue
    private Integer id;
    private Integer userId;
    private Integer startAge;
    private Integer pensionAge;
    private Integer governmentPension;
    private Integer endAge;
    private Integer riskProfile;
    private Float paceIncreaseOfExpense;
    private Float paceIncreaseOfIncome;
    private Integer mediumIncomeOfPortfolio;
    private Integer activeIncome;
    private Integer passiveIncome;
    private Integer activeOutcome;
    private Integer additionalOutcome;
    @OneToMany(mappedBy = "financialPlan", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<FinancialGoal> financialGoals;
    @OneToOne(mappedBy = "financialPlan", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private PlanAssets planAssets;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "portfolio_id", referencedColumnName = "id")
    private Portfolio portfolio;
}
