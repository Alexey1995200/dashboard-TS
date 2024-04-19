interface ITasks {
    id: number;
    title: string;
    percentage: number;
}

const tasks: ITasks[] = [
    {
        id: 0,
        title: "Planning",
        percentage: 100,
    }, {
        id: 1,
        title: "Design",
        percentage: 95,
    }, {
        id: 2,
        title: "Development",
        percentage: 86,
    }, {
        id: 3,
        title: "Testing",
        percentage: 64,
    }, {
        id: 4,
        title: "PreRelease",
        percentage: 0,
    },
]

const totalPercentage = tasks.reduce((accumulator, object) => {
        return accumulator + object.percentage;
    }, 0
);
const percentage: number = totalPercentage / tasks.length

const avgData = [
    {x: 'Georg', y: 5.3},
    {x: 'Kate', y: 4.5},
    {x: 'Nancy', y: 3.7},
    {x: 'Paula', y: 7.7},
    {x: 'Richard', y: 6.4}
]

export {percentage, tasks, avgData}