import React, {createContext, useState, useEffect, useContext, ReactNode} from 'react';
import {IDB} from "../DB/db";

interface IDataProvider {
  DBData: IDB
  isLoading: boolean
}

export const DataContext = createContext<IDataProvider>(null!)
export const useData = () => useContext(DataContext)

export interface IDataProviderProps {
  children: ReactNode
}

export const DataProvider = ({children}: IDataProviderProps) => {
  const [DBData, setDBData] = useState<IDB>(null!)
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const fetchDBData = () => {
    fetch('/db/')
      .then((response) => {
        if (!response.ok) {
          throw new Error('DB fetch Network response was not ok');
        }
        return response.json()
      })
      .then((response) => {
        if (JSON.parse(response)) {
          setDBData(JSON.parse(response))
          setIsLoading(false)
        }
      })
      .catch((err) => {
        console.error('err/DB fetch ERR', err)
        setIsLoading(false)
      })
  };
  useEffect(() => {
    fetchDBData();
  }, []);

  return (
    <DataContext.Provider
      value={{
        DBData: DBData,
        isLoading: isLoading
      }}
    >
      {children}
    </DataContext.Provider>
  );
};