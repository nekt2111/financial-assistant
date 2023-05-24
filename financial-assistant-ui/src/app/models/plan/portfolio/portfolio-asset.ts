import {PortfolioAssetType} from "./portfolio-asset-type";

export class PortfolioAsset {
  public id: number;
  public name: string;
  public ticker: string;
  public weight: number;
  public type: PortfolioAssetType;
}
