import {IDB} from "../../DB/db";
import React from "react";
import {ThemeType} from "../../context/themeProvider";

export interface IWidgetEl {
  currentTheme?: ThemeType
  themeFontColor?: string
  themeBackgroundColor?: string
  DBData?: IDB | null
  isDataLoading?: boolean
}

export interface IWidget {
  key: string;
  data: IWidgetData;
  el: React.FC<IWidgetEl>
  currentTheme?: ThemeType
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
  isBounded?: boolean | undefined;
}

export interface ILayouts {
  [key: string]: IWidgetData[];
}

export interface IWidgets {
  [key: string]: IWidget;
}

export interface MobileBreakpoints {
  [key: string]: number
}

export interface DesktopBreakpoints {
  [key: string]: number
}

export type TBreakpoints = MobileBreakpoints | DesktopBreakpoints;

export type Breakpoints = {
  [P: string]: number
} | undefined


export interface IBpArrItem {
  device: string;
  resolution: number;
  type: string;
}

export type IBpArr = IBpArrItem[];

export enum CompactType {
  vertical = 'vertical',
  horizontal = 'horizontal'
}
export type ExtendedCompactType = CompactType | null | undefined;



