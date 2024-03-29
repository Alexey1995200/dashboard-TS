import {breakpointsArr, useragent, screenWidth} from "./const";

export const getFromLS = (key: string) => {
    if (localStorage) {
        try {
            const item = localStorage.getItem(key);
            if (item !== null) {
                return JSON.parse(item).value;
            }
        } catch (e) {
            return undefined;
        }
    }
    return null; // Return null if localStorage is not available or item is null
};
export const resolutionNamesCheck = (some:string) => {
    const resolutionNames = ['phone', 'WQVGA', 'VGA', 'WVGA', 'qHD', 'XGA', 'WXGA', 'WXGAHD', 'HDp', 'FHD', 'WQHD', 'FourK', 'FourKRetina', 'galaxyY', 'galaxyS3', 'F3', 'Tab7in', 'Tab', 'Tab2']
    return resolutionNames.includes(some)
}

export const widgetNamesCheck = (some:string) => {
    const widgetNames = ['OverallProgress', 'ProgressBar', 'LaunchDate', 'Risks', 'Budget', 'OverdueTasks', 'Summary', 'AvgTime', 'UpcTasks', 'ProjectLogs'];
    return widgetNames.includes(some);
}
export const saveToLS = (key: string, value: any) => {
    if (global.localStorage) {
        global.localStorage.setItem(
            key,
            JSON.stringify({
                value
            })
        );
    }
};
export const isMobileVerByUserAgent = () => {
    return (
        useragent.toLowerCase().includes('ipad') ||
        useragent.toLowerCase().includes('iphone') ||
        useragent.toLowerCase().includes('phone') ||
        useragent.toLowerCase().includes('android') ||
        useragent.toLowerCase().includes('mobile')
    );
}

export const isMobile = ():boolean => {
    const isMobile = getFromLS('isMobile')
    return isMobile ? isMobile : isMobileVerByUserAgent()
}

export const getCurrentBreakpoint = (isMobileVer:boolean, screenWidth:number) => {
    let arrByType       // const [arrByType, setArrByType] = useState([])
    if (isMobileVer) {
        arrByType = breakpointsArr.filter((el) => el.type === 'mobile')
    } else {
        arrByType = breakpointsArr.filter((el) => el.type === 'desktop')
    }
    const filteredArr = arrByType.filter((el) => el.resolution + 1 >= screenWidth - 1)
    if (filteredArr.length < 1) {
        return arrByType[arrByType.length - 1]
    } else return filteredArr[0]
}

