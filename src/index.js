import checkInputs from "./utils/inputChecker.js";
import OverdraftCalculator from "./OverdraftCalculator/OverdraftCalculator.js";

const accountBalance = process.argv[2];
const totalSpending = process.argv[3];
const creditLimit = process.argv[4];

const hasExceededCreditLimitSentence = "Credit limited exceeded ? -> ";
const excessInterestChargedSentence = "Interest charged for the month : ";

const overdraftCalculator = new OverdraftCalculator();

const moneyFormatter = Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "NZD",
});

try {
  checkInputs(accountBalance, totalSpending, creditLimit);

  const interestAmount = overdraftCalculator.getExcessInterestCharged(
    accountBalance,
    totalSpending,
    creditLimit
  );

  const hasExceededCreditLimit = overdraftCalculator.hasExceededCreditLimit(
    accountBalance,
    totalSpending,
    creditLimit
  );

  console.log(hasExceededCreditLimitSentence + hasExceededCreditLimit);

  console.log(
    excessInterestChargedSentence + moneyFormatter.format(interestAmount)
  );
} catch (ex) {
  console.log(ex);
}
