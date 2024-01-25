import './App.css';
import {Space} from "antd";
import OverallProgress from './components/overallProgress'
import ProgressBar from "./components/progressBar";
import LaunchDate from "./components/launchDate";
import Risks from "./components/risks";
import Budget from "./components/budget";
import OverdueTasks from "./components/overdueTasks";
import Summary from "./components/summary";
import AvgTime from "./components/avgTime";
import UpcTasks from "./components/upcomingDeadlines";
import ProjectLogs from "./components/logs";


function App() {

    return (
        <div className={'wrapper'}>
            <Space>
                <OverallProgress/>
            </Space>
            <Space>
                <ProgressBar/>
            </Space>
            <Space>
                <LaunchDate/>
            </Space>
            <Space>
                <Risks/>
            </Space>
            <Space>
                <Budget/>
            </Space>
            <Space>
                <OverdueTasks/>
            </Space>
            <Space>
                <Summary/>
            </Space>
            <Space>
                <AvgTime/>
            </Space>
            <Space>
                <UpcTasks/>
            </Space>
            <Space>
                <ProjectLogs/>
            </Space>
        </div>
    );
}

export default App;



