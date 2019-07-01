/// <reference types="react" />
export declare type ITheme = typeof theme;
export declare const theme: {
    colors: {
        blue: string[];
        green: string[];
        orange: string[];
        red: string[];
        yellow: string[];
        grey: string[];
        primary: string[];
        secondary: string[];
        success: string[];
        info: string[];
        warning: string[];
        danger: string[];
    };
    space: import("react").ReactText[];
    fontFamily: string[];
    fontWeight: number[];
    fontSize: string[];
    borderRadius: number[];
    boxShadow: string[];
    boxShadowColor: string[];
    breakpoints: string[];
    layoutHeaderHeight: string;
    easeOut: string;
    easeInOut: string;
};
export default theme;
