# Leaflet Contour

[![npm version](https://badge.fury.io/js/leaflet-contour.svg)](https://badge.fury.io/js/leaflet-contour)

Interactive heatmap, capable of displaying 1,000,000+ data points using canvas and d3.

![Image of Canvas Heatmap](https://canvas-heatmap.s3.eu-central-1.amazonaws.com/heatmap.gif)

Uses [d3](https://d3js.org/) for rendering the axis.

Check out the examples:

- [Basic](https://jamesrunnalls.github.io/canvas-heatmap/example/basic/) ([source](https://github.com/jamesrunnalls/canvas-heatmap/blob/master/example/basic/index.html))

## Quick start

```
import { plot } from 'canvas-heatmap';
```

then

```
plot(div, data, options={});
```

or

```
<script type="text/javascript" src="https://unpkg.com/canvas-heatmap"></script>
```

then

```
canvasheatmap.plot(div, data, options={});
```

## API reference

### div

The unique id of a div. The graph will be appended to this div.

### data

Data can be an object {x: [], y:[], z:[[]]} or and array of objects [{},{}].

| Parameter | Description                                           |
| --------- | ----------------------------------------------------- |
| x         | 1D array of x coordinates                             |
| y         | 1D array of y coordinates                             |
| z         | 2D array of z values (z.shape === (y.shape, x.shape)) |

### options

| Option              | Description                                           | Default     | Type     |
| ------------------- | ----------------------------------------------------- | ----------- | -------- |
| title               | Title for the graph (hidden for web display)          |             | String   |
| xLabel              | Label for the x axis                                  |             | String   |
| yLabel              | Label for the y axis                                  |             | String   |
| zLabel              | Label for the z axis                                  |             | String   |
| xUnit               | Unit for the x axis                                   |             | String   |
| yUnit               | Unit for the y axis                                   |             | String   |
| zUnit               | Unit for the z axis                                   |             | String   |
| xLog                | Use log scale for the x axis                          | false       | Boolean  |
| yLog                | Use log scale for the y axis                          | false       | Boolean  |
| tooltip             | Show a tooltip on hover                               | true        | Boolean  |
| zMin                | Minimum value for z color scale                       | Data min    | Number   |
| zMax                | Maximum value for z color scale                       | Data max    | Number   |
| fontSize            | Font size of graph text                               | 12          | Number   |
| contour             | Draw filled contours                                  | false       | Boolean  |
| yReverse            | Reverse y axis                                        | false       | Boolean  |
| xReverse            | Reverse x axis                                        | false       | Boolean  |
| marginTop           | Top margin in px                                      | 10          | Number   |
| marginLeft          | Left margin in px                                     | 46          | Number   |
| marginBottom        | Bottom margin in px                                   | 46          | Number   |
| marginRight         | Right margin in px                                    | 70          | Number   |
| legendRight         | Plot the legend                                       | true        | Boolean  |
| thresholdStep       | Number of thersholds for when plotting contours       | 20          | Number   |
| backgroundColor     | Background color in html                              | transparent | String   |
| autoDownsample      | Downsample for contour plot                           | 500         | Number   |
| setDownloadGraph    | Add png download to function                          | false       | Function |
| setDownloadGraphDiv | Unique div ID to apply onclick event for png download | false       | String   |
| hover               | Return the mouse values                               | false       | Function |
| width               | Width of the graph                                    | div width   | Number   |
| height              | Height of the graph                                   | div height  | Number   |
| colors              | Color range for the plot (see below for example)      | Red -> Blue | Array    |

#### Colors

Example of color range:

```
[
    { color: "#000000", point: 0.0 },
    { color: "#550088", point: 0.14285714285714285 },
    { color: "#0000ff", point: 0.2857142857142857 },
    { color: "#00ffff", point: 0.42857142857142855 },
    { color: "#00ff00", point: 0.5714285714285714 },
    { color: "#ffff00", point: 0.7142857142857143 },
    { color: "#ff8c00", point: 0.8571428571428571 },
    { color: "#ff0000", point: 1.0 },
];
```
