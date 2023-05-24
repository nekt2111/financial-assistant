package com.kpi.dyploma.planapi.model.create;

import lombok.Data;

@Data
public class AssetsAndLiabilitiesStep {
    private Integer monetaryInstruments;
    private Integer securities;
    private Integer realEstate;
    private Integer other;
}
