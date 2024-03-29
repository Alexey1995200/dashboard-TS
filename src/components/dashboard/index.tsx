import Grid from "./grid/index";
import React, {ReactElement, useEffect, useRef, useState} from "react";
import {
    compactHorizontal, compactNone, compactVertical,
    Desktop, Mobile,
    resetGlobal, resetSettings, resetTable,
} from "./../../assets/svg";
import CreateWidget from "./create";
import {getFromLS, isMobileVerByUserAgent} from "./utils";
import {breakpoints, calculateW, cols, saveToLS, screenWidth, widgets, WIDGETS_KEYS} from "./const";

export interface IWidget {
    key: string;
    data: IWidgetData;
    el?: ({}: {}) => Element | ReactElement<any, any> | null | undefined;
}

export interface IWidgetData {
    i: string;
    w: number;
    h: number;
    x: number;
    y: number | string | null;
    minW?: number;
    minH?: number;
    moved?: boolean;
    static?: boolean;
    maxH?: number;
    maxW?: number;
    isResizable?: boolean;
    isDraggable?: boolean | undefined;
    // resizeHandles?: ResizeHandle[] | undefined;
    isBounded?: boolean | undefined;
}

export interface ILayouts {
    [key: string]: IWidgetData[];
}
export interface IWidgets {
    [key: string]: IWidget;
}
const Dashboard = () => {
    const [currentCompactType, setCurrentCompactType] = useState<"vertical" | "horizontal" | null | undefined>('vertical')
    const [fetchedLayouts, setFetchedLayouts] = useState<ILayouts | undefined>()
    const [fetchedLayout, setFetchedLayout] = useState<ILayouts | undefined>()
    const [isMobileVer, setIsMobileVer] = useState(() => {
        const isMobile = getFromLS('isMobile')
        return isMobile ? isMobile : isMobileVerByUserAgent()
    })
    const [layout, setLayout] = useState<IWidgetData[]>()
    const [layouts, setLayouts] = useState<ILayouts>();
    const [createdWidgetsList, setCreatedWidgetsList] = useState<IWidget[]>([])
    const [storedWidgetsKeys, setStoredWidgetsKeys] = useState<string[]>()
    const [storedWidgetsData, setStoredWidgetsData] = useState<IWidgetData[]>()


    const resetLocalSettings = () => {
        setIsMobileVer(isMobileVerByUserAgent()) // Call the function to get the boolean value
    }
    const resetLocalTable = () => {
        setLayouts(undefined);
        //todo fix this shit later
    }
    const resetLocalStorage = () => {
        if (global.localStorage) {
            resetLocalSettings()
            resetLocalTable()
            localStorage.clear()
        }
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

    useEffect(() => {
        fetch('/rgl_layout')
            .then((response) => response.json())
            .then((response) => {
                if (JSON.parse(response).value) {
                    setFetchedLayout(JSON.parse(response).value);
                } else {
                    // setFetchedLayout(null);
                }
            })
            .catch((err) => console.log(err))
        fetch('/rgl_layouts')
            .then((response) => response.json())
            .then((response) => {
                if (JSON.parse(response).value) {
                    setFetchedLayouts(JSON.parse(response).value);
                } else {
                    // setFetchedLayout(null);
                }
            })
            .catch((err) => console.log(err))
        fetch('/rgl_createdWidgetsList')
            .then((response) => response.json())
            .then((response) => {
                if (JSON.parse(response)) {
                    const keys: string[] = [];
                    const data: IWidgetData[] = [];
                    JSON.parse(response).value.forEach((obj: IWidget) => {
                        keys.push(obj.key)
                        data.push(obj.data)
                    });
                    setStoredWidgetsKeys(keys)
                    setStoredWidgetsData(data)
                } else {
                    console.error('saved position is empty');
                    setStoredWidgetsKeys([]);
                }
            })
            .catch((err) => console.log(err))
    }, []);

    const uploadRGLData = async (data: ILayouts | IWidget[] | IWidgetData[], location: string) => {
        try {
            const response = await fetch('/DB_upload', {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                    'Save-Location': location
                },
            });
            const json = await response.json();
        } catch (error) {
            console.error('Error:', error);
        }
    };


    const handleLayoutChange = (layout: IWidgetData[], layouts: ILayouts) => {
        if (createdWidgetsList.length > 0) {

            uploadRGLData(layout, 'layout')
            uploadRGLData(layouts, 'layouts')
            uploadRGLData(createdWidgetsList, 'createdWidgetsList')
            // prevLayoutsRef.current = layouts; // Update the ref instead of the state
        }
    };

    const removeByKeyOnClick = (key: string) => {
        setCreatedWidgetsList(createdWidgetsList.filter(widget => widget.key !== key));
        if (createdWidgetsList.length < 2) {
            uploadRGLData([], 'createdWidgetsList')
        }
    }
    const removeAllOnClick = () => {
        setCreatedWidgetsList(createdWidgetsList.filter(widget => widget !== widget))
        uploadRGLData([], 'createdWidgetsList')
    }

    const uniqueID = () => Math.random().toString(16).slice(-4);

    const addWidgetByKeyOnClick = (widget: string) => {
        console.log('qweqweqwe', createdWidgetsList, fetchedLayouts, fetchedLayout, storedWidgetsKeys)
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
        setCurrentCompactType(getFromLS('rgl_compactType'))
        if (storedWidgetsKeys) {
            const fixed: IWidget[] = storedWidgetsKeys.map((widget) => {

                if (storedWidgetsData) {
                    console.log({...getObjectByI(storedWidgetsData, widget), y: Infinity}, 'qweasdzxcrty')
                    return {
                        key: widget,
                        el: widgets[widget].el,
                        data: {...getObjectByI(storedWidgetsData, widget), y: Infinity}
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
                            // className={currentCompactType ? 'active' : 'inactive'}
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
                        <button onClick={resetLocalTable}><img src={resetTable} alt="Reset Table"/>
                        </button>
                        <button onClick={resetLocalSettings}><img src={resetSettings}
                                                                  alt="Reset Setting"/></button>
                        <button onClick={resetLocalStorage}><img src={resetGlobal} alt="Reset All"/>
                        </button>
                    </div>
                </div>
                <CreateWidget
                    addWidget={addWidgetByKeyOnClick}
                />
                <div style={{display: 'flex', justifyContent: 'space-between', overflow: "auto"}}>
                    <div
                        className="remove_btn"
                        onClick={() => null}
                    >
                        DEBUG
                    </div>
                    {Object.keys(widgets).map((widgetKey) => {
                        return (<button
                            onClick={() => addWidgetByKeyOnClick(widgetKey)}>{widgetKey}</button>)
                    })}
                    <div
                        className="remove_btn"
                        onClick={() => removeAllOnClick()}
                    >
                        &#10006;
                    </div>
                </div>
                {/*{createdWidgetsList.length>0 ? (*/}
                <Grid
                    currentCompactType={currentCompactType}
                    layouts={layouts}
                    allWidgets={createdWidgetsList}
                    setAllWidgets={setCreatedWidgetsList}
                    breakpoints={breakpoints(isMobileVer)}
                    cols={cols(isMobileVer)}
                    isMobileVer={isMobileVer}
                    storedWidgets={storedWidgetsKeys}
                    removeByKeyOnClick={removeByKeyOnClick}
                    removeAllOnClick={removeAllOnClick}
                    addWidgetByKeyOnClick={addWidgetByKeyOnClick}
                    handleLayoutChange={handleLayoutChange}
                    widgets={widgets}
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
