"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const console_colors_1 = require("@mirania/console-colors");
/**
 * A customizable progress bar.
 *
 * ![](https://i.imgur.com/wk0e3jT.gif)
 */
class ProgressBar {
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
    constructor(length, options) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
        this.length = length < 1 ? 1 : length;
        this.fill = (_b = (_a = options) === null || _a === void 0 ? void 0 : _a.fill, (_b !== null && _b !== void 0 ? _b : "="));
        this.halfSteps = (_d = (_c = options) === null || _c === void 0 ? void 0 : _c.halfSteps, (_d !== null && _d !== void 0 ? _d : false));
        this.halfStepFill = (_f = (_e = options) === null || _e === void 0 ? void 0 : _e.halfStepFill, (_f !== null && _f !== void 0 ? _f : "-"));
        this.showPercentage = (_h = (_g = options) === null || _g === void 0 ? void 0 : _g.showPercentage, (_h !== null && _h !== void 0 ? _h : true));
        this.percentageDecimals = Math.max(0, (_k = (_j = options) === null || _j === void 0 ? void 0 : _j.percentageDecimals, (_k !== null && _k !== void 0 ? _k : 0)));
        this.color = (_m = (_l = options) === null || _l === void 0 ? void 0 : _l.color, (_m !== null && _m !== void 0 ? _m : Color.Default));
        this.colorOnCompletion = (_p = (_o = options) === null || _o === void 0 ? void 0 : _o.colorOnCompletion, (_p !== null && _p !== void 0 ? _p : Color.Default));
    }
    /**
     * Generates a string representation of the progress bar.
     *
     * @param progress - a value between 0 and 1.
     */
    make(progress) {
        let ratio = progress > 1 ? 1 : progress < 0 ? 0 : progress;
        let amount = Math.floor(ratio * this.length);
        let color = ratio === 1 ? this.colorOnCompletion : this.color;
        if (this.halfSteps) {
            let isHalfStep = (ratio - amount / this.length) >= ((amount + 1) / this.length - amount / this.length) / 2;
            return `[${addColor(this.fill.repeat(amount), color)}` +
                `${ratio === 1 ? "" : isHalfStep ? addColor(this.halfStepFill, color) : " "}` +
                `${" ".repeat(Math.max(0, this.length - amount - 1))}]` +
                `${this.showPercentage ? ` ${(ratio * 100).toFixed(this.percentageDecimals)}%` : ""}`;
        }
        else {
            return `[${addColor(this.fill.repeat(amount), color)}` +
                `${" ".repeat(this.length - amount)}]` +
                `${this.showPercentage ? ` ${(ratio * 100).toFixed(this.percentageDecimals)}%` : ""}`;
        }
    }
}
exports.ProgressBar = ProgressBar;
/**
 * A customizable progress spinner.
 *
 * ![](https://i.imgur.com/0FekYSZ.gif)
 */
class ProgressSpinner {
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
    constructor(options) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        this.frame = 0;
        this.showPercentage = (_b = (_a = options) === null || _a === void 0 ? void 0 : _a.showPercentage, (_b !== null && _b !== void 0 ? _b : true));
        this.percentageDecimals = Math.max(0, (_d = (_c = options) === null || _c === void 0 ? void 0 : _c.percentageDecimals, (_d !== null && _d !== void 0 ? _d : 0)));
        this.color = (_f = (_e = options) === null || _e === void 0 ? void 0 : _e.color, (_f !== null && _f !== void 0 ? _f : Color.Default));
        this.colorOnCompletion = (_h = (_g = options) === null || _g === void 0 ? void 0 : _g.colorOnCompletion, (_h !== null && _h !== void 0 ? _h : Color.Default));
    }
    /**
     * Generates a string representation of the progress spinner.
     *
     * @param progress - a value between 0 and 1. If not provided, no percentage will be shown.
     */
    make(progress) {
        let spinner = this.frame === 0 ? "|" : this.frame === 1 ? "/" : this.frame === 2 ? "-" : "\\";
        this.frame = (this.frame + 1) % 4;
        if (progress === null || progress === undefined) {
            return `${addColor(spinner, this.color)}`;
        }
        else {
            let ratio = progress > 1 ? 1 : progress < 0 ? 0 : progress;
            let color = ratio === 1 ? this.colorOnCompletion : this.color;
            return `${addColor(ratio === 1 ? "!" : spinner, color)}` +
                `${this.showPercentage ? ` ${(ratio * 100).toFixed(this.percentageDecimals)}%` : ""}`;
        }
    }
}
exports.ProgressSpinner = ProgressSpinner;
/**
 * An enum used for progress bar/spinner customization.
 *
 * Possible values include `Color.Default`, `Color.Black`,
 * `Color.Red`, `Color.Green`, `Color.Gold`, `Color.Blue`,
 * `Color.Magenta`, `Color.Cyan`, `Color.White`, `Color.Grey`,
 * `Color.Gray`, `Color.Ruby`, `Color.Leaf`, `Color.Yellow`,
 * `Color.Ocean`, `Color.Pink`, `Color.Sky`, `Color.Light`
 */
var Color;
(function (Color) {
    Color[Color["Default"] = 0] = "Default";
    Color[Color["Black"] = 1] = "Black";
    Color[Color["Red"] = 2] = "Red";
    Color[Color["Green"] = 3] = "Green";
    Color[Color["Gold"] = 4] = "Gold";
    Color[Color["Blue"] = 5] = "Blue";
    Color[Color["Magenta"] = 6] = "Magenta";
    Color[Color["Cyan"] = 7] = "Cyan";
    Color[Color["White"] = 8] = "White";
    Color[Color["Grey"] = 9] = "Grey";
    Color[Color["Gray"] = 10] = "Gray";
    Color[Color["Ruby"] = 11] = "Ruby";
    Color[Color["Leaf"] = 12] = "Leaf";
    Color[Color["Yellow"] = 13] = "Yellow";
    Color[Color["Ocean"] = 14] = "Ocean";
    Color[Color["Pink"] = 15] = "Pink";
    Color[Color["Sky"] = 16] = "Sky";
    Color[Color["Light"] = 17] = "Light";
})(Color = exports.Color || (exports.Color = {}));
function addColor(text, color) {
    switch (color) {
        case Color.Black: return console_colors_1.format({ text: "black" }, text);
        case Color.Red: return console_colors_1.format({ text: "red" }, text);
        case Color.Green: return console_colors_1.format({ text: "green" }, text);
        case Color.Gold: return console_colors_1.format({ text: "gold" }, text);
        case Color.Blue: return console_colors_1.format({ text: "blue" }, text);
        case Color.Magenta: return console_colors_1.format({ text: "magenta" }, text);
        case Color.Cyan: return console_colors_1.format({ text: "cyan" }, text);
        case Color.White: return console_colors_1.format({ text: "white" }, text);
        case Color.Grey: //fall through
        case Color.Gray: return console_colors_1.format({ text: "gray" }, text);
        case Color.Ruby: return console_colors_1.format({ text: "ruby" }, text);
        case Color.Leaf: return console_colors_1.format({ text: "leaf" }, text);
        case Color.Yellow: return console_colors_1.format({ text: "yellow" }, text);
        case Color.Ocean: return console_colors_1.format({ text: "ocean" }, text);
        case Color.Pink: return console_colors_1.format({ text: "pink" }, text);
        case Color.Sky: return console_colors_1.format({ text: "sky" }, text);
        case Color.Light: return console_colors_1.format({ text: "light" }, text);
        default: return text;
    }
}
