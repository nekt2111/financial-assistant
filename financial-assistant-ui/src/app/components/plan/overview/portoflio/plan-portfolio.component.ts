import {Component, Input, OnInit} from "@angular/core";
import {EchartsAdapterService} from "../../../../services/echarts-adapter.service";
import {EChartsOption} from "echarts";
import {PieChartData} from "../../../../models/charts/pie-chart-data";
import {PortfolioAsset} from "../../../../models/plan/portfolio/portfolio-asset";
import {Portfolio} from "../../../../models/plan/portfolio/portfolio";
import {PortfolioAssetType} from "../../../../models/plan/portfolio/portfolio-asset-type";

@Component({
  selector: 'app-plan-portfolio',
  templateUrl: './plan-portfolio.component.html',
  styleUrls: ['./plan-portfolio.component.css']
})
export class PlanPortfolioComponent implements OnInit {

  constructor(private echartsService: EchartsAdapterService) {
  }

  public portfolioChartOptions: EChartsOption;


  @Input()
  public portfolio: Portfolio;

  public ngOnInit() {
    const legendNames = this.getLegendNamesForPortfolioChart();
    const pieChartData = this.getPieChartDataForPortfolioChart();
    this.portfolioChartOptions = this.echartsService.createOptionsForPieChart('Структура портфелю', legendNames, pieChartData);
  }

  public getLegendNamesForPortfolioChart(): string[] {
    return this.portfolio.assets.map(asset => asset.ticker);
  }

  public getPieChartDataForPortfolioChart(): PieChartData[] {
    return this.portfolio.assets.map(asset =>
      this.buildPieChartDataFromPortfolioAsset(asset));
  }

  private buildPieChartDataFromPortfolioAsset(asset: PortfolioAsset): PieChartData {
    const data = new PieChartData();
    data.name = asset.ticker;
    data.value = asset.weight;
    return data;
  }

}
