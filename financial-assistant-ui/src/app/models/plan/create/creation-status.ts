export enum CreationStatus {
  PLANNING,
  INCOME_AND_OUTCOME,
  FINANCIAL_GOALS,
  ASSETS_AND_LIABILITIES,
  COMPLETE
}

export class CreationStatusUtils {
  public static getStatusById(id: number): CreationStatus {
    switch (id) {
      case 0:
        return CreationStatus.PLANNING;
      case 1:
        return CreationStatus.INCOME_AND_OUTCOME;
      case 2:
        return CreationStatus.FINANCIAL_GOALS;
      case 3:
        return CreationStatus.ASSETS_AND_LIABILITIES;
      case 4:
        return CreationStatus.COMPLETE;
      default:
        return CreationStatus.PLANNING;
    }
  }
}
