import Grid from "./grid/index";
import React, {useEffect, useState} from "react";
import {clear, compactHorizontal, compactNone, compactVertical, newWidget, resetSettings,} from "./../../assets/svg";
import {getFromLS, isMobileVerByUserAgent, saveToLS, uploadRGLData} from "./utils";
import {breakpoints, cols, display, getObjectByKey, isSystemThemeDark, widgets} from "./const"
import CreateNewWidgetMenu from "./createNewWidgetMenu";
import {CompactType, ExtendedCompactType, ILayouts, IWidget, IWidgetData} from "./interfaces";
import {theme} from "../../assets/colors";
import './styles.scss'
import {IDB} from "../../DB/db";
import {ThemeType, useTheme} from "../../context/themeProvider";
import PopUp from "../layout/popUp";

const Dashboard = () => {
  const [isWidgetMenuVisible, setIsWidgetMenuVisible] = useState<boolean>(false)
  const [currentCompactType, setCurrentCompactType] =
    useState<ExtendedCompactType>(CompactType.vertical)
  const [isMobileVer, setIsMobileVer] = useState(() => {
    const isMobile = getFromLS('isMobile')
    return isMobile ? isMobile : isMobileVerByUserAgent()
  })
  const [isPopUpVisibe, setIsPopUpVisibe] = useState<boolean>(false)
  const [createdWidgetsList, setCreatedWidgetsList] = useState<IWidget[]>([])
  const [storedWidgetsKeys, setStoredWidgetsKeys] = useState<string[]>()
  const [storedWidgetsData, setStoredWidgetsData] = useState<IWidgetData[]>()
  const [DBData, setDBData] = useState<IDB | null>(null)
  const [isDataLoading, setIsDataLoading] = useState<boolean>(true)
  const [isLayoutHandledOnce, setIsLayoutHandledOnce] = useState<boolean>(false)
  const {currentTheme, changeCurrentTheme} = useTheme()
  const changeWidgetMenuVisibility = () => {
    setIsWidgetMenuVisible(!isWidgetMenuVisible);
  };
  const resetLocalSettings = () => {
    setIsMobileVer(isMobileVerByUserAgent())
    global.localStorage.clear()
    setCurrentCompactType(CompactType.vertical)
    changeCurrentTheme(isSystemThemeDark ? ThemeType.dark : ThemeType.light)
  }
  const changeCompactType = () => {
    if (currentCompactType === CompactType.vertical) {
      saveToLS('rgl_compactType', CompactType.horizontal)
      setCurrentCompactType(CompactType.horizontal)
    } else if (currentCompactType === CompactType.horizontal) {
      saveToLS('rgl_compactType', null)
      setCurrentCompactType(null)
    } else if (currentCompactType === null) {
      saveToLS('rgl_compactType', CompactType.vertical)
      setCurrentCompactType(CompactType.vertical)
    }
    // compact types which can be used: "horizontal" | "vertical" | null // ExtendedCompactType // CompactType
  }
  const setRGLParams = (layoutData: IWidgetData[]) => {
    const keys: string[] = [];
    const data: IWidgetData[] = [];
    layoutData.forEach((obj: IWidgetData) => {
      const filteredObj = Object.fromEntries(
        Object.entries(obj).filter(([_, value]) => value !== null && value !== "null")
      ) as IWidgetData;
      if (filteredObj.i !== undefined) {
        keys.push(filteredObj.i);
        data.push(filteredObj);
      }
    });
    setStoredWidgetsData(data);
    setStoredWidgetsKeys(keys);
  }
  const fetchRGLData = () => {
    fetch('/rgl_layout')
      .then((response) => response.json())
      .then((response) => {
        if (JSON.parse(response).value) {
          setRGLParams(JSON.parse(response).value)
        }
      })
      .catch((err) => console.error('err/rgl_layout', err))
  }
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
          setIsDataLoading(false)
        }
      })
      .catch((err) => {
        setIsDataLoading(false)
        console.error('err/DB fetch ERR', err)
      })
  };
  useEffect(() => {
    if (getFromLS('rgl_compactType') !== null) {
      setCurrentCompactType(getFromLS('rgl_compactType'))
    }
    fetchRGLData()
    fetchDBData()
  }, []);
  const handleLayoutChange = (layout: IWidgetData[], layouts: ILayouts) => {
    if (createdWidgetsList.length > 0) {
      setIsLayoutHandledOnce(true)
      layout.length && uploadRGLData(layout, 'layout')
      setRGLParams(layout)
    }
  };
  const removeByKeyOnClick = (key: string) => {
    setCreatedWidgetsList(createdWidgetsList.filter(widget => widget.key !== key));
    if (createdWidgetsList.length < 2) {
      uploadRGLData([], 'layout')
    }
  }
  const removeAllOnClick = () => {
    setCreatedWidgetsList([])
    uploadRGLData([], 'layout')
  }

  const addWidgetByKeyOnClick = (widget: string) => {
    const newWidget: IWidget = {
      key: widget,
      el: widgets[widget].el,
      data: widgets[widget].data
    }
    if (!createdWidgetsList.some(w => w.key === widget)) {
      setCreatedWidgetsList([...createdWidgetsList, newWidget])
    } else {setIsPopUpVisibe(true)}
  }

  useEffect(() => {
    if (storedWidgetsKeys) {
      const fixed: IWidget[] = storedWidgetsKeys.map((widget) => {
        if (storedWidgetsData) {
          return {
            key: widget,
            el: widgets[widget].el,
            data: {...widgets[widget].data, ...getObjectByKey(storedWidgetsData, widget)}
          }
        } else
          return {
            key: widget,
            el: widgets[widget].el,
            data: widgets[widget].data
          }
      })
      setCreatedWidgetsList(fixed)
    }
  }, [storedWidgetsData]);
  const themeFontColor = theme.dashboard.color[currentTheme]
  const themeBackgroundColor = theme.dashboard.BGColor[currentTheme]
  const widgetComponent = <div className={'wrapper'}
                               style={{backgroundColor: themeBackgroundColor, color: themeFontColor}}>
    {isWidgetMenuVisible &&
      <CreateNewWidgetMenu
          changeWidgetMenuVisibility={changeWidgetMenuVisibility}
          createWidget={addWidgetByKeyOnClick}
      />
    }
    <div className={'settings'}>
      <div className={'change_params same'}>
        <button onClick={changeCompactType}
        >
          {(currentCompactType === 'vertical') ?
            <img src={compactVertical} alt="compactVertical"/>
            : (currentCompactType === 'horizontal') ?
              <img src={compactHorizontal} alt="compactHorizontal"/>
              :
              <img src={compactNone} alt="compactNone"/>
          }
        </button>
      </div>
      <div className={'resets same'}>
        <button onClick={resetLocalSettings}>
          <img src={resetSettings} alt="Reset Setting"/>
        </button>
        <button onClick={removeAllOnClick}>
          <img src={clear} alt="Reset All"/>
        </button>
        <button onClick={changeWidgetMenuVisibility}>
          <img src={newWidget} alt="Reset All"/>
        </button>
      </div>
    </div>
    <PopUp
      type={'alert'}
      text={'Widget already created'}
      title={'Error'}
      isPopUpVisibe={isPopUpVisibe}
      setIsPopUpVisibe={setIsPopUpVisibe}
    />
    {createdWidgetsList.length ? (
      <Grid
        currentCompactType={currentCompactType}
        allWidgets={createdWidgetsList}
        breakpoints={breakpoints(isMobileVer)}
        cols={cols(isMobileVer)}
        removeByKeyOnClick={removeByKeyOnClick}
        handleLayoutChange={handleLayoutChange}
        isLayoutHandledOnce={isLayoutHandledOnce}
        widgets={widgets}
        currentTheme={currentTheme}
        DBData={DBData}
        isDataLoading={isDataLoading}
      />
    ) : (
      <div className={'noWidgets'}>There's no widgets added</div>
    )}
  </div>
  return display(isDataLoading, !!DBData, widgetComponent, themeBackgroundColor, themeFontColor)
}
export default Dashboard;
