import OverdraftCalculator from "../OverdraftCalculator.js"

let overdraftCalculator;

const DEFAULT_BASE_RATE = 0.129;
const DEFAULT_ASSIGNED_RATE = 0.06;
const DEFAULT_EXCESS_RATE = 0.15;
const DEFAULT_MANAGEMENT_FEE = 3;
const DEFAULT_UNARRANGED_FEE = 3;

/**
 * Before each test starts, create an overdraft calculator with preset variables
 */
beforeEach(() => {
    overdraftCalculator = new OverdraftCalculator(DEFAULT_BASE_RATE, DEFAULT_ASSIGNED_RATE, DEFAULT_EXCESS_RATE, DEFAULT_MANAGEMENT_FEE, DEFAULT_UNARRANGED_FEE);
});

describe( 'OverdraftCalculator.hasExceededCreditLimit Test cases', () => {
    it('tries to see whether an account that has overdrafted over the credit limit has past the credit limit', () => {
        const accountBalance = 1000;
        const totalSpending = 2000;
        const creditLimit = 500;
        
        const result = overdraftCalculator.hasExceededCreditLimit(accountBalance, totalSpending, creditLimit);
        expect(result).toBe(true);
    });

    it('tries to see whether an account that has not overdrafted over the credit limit has not past the credit limit', () => {
        const accountBalance = 1000;
        const totalSpending = 2000;
        const creditLimit = 2000;
        
        const result = overdraftCalculator.hasExceededCreditLimit(accountBalance, totalSpending, creditLimit);
        expect(result).toBe(false);
    });

    it('tries to see whether an account that has overdrafted up till the credit limit but has not past the credit limit', () => {
        const accountBalance = 1000;
        const totalSpending = 2000;
        const creditLimit = 1000;
        
        const result = overdraftCalculator.hasExceededCreditLimit(accountBalance, totalSpending, creditLimit);
        expect(result).toBe(false);
    });
});

describe( 'OverdraftCalculator.getExcessInterestCharged Test cases', () => {
    it('tries to get the interest charged on an account that has overdrafted and exceeded credit limits', () => {
        const accountBalance = 1000;
        const totalSpending = 2000;
        const creditLimit = 500;

        const expected = 25.50;
        
        const result = overdraftCalculator.getExcessInterestCharged(accountBalance, totalSpending, creditLimit);
        expect(result).toBe(expected);
    });

    it('tries to get the interest charged on an account that has overdrafted but has not exceeded credit limits', () => {
        const accountBalance = 1000;
        const totalSpending = 2000;
        const creditLimit = 2000;

        const expected = 0;
        
        const result = overdraftCalculator.getExcessInterestCharged(accountBalance, totalSpending, creditLimit);
        expect(result).toBe(expected);
    });

    it('tries to get the interest charged on an account that has overdrafted up till the credit limit but has not past the credit limit', () => {
        const accountBalance = 1000;
        const totalSpending = 2000;
        const creditLimit = 1000;

        const expected = 0;
        
        const result = overdraftCalculator.getExcessInterestCharged(accountBalance, totalSpending, creditLimit);
        expect(result).toBe(expected);
    });
});


