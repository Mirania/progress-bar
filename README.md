# Progress-bar

Quickly print a customized progress bar in the JS console.

```
npm i @mirania/progress-bar
```

Together with Node's `process.stdout.write()` you can use this package to make pretty real-time progress indicators.

![](https://i.imgur.com/wk0e3jT.gif)

![](https://i.imgur.com/0FekYSZ.gif)

-----

## Usage

Create a progress bar object with the options you prefer.

```js
const { ProgressBar } = require("@mirania/progress-bar");

let bar = new ProgressBar(20); //inner length is 20
```

Then, call `make(progress)` with a `progress` value between 0 and 1. For a value of `0.55`, this string will be returned:

![](https://i.imgur.com/csn0nEo.png)

If you do the following on every progress update:

```js
process.stdout.write(`\r${bar.make(progress)}`);
```

You'll get this.

![](https://i.imgur.com/fJGDpLS.gif)

**Progress Spinners** also exist. **Color** is used for bar/spinner customization.

```js
const { ProgressBar, ProgressSpinner, Color } = require("@mirania/progress-bar");
```

## Customization

**ProgressBar**

- `length` - inner bar size. The only required argument.

- `options` - customization options

  - `fill` - character that represent progress cells. Default is `=`

  - `halfSteps` - provides a smoother progression. Default is `false`

  - `halfStepFill` - character that represents a half-filled progress cell. Default is `-`

  - `showPercentage` - `make(progress)` returns a string containing the percentage, e.g. `52%`. Default is `true`

  - `percentageDecimals` - amount of decimals to be used when displaying the percentage. Default is `0`

  - `color` - progress bar color. Default is `Color.Default`

  - `colorOnCompletion` - progress bar color when at 100%. Default is `Color.Default`

**ProgressSpinner**

- `options` - customization options

  - `showPercentage` - see **ProgressBar**.

  - `percentageDecimals` - see **ProgressBar**.

  - `color` - see **ProgressBar**.

  - `colorOnCompletion` - see **ProgressBar**.

**Color** - used for customization only

`Color.Default`, `Color.Black`, `Color.Red`, `Color.Green`, `Color.Gold`, `Color.Blue`, `Color.Magenta`, `Color.Cyan`, `Color.White`, 
    `Color.Grey`, `Color.Gray`, `Color.Ruby`, `Color.Leaf`, `Color.Yellow`, `Color.Ocean`, `Color.Pink`, `Color.Sky`, `Color.Light`