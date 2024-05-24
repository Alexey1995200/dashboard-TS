import './styles.scss'
import {VictoryAxis, VictoryBar, VictoryChart, VictoryLabel} from 'victory';
import {palette} from "../../../../assets/colors";
import {IWidgetEl} from "../../interfaces";
import React, {useEffect, useMemo, useRef, useState} from "react";
import {IEmployee} from "../../../../DB/db";

interface IAvgTime {
    x: string, //userName
    y: number  //load
}

const generateRandomPlaceholderData = () => {
    const length = Math.floor(Math.random() * 10) + 5; // length range 5-15 "users"
    return Array.from({length}, () => ({
        x: Math.ceil(Math.random() * 1000).toString(),
        y: Math.ceil(Math.random() * 10)
    }));
};

const AvgTime = ({themeFontColor, themeBackgroundColor, DBData}: IWidgetEl) => {
    const avgRef = useRef<HTMLDivElement>(null);
    const [avgScale, setAvgScale] = useState<number>(1)
    const [widgetWidth, setWidgetWidth] = useState<number>(0)
    const [widgetHeight, setWidgetHeight] = useState<number>(0)
    const [defaultData, setDefaultData] = useState<IAvgTime[]>(generateRandomPlaceholderData())//todo remove
    const [employees, setEmployees] = useState<IEmployee[]>([
        {
            name: 'placeholder',
            id: 1,
            workload: 1,
            avgDays: 1
        }
    ])
    const getDimensions = () => {
        if (avgRef.current) {
            const {width, height} = avgRef.current.getBoundingClientRect();
            return [width, height];
        }
        return [0, 0];
    };
    const barWidth = useMemo(() => {
        const chartWidth = widgetWidth - 80
        return chartWidth / (employees ? employees : defaultData).length * .5
    }, [widgetWidth, employees, defaultData])
    const handleResize = () => {
        const [width, height] = getDimensions();
        setWidgetWidth(width)
        setWidgetHeight(height)
        setAvgScale((Math.min(width / 2, height) / 140));
    };
    useEffect(() => {
        handleResize();

        const resizeObserver = new ResizeObserver(handleResize);//todo read about event listener / resize observer
        if (avgRef.current) {
            resizeObserver.observe(avgRef.current);
        }
        return () => {
            resizeObserver.disconnect();
        };
    }, []);
    const cutName = (name: string, maxLength: number) => {
        if (name.length > maxLength + 1) {//maxLength ± 1 if needed
            return name.substring(0, maxLength) + "..."
        }
        return name
    };
    useEffect(() => {
        if (DBData) {
            const emp = Object.values(DBData.employees).filter((employee) =>
                employee.avgDays ? employee.avgDays : false)
            setEmployees(emp)
        }
    }, [DBData]);

    const avgData = employees
        .filter(employee => typeof employee.avgDays === 'number')
        .map(employee => ({
            x: employee.name ? employee.name : employee.fullName,
            y: employee.avgDays
        }));

    const avgDataFix = useMemo(() => {
        return avgData.map(employee => ({
            ...employee,
            x: cutName((employee.x ? employee.x : 'Name'), 5)
        }));
    }, [avgData])
    return (
        <div className={'avgTime__wrapper'}
             style={{
                 color: themeFontColor,
                 backgroundColor: themeBackgroundColor,
             }}
             ref={avgRef}
        >
            <div className={'centered_title dragHandle'}
                 style={{transform: `scale(${avgScale > 1.25 ? avgScale / 1.25 : 1})`}}
            >Avg Handle Time in days for Project-Task
            </div>
            <div className={'bar'} style={{padding: `${widgetWidth * .25} ${widgetWidth * .125}px`,}}>
                <VictoryChart
                    width={(widgetWidth - 80)}
                    height={widgetHeight * .80}
                >
                    <VictoryBar
                        alignment='middle'
                        standalone={false}
                        data={avgData ? avgDataFix : defaultData}
                        barWidth={barWidth}
                        x="x"
                        y="y"
                        labels={({datum}) => datum.y}
                        labelComponent={
                            <VictoryLabel
                                dy={-4}
                                style={{
                                    fontWeight: 600,
                                    fontSize: '14px',
                                    fill: themeFontColor
                                }}
                            />
                        }
                        style={{
                            data:
                                {fill: palette.freshGreen},
                        }}
                    />
                    <VictoryAxis
                        style={{
                            axis: {stroke: "transparent"},
                            tickLabels: {fontSize: 10, padding: 4, stroke: themeFontColor, fontWeight: 100}
                        }}/>
                </VictoryChart>
            </div>
        </div>
    )
}

export default AvgTime