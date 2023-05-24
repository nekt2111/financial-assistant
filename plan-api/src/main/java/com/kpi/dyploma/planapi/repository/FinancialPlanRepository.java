package com.kpi.dyploma.planapi.repository;

import com.kpi.dyploma.planapi.model.plan.FinancialPlan;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FinancialPlanRepository extends JpaRepository<FinancialPlan, Integer> {
    List<FinancialPlan> findFinancialPlanByUserId(Integer userId);
}
