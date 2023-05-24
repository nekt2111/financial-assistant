package com.kpi.dyploma.planapi.service;

import com.kpi.dyploma.planapi.model.create.*;
import com.kpi.dyploma.planapi.model.plan.*;
import com.kpi.dyploma.planapi.model.portfolio.Portfolio;
import com.kpi.dyploma.planapi.repository.FinancialGoalRepository;
import com.kpi.dyploma.planapi.repository.FinancialPlanRepository;
import com.kpi.dyploma.planapi.repository.PlanAssetsRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FinancialPlanService {

    private final static Logger LOGGER = LoggerFactory.getLogger(FinancialPlanService.class);

    private final FinancialPlanRepository financialPlanRepository;
    private final PortfolioService portfolioService;

    public FinancialPlan createFinancialPlan(CreatePlanRequest request) {
        FinancialPlan plan = mapRequestToFinancialPlan(request);
        LOGGER.info("portfolios - {}", portfolioService.getAllPortfolios());
        Portfolio portfolio = portfolioService.defineBestPortfolioForPlan(plan);
        plan.setPortfolio(portfolio);

        LOGGER.info("possible portfolios {}", portfolioService.defineBestPortfolioForPlan(plan));
        return financialPlanRepository.save(plan);
    }

    public FinancialPlan getFinancialPlanById(Integer id) {
        return financialPlanRepository.findById(id).orElse(null);
    }

    public List<FinancialPlanSummary> getFinancialPlanSummariesForUser(Integer userId) {
        List<FinancialPlan> financialPlans = financialPlanRepository.findFinancialPlanByUserId(userId);
        return financialPlans.stream()
                .map(FinancialPlanSummary::buildSummaryFromFinancialPlan)
                .toList();
    }

    @Transactional
    public void deletePlanById(Integer planId) {
        FinancialPlan plan = this.getFinancialPlanById(planId);
        plan.setPortfolio(null);
        this.financialPlanRepository.delete(plan);
    }


    public void saveFinancialPlan(FinancialPlan plan) {

    }

    public void getBestPortfolioForPlan() {

    }

    public void calculateScenarios() {

    }

    private FinancialPlan mapRequestToFinancialPlan(CreatePlanRequest request) {
        FinancialPlan financialPlan = new FinancialPlan();
        financialPlan.setUserId(1);

        setPlanningStepValuesToPlan(request.getPlanningStep(), financialPlan);
        setIncomeAndOutcomeStepValuesToPlan(request.getIncomeAndOutcomeStep(), financialPlan);

        List<FinancialGoal> financialGoals = request.getFinancialGoals()
                .stream()
                .map(goal -> mapFinancialGoalRequestToFinancialGoal(goal, financialPlan))
                .toList();

        financialPlan.setFinancialGoals(financialGoals);
        setPlanAssets(request.getAssetsAndLiabilities(), financialPlan);

        return financialPlan;
    }

    private void setPlanningStepValuesToPlan(PlanningStep step, FinancialPlan plan) {
        plan.setName(step.getPlanName());
        plan.setStartAge(step.getCurrentAge());
        plan.setPensionAge(step.getPensionAge());
        plan.setGovernmentPension(step.getGovernmentPension());
        plan.setEndAge(step.getEndAge());
        plan.setRiskProfile(step.getRiskProfile());
        plan.setPaceIncreaseOfExpense(step.getPaceOfIncreaseExpense());
        plan.setPaceIncreaseOfIncome(step.getPaceOfIncreaseIncome());
        plan.setMediumIncomeOfPortfolio(step.getMediumIncomeOfPortfolio());
    }

    private void setIncomeAndOutcomeStepValuesToPlan(IncomeAndOutcomeStep step, FinancialPlan plan) {
        plan.setActiveIncome(step.getActiveIncome());
        plan.setPassiveIncome(step.getPassiveIncome());
        plan.setActiveOutcome(step.getActiveOutcome());
        plan.setAdditionalOutcome(step.getAdditionalOutcome());
    }

    private FinancialGoal mapFinancialGoalRequestToFinancialGoal(FinancialGoalStep financialGoalRequest, FinancialPlan plan) {
        FinancialGoal financialGoal = new FinancialGoal();
        financialGoal.setFinancialPlan(plan);
        financialGoal.setName(financialGoalRequest.getName());
        financialGoal.setAmountOfMoney(financialGoalRequest.getAmountOfMoney());
        financialGoal.setAchieveAge(financialGoalRequest.getAchieveAge());
        return financialGoal;
    }

    private void setPlanAssets(AssetsAndLiabilitiesStep request, FinancialPlan plan) {
        PlanAssets planAssets = new PlanAssets();
        planAssets.setFinancialPlan(plan);
        planAssets.setMonetaryInstruments(request.getMonetaryInstruments());
        planAssets.setRealEstate(request.getRealEstate());
        planAssets.setSecurities(request.getSecurities());
        planAssets.setOther(request.getOther());
        plan.setPlanAssets(planAssets);
    }

}
