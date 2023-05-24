package com.kpi.dyploma.planapi.repository;

import com.kpi.dyploma.planapi.model.plan.PlanAssets;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlanAssetsRepository extends JpaRepository<PlanAssets, Integer> {
    void deletePlanAssetsByFinancialPlanId(Integer id);
}
