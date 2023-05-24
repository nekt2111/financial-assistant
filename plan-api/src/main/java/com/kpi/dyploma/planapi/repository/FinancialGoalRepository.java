package com.kpi.dyploma.planapi.repository;

import com.kpi.dyploma.planapi.model.plan.FinancialGoal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FinancialGoalRepository extends JpaRepository<FinancialGoal, Integer> {
    void deleteFinancialGoalsByFinancialPlanId(Integer id);
}
