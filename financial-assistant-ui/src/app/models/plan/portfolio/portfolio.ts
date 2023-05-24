import {PortfolioAsset} from "./portfolio-asset";
import {PortfolioType} from "./portfolio-type";

export class Portfolio {
  public id: number;
  public name: string;
  public assets: PortfolioAsset[];
  public portfolioType: PortfolioType;
  public historicalCompoundAnnualReturn: number;
}
