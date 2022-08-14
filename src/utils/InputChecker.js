export default function checkInputs(accountBalance, totalSpending, creditLimit){
    if (isNaN(accountBalance) || isNaN(totalSpending) || isNaN(creditLimit)) {
        throw "there was a parameter inputed that was not a number!";
    }
}