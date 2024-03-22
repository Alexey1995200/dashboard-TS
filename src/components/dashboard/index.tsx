//@ts-nocheck
import Grid from "./grid/index";
import React, {useEffect, useRef, useState} from "react";
import {
    compactHorizontal, compactNone, compactVertical,
    Desktop, Mobile,
    resetGlobal, resetSettings, resetTable,
} from "./../../assets/svg";
import CreateWidget from "./create";
import {getFromLS, isMobileVerByUserAgent} from "./utils";
import {breakpoints, calculateW, cols, screenWidth, widgets, WIDGETS_KEYS} from "./const";

const Dashboard = () => {
    const [currentCompactType, setCurrentCompactType]: string = useState('vertical')
    const [fetchedLayout, setFetchedLayout] = useState()
    const [isMobileVer, setIsMobileVer] = useState(() => {
        const isMobile = getFromLS('isMobile')
        return isMobile ? isMobile : isMobileVerByUserAgent()
    })
    const [isAdaptive, setIsAdaptive] = useState(true)
    const [layouts, setLayouts] = useState();
    const [allWidgets, setAllWidgets] = useState([])

    const [widgetList, setWidgetList] = useState([])

    const resetLocalSettings = () => {
        setIsMobileVer(isMobileVerByUserAgent()) // Call the function to get the boolean value
        setIsAdaptive(true)
    }
    const resetLocalTable = () => {
        localStorage.removeItem("rgl_DB");
        setLayouts();
        //todo fix this shit later
    }
    const resetLocalStorage = () => {
        if (global.localStorage) {
            resetLocalSettings()
            resetLocalTable()
            localStorage.clear()
        }
    };
    const saveToLS = (key: string, value: any) => {
        if (global.localStorage) {
            global.localStorage.setItem(
                key,
                JSON.stringify({
                    value
                })
            );
        }
    };

    useEffect(() => {
        fetch('/DB')
            .then((response) => response.json())
            .then((response) => {
                console.log(response, 'qweasd')
                if (!!JSON.parse(response).value) {
                    setFetchedLayout(JSON.parse(response).value);
                } else {
                    console.error('saved position is empty');
                    setFetchedLayout(undefined);
                }
            })
        fetch('/WIDGETS')                           //todo fetch json err to bool or if null - nothing else etc
            .then((response) => response.json())
            .then((response) => {
                if (!!JSON.parse(response).value) {
                    const keys = [];
                    JSON.parse(response).value.forEach(obj => {
                        keys.push(obj.key);
                    });
                    setWidgetList(keys)
                    console.log('qweasd allwidget seted', keys)
                } else {
                    console.error('saved position is empty');
                    setWidgetList([]);
                }
            })

    }, []);

    useEffect(() => {
        setLayouts(fetchedLayout)
    }, [fetchedLayout]);
    const forcedMobileVersion = () => {
        setIsMobileVer(true)
        setIsAdaptive(true)
        saveToLS('isMobile', true)
        saveToLS('isAdaptive', true)
    }
    const forcedDesktopVersion = () => {
        setIsMobileVer(false)
        setIsAdaptive(true)
        saveToLS('isMobile', false)
        saveToLS('isAdaptive', true)
    }
    const changeCompactType = () => {
        if (currentCompactType === 'vertical') {
            setCurrentCompactType('horizontal')
            console.log('compact', 'vertical-horizontal')
        } else if (currentCompactType === 'horizontal') {
            setCurrentCompactType(null)
            console.log('compact', 'horizontal-null')
        } else if (currentCompactType === null) {
            setCurrentCompactType('vertical')
            console.log('compact', 'null-vertical')
        }

        // "horizontal" | "vertical" | null.

    }
    const uploadRGLData = async (data) => {

        console.log('Before fetch:', JSON.stringify(data));
        try {
            const response = await fetch('/DB_upload', {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('sended resp', response)
            const json = await response.json();
            console.log('Success:', JSON.stringify(json));
        } catch (error) {
            console.error('Error:', error);
        }
    };


    const handleLayoutChange = (layout, layouts) => {
        if (allWidgets.length > 0) {
            console.log('allWidgets', allWidgets)
            uploadRGLData(layouts)
            uploadRGLData(allWidgets)
            // saveToLS('savedPosition', layouts);
            // prevLayoutsRef.current = layouts; // Update the ref instead of the state
        }
    };

    const removeByKeyOnClick = (key) => {
        setAllWidgets(allWidgets.filter(widget => widget.key !== key));
    }
    const removeAllOnClick = () => setAllWidgets([])

    const uniqueID = () => Math.random().toString(16).slice(-4);

    const addWidgetByKeyOnClick = (widget) => {
        const newWidget = {
            key: widget,
            el: widgets[widget].el,
            data: widgets[widget].data
        }
        setAllWidgets([...allWidgets, newWidget]);
        // setLayouts([...layouts])
    }
    // const widgetsFixed = () => {
    //     let arr = null
    //     widgets[WIDGETS_KEYS].map((widget) => {
    //         // console.log('qweasdzxc', widget[WIDGETS_KEYS]
    //         const newWidget = {
    //             key: widget,
    //             el: widgets[widget].el,
    //             data: widgets[widget].data
    //         }
    //         arr.push(newWidget)
    //         // .el=<${WIDGETS_KEYS.OverallProgress}/>
    //     })
    //     console.log('qweasdzxc', arr)
    // }

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
                    widgets={widgets}
                />
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
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
                {/*{layouts ? (*/}
                    <Grid
                        currentCompactType={currentCompactType}
                        layouts={layouts}
                        setLayouts={setLayouts}
                        allWidgets={allWidgets}
                        setAllWidgets={setAllWidgets}
                        breakpoints={breakpoints(isMobileVer)}
                        cols={cols(isMobileVer)}
                        isAdaptive={isAdaptive}
                        isMobileVer={isMobileVer}
                        widgetList={widgetList}
                        removeByKeyOnClick={removeByKeyOnClick}
                        removeAllOnClick={removeAllOnClick}
                        addWidgetByKeyOnClick={addWidgetByKeyOnClick}
                        onLayoutChange={handleLayoutChange}
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
