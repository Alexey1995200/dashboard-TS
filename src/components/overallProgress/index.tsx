import { ConfigProvider, Progress } from "antd";
import React, {useEffect, useRef, useState} from "react";
import './styles.scss';

const OverallProgress = () => {
    const [overallScale, setOverallScale]=useState(1)
    const [colors, setColors] = useState({})
    const [percentage, setPercentage] = useState(50)
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
        fetch('/db/colors')                                         //todo optimize fetch duplicates
            .then((response) => response.json())
            .then((respColors) => {
                setColors(respColors.mainColors)
            })
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


    return (
        <div
            ref={overallProgressRef}
            className={'overallProgress dragHandle'}
        >
            <div className={'default_dashboard_title overallProgress__title'} style={{ transform: `scale(${overallScale > 1.25 ? overallScale/1.25 : 1})` }}>Overall Progress</div>
            <ConfigProvider
                theme={{
                    components: {
                        Progress: {
                            circleTextFontSize: '24',
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
                    strokeColor={colors}
                    className={'antProgOverall'}
                />
            </ConfigProvider>
        </div>
    );
};

export default OverallProgress;
