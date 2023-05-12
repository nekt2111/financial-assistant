export class FinancialGoal {
  constructor(name: string, amountOfMoney?: any) {
    this.name = name;
    this.amountOfMoney = amountOfMoney;
  }

  public name: string;
  public amountOfMoney?: any;
}
