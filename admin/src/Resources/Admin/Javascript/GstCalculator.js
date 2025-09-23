export const getIncludeCalculator = ({ tax_rate, amount }) => {
    let taxAmout = amount - (amount / (1 + (tax_rate / 100)));
    let newAmount = amount - taxAmout;
    return newAmount;
}

export const getExcludeCalculator = ({ tax_rate, amount }) => {
    let taxAmount = (tax_rate / 100) * amount;
    let newAmount = amount + taxAmount;
    return newAmount;
}