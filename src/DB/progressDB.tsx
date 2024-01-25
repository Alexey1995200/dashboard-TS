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

export {percentage, tasks}