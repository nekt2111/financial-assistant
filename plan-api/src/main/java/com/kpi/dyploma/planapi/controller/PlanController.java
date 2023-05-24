package com.kpi.dyploma.planapi.controller;

import com.kpi.dyploma.planapi.model.create.CreatePlanRequest;
import com.kpi.dyploma.planapi.model.plan.*;
import com.kpi.dyploma.planapi.service.FinancialPlanService;
import com.kpi.dyploma.planapi.service.LivingCapitalService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/plan")
@RequiredArgsConstructor
public class PlanController {

    private static final Logger LOGGER = LoggerFactory.getLogger(PlanController.class);

    private final FinancialPlanService financialPlanService;
    private final LivingCapitalService livingCapitalService;
    @PostMapping
    public ResponseEntity<PlanRepresentation> createPlan(@RequestBody CreatePlanRequest request) {
        LOGGER.info("request - {}", request);
        FinancialPlan plan = financialPlanService.createFinancialPlan(request);
        LOGGER.info("saved - {}", plan);
        LifeCapitalRepresentation lifeCapitalRepresentation = livingCapitalService.getLivingCapitalForPlan(plan);
        PlanRepresentation planRepresentation = new PlanRepresentation(lifeCapitalRepresentation, plan);
        LOGGER.info("representation - {}", planRepresentation);

        return ResponseEntity.ok(planRepresentation);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PlanRepresentation> planById(@PathVariable Integer id) {
        FinancialPlan plan = financialPlanService.getFinancialPlanById(id);
        if (plan != null) {
            LifeCapitalRepresentation lifeCapitalRepresentation = livingCapitalService.getLivingCapitalForPlan(plan);
            PlanRepresentation planRepresentation = new PlanRepresentation(lifeCapitalRepresentation, plan);
            LOGGER.info("Financial plan - {}", plan);
            return ResponseEntity.ok(planRepresentation);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<FinancialPlanSummary>> plansByUserId(@PathVariable Integer userId) {
        return ResponseEntity.ok(financialPlanService.getFinancialPlanSummariesForUser(userId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deletePlanById(@PathVariable Integer id) {
        LOGGER.info("Request to delete plan with id {}", id);
        financialPlanService.deletePlanById(id);
        return new ResponseEntity(HttpStatus.OK);
    }
}
