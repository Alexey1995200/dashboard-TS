// @ts-nocheck old
import './grid.css';
import Header from "./components/header";
import SideBar from "./components/sideBar";
import Grid from "./Grid";
import React, {useEffect, useState} from "react";
import './grid.css';
import {defaultDBposition} from "./DB/gridDB";
import {
    compactHorizontal, compactNone,
    compactVertical,
    desktop,
    mobile,
    reset, resetGlobal,
    resetSettings,
    resetTable,
    resize
} from "./assets/svg";
import './global.scss'

const colorFilter = {
    green: {
        filter: 'brightness(0) saturate(100%) invert(43%) sepia(8%) saturate(2413%) hue-rotate(88deg) brightness(106%) contrast(102%)',
    },
    red: {
        filter: 'brightness(0) saturate(100%) invert(26%) sepia(57%) saturate(6032%) hue-rotate(340deg) brightness(93%) contrast(85%)',
    }
};

const getFromLS = (key, value) => {
    if (localStorage) {
        // try {
        //     console.log('getFromLS', key, value, JSON.parse(localStorage.getItem(key))?.[value])
        //     return JSON.parse(localStorage.getItem(key))?.[value] || null;
        // } catch (e) {
        //     // console.log('getFromLS ERR catched')
        // }
        try {
            console.log('getFromLS', key, value, JSON.parse(localStorage.getItem(key))?.[value])
            return JSON.parse(localStorage.getItem(key))?.[value];
        } catch (e) {
            // console.log('getFromLS ERR catched')
        }
    }
};
const saveToLS = (key, value) => {
    if (global.localStorage) {
        global.localStorage.setItem(
            key,
            JSON.stringify({
                value
            })
        );
    }
};
function App() {
    const useragent = window.navigator.userAgent
    const [screenSize, setScreenSize] = useState(window.innerWidth);
    const [currentCompactType, setCurrentCompactType]: string = useState('vertical')
    // const [isVerticalCompact, setIsVerticalCompact] = useState(true)
    const [fetchedLayout, setFetchedLayout] = useState([])


    const [isMobileVer, setIsMobileVer] = useState(() => {
        const isMobile = getFromLS('isMobile', 'value')
        return isMobile ? isMobile : false

        // const localIsMobileVerState = getFromLS('rgl_props',`isMobileVer`)
        // console.log('get mobile', getFromLS('rgl_props',`isMobileVer`))
        // if (localIsMobileVerState) return localIsMobileVerState
        // else return false
    })

    const [isAdaptive, setIsAdaptive] = useState(true)

    // const [layouts, setLayouts] = useState(() => {
    //     const storedLayouts = getFromLS('rgl',`savedPosition`);
    //     return storedLayouts || fetchedLayout || JSON.parse(JSON.stringify(''));
    // });
    const [layouts, setLayouts] = useState(() => {
        const storedLayouts = getFromLS('rgl_DB', `value`);
        if (!!storedLayouts) return storedLayouts
        else if (fetchedLayout) return JSON.parse(JSON.stringify(fetchedLayout))
        else return JSON.parse(JSON.stringify(''));
    });
    useEffect(() => {
        console.log('layouts', layouts)
    }, [layouts]);
    const changeCompactView = () => {
        setIsVerticalCompact(!isVerticalCompact)
    }

    //todo ask about where widget must be taken from? (sidebar or menu inside of grid layout)
    //todo save as custom, load as custom
    //todo make widget remove feature
    //todo fix gridDB default

    const isMobileVerByUserAgent = () => {
        return (
            useragent.toLowerCase().includes('ipad') ||
            useragent.toLowerCase().includes('iphone') ||
            useragent.toLowerCase().includes('phone') ||
            useragent.toLowerCase().includes('android') ||
            useragent.toLowerCase().includes('mobile')
        );
    };
    const refresh = () => window.location.reload(true)
    // const resetLocalStorage = () => {
    //     if (global.localStorage) {
    //         global.localStorage.removeItem("rgl");
    //         global.localStorage.removeItem("rgl_props");
    //         // Avoid forced page reload here
    //         setLayouts(JSON.parse(JSON.stringify(fetchedLayout))); // Reset layouts to the default
    //         setCurrentBreakpoint('x0'); // Reset breakpoint to the default
    //         // refresh()
    //     }
    // };
    const breakpoints = () => {
        if (isAdaptive) {
            return isMobileVer ? {mobileGlobal: 0} : {global: 0};
        } else {
            const breakpoints = {x0: 0, x1: 159};
            for (let i = 2; i <= 27; i++) {
                breakpoints[`x${i}`] = breakpoints[`x${i - 1}`] + 160;
            }
            return breakpoints;
        }
    };
    const cols = () => {
        if (isAdaptive) {
            return isMobileVer ? {mobileGlobal: 3} : {global: 16};
        } else {
            const cols = {x0: 1};
            for (let i = 1; i <= 27; i++) {
                cols[`x${i}`] = i * 20;
            }
            return cols;
        }
    };

    const resetLocalSettings = () => {
        global.localStorage.removeItem("rgl_props");
        setIsMobileVer(isMobileVerByUserAgent()); // Call the function to get the boolean value
        setIsAdaptive(isMobileVerByUserAgent())
    }
    const resetLocalTable = () => {

        localStorage.removeItem("rgl");
        // Avoid forced page reload here
        setLayouts(JSON.parse(JSON.stringify(fetchedLayout))); // Reset layouts to the default
        setCurrentBreakpoint('x0'); // Reset breakpoint to the default

        // const keyToSearch = currentBreakpoint;
        // const defaultKey = Object.keys(defaultDBposition)[0]; // Get the first key
        // const chosenKey = defaultDBposition[keyToSearch] ? keyToSearch : defaultKey;
        // // const chosenArr = defaultDBposition[keyToSearch] || defaultDBposition[defaultKey];
        // const chosenObj = { [currentBreakpoint]: defaultDBposition[chosenKey] };
        //
        // setLayouts(chosenObj)
        // // setLayouts(JSON.parse(JSON.stringify(fetchedLayout))); // Reset layouts to the default
        // setCurrentBreakpoint('x0'); // Reset breakpoint to the default
        // // refresh()                                                                         //todo fix this shit
    }
    const resetLocalStorage = () => {
        if (global.localStorage) {
            resetLocalSettings()
            resetLocalTable()
        }
    };

    useEffect(() => {

        setIsMobileVer(isMobileVerByUserAgent()); // Call the function to get the boolean value

        fetch('/db/gird/defaultDBposition')
            .then((response) => response.json())
            .then((resp) => {
                setFetchedLayout(resp.defaultDBposition)
            })
        // fetch('/localstorage', rgl_props, isMobileVer)
        //     .then((response) => response.json())
        //     .then((resp) => {
        //         console.log(resp,'resp')
        //         // setFetchedLayout(resp)
        //     })
        // console.log('fetched', fetchedLayout)
    }, []);

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
        return (
        <div className={'wrapper'} style={{display: "flex", flexDirection: "column"}}>
            <Header/>
            <div className={'body'} style={{
                display: 'grid',
                gridTemplateColumns: '1fr 9fr',
            }}>
                <SideBar/>
                <div>
                    <div className={'settings'}
                         style={screenSize < 460 ? {flexDirection: "column"} : {flexDirection: 'row'}}>
                        <div className={'choose_device same'}>
                            <button onClick={forcedDesktopVersion}>
                                {/*<img src={desktop} alt="[desktop]"*/}
                                {/*     className={isMobileVer === false && isAdaptive === true ? 'active ' : 'inactive'}*/}
                                {/*/>*/}
                                <div className={isMobileVer === false && isAdaptive === true ? 'active ' : 'inactive'}>
                                    <svg
                                        width="24px"
                                        height="24px"
                                        viewBox="0 -2 24 24"
                                        id="meteor-icon-kit__solid-desktop"
                                        fill="unset"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            fill="currentColor"
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M2 0H22C23.1046 0 24 0.89543 24 2V15C24 16.1046 23.1046 17 22 17H2C0.89543 17 0 16.1046 0 15V2C0 0.89543 0.89543 0 2 0zM16 18C16.5523 18 17 18.4477 17 19C17 19.5523 16.5523 20 16 20H8C7.44772 20 7 19.5523 7 19C7 18.4477 7.44772 18 8 18H16z"
                                        />
                                    </svg>
                                </div>
                            </button>
                            <button onClick={forcedMobileVersion}>
                                {/*<img src={mobile} alt="[mobile]"*/}
                                {/*     className={isMobileVer === true && isAdaptive === true ? 'active' : 'inactive'}*/}
                                {/*/>*/}
                                <div className={isMobileVer === true && isAdaptive === true ? 'active' : 'inactive'}>
                                    <svg width="24px" height="24px" viewBox="0 -0.5 25 25" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <rect x="6.5" y="3"
                                              width="12" height="18"
                                              rx="3"
                                              stroke="currentColor"
                                              stroke-width="1.5"
                                              stroke-linecap="round"
                                              stroke-linejoin="round"/>
                                        <path
                                            d="M12.5 18.5C12.3665 18.5 12.2409 18.448 12.1465 18.3536C12.052 18.2591 12 18.1336 12 18C12 17.9008 12.0291 17.8047 12.0843 17.7222C12.1394 17.6397 12.217 17.576 12.3086 17.5381C12.3696 17.5128 12.434 17.5 12.5 17.5C12.5327 17.5 12.5655 17.5032 12.5975 17.5096C12.6949 17.529 12.7834 17.5763 12.8536 17.6464C12.9237 17.7166 12.971 17.8051 12.9904 17.9025C13.0098 17.9998 12.9999 18.0997 12.9619 18.1913C12.924 18.283 12.8603 18.3606 12.7778 18.4157C12.6953 18.4709 12.5992 18.5 12.5 18.5Z"
                                            fill="#000"/>
                                        <path
                                            d="M12.5 19C12.2348 19 11.9804 18.8946 11.7929 18.7071C11.6054 18.5196 11.5 18.2652 11.5 18C11.5 17.8022 11.5586 17.6089 11.6685 17.4444C11.7784 17.28 11.9346 17.1518 12.1173 17.0761C12.3 17.0004 12.5011 16.9806 12.6951 17.0192C12.8891 17.0578 13.0673 17.153 13.2071 17.2929C13.347 17.4327 13.4422 17.6109 13.4808 17.8049C13.5194 17.9989 13.4996 18.2 13.4239 18.3827C13.3482 18.5654 13.22 18.7216 13.0556 18.8315C12.8911 18.9414 12.6978 19 12.5 19Z"
                                            fill="currentColor"/>
                                    </svg>
                                </div>
                            </button>
                            {/*<button onClick={forcedFreeResize}>*/}
                            {/*    /!*<img src={resize} alt="free resize"*!/*/}
                            {/*    /!*     className={isAdaptive === false ? 'active' : 'inactive'}*!/*/}
                            {/*/>*/}
                            {/*    <div className={isAdaptive === false ? 'active' : 'inactive'}>*/}
                            {/*        <svg fill="currentColor" width="24px" height="24px" viewBox="0 0 24 24"*/}
                            {/*             xmlns="http://www.w3.org/2000/svg">*/}
                            {/*            <path*/}
                            {/*                d="M19.5,21 C20.3284271,21 21,20.3284271 21,19.5 L21,11.5 C21,10.6715729 20.3284271,10 19.5,10 L11.5,10 C10.6715729,10 10,10.6715729 10,11.5 L10,19.5 C10,20.3284271 10.6715729,21 11.5,21 L19.5,21 Z M5,20.2928932 L6.14644661,19.1464466 C6.34170876,18.9511845 6.65829124,18.9511845 6.85355339,19.1464466 C7.04881554,19.3417088 7.04881554,19.6582912 6.85355339,19.8535534 L4.85355339,21.8535534 C4.65829124,22.0488155 4.34170876,22.0488155 4.14644661,21.8535534 L2.14644661,19.8535534 C1.95118446,19.6582912 1.95118446,19.3417088 2.14644661,19.1464466 C2.34170876,18.9511845 2.65829124,18.9511845 2.85355339,19.1464466 L4,20.2928932 L4,7.5 C4,7.22385763 4.22385763,7 4.5,7 C4.77614237,7 5,7.22385763 5,7.5 L5,20.2928932 L5,20.2928932 Z M20.2928932,4 L19.1464466,2.85355339 C18.9511845,2.65829124 18.9511845,2.34170876 19.1464466,2.14644661 C19.3417088,1.95118446 19.6582912,1.95118446 19.8535534,2.14644661 L21.8535534,4.14644661 C22.0488155,4.34170876 22.0488155,4.65829124 21.8535534,4.85355339 L19.8535534,6.85355339 C19.6582912,7.04881554 19.3417088,7.04881554 19.1464466,6.85355339 C18.9511845,6.65829124 18.9511845,6.34170876 19.1464466,6.14644661 L20.2928932,5 L7.5,5 C7.22385763,5 7,4.77614237 7,4.5 C7,4.22385763 7.22385763,4 7.5,4 L20.2928932,4 Z M19.5,22 L11.5,22 C10.1192881,22 9,20.8807119 9,19.5 L9,11.5 C9,10.1192881 10.1192881,9 11.5,9 L19.5,9 C20.8807119,9 22,10.1192881 22,11.5 L22,19.5 C22,20.8807119 20.8807119,22 19.5,22 Z"/>*/}
                            {/*        </svg>*/}
                            {/*    </div>*/}
                            {/*</button>*/}
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
                            <button onClick={resetLocalTable}><img src={resetTable} alt="Reset Table"/></button>
                            <button onClick={resetLocalSettings}><img src={resetSettings} alt="Reset Setting"/></button>
                            <button onClick={resetLocalStorage}><img src={resetGlobal} alt="Reset All"/></button>
                        </div>
                    </div>
                    <Grid
                        currentCompactType={currentCompactType}
                        // isVerticalCompact={isVerticalCompact}
                        layouts={layouts}
                        setLayouts={setLayouts}
                        breakpoints={breakpoints()}
                        cols={cols()}
                        isAdaptive={isAdaptive}
                        isMobileVer={isMobileVer}
                    />
                </div>

            </div>
        </div>
    );
}

export default App;
export {colorFilter}