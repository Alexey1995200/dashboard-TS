import {breakpointsArr, useragent} from "./const";
import {ILayouts, IWidget, IWidgetData} from "./interfaces";

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
    return null; // return null if localStorage is not available or item is null
};
export const saveToLS = (key: string, value: string|boolean|null) => {
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
export const uploadRGLData = async (data: ILayouts | IWidget[] | IWidgetData[], location: string) => {
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
