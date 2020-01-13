import { format } from '@mirania/console-colors';

export class ProgressBar {

    private length: number;
    private fill: string;
    private halfSteps: boolean;
    private halfStepFill: string;
    private showPercentage: boolean;
    private percentageDecimals: number;
    private color: Color;
    private colorOnCompletion: Color;

    constructor(length: number, options?: {
        fill?: string,
        halfSteps?: boolean,
        halfStepFill?: string,
        showPercentage?: boolean,
        percentageDecimals?: number,
        color?: Color,
        colorOnCompletion?: Color,
    }) {
        this.length = length<1 ? 1 : length;
        this.fill = options?.fill ?? "=";
        this.halfSteps = options?.halfSteps ?? false;
        this.halfStepFill = options?.halfStepFill ?? "-";
        this.showPercentage = options?.showPercentage ?? true;
        this.percentageDecimals = Math.max(0, (options?.percentageDecimals ?? 0));
        this.color = options?.color ?? Color.Default;
        this.colorOnCompletion = options?.colorOnCompletion ?? Color.Default;
    }

    public make(value: number): string {
        let ratio = value>1 ? 1 : value<0 ? 0 : value;
        let amount = Math.floor(ratio * this.length);
        let color = ratio===1 ? this.colorOnCompletion : this.color;

        if (this.halfSteps) {
            let isHalfStep = (ratio-amount/this.length) >= ((amount+1)/this.length-amount/this.length)/2;
            return `[${addColor(this.fill.repeat(amount), color)}`+
                    `${ratio===1 ? "" : isHalfStep ? addColor(this.halfStepFill, color) : " "}`+
                    `${" ".repeat(Math.max(0, this.length-amount-1))}]`+
                    `${this.showPercentage ? ` ${(ratio*100).toFixed(this.percentageDecimals)}%` : ""}`;
        } else {
            return `[${addColor(this.fill.repeat(amount), color)}`+
                    `${" ".repeat(this.length-amount)}]`+
                    `${this.showPercentage ? ` ${(ratio*100).toFixed(this.percentageDecimals)}%` : ""}`;
        }
    }
}

export class ProgressSpinner {

    private frame: number;
    private showPercentage: boolean;
    private percentageDecimals: number;
    private color: Color;
    private colorOnCompletion: Color;

    constructor(options?: {
        showPercentage?: boolean,
        percentageDecimals?: number,
        color?: Color,
        colorOnCompletion?: Color,
    }) {
        this.frame = 0;
        this.showPercentage = options?.showPercentage ?? true;
        this.percentageDecimals = Math.max(0, (options?.percentageDecimals ?? 0));
        this.color = options?.color ?? Color.Default;
        this.colorOnCompletion = options?.colorOnCompletion ?? Color.Default;
    }

    public make(value?: number): string {        
        let spinner = this.frame===0 ? "|" : this.frame===1 ? "/" : this.frame===2 ? "-" : "\\";
        this.frame = (this.frame+1) % 4;

        if (value===null || value===undefined) {
            return `${addColor(spinner, this.color)}`;
        } else {
            let ratio = value > 1 ? 1 : value < 0 ? 0 : value;
            let color = ratio === 1 ? this.colorOnCompletion : this.color;
            return `${addColor(ratio===1 ? "!" : spinner, color)}`+
                   `${this.showPercentage ? ` ${(ratio*100).toFixed(this.percentageDecimals)}%` : ""}`;
        }       
    }
}

export enum Color {
    Default, Black, Red, Green, Gold, Blue, Magenta, Cyan, White, 
    Grey, Gray, Ruby, Leaf, Yellow, Ocean, Pink, Sky, Light
}

function addColor(text: string, color: Color): string {
    switch (color) {
        case Color.Black: return format({ text: "black" }, text);
        case Color.Red: return format({ text: "red" }, text);
        case Color.Green: return format({ text: "green" }, text);
        case Color.Gold: return format({ text: "gold" }, text);
        case Color.Blue: return format({ text: "blue" }, text);
        case Color.Magenta: return format({ text: "magenta" }, text);
        case Color.Cyan: return format({ text: "cyan" }, text);
        case Color.White: return format({ text: "white" }, text);
        case Color.Grey: //fall through
        case Color.Gray: return format({ text: "gray" }, text);
        case Color.Ruby: return format({ text: "ruby" }, text);
        case Color.Leaf: return format({ text: "leaf" }, text);
        case Color.Yellow: return format({ text: "yellow" }, text);
        case Color.Ocean: return format({ text: "ocean" }, text);
        case Color.Pink: return format({ text: "pink" }, text);
        case Color.Sky: return format({ text: "sky" }, text);
        case Color.Light: return format({ text: "light" }, text);
        default: return text;
    }
}