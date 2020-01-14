/**
 * A customizable progress bar.
 *
 * ![](https://i.imgur.com/wk0e3jT.gif)
 */
export declare class ProgressBar {
    private length;
    private fill;
    private halfSteps;
    private halfStepFill;
    private showPercentage;
    private percentageDecimals;
    private color;
    private colorOnCompletion;
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
        fill?: string;
        halfSteps?: boolean;
        halfStepFill?: string;
        showPercentage?: boolean;
        percentageDecimals?: number;
        color?: Color;
        colorOnCompletion?: Color;
    });
    /**
     * Generates a string representation of the progress bar.
     *
     * @param progress - a value between 0 and 1.
     */
    make(progress: number): string;
}
/**
 * A customizable progress spinner.
 *
 * ![](https://i.imgur.com/0FekYSZ.gif)
 */
export declare class ProgressSpinner {
    private frame;
    private showPercentage;
    private percentageDecimals;
    private color;
    private colorOnCompletion;
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
        showPercentage?: boolean;
        percentageDecimals?: number;
        color?: Color;
        colorOnCompletion?: Color;
    });
    /**
     * Generates a string representation of the progress spinner.
     *
     * @param progress - a value between 0 and 1. If not provided, no percentage will be shown.
     */
    make(progress?: number): string;
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
