import Grid from "./grid/index";
import React, {ReactElement, useEffect, useRef, useState} from "react";
import {
    compactHorizontal, compactNone, compactVertical,
    Desktop, Mobile, newWidget,
    resetGlobal, resetSettings, resetTable,
} from "./../../assets/svg";

import {getFromLS, isMobileVerByUserAgent} from "./utils";
import {breakpoints, calculateW, cols, saveToLS, screenWidth, uploadRGLData, widgets, WIDGETS_KEYS} from "./const";
import CreateNewWidgetMenu from "./createNewWidgetMenu";
import {ILayouts, IWidget, IWidgetData, TCurrentTheme} from "./interfaces";

 interface IDashBoard {
     isDarkTheme:boolean,
     currentTheme:TCurrentTheme
}

const Dashboard = ({
                       isDarkTheme,
                       currentTheme,
                   }:IDashBoard) => {
    const [isWidgetMenuVisible, setIsWidgetMenuVisible] = useState<boolean>(false)
    const [currentCompactType, setCurrentCompactType] = useState<"vertical" | "horizontal" | null | undefined>('vertical')
    // const [fetchedLayouts, setFetchedLayouts] = useState<ILayouts | undefined>()
    // const [fetchedLayout, setFetchedLayout] = useState<ILayouts | undefined>()
    const [isMobileVer, setIsMobileVer] = useState(() => {
        const isMobile = getFromLS('isMobile')
        return isMobile ? isMobile : isMobileVerByUserAgent()
    })
    const [layout, setLayout] = useState<IWidgetData[]>()
    const [layouts, setLayouts] = useState<ILayouts>();
    const [createdWidgetsList, setCreatedWidgetsList] = useState<IWidget[]>([])
    const [storedWidgetsKeys, setStoredWidgetsKeys] = useState<string[]>()
    const [storedWidgetsData, setStoredWidgetsData] = useState<IWidgetData[]>()

    const changeWidgetMenuVisibility = () => {
        setIsWidgetMenuVisible(!isWidgetMenuVisible);
    };

    const resetLocalSettings = () => {
        setIsMobileVer(isMobileVerByUserAgent()) // Call the function to get the boolean value
        global.localStorage.clear()
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

    const setRGLParams = (layoutData:IWidgetData[]) => {
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
            // uploadRGLData(createdWidgetsList, 'createdWidgetsList')
            // prevLayoutsRef.current = layouts; // Update the ref instead of the state

            setRGLParams(layout)
        }
    };

    const removeByKeyOnClick = (key: string) => {
        setCreatedWidgetsList(createdWidgetsList.filter(widget => widget.key !== key));
        // if (createdWidgetsList.length < 2) {
        //     uploadRGLData([], 'createdWidgetsList')
        // }
    }
    const removeAllOnClick = () => {
        setCreatedWidgetsList(createdWidgetsList.filter(widget => widget !== widget))
    }

    const uniqueID = () => Math.random().toString(16).slice(-4);

    const addWidgetByKeyOnClick = (widget: string): void => {
        const newWidget: IWidget = {
            key: widget,
            el: widgets[widget].el,
            data: widgets[widget].data
        }
        if (!createdWidgetsList.some(w => w.key === widget)) {
            setCreatedWidgetsList([...createdWidgetsList, newWidget])
        }
    }
    const getObjectByI = (array: IWidgetData[], targetI: string) => array.find(obj => obj.i === targetI)

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
                        data: {...widgets[widget].data, ...getObjectByI(storedWidgetsData, widget)}
                    }
                } else
                    console.log(`stored data wasn't used`)
                return {
                    key: widget,
                    el: widgets[widget].el,
                    data: widgets[widget].data
                }
            })
            setCreatedWidgetsList(fixed)
        }
    }, [storedWidgetsData]);
    console.log(layouts)
// if (!layouts) return null
    if (screenWidth > 320) {
        return (
            <div className={'wrapper'}>
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
                        {/*<button><img src={resetTable} alt="Reset Table"/>*/}
                        {/*</button>*/}
                        <button onClick={resetLocalSettings}><img src={resetSettings}
                                                                  alt="Reset Setting"/></button>
                        {/*<button onClick={resetLocalStorage}><img src={resetGlobal} alt="Reset All"/>*/}
                        {/*</button>*/}
                        <button onClick={changeWidgetMenuVisibility}><img src={newWidget} alt="Reset All"/>
                        </button>
                    </div>
                </div>

                {/*{createdWidgetsList.length>0 ? (*/}
                <Grid
                    currentCompactType={currentCompactType}
                    layouts={layouts}
                    allWidgets={createdWidgetsList}
                    // setAllWidgets={setCreatedWidgetsList}
                    breakpoints={breakpoints(isMobileVer)}
                    cols={cols(isMobileVer)}
                    // isMobileVer={isMobileVer}
                    // storedWidgets={storedWidgetsKeys}
                    removeByKeyOnClick={removeByKeyOnClick}
                    // removeAllOnClick={removeAllOnClick}
                    // addWidgetByKeyOnClick={addWidgetByKeyOnClick}
                    handleLayoutChange={handleLayoutChange}
                    widgets={widgets}
                    currentTheme={currentTheme}
                />
                {/*) : (*/}
                {/*    <div style={{margin: "auto", fontSize: '32px', textAlign: "center"}}>There's no widgets added</div>*/}
                {/*)}*/}

            </div>
        )
    } else {
        return <h1 style={{display: 'flex', flex: 1,}}> This resolution is not supported </h1>
    }
}
export default Dashboard;
