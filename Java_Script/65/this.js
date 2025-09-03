'use strict';
function createAccount() {
    const account = {
        balance: 0,
        getBalance() {
            return this.balance;
        },
        makeTransaction(amount) {
            this.balance += amount;
            return this;
        }
    };
    return account;
}
const account1 = createAccount();
console.log(account1.getBalance());
console.log(account1.makeTransaction(100).getBalance());

const account2 = createAccount();
console.log(account2.getBalance());
console.log(account2.makeTransaction(-100).getBalance());

function makeTransaction2(amount) {
    this.balance += amount;
    return this;
}

console.log(makeTransaction2.call(account1, 1000).getBalance());

const deposit50 = makeTransaction2.bind(account1, 50);
deposit50();
console.log(account1.getBalance());

