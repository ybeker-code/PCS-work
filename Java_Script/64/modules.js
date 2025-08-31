'use strict';

const dayUtilities = (function () {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday',
        'thursday', 'friday', 'shabbos kodesh'];
    return {
        getDay(number) {
            return days[--number];
        },
        getNumber(day) {
            return (days.findIndex(d => d === day) + 1);
        }
    };
}());

console.log(dayUtilities.getDay(7));
console.log(dayUtilities.getNumber('sunday'));

// Interest calculator
const interestCalculator = (function () {
    let rate = 5;
    let years = 1;
    return {
        setRate(number) {
            if (number >= 0)
                rate = number;
        },
        setYears(number) {
            if (number >= 0)
                years = number;
        },
        calculateInterest(principal) {
            let totalInterest = 0;
            for (let i = 0; i < years; i++) {
                totalInterest += principal * (rate / 100);
            }
            return totalInterest;
        }
    };
}());

interestCalculator.setRate(1);
interestCalculator.setYears(1);
console.log(interestCalculator.calculateInterest(100));

