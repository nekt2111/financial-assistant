package com.kpi.dyploma.planapi.model.plan;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
public class LifeCapitalRepresentation extends CapitalRepresentation{
    private List<AgeCapitalRepresentation> ageCapitalRepresentationList;
}
