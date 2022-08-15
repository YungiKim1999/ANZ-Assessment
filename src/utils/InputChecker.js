/**
 * Checks whether the input from the command line are all numbers.
 * If not, throws an Exception
 * @param {*} accountBalance The input account balance from the command line
 * @param {*} totalSpending The input total spendings from the command line
 * @param {*} creditLimit The input credit limit from the command line
 */
export default function checkInputs(accountBalance, totalSpending, creditLimit){
    if (isNaN(accountBalance) || isNaN(totalSpending) || isNaN(creditLimit)) {
        throw "there was a parameter inputed that was not a number!";
    }
}