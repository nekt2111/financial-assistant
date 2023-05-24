package com.kpi.dyploma.planapi.service;

import com.kpi.dyploma.planapi.model.plan.FinancialPlan;
import com.kpi.dyploma.planapi.model.portfolio.Portfolio;
import com.kpi.dyploma.planapi.model.portfolio.PortfolioType;
import com.kpi.dyploma.planapi.repository.PortfolioRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PortfolioService {

    private static final int STOCK_MARKET_HISTORIC_CYCLE_YEARS = 13;
    private static final int MIN_RISK_PROFILE_FOR_STOCK = 20;
    private static final Logger LOGGER = LoggerFactory.getLogger(PortfolioService.class);


    private final EarnOutcomeCalculator earnOutcomeCalculator;
    private final PortfolioRepository portfolioRepository;


    public Portfolio defineBestPortfolioForPlan(FinancialPlan plan) {
        int ageTillPension = plan.getPensionAge() - plan.getStartAge();
        float earnOutcomeCoefficient = earnOutcomeCalculator.defineEarnOutcomeCoefficient(plan);
        PortfolioType portfolioType = definePortfolioType(ageTillPension, earnOutcomeCoefficient, plan.getRiskProfile());
        LOGGER.info("portfolio type - {}", portfolioType);
        List<Portfolio> possiblePortfolios = portfolioRepository.findPortfoliosByPortfolioType(portfolioType);
        LOGGER.info("Possible portfolios - {}", possiblePortfolios);
        return possiblePortfolios.get(0);
    }

    public List<Portfolio> getAllPortfolios() {
        return portfolioRepository.findAll();
    }

    private PortfolioType definePortfolioType(int ageTillPension, float earnOutcomeCoefficient, int riskProfile) {
        PortfolioType portfolioType;

        if (ageTillPension >= STOCK_MARKET_HISTORIC_CYCLE_YEARS && riskProfile >= MIN_RISK_PROFILE_FOR_STOCK) {
            portfolioType = PortfolioType.AGGRESSIVE;
        } else if (ageTillPension >= STOCK_MARKET_HISTORIC_CYCLE_YEARS && riskProfile < MIN_RISK_PROFILE_FOR_STOCK) {
            portfolioType = PortfolioType.BALANCED;
        } else {
            portfolioType = PortfolioType.CONSERVATIVE;
        }

        return portfolioType;

    }


}
