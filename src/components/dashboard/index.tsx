import Grid from "./grid/index";
import React, {useEffect, useState} from "react";
import {
    clear,
    compactHorizontal, compactNone, compactVertical,
    Desktop, Mobile, newWidget,
    resetSettings,
} from "./../../assets/svg";
import {getFromLS, isMobileVerByUserAgent, saveToLS, uploadRGLData} from "./utils";
import {breakpoints, cols, isSystemThemeDark, screenWidth, widgets} from "./const";
import CreateNewWidgetMenu from "./createNewWidgetMenu";
import {ILayouts, IWidget, IWidgetData, TCurrentTheme} from "./interfaces";
import {palette, theme} from "../../assets/colors";
import './styles.scss'

interface IDashBoard {
    isDarkTheme: boolean,
    currentTheme: TCurrentTheme,
    setIsDarkTheme: React.Dispatch<React.SetStateAction<boolean>>
}

const Dashboard = ({
                       currentTheme,
                       setIsDarkTheme
                   }: IDashBoard) => {
    const [isWidgetMenuVisible, setIsWidgetMenuVisible] = useState<boolean>(false)
    const [currentCompactType, setCurrentCompactType] =
        useState<"vertical" | "horizontal" | null | undefined>('vertical')
    const [isMobileVer, setIsMobileVer] = useState(() => {
        const isMobile = getFromLS('isMobile')
        return isMobile ? isMobile : isMobileVerByUserAgent()
    })
    const [createdWidgetsList, setCreatedWidgetsList] = useState<IWidget[]>([])
    const [storedWidgetsKeys, setStoredWidgetsKeys] = useState<string[]>()
    const [storedWidgetsData, setStoredWidgetsData] = useState<IWidgetData[]>()
    const changeWidgetMenuVisibility = () => {
        setIsWidgetMenuVisible(!isWidgetMenuVisible);
    };
    const resetLocalSettings = () => {
        setIsMobileVer(isMobileVerByUserAgent())
        global.localStorage.clear()
        setCurrentCompactType('vertical')
        setIsDarkTheme(isSystemThemeDark)
    }
    const forcedMobileVersion = () => {
        setIsMobileVer(true)
        saveToLS('isMobile', true)
    }
    const forcedDesktopVersion = () => {
        setIsMobileVer(false)
        saveToLS('isMobile', false)
    }
    const changeCompactType = () => {
        if (currentCompactType === 'vertical') {
            saveToLS('rgl_compactType', 'horizontal')
            setCurrentCompactType('horizontal')
        } else if (currentCompactType === 'horizontal') {
            saveToLS('rgl_compactType', null)
            setCurrentCompactType(null)
        } else if (currentCompactType === null) {
            saveToLS('rgl_compactType', 'vertical')
            setCurrentCompactType('vertical')
        }
        // "horizontal" | "vertical" | null.
    }
    const setRGLParams = (layoutData: IWidgetData[]) => {
        const keys: string[] = [];
        const data: IWidgetData[] = [];
        layoutData.forEach((obj: IWidgetData) => {
            keys.push(obj.i)
            data.push(obj)
        });
        setStoredWidgetsKeys(keys)
        setStoredWidgetsData(data)
    }
    const fetchData = () => {
        fetch('/rgl_layout')
            .then((response) => response.json())
            .then((response) => {
                if (JSON.parse(response).value) {
                    setRGLParams(JSON.parse(response).value)
                }
            })
            .catch((err) => console.log('err', err))
    }
    useEffect(() => {
        fetchData()
    }, []);
    const handleLayoutChange = (layout: IWidgetData[], layouts: ILayouts) => {
        if (createdWidgetsList.length > 0) {
            uploadRGLData(layout, 'layout')
            uploadRGLData(layouts, 'layouts')
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
        }
    }
    const getObjectByKey = (array: IWidgetData[], targetKey: string) => array.find(obj => obj.i === targetKey)
    useEffect(() => {
        if (getFromLS('rgl_compactType') !== null) {
            setCurrentCompactType(getFromLS('rgl_compactType'))
        }
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
    const themeFontColor = () => currentTheme ? theme.dashboard.color[currentTheme] : palette.black
    const themeBackgroundColor = () =>  currentTheme ? theme.dashboard.BGColor[currentTheme] : palette.pinball
    if (screenWidth > 320) {
        return (
            <div className={'wrapper'} style={{backgroundColor: themeBackgroundColor(), color: themeFontColor()}}>
                {isWidgetMenuVisible &&
                    <CreateNewWidgetMenu
                        changeWidgetMenuVisibility={changeWidgetMenuVisibility}
                        createWidget={addWidgetByKeyOnClick}
                    />}
                <div className={'settings'}
                     style={screenWidth < 460 ? {flexDirection: "column"} : {flexDirection: 'row'}}>
                    <div className={'choose_device same'}>
                        <button onClick={forcedDesktopVersion}>
                            <Desktop
                                height='36px'
                                width='36px'
                                color={(isMobileVer === false) ? 'green' : 'red'}
                            />
                        </button>
                        <button onClick={forcedMobileVersion}>
                            <Mobile
                                height='36px'
                                width='36px'
                                color={(isMobileVer === true) ? 'green' : 'red'}
                            />
                        </button>
                    </div>
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
                        <button onClick={resetLocalSettings}><img src={resetSettings}
                                                                  alt="Reset Setting"/></button>
                        <button onClick={removeAllOnClick}><img src={clear} alt="Reset All"/>
                        </button>
                        <button onClick={changeWidgetMenuVisibility}><img src={newWidget} alt="Reset All"/>
                        </button>
                    </div>
                </div>
                {createdWidgetsList.length > 0 ? (
                    <Grid
                        currentCompactType={currentCompactType}
                        allWidgets={createdWidgetsList}
                        breakpoints={breakpoints(isMobileVer)}
                        cols={cols(isMobileVer)}
                        removeByKeyOnClick={removeByKeyOnClick}
                        handleLayoutChange={handleLayoutChange}
                        widgets={widgets}
                        currentTheme={currentTheme}
                    />
                ) : (
                    <div className={'noWidgets'}>There's no widgets added</div>
                )}
            </div>
        )
    } else {
        return <h1 style={{display: 'flex', flex: 1,}}> This resolution is not supported </h1>
    }
}
export default Dashboard;
