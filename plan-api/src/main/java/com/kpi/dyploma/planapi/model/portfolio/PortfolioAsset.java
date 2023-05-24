package com.kpi.dyploma.planapi.model.portfolio;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;

@Data
@Entity
@Table(name = "portfolio_asset")
public class PortfolioAsset {
    @Id
    private Integer id;
    private String name;
    private String ticker;
    private Float weight;
    @Enumerated(EnumType.STRING)
    private PortfolioAssetType type;
    @ToString.Exclude
    @ManyToOne(fetch= FetchType.LAZY, cascade= CascadeType.ALL)
    @JsonBackReference
    private Portfolio portfolio;
}
