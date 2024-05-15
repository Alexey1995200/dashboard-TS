import React, {createContext, useState, useEffect, useContext, ReactNode} from 'react';
import {employee, IDB, IEmployee, ITask, ITasksProgress} from "../DB/db";

interface IDataProvider {
    isLoading: boolean;
}

export const DataContext = createContext<IDB & IDataProvider>(null!);
export const useData = () => useContext(DataContext);

export interface IDataProviderProps {
    children: ReactNode | ReactNode[]
}

export const DataProvider = ({children}: IDataProviderProps) => {
    const [DBData, setDBData] = useState<IDB | undefined>()
    const [tasks, setTasks] = useState<ITask[]>([]);
    const [tasksProgress, setTasksProgress] = useState<ITasksProgress[]>([]);
    const [employees, setEmployees] = useState<employee>({});
    const [finishProjectTimestampMS, setFinishProjectTimestampMS] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [serverTimestamp, setServerTimestamp] = useState<number>(0)
    const fetchDBData = () => {
        fetch('/db')
            .then((response) => response.json())
            .then((response) => {
                if (JSON.parse(response).value) {
                    setDBData(response);
                    setIsLoading(false);
                }
            })
            .catch((err) => console.log('err', err))
    };
    useEffect(() => {
        // fetchDBData();
    }, []);
    useEffect(() => {
        setTasks(DBData?.tasks ? DBData?.tasks : [])
        setTasksProgress(DBData?.tasksProgress ? DBData?.tasksProgress : [])
        setEmployees(DBData?.employees ? DBData?.employees : {} )
        setFinishProjectTimestampMS(DBData?.finishProjectTimestampMS ? DBData?.finishProjectTimestampMS : 0)
        setIsLoading(false)
    }, [DBData]);
    // useEffect(() => {
    //     console.log(tasks)
    // }, [tasks]);
    return (
        <DataContext.Provider
            value={{
                tasks,
                employees,
                finishProjectTimestampMS,
                tasksProgress,
                isLoading
            }}
        >
            {children}
        </DataContext.Provider>
    );
};