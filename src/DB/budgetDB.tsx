const budgetData= [
    {
        id: 1,
        type: 'Total Budget',
        text: 'Total Budget',
        value: 52000,
        color:'black'
    },
    {
        id: 2,
        type: 'Budget AmountUsed',
        text: 'Budget AmountUsed',
        value: 42000,
        color:'green'
    },
    {
        id: 3,
        type: 'Current Target Amount',
        text: 'Current Target Amount',
        value: 40000,
        color:'gray'
    },
];
const overBudgetPercent = +((budgetData[2].value)/(budgetData[1].value)).toFixed(2)
export {budgetData, overBudgetPercent}