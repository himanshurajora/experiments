// add here H to global scope

import { TrafficData, trafficData } from "./data";
import * as _ from "lodash";
// Initialize communication with the platform
const platform = new H.service.Platform({
  apiKey: "<API KEY>",
});

// Default options for the base layers that are used to render a map
var defaultLayers = platform.createDefaultLayers();
const circleData = {
  lat: 41.085082,
  lng: 29.00772,
  radius: 40,
};
// Initialize the map
var map = new H.Map(
  document.getElementById("map"),
  defaultLayers.vector.normal.map,
  {
    zoom: 16,
    center: { lat: circleData.lat, lng: circleData.lng }, // Coordinates for Munich, Germany
  }
);

// add a resize listener to make sure that the map occupies the whole container
window.addEventListener("resize", () => map.getViewPort().resize());

// MapEvents enables the event system
// Behavior implements default interactions for pan/zoom (also on mobile touch environments)
var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

// Create the default UI components
var ui = H.ui.UI.createDefault(map, defaultLayers);

// draw all points as line groups on the maps from the given trafficData

const url = `https://data.traffic.hereapi.com/v7/flow?in=circle:${circleData.lat},${circleData.lng};r=${circleData.radius}&apiKey=D18cdKQ7FurdOTqcgtFqqmwIV1Zy8u4omceXLrCguIA&locationReferencing=shape`;

fetch(url).then((response) => {
  response.json().then((data: TrafficData) => {
    const results = data.results;

    console.log("Results: ", results);

    drawPoints(results);

    // calculate the average jam factor
    const jamFactor = _.meanBy(results, (result) => {
      return result.currentFlow.jamFactor;
    });

    console.log("Average jam factor: ", jamFactor);

    // Create a circle
    const circle = new H.map.Circle(
      // The central point of the circle
      { lat: circleData.lat, lng: circleData.lng },
      // The radius of the circle in meters
      circleData.radius,
      {
        style: {
          lineWidth: 0,
          fillColor: "rgba(0, 128, 0, 0.5)",
        },
      }
    );

    // Add the circle to the map
    map.addObject(circle);

    // filter all the points that are inside the circle
    const resultsInsideTheCircle = _.filter(results, (result, resultIndex) => {
      // if any point of current result is inside the circle, return the result
      const points = _.flatMap(result.location.shape.links, (link) => {
        return link.points;
      });

      return _.some(points, (point) => {
        let distance = Math.sqrt(
          Math.pow(point.lat - circleData.lat, 2) +
            Math.pow(point.lng - circleData.lng, 2)
        );

        // this distance is withing the co-ordinates
        // convert the distance to meters
        distance = distance * 111000; // 1 degree = 111000 meters

        if (distance <= circleData.radius === false) console.log("false");
        return distance <= circleData.radius;
      });
    });

    // average jam factor of intersected points
    const jamFactorInsideTheCircle = _.meanBy(
      resultsInsideTheCircle,
      (result) => {
        return result.currentFlow.jamFactor;
      }
    );

    console.log(jamFactorInsideTheCircle);

    setTimeout(() => {
      console.log("Drawing points inside the circle");
      drawPoints(resultsInsideTheCircle, true);
    }, 10000);

    function drawPoints(resultsToDraw: any, recal = false) {
      // remove all the previous objects from the map
      map.removeObjects(map.getObjects());

      const circle = new H.map.Circle(
        // The central point of the circle
        { lat: circleData.lat, lng: circleData.lng },
        // The radius of the circle in meters
        circleData.radius,
        {
          style: {
            lineWidth: 0,
            fillColor: "rgba(0, 128, 0, 0.5)",
          },
        }
      );

      // redraw the circle
      map.addObject(circle);

      resultsToDraw.forEach((result) => {
        // form lineStrings from each group of points
        const lineString = new H.geo.LineString();

        result.location.shape.links.forEach((link) => {
          link.points.forEach((point) => {
            // draw a small circle for each point
            const circle = new H.map.Circle(
              { lat: point.lat, lng: point.lng },
              2,
              {
                style: {
                  lineWidth: 0,
                  fillColor: recal
                    ? "rgba(255, 0, 0, 0.5)"
                    : "rgba(0, 0, 255, 0.5)",
                },
              }
            );

            // Add the circle to the map
            map.addObject(circle);

            lineString.pushLatLngAlt(point.lat, point.lng);
          });
        });

        // Create a polyline to display the line and give a random color
        var polyline = new H.map.Polyline(lineString, {
          style: {
            lineWidth: 4,
            strokeColor: recal
              ? "rgba(255, 0, 0, 0.5)"
              : "rgba(0, 0, 255, 0.5)",
          },
        });

        // Add the polyline to the map
        map.addObject(polyline);
      });
    }
  });
});
