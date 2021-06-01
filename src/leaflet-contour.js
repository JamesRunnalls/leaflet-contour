import L from "leaflet";
import { extent, range } from "d3";
import { contours as d3contours } from "d3-contour";

L.Contour = L.GeoJSON.extend({
  options: {
    thresholds: 50,
    color: 1,
  },

  initialize: function (data, options) {
    L.setOptions(this, options);
    this._layers = {};

    if (data) {
      var geojson = this._createContours(data);
      this.addData(geojson);
    }
  },
  _unitToGeographic: function (gridx, gridy, i, j) {
    var ii = Math.floor(i);
    var jj = Math.floor(j);
    var x, y;
    if (
      gridx[ii][jj] !== null &&
      gridx[ii][jj + 1] !== null &&
      gridx[ii + 1][jj] !== null &&
      gridx[ii + 1][jj + 1] !== null
    ) {
      x =
        ((gridx[ii + 1][jj + 1] - gridx[ii + 1][jj]) * (j - jj) +
          gridx[ii + 1][jj] +
          ((gridx[ii][jj + 1] - gridx[ii][jj]) * (j - jj) + gridx[ii][jj])) /
        2;
      y =
        ((gridy[ii + 1][jj] - gridy[ii][jj]) * (i - ii) +
          gridy[ii][jj] +
          ((gridy[ii + 1][jj + 1] - gridy[ii][jj + 1]) * (i - ii) +
            gridy[ii][jj + 1])) /
        2;
    } else {
      x = gridx[ii][jj];
      y = gridy[ii][jj];
    }

    return [x, y];
  },

  _createContours: function (data) {
    var zdomain = extent(
      [].concat.apply([], data.z).filter((f) => {
        return !isNaN(parseFloat(f)) && isFinite(f);
      })
    );
    var thresholds = range(
      zdomain[0],
      zdomain[1],
      (zdomain[1] - zdomain[0]) / this.options.thresholds
    );

    var values = data.z.flat();
    var contours = d3contours()
      .size([data.z[0].length, data.z.length])
      .thresholds(thresholds)(values);

    for (var i = 0; i < contours.length; i++) {
      for (var j = 0; j < contours[i].coordinates.length; j++) {
        for (var k = 0; k < contours[i].coordinates[j].length; k++) {
          for (var l = 0; l < contours[i].coordinates[j][k].length; l++) {
            contours[i].coordinates[j][k][l] = this._unitToGeographic(
              data.x,
              data.y,
              contours[i].coordinates[j][k][l][1],
              contours[i].coordinates[j][k][l][0]
            );
          }
        }
      }
    }

    return contours;
  },
});

L.contour = function (inputdata, options) {
  return new L.Contour(inputdata, options);
};
