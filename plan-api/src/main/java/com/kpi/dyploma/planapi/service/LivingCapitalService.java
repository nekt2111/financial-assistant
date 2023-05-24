package com.kpi.dyploma.planapi.service;

import com.kpi.dyploma.planapi.model.plan.AgeCapitalRepresentation;
import com.kpi.dyploma.planapi.model.plan.FinancialGoal;
import com.kpi.dyploma.planapi.model.plan.FinancialPlan;
import com.kpi.dyploma.planapi.model.plan.LifeCapitalRepresentation;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class LivingCapitalService {

    private final EarnOutcomeCalculator earnOutcomeCalculator;

    public LifeCapitalRepresentation getLivingCapitalForPlan(FinancialPlan plan) {
        LifeCapitalRepresentation lifeCapitalRepresentation = new LifeCapitalRepresentation();
        lifeCapitalRepresentation.setAgeCapitalRepresentationList(getAgeCapitalListForPlan(plan));
        return lifeCapitalRepresentation;
    }

    public Integer getAllTimeIncomeInCurrentValue(FinancialPlan plan) {
        int amountOfMoney = 0;
        int workDuration = plan.getPensionAge() - plan.getStartAge();
        amountOfMoney += workDuration * (plan.getActiveIncome() + plan.getPassiveIncome());

        int pensionDuration = plan.getEndAge() - plan.getPensionAge();
        amountOfMoney += pensionDuration * plan.getGovernmentPension();
        return amountOfMoney;
    }

    public List<AgeCapitalRepresentation> getAgeCapitalListForPlan(FinancialPlan plan) {
        List<AgeCapitalRepresentation> ageCapitalList = new ArrayList<>();

        AgeCapitalRepresentation ageCapital = buildFirstAgeCapital(plan);
        ageCapitalList.add(ageCapital);

        for (int age = plan.getStartAge() + 1; age < plan.getEndAge(); age++) {
            ageCapital = getAgeCapitalBasedOnPreviousForWorkPeriod(ageCapital, plan);
            ageCapitalList.add(ageCapital);
        }

        return ageCapitalList;
    }

    private AgeCapitalRepresentation buildFirstAgeCapital(FinancialPlan plan) {
        float yearIncome = plan.getActiveIncome() + plan.getPassiveIncome();
        float yearOutcome = plan.getActiveOutcome() + plan.getAdditionalOutcome();
        int financialGoalOutcome = 0;

        if (getFinancialGoalsByAge(plan.getStartAge(), plan.getFinancialGoals()) != null) {
            financialGoalOutcome = earnOutcomeCalculator.sumOfOfFinancialGoals(getFinancialGoalsByAge(plan.getStartAge(), plan.getFinancialGoals()));
        }

        float freeMoney = yearIncome - yearOutcome - financialGoalOutcome;
        return buildAgeCapital(plan.getStartAge(),
                yearIncome, yearOutcome, financialGoalOutcome, 0, freeMoney, freeMoney, plan.getGovernmentPension(), plan.getFinancialGoals().get(0).getAmountOfMoney());
    }


    private AgeCapitalRepresentation getAgeCapitalBasedOnPreviousForWorkPeriod(AgeCapitalRepresentation ageCapital, FinancialPlan plan) {
        int age = ageCapital.getAge() + 1;
        float yearIncome = getYearIncome(ageCapital, plan, age);
        float yearOutcome = getYearOutcome(ageCapital, plan, age);
        float financialGoalOutcome = getFinancialGoalOutcome(ageCapital, plan, age);

        float investIncome = ageCapital.getInvestCost() * (plan.getPortfolio().getHistoricalCompoundAnnualReturn()) / 100;
        float freeMoney = investIncome + (yearIncome - yearOutcome - financialGoalOutcome);
        float investCost = ageCapital.getInvestCost() + freeMoney;
        float pension = ageCapital.getPension() + (ageCapital.getPension() + plan.getPaceIncreaseOfIncome())/100;
        float financialFreedom = ageCapital.getFinancialFreedom() + (ageCapital.getFinancialFreedom() + plan.getPaceIncreaseOfExpense())/100;

        return buildAgeCapital(age, yearIncome, yearOutcome, financialGoalOutcome, investIncome, freeMoney, investCost, pension, financialFreedom);
    }

    private float getYearIncome(AgeCapitalRepresentation ageCapital, FinancialPlan plan, Integer currentAge) {
        if (currentAge >= plan.getPensionAge()) {
            return plan.getPassiveIncome() + ageCapital.getPension();
        }
        return ageCapital.getIncome() + (ageCapital.getIncome() * plan.getPaceIncreaseOfIncome())/100;
    }

    private float getYearOutcome(AgeCapitalRepresentation ageCapital, FinancialPlan plan, Integer currentAge) {
        if (currentAge >= plan.getPensionAge()) {
            return 0;
        }
        return ageCapital.getActiveAndAdditionOutcome() + (ageCapital.getActiveAndAdditionOutcome() * plan.getPaceIncreaseOfExpense())/100;
    }

    private float getFinancialGoalOutcome(AgeCapitalRepresentation ageCapital, FinancialPlan plan, Integer currentAge) {
        float financialGoalOutcome = 0;
        List<FinancialGoal> financialGoals = new ArrayList<>(getFinancialGoalsByAge(currentAge, plan.getFinancialGoals()));

        if (Objects.equals(currentAge, plan.getPensionAge())) {
            financialGoals.remove(0);
        }

        financialGoalOutcome = earnOutcomeCalculator.sumOfOfFinancialGoals(financialGoals);

        if (currentAge >= plan.getPensionAge()) {
            financialGoalOutcome += ageCapital.getFinancialFreedom();
        }

        return financialGoalOutcome;
    }

    private List<FinancialGoal> getFinancialGoalsByAge(Integer age, List<FinancialGoal> financialGoals) {
        return financialGoals.stream()
                .filter(goal -> Objects.equals(goal.getAchieveAge(), age))
                .toList();
    }


    private AgeCapitalRepresentation buildAgeCapital(Integer age,
                                                     float income,
                                                     float activeAndAdditionOutcome,
                                                     float financialGoalsOutcome,
                                                     float investIncome,
                                                     float freeMoney,
                                                     float investCost,
                                                     float pension,
                                                     float financialFreedom) {
        AgeCapitalRepresentation ageCapitalRepresentation = new AgeCapitalRepresentation();
        ageCapitalRepresentation.setAge(age);
        ageCapitalRepresentation.setIncome((int) income);
        ageCapitalRepresentation.setActiveAndAdditionOutcome((int) activeAndAdditionOutcome);
        ageCapitalRepresentation.setFinancialGoalsOutcome((int) financialGoalsOutcome);
        ageCapitalRepresentation.setInvestIncome((int) investIncome);
        ageCapitalRepresentation.setFreeMoney((int) freeMoney);
        ageCapitalRepresentation.setInvestCost((int) investCost);
        ageCapitalRepresentation.setPension((int) pension);
        ageCapitalRepresentation.setFinancialFreedom((int) financialFreedom);
        return ageCapitalRepresentation;
    }



}
