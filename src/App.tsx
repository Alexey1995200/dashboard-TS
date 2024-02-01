// @ts-nocheck
import './grid.css';
import Header from "./components/header";
import SideBar from "./components/sideBar";
import Grid from "./Grid";
import React, {useEffect, useState} from "react";
import {defaultDBposition} from "./DB/gridDB";

const getFromLS = (key, value) => {                //todo create hook
    if (global.localStorage) {
        try {
            console.log('getFromLS', key, value, JSON.parse(global.localStorage.getItem(key))?.[value])
            return JSON.parse(global.localStorage.getItem(key))?.[value] || null;
        } catch (e) {
            console.log('getFromLS ERR catched')
        }
    }
    return null;
};

function App() {
    const useragent = window.navigator.userAgent
    const [screenSize, setScreenSize] = useState(window.innerWidth);
    const [isVerticalCompact, setIsVerticalCompact] = useState(true)
    const [fetchedLayout, setFetchedLayout] = useState([])
    const [currentBreakpoint, setCurrentBreakpoint] = useState('x0');


    const [isMobileVer, setIsMobileVer] = useState(() => {
        const localIsMobileVerState = getFromLS('rgl_props',`isMobileVer`)
        return localIsMobileVerState || false})

    const [isAdaptive, setIsAdaptive] = useState(() => {
        const localAdaptiveState = getFromLS('rgl_props', `isAdaptive`)
        const localIsMobileVerState = getFromLS('rgl_props',`isMobileVer`)
        return localAdaptiveState || localIsMobileVerState || false})

    const [layouts, setLayouts] = useState(() => {
        const storedLayouts = getFromLS('rgl',`savedPosition`);
        return storedLayouts || fetchedLayout || JSON.parse(JSON.stringify(''));
    });
    const changeCompactView = () => {
        setIsVerticalCompact(!isVerticalCompact)
    }
    //todo save as custom, load as custom
    //todo ask about where widget must be taken from? (sidebar or menu inside of grid layout)
    //todo make widget remove feature
    //todo if less then 768 - global_mobile
    const changeAdaptiveState = () => {
        setIsAdaptive(!isAdaptive)
        console.log('dbg', isAdaptive)
    }
    const refresh = () => window.location.reload(true)
    const resetLocalStorage = () => {
        if (global.localStorage) {
            global.localStorage.removeItem("rgl");
            global.localStorage.removeItem("rgl_props");
            // Avoid forced page reload here
            setLayouts(JSON.parse(JSON.stringify(fetchedLayout))); // Reset layouts to the default
            setCurrentBreakpoint('x0'); // Reset breakpoint to the default
            // refresh()
        }
    };
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
    useEffect(() => {
        const isMobileVerByUserAgent = () => {
            return (
                useragent.toLowerCase().includes('ipad') ||
                useragent.toLowerCase().includes('iphone') ||
                useragent.toLowerCase().includes('phone') ||
                useragent.toLowerCase().includes('android') ||
                useragent.toLowerCase().includes('mobile')
            );
        };
        setIsMobileVer(isMobileVerByUserAgent()); // Call the function to get the boolean value

        fetch('/db/gird/defaultDBposition')
            .then((response) => response.json())
            .then((resp) => {
                setFetchedLayout(resp.defaultDBposition)
            })
        // console.log('1234', 'must work')
    }, []);


    const changeIsMobileState = () => setIsMobileVer(!isMobileVer)
    return (
        <div className={'wrapper'} style={{display: "flex", flexDirection: "column"}}>
            <Header/>
            <div className={'body'} style={{
                display: 'grid',
                gridTemplateColumns: '1fr 9fr',
            }}>
                <SideBar/>
                <div>
                    <div style={{display: "flex", flexDirection: "row", justifyContent: "space-evenly"}}>
                        <div style={{color:  isAdaptive ? 'green' : 'red' }}>isAdaptive { isAdaptive ? 'true' : 'false' }</div>
                        <div style={{color:  isMobileVer ? 'green' : 'red' }}>isMobileVer { isMobileVer ? 'true' : 'false' }</div>
                    </div>
                    <div style={{display: "flex", flexDirection: "row", justifyContent: "space-evenly"}}>
                        <button onClick={resetLocalStorage}>Reset settings</button>
                        <button onClick={changeCompactView}>Change compact view</button>
                        <button onClick={changeAdaptiveState}>Change Adaptive Type</button>
                        <button onClick={changeIsMobileState}>
                            {isMobileVer ? 'Toggle Mobile to Desktop' : 'Toggle Desktop to Mobile'}
                        </button>

                    </div>
                    <Grid
                        isVerticalCompact={isVerticalCompact}
                        layouts={layouts}
                        setLayouts={setLayouts}
                        currentBreakpoint={currentBreakpoint}
                        setCurrentBreakpoint={setCurrentBreakpoint}
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



