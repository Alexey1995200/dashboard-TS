import {ConfigProvider, Progress} from "antd";
import './styles.scss'
import {waiting} from "../../../../assets/svg";
import {useEffect, useState} from "react";

interface IProgBar {
    tasks: ITasks[];
    percentage: number;

}

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
const ProgressBar = () => {
    const [colors, setColors] = useState({})
    const [percentage, setPercentage] = useState(0)
    const [tasks, setTasks] = useState<ITasks[]>(task)
    useEffect(() => {
        fetch('/db/colors')
            .then((response) => response.json())
            .then((respColors) => {
                setColors(respColors.mainColors)
            })
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
        >
            <Progress
                percent={percentage}
                strokeColor={colors}
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
                                                },
                                            },
                                        }}
                                    > <Progress type="dashboard" percent={task.percentage} strokeColor={colors}
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