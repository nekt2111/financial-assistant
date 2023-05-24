package com.kpi.dyploma.planapi.service;

import com.kpi.dyploma.planapi.model.plan.FinancialGoal;
import com.kpi.dyploma.planapi.model.plan.FinancialPlan;
import com.kpi.dyploma.planapi.model.plan.PlanAssets;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class EarnOutcomeCalculator {
    private static final Logger LOGGER = LoggerFactory.getLogger(EarnOutcomeCalculator.class);

    public float defineEarnOutcomeCoefficient(FinancialPlan plan) {
        Float earnAmountOfMoney = calculateIncomeAmountOfMoney(plan) + calculateAssets(plan);
        LOGGER.info("All time earn and bank amount of money - {}", earnAmountOfMoney);
        Float spendAmountOfMoney = calculateOutcomeAmountOfMoney(plan);
        LOGGER.info("All time spend amount of money - {}", spendAmountOfMoney);

        float k = earnAmountOfMoney/spendAmountOfMoney;

        LOGGER.info("Portfolio coefficient - {}", k);
        return k;
    }

    public Float calculateOutcomeAmountOfMoney(FinancialPlan plan) {
        int pensionDuration = plan.getEndAge() - plan.getPensionAge();
        int financialFreedom = plan.getFinancialGoals().get(0).getAmountOfMoney();

        int amountOfMoneyForFinancialFreedom = pensionDuration * financialFreedom;
        LOGGER.info("Financial freedom cost - {}", amountOfMoneyForFinancialFreedom);
        int amountOfMoneyForFinancialGoals = sumOfOfFinancialGoalsExceptFirst(plan.getFinancialGoals());
        LOGGER.info("Financial goals cost - {}", amountOfMoneyForFinancialGoals);

        float amountOfMoneyForYearlyExpanses = calculateActiveAndAdditionalOutcomeAmountOfMoney(plan);
        LOGGER.info("All time expanses cost - {}", amountOfMoneyForYearlyExpanses);
        return amountOfMoneyForYearlyExpanses + amountOfMoneyForFinancialGoals + amountOfMoneyForFinancialFreedom;
    }

    public Float calculateIncomeAmountOfMoney(FinancialPlan plan) {
        int pensionDuration = plan.getEndAge() - plan.getPensionAge();
        int liveDuration = plan.getEndAge() - plan.getStartAge();

        float activeIncome = calculateActiveIncomeAmountOfMoney(plan);
        LOGGER.info("Active income - {}", activeIncome);
        float passiveIncome = liveDuration * plan.getPassiveIncome();
        LOGGER.info("Passive income - {}", passiveIncome);
        float pensionIncome = pensionDuration * plan.getGovernmentPension();
        LOGGER.info("Pension income - {}", pensionIncome);

        return activeIncome + passiveIncome + pensionIncome;
    }

    public Float calculateAssets(FinancialPlan plan) {
        PlanAssets planAssets = plan.getPlanAssets();
        return planAssets.getMonetaryInstruments() + calculateSecuritiesValue(plan) + planAssets.getRealEstate() + planAssets.getOther();
    }

    public Float calculateSecuritiesValue(FinancialPlan plan) {
        int liveDuration = plan.getEndAge() - plan.getStartAge();
        float value = plan.getPlanAssets().getSecurities();
        for (int i = 0; i < liveDuration; i++) {
            value += (plan.getMediumIncomeOfPortfolio() * value)/100;
        }
        return value;
    }

    public Float calculateActiveIncomeAmountOfMoney(FinancialPlan plan) {
        int workDuration = plan.getPensionAge() - plan.getStartAge();
        float incomeAmountOfMoney = plan.getActiveIncome();
        float incomeForPrevYear = incomeAmountOfMoney;
        for (int i = 1; i < workDuration; i++) {
            float incomeForYear = incomeForPrevYear + (incomeForPrevYear * plan.getPaceIncreaseOfIncome())/100;
            incomeAmountOfMoney += incomeForYear;
            incomeForPrevYear = incomeForYear;
        }

        return incomeAmountOfMoney;
    }

    public Float calculateActiveAndAdditionalOutcomeAmountOfMoney(FinancialPlan plan) {
        int workDuration = plan.getEndAge() - plan.getStartAge();
        float outcomeAmountOfMoney = plan.getActiveOutcome() + plan.getAdditionalOutcome();
        float outcomeForPreviousYear = outcomeAmountOfMoney;
        for (int i = 1; i < workDuration; i++) {
            float outcomeForYear = outcomeForPreviousYear + (outcomeForPreviousYear * plan.getPaceIncreaseOfExpense())/100;
            outcomeAmountOfMoney += outcomeForYear;
            outcomeForPreviousYear = outcomeForYear;
        }

        return outcomeAmountOfMoney;
    }

    public Integer sumOfOfFinancialGoalsExceptFirst(List<FinancialGoal> financialGoalList) {
        return financialGoalList.stream()
                .skip(1)
                .map(FinancialGoal::getAmountOfMoney)
                .reduce(0, Integer::sum);
    }

    public Integer sumOfOfFinancialGoals(List<FinancialGoal> financialGoalList) {
        return financialGoalList.stream()
                .map(FinancialGoal::getAmountOfMoney)
                .reduce(0, Integer::sum);
    }
}
