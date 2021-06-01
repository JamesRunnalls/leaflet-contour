# Leaflet Contour

[![npm version](https://badge.fury.io/js/leaflet-contour.svg)](https://badge.fury.io/js/leaflet-contour)

A customisable Leaflet contour plugin. Uses [d3-contour](https://github.com/d3/d3-contour) under the hood.

![Image of Leaflet Contour](https://runnalls.s3.eu-central-1.amazonaws.com/contour.png)

Grid of simulated water temperature values on Lake Geneva from the Meteolakes project, plotted as filled contours.

Check out the examples:

- [Basic](https://jamesrunnalls.github.io/leaflet-contour/example/basic/) ([source](https://github.com/jamesrunnalls/leaflet-contour/blob/master/example/basic/index.html))

## Quick start

```
import L from "leaflet";
import 'leaflet-contour';
```

or

```
<link
    rel="stylesheet"
    href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
    integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
    crossorigin=""
/>
<script
    src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
    integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
    crossorigin=""
></script>
<script type="text/javascript" src="https://unpkg.com/leaflet-contour"></script>
```

then

```
var map = L.map("map");
L.contour(data, {
    thresholds: 50
}).addTo(map);
```

## API reference

### data

Data must be an object {x: [[]], y:[[]], z:[[]]} where x, y, z are 2D arrays of equivalent shape.
x: Longitude
y: Latitude
z: Parameter to display

### thresholds

Number of contours to draw

### custom contour style

Contours are produced as geojson, so the same techniques to control geojson plotting can be used to style the contours [[link]](https://leafletjs.com/examples/geojson/).

For example filled contours, coloured based on contour value. Here "getColor" is a function that accepts a value, min, max and a color range and returns a color on that range. An example of the function is available in the examples.

```
L.contour(data, {
    thresholds: 50,
    style: (feature) => {
        return {
        color: getColor(feature.geometry.value, 10.5, 13.6, colors),
        opacity: 0,
        fillOpacity: 1,
        };
    },
}).addTo(map);
```

### add popup

This shows how to add an onclick popup that gives the value of the contour.

```
L.contour(data, {
    thresholds: 50,
    onEachFeature: onEachContour(),
}).addTo(map);

function onEachContour() {
    return function onEachFeature(feature, layer) {
        layer.bindPopup(
        `<table><tbody><tr><td>${feature.value}°C</td></tr></tbody></table>`
        );
    };
}
```
