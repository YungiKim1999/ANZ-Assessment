/**
 * All constants/ default values are obtained from:
 * https://www.anz.co.nz/personal/accounts/everyday-banking/overdraft/
 */
const DEFAULT_BASE_RATE = 0.129;
const DEFAULT_ASSIGNED_RATE = 0.06;
const DEFAULT_EXCESS_RATE = 0.15;
const DEFAULT_MANAGEMENT_FEE = 3;
const DEFAULT_UNARRANGED_FEE = 3;

export default class OverdraftCalculator {
  constructor(
    baseRate = DEFAULT_BASE_RATE,
    additionalRate = DEFAULT_ASSIGNED_RATE,
    excessRate = DEFAULT_EXCESS_RATE,
    managementFee = DEFAULT_MANAGEMENT_FEE,
    unarrangedFee = DEFAULT_UNARRANGED_FEE
  ) {
    this.baseRate = baseRate;
    this.additionalRate = additionalRate;
    this.excessRate = excessRate;
    this.managementFee = managementFee;
    this.unarrangedFee = unarrangedFee;
  }

  /**
   * hasExceededCreditLimit checks whether an account has exceed the credit limit based on the account balance, spending, and credit limit
   * @param {Number} accountBalance The account balance of the client/customer
   * @param {Number} totalSpending The total spendings of the client/customer
   * @param {Number} creditLimit The overdraft credit limit of the client's/customer's account
   * @returns true if the customer has gone over their credit limit, false otherwise
   */
  hasExceededCreditLimit(accountBalance, totalSpending, creditLimit) {
    if (accountBalance + creditLimit < totalSpending) {
      return true;
    }
    return false;
  }

  /**
   * getExcessInterestCharged calculates the interest charged on excessed accounts if they have spent over the credit limit
   * @param {*} accountBalance The account balance of the client/customer
   * @param {*} totalSpending The total spendings of the client/customer
   * @param {*} creditLimit The overdraft credit limit of the client's/customer's account
   * @returns a Float representing the interest charged (2 d.p), 0 if the client/customer has not spent over the credit limit
   */
  getExcessInterestCharged(accountBalance, totalSpending, creditLimit) {
    if (
      !this.hasExceededCreditLimit(accountBalance, totalSpending, creditLimit)
    ) {
      return 0;
    }

    let exceededAmount = this.calculateExceededAmount(
      accountBalance,
      totalSpending,
      creditLimit
    );

    let baseInterestChargedPerAnnum =
      this.calculateBaseInterestChargedPerAnnum(creditLimit);
    let excessInterestChargedPerAnnum =
      this.calculateExcessInterestChargedPerAnnum(exceededAmount);

    let baseInterestChargedPerMonth = this.calculateMonthlyInterest(
      baseInterestChargedPerAnnum
    );
    let excessInterestChargedPerMonth = this.calculateMonthlyInterest(
      excessInterestChargedPerAnnum
    );

    let totalInterestChargedPerMonth =
      this.calculateTotalInterestChargedPerMonth(
        baseInterestChargedPerMonth,
        excessInterestChargedPerMonth
      );

    return parseFloat(totalInterestChargedPerMonth.toFixed(2));
  }

  calculateExceededAmount(accountBalance, totalSpending, creditLimit) {
    return totalSpending - accountBalance - creditLimit;
  }

  calculateMonthlyInterest(InterestChargedPerAnnum) {
    return InterestChargedPerAnnum / 12;
  }

  calculateBaseInterestChargedPerAnnum(creditLimit) {
    return (this.baseRate + this.additionalRate) * creditLimit;
  }

  calculateExcessInterestChargedPerAnnum(exceededAmount) {
    return (this.baseRate + this.excessRate) * exceededAmount;
  }

  calculateTotalInterestChargedPerMonth(
    baseInterestChargedPerMonth,
    excessInterestChargedPerMonth
  ) {
    return (
      baseInterestChargedPerMonth +
      excessInterestChargedPerMonth +
      this.managementFee +
      this.unarrangedFee
    );
  }
}
