import { format } from '@mirania/console-colors';

/**
 * A customizable progress bar.
 * 
 * ![](https://i.imgur.com/wk0e3jT.gif)
 */
export class ProgressBar {

    private length: number;
    private fill: string;
    private halfSteps: boolean;
    private halfStepFill: string;
    private showPercentage: boolean;
    private percentageDecimals: number;
    private color: Color;
    private colorOnCompletion: Color;

    /**
     * Create a customizable progress bar.
     * 
     * ![](https://i.imgur.com/wk0e3jT.gif)
     * 
     * @param length - inner bar size.
     * @param options - customization options.
     *      - `fill` - character that represent progress cells. Default is `=`
     *      - `halfSteps` - provides a smoother progression. Default is `false`
     *      - `halfStepFill` - character that represents a half-filled progress cell. Default is `-`
     *      - `showPercentage` - `make(progress)` returns a string containing the percentage, e.g. `52%`. Default is `true`
     *      - `percentageDecimals` - amount of decimals to be used when displaying the percentage. Default is `0`
     *      - `color` - progress bar color. Default is `Color.Default`
     *      - `colorOnCompletion` - progress bar color when at 100%. Default is `Color.Default`
     */
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

    /**
     * Generates a string representation of the progress bar.
     * 
     * @param progress - a value between 0 and 1.
     */
    public make(progress: number): string {
        let ratio = progress>1 ? 1 : progress<0 ? 0 : progress;
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

/**
 * A customizable progress spinner.
 * 
 * ![](https://i.imgur.com/0FekYSZ.gif)
 */
export class ProgressSpinner {

    private frame: number;
    private showPercentage: boolean;
    private percentageDecimals: number;
    private color: Color;
    private colorOnCompletion: Color;

    /**
     * Create a customizable progress spinner.
     * 
     * ![](https://i.imgur.com/0FekYSZ.gif)
     * 
     * @param options - customization options.
     *      - `showPercentage` - `make(progress)` returns a string containing the percentage, e.g. `52%`. Default is `true`
     *      - `percentageDecimals` - amount of decimals to be used when displaying the percentage. Default is `0`
     *      - `color` - progress bar color. Default is `Color.Default`
     *      - `colorOnCompletion` - progress bar color when at 100%. Default is `Color.Default`
     */
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

    /**
     * Generates a string representation of the progress spinner.
     * 
     * @param progress - a value between 0 and 1. If not provided, no percentage will be shown.
     */
    public make(progress?: number): string {        
        let spinner = this.frame===0 ? "|" : this.frame===1 ? "/" : this.frame===2 ? "-" : "\\";
        this.frame = (this.frame+1) % 4;

        if (progress===null || progress===undefined) {
            return `${addColor(spinner, this.color)}`;
        } else {
            let ratio = progress > 1 ? 1 : progress < 0 ? 0 : progress;
            let color = ratio === 1 ? this.colorOnCompletion : this.color;
            return `${addColor(ratio===1 ? "!" : spinner, color)}`+
                   `${this.showPercentage ? ` ${(ratio*100).toFixed(this.percentageDecimals)}%` : ""}`;
        }       
    }
}

/**
 * An enum used for progress bar/spinner customization.
 * 
 * Possible values include `Color.Default`, `Color.Black`, 
 * `Color.Red`, `Color.Green`, `Color.Gold`, `Color.Blue`, 
 * `Color.Magenta`, `Color.Cyan`, `Color.White`, `Color.Grey`, 
 * `Color.Gray`, `Color.Ruby`, `Color.Leaf`, `Color.Yellow`, 
 * `Color.Ocean`, `Color.Pink`, `Color.Sky`, `Color.Light`
 */
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