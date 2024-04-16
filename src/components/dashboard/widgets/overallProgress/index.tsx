import { ConfigProvider, Progress } from "antd";
import React, {useEffect, useRef, useState} from "react";
import './styles.scss';
import { useIsFetching } from '@tanstack/react-query'
import {strokeColor} from "../../const";
import {palette, theme} from "../../../../assets/colors";
import {IWidgetEl} from "../../interfaces";
const OverallProgress = ({currentTheme}:IWidgetEl) => {
    const [overallScale, setOverallScale]=useState(1)
    const [percentage, setPercentage] = useState(Math.random()*100)
    const overallProgressRef = useRef<HTMLDivElement>(null);
    const getDimensions = () => {
        if (overallProgressRef.current) {
            const { width, height } = overallProgressRef.current.getBoundingClientRect();
            return [width, height]
        }
    };
    const handleResize = () => {
        const dimensions = getDimensions();
        if (!dimensions) return;
        const [width, height] = dimensions
        setOverallScale((Math.min(width, height)/120));
    };
    useEffect(() => {
        handleResize(); // Initial render

        fetch('/db/progressDB/percentage')
            .then((response) => response.json())
            .then((response) => {
                setPercentage(response.percentage)
            })
        const resizeObserver = new ResizeObserver(handleResize);
        if (overallProgressRef.current) {
            resizeObserver.observe(overallProgressRef.current);
        }
        return () => {
            resizeObserver.disconnect();
        };
    }, []);


    // const { isLoading, error, data } = useQuery('repoData', () =>
    //     fetch('https://api.github.com/repos/tannerlinsley/react-query').then(res =>
    //         res.json()
    //     )
    // )

    // if (isLoading) return 'Loading...'
    //
    // if (error) return 'An error has occurred: ' + error.message
    const isFetching = useIsFetching()
    return (
    // isFetching ? (
    //     <div>Queries are fetching in the background...</div>
    // ) : (

        <div
            ref={overallProgressRef}
            className={'overallProgress'}
            style={{
                backgroundColor: currentTheme ? theme.dashboard.grid.widget.BGColor[currentTheme] : palette.white,
                color:currentTheme ? theme.dashboard.grid.widget.color[currentTheme] : palette.black,
            }}
        >
            <div className={'centered_title overallProgress__title dragHandle'} style={{ transform: `scale(${overallScale > 1.25 ? overallScale/1.25 : 1})` }}>Overall Progress</div>
            <ConfigProvider
                theme={{
                    components: {
                        Progress: {
                            circleTextFontSize: '24',
                            circleTextColor: currentTheme ? theme.dashboard.grid.widget.color[currentTheme] : palette.black
                        },
                    },
                }}
            >
                <Progress
                    style={{ transform: `scale(${overallScale > 1.25 ? overallScale/1.25 : 1})` }}
                    size={96}
                    strokeWidth={12}
                    type="dashboard"
                    percent={Math.round(percentage)}
                    gapDegree={180}
                    strokeColor={strokeColor}
                    className={'antProgOverall'}
                />
            </ConfigProvider>
        </div>
    );
};

export default OverallProgress;
