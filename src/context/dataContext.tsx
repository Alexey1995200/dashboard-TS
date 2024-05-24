import React, {createContext, useState, useEffect, useContext, ReactNode} from 'react';
import {employee, IBudgetData, IDB, IEmployee, ITask, ITasksProgress} from "../DB/db";
import {ILog} from "../components/dashboard/widgets/logs/builderComponents";
import logs from "../components/dashboard/widgets/logs";

interface IDataProvider {
  isLoading: boolean;
}

export const DataContext = createContext<IDB & IDataProvider>(null!);
export const useData = () => useContext(DataContext);

export interface IDataProviderProps {
  children: ReactNode
}

export const DataProvider = ({children}: IDataProviderProps) => {

  const [DBData, setDBData] = useState<IDB | undefined>()
  const [startProjectTimestampMS, setStartProjectTimestampMS] = useState<number>(0);
  const [finishProjectTimestampMS, setFinishProjectTimestampMS] = useState<number>(0);
  const [employees, setEmployees] = useState<Record<string, IEmployee>>({});
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [tasksProgress, setTasksProgress] = useState<ITasksProgress[]>([]);
  const [budgetData, setBudgetData] = useState<IBudgetData[]>([])
  const [logs, setLogs] = useState<ILog[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchDBData = () => {
    fetch('/db')
      .then((response) => response.json())
      .then((response) => {
        if (JSON.parse(response).value) {
          setDBData(response);
        }
      })
      .catch((err) => console.log('err', err))
  };
  useEffect(() => {
    fetchDBData();
  }, []);
  useEffect(() => {
    if (DBData) {
      setStartProjectTimestampMS(DBData.startProjectTimestampMS)
      setFinishProjectTimestampMS(DBData.finishProjectTimestampMS)
      setEmployees(DBData.employees)
      setTasks(DBData.tasks)
      setTasksProgress(DBData.tasksProgress)
      setBudgetData(DBData.budgetData)
      setLogs(DBData.logs)

      setIsLoading(false);
    }
  }, [DBData]);

  return (
    <DataContext.Provider
      value={{
        startProjectTimestampMS: startProjectTimestampMS,
        finishProjectTimestampMS: finishProjectTimestampMS,
        employees: employees,
        tasks: tasks,
        tasksProgress: tasksProgress,
        budgetData: budgetData,
        logs: logs,
        isLoading: isLoading
      }}
    >
      {children}
    </DataContext.Provider>
  );
};