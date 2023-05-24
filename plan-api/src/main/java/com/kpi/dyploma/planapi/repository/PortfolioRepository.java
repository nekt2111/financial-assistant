package com.kpi.dyploma.planapi.repository;

import com.kpi.dyploma.planapi.model.portfolio.Portfolio;
import com.kpi.dyploma.planapi.model.portfolio.PortfolioType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PortfolioRepository extends JpaRepository<Portfolio, Integer> {
    List<Portfolio> findPortfoliosByPortfolioType(PortfolioType portfolioType);
}
