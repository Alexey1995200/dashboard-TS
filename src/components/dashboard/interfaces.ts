import {ReactElement} from "react";

export interface IWidgetEl {
    currentTheme?:TCurrentTheme
}

export interface IWidget {
    key: string;
    data: IWidgetData;
    el?: ({}) => Element | ReactElement | undefined;
    currentTheme?:TCurrentTheme|undefined
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
export interface MobileBreakpoints {
    [key:string]: number
}

export interface DesktopBreakpoints {
    [key:string]: number
}

export type TBreakpoints = MobileBreakpoints | DesktopBreakpoints;

export type Breakpoints = {
    [P:string]: number
}  | undefined


export interface IBpArrItem {
    device: string;
    resolution: number;
    type: string;
}

export type IBpArr = IBpArrItem[];

export type TCurrentTheme = 'dark' | 'light'

export interface IRisks {
    id: number;
    num: number;
    description: string;
}