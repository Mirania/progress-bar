export declare class ProgressBar {
    private length;
    private fill;
    private halfSteps;
    private halfStepFill;
    private showPercentage;
    private percentageDecimals;
    private color;
    private colorOnCompletion;
    constructor(length: number, options?: {
        fill?: string;
        halfSteps?: boolean;
        halfStepFill?: string;
        showPercentage?: boolean;
        percentageDecimals?: number;
        color?: Color;
        colorOnCompletion?: Color;
    });
    make(value: number): string;
}
export declare class ProgressSpinner {
    private frame;
    private showPercentage;
    private percentageDecimals;
    private color;
    private colorOnCompletion;
    constructor(options?: {
        showPercentage?: boolean;
        percentageDecimals?: number;
        color?: Color;
        colorOnCompletion?: Color;
    });
    make(value?: number): string;
}
export declare enum Color {
    Default = 0,
    Black = 1,
    Red = 2,
    Green = 3,
    Gold = 4,
    Blue = 5,
    Magenta = 6,
    Cyan = 7,
    White = 8,
    Grey = 9,
    Gray = 10,
    Ruby = 11,
    Leaf = 12,
    Yellow = 13,
    Ocean = 14,
    Pink = 15,
    Sky = 16,
    Light = 17
}
