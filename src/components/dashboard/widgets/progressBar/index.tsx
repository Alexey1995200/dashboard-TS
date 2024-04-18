import {ConfigProvider, Progress} from "antd";
import './styles.scss'
import {waiting} from "../../../../assets/svg";
import {useEffect, useState} from "react";
import {strokeColor} from "../../const";
import {IWidgetEl} from "../../interfaces";
import {palette, theme} from "../../../../assets/colors";
interface ITasks {
    id: number;
    title: string;
    percentage: number;
}
const task: ITasks[] = [{
    id: 0,
    title: "",
    percentage: 0,
}]
const ProgressBar = ({currentTheme}:IWidgetEl) => {
    const [percentage, setPercentage] = useState<number>(0)
    const [tasks, setTasks] = useState<ITasks[]>(task)
    useEffect(() => {
        fetch('/db/progressDB/percentage')
            .then((response) => response.json())
            .then((response) => {
                setPercentage(response.percentage)
            })
        fetch('/db/progressDB/tasks')
            .then((response) => response.json())
            .then((response) => {
                setTasks(response.tasks)
            })
    }, []);
    return (
        <div
            className={'progressBar'}
            style={{
                backgroundColor:currentTheme ? theme.dashboard.grid.widget.BGColor[currentTheme] : palette.white,
                color:currentTheme ? theme.dashboard.grid.widget.color[currentTheme] : palette.black
            }}
        >
            <Progress
                percent={percentage}
                strokeColor={strokeColor}
                showInfo={false}
                className={'progressBar__bar dragHandle'}
            />
            <div className={'progressBar__tasks'} >
                {tasks.map((task: ITasks) => (
                    <div

                        className={'task'}
                        key={`${task.id}`}>
                        {task.title}
                        {
                            task.percentage === 100 ? (
                                <>
                                    <div className={'circle'}>
                                        <div className={'checked'}/>
                                    </div>
                                    <div>Completed</div>
                                </>
                            ) : task.percentage === 0 ? (
                                <>
                                    <img className={'waiting'} src={waiting} alt={'waiting'}/>
                                    <div>Waiting</div>
                                </>
                            ) : (
                                <ConfigProvider
                                    theme={{
                                        components: {
                                            Progress: {
                                                circleTextFontSize: '16px',
                                                circleTextColor: currentTheme ? theme.dashboard.grid.widget.color[currentTheme] : palette.black
                                            },
                                        },
                                    }}
                                > <Progress type="dashboard" percent={task.percentage} strokeColor={strokeColor}
                                            strokeWidth={12} size={60} gapDegree={0.001}/>
                                </ConfigProvider>
                            )}
                    </div>
                    )
                )}
            </div>
        </div>
    )
}
export default ProgressBar