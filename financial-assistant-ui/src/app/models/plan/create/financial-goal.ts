export class FinancialGoal {
  constructor(name: string, amountOfMoney?: any, achieveAge?: any) {
    this.name = name;
    this.amountOfMoney = amountOfMoney;
    this.achieveAge = achieveAge;
  }

  public name: string;
  public amountOfMoney?: any;
  public achieveAge?: any;
}
