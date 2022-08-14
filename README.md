# ANZ Overdraft Calculator Coding Challenge
This project focuses on showcasing Daniel's coding skillset by creating a overdraft calculator to figure out whether an account has overdrafted excessively and how much interest the account is due for.

## Features
- Calculate whether an account has overdrafted excessively and how much interest the account is due for
- Supports command line interface

## Installation and how to use
The project can be obtained by either downloading directly via this GitHub repo or cloned by running the following command:

`git clone https://github.com/YungiKim1999/ANZ-Assessment`

It is required that [node](https://nodejs.org/en/) is installed before running the following commands.

#### Firstly, we want to perform a clean install of our dependencies.

```
$ cd ANZ-Assessment/
$ npm ci
added XXX packages in Xs
```

#### Now, navigate to the src folder:

```
$ cd src/
```

#### Once there, we can run the calculator using the following command:

```
$ node .\index.js {Account balance at the start of the month} {Total spending for the whole month} {Credit limit for that account}
```

#### If done correctly, you should be shown a similar result to:

```
$ Credit limited exceeded ? -> true
$ Interest charged for the month : $25.50
```

## Testing

Navigate into the src folder `src/` and run the following command:

`npm test`

## Assumptions

In order to complete this coding challenge, a few assumptions had to be made:

- To calculate interest, the calculator follows the way in which the ANZ Overdraft Website (https://www.anz.co.nz/personal/accounts/everyday-banking/overdraft/) shows.
- The coding challenge assumes that NZD (New Zealand Dollar) will be the only currency input into the calculator.
- The coding challenge assumes that simple interest is charged based on the excess amount once at the end of the month (i.e it is okay to not calculate daily).
- The calculator design assumes that the calculator can act like a singleton class within the code, within in the backend of the application.
- The coding challenge assumes that  information such as the overdraft base rate, assigned rate, management fee, unarranged overdraft fee, and excess interest rate can be obtained from the database


