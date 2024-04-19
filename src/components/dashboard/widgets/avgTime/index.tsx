import './styles.scss'
import {VictoryAxis, VictoryBar, VictoryChart, VictoryLabel, VictoryTheme} from 'victory';
import {palette, theme} from "../../../../assets/colors";
import {IWidgetEl} from "../../interfaces";
import React, {useEffect, useMemo, useRef, useState} from "react";

interface IAvgTime {
    x: string,
    y: number
}

const AvgTime = ({currentTheme}: IWidgetEl) => {
    const [avgScale, setAvgScale] = useState<number>(1)
    const avgRef = useRef<HTMLDivElement>(null);
    const [widgetWidth, setWidgetWidth] = useState<number>(0)
    const [widgetHeight, setWidgetHeight] = useState<number>(0)
    const [data, setData] = useState<IAvgTime[]>([
        {x: Math.ceil(Math.random() * 1000).toString(), y: Math.ceil(Math.random() * 10)},
        {x: Math.ceil(Math.random() * 1000).toString(), y: Math.ceil(Math.random() * 10)},
        {x: Math.ceil(Math.random() * 1000).toString(), y: Math.ceil(Math.random() * 10)},
        {x: Math.ceil(Math.random() * 1000).toString(), y: Math.ceil(Math.random() * 10)},
        {x: Math.ceil(Math.random() * 1000).toString(), y: Math.ceil(Math.random() * 10)},
        {x: Math.ceil(Math.random() * 1000).toString(), y: Math.ceil(Math.random() * 10)},
        {x: Math.ceil(Math.random() * 1000).toString(), y: Math.ceil(Math.random() * 10)},
        {x: Math.ceil(Math.random() * 1000).toString(), y: Math.ceil(Math.random() * 10)},
        {x: Math.ceil(Math.random() * 1000).toString(), y: Math.ceil(Math.random() * 10)},
        {x: Math.ceil(Math.random() * 1000).toString(), y: Math.ceil(Math.random() * 10)},
        {x: Math.ceil(Math.random() * 1000).toString(), y: Math.ceil(Math.random() * 10)},
        {x: Math.ceil(Math.random() * 1000).toString(), y: Math.ceil(Math.random() * 10)},
        {x: Math.ceil(Math.random() * 1000).toString(), y: Math.ceil(Math.random() * 10)},
        {x: Math.ceil(Math.random() * 1000).toString(), y: Math.ceil(Math.random() * 10)},
        {x: Math.ceil(Math.random() * 1000).toString(), y: Math.ceil(Math.random() * 10)},
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
        return chartWidth / data.length * .5
    }, [widgetWidth, data.length])
    const handleResize = () => {
        const [width, height] = getDimensions();
        setWidgetWidth(width)
        setWidgetHeight(height)
        setAvgScale((Math.min(width / 2, height) / 140));
    };
    useEffect(() => {
        handleResize();
        fetch('/db/progressDB/avgData')
            .then((response) => response.json())
            .then((response) => {
                setData(response.avgData)
            })
        const resizeObserver = new ResizeObserver(handleResize);
        if (avgRef.current) {
            resizeObserver.observe(avgRef.current);
        }
        return () => {
            resizeObserver.disconnect();
        };
    }, []);
    const themeFontColor = useMemo(() => {
        return currentTheme ? theme.dashboard.grid.widget.color[currentTheme] : palette.black;
    }, [currentTheme]);
    const themeBackgroundColor = useMemo(() => {
        return currentTheme ? theme.dashboard.grid.widget.BGColor[currentTheme] : palette.white;
    }, [currentTheme]);
    const cutName = (name: string, maxLength: number) => {
        if (name.length > maxLength) {//maxLength-1 if needed
            return name.substring(0, maxLength) + "..."
        }
        return name
    };
    const shortNameData = useMemo(() => {
        return data.map(el => ({
            ...el,
            x: cutName(el.x, 5)
        }));
    }, [data])
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
            >Avg Handle Time in days for Prjct-Task
            </div>
            <div className={'bar'} style={{padding: `${widgetWidth * .25} ${widgetWidth * .125}px`,}}>

                <VictoryChart

                    width={(widgetWidth - 80)}
                    height={widgetHeight * .80}
                >
                    <VictoryBar
                        alignment='middle'
                        standalone={false}
                        data={data.length >= 5 ? shortNameData : data}
                        barWidth={barWidth}
                        x="x"
                        y="y"
                        labels={({datum}) => datum.y}
                        labelComponent={<VictoryLabel dy={-4} style={{fontSize: '14px', fill: themeFontColor}}/>}
                        style={{
                            data:
                                {fill: palette.freshGreen},
                        }}
                    />
                    <VictoryAxis
                        style={{
                            axis: {stroke: "transparent"},
                            tickLabels: {fontSize: 10, padding: 4, stroke: themeFontColor}
                        }}/>
                </VictoryChart>

                {/*<svg width={widgetWidth-80} height={114} style={{paddingLeft:widgetWidth*.05}}>*/}
                {/*    <VictoryBar*/}
                {/*        alignment='middle'*/}
                {/*        standalone={false}*/}
                {/*        width={(widgetWidth-80)*.9}*/}
                {/*        height={114}*/}
                {/*        padding={*/}
                {/*            {*/}
                {/*                left: 20,*/}
                {/*                right: 20,*/}
                {/*                top:20,*/}
                {/*            }*/}
                {/*        }*/}
                {/*        data={data}*/}
                {/*        barWidth={36}*/}
                {/*        x="x"*/}
                {/*        y="y"*/}
                {/*        labels={({ datum }) => datum.y}*/}
                {/*        labelComponent={<VictoryLabel dy={-4} style={{ fontSize:'14px', backgroundColor:'red', fill:themeFontColor}}/>}*/}
                {/*        style={{*/}
                {/*            data:*/}
                {/*                {fill: palette.freshGreen},*/}
                {/*            // labels:{*/}
                {/*            //     fontSize: '10px',*/}
                {/*            //     fontWeight: 700,*/}
                {/*            //     color: themeFontColor,*/}
                {/*            // }*/}
                {/*        }}*/}
                {/*    />*/}
                {/*</svg>*/}
            </div>
            {/*<div className={'users'} style={{width:widgetWidth-100}}>*/}
            {/*    {data.map((data) => (*/}
            {/*            <div className={'user'} key={data.x + data.y}>*/}
            {/*                <div className={'fakeTable'}/>*/}
            {/*                <div className={'user__name'}>*/}
            {/*                    {data.x.length > 5 ? `${data.x.substring(0, 4)}...` : data.x}*/}
            {/*                </div>*/}

            {/*            </div>*/}
            {/*        )*/}
            {/*    )*/}
            {/*    }*/}
            {/*</div>*/}
        </div>
    )
}

export default AvgTime