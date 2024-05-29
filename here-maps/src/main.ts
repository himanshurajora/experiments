// add here H to global scope

import { TrafficData, trafficData } from "./data";
import * as _ from "lodash";
// Initialize communication with the platform
const platform = new H.service.Platform({
  apiKey: "API_KEY",
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
  response.json().then(async (data: TrafficData) => {
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

    const allPoints = _.map(results, (result, resultIndex) => {
      const points = _.flatMap(result.location.shape.links, (link) => {
        return link.points;
      });

      return points;
    });

    console.log("Points inside the circle: ", allPoints);

    setTimeout(function () {
      window.dispatchEvent(new Event("resize"));
    }, 200);

    for (let points of allPoints) {
      for (let j = 0; j < points.length - 1; j++) {
        // draw line between two points
        const point1 = points[j];
        const point2 = points[j + 1];

        const lineString = new H.geo.LineString();
        lineString.pushLatLngAlt(point1.lat, point1.lng);
        lineString.pushPoint(point2);

        const polyline = new H.map.Polyline(lineString, {
          style: {
            lineWidth: 4,
            strokeColor: "rgba(0, 255, 0, 0.5)",
          },
        });

        map.addObject(polyline);
        // check if the line intersects the circle
        if (
          lineIntersectsCircle(
            point1,
            point2,
            { lat: circleData.lat, lng: circleData.lng },
            circleData.radius
          )
        ) {
          console.log("Line intersects the circle");
          // draw the line with red color
          const polyline = new H.map.Polyline(lineString, {
            style: {
              lineWidth: 4,
              strokeColor: "rgba(255, 0, 0, 0.5)",
            },
          });

          map.addObject(polyline);
        } else {
          console.log("Line does not intersect the circle");
        }
        await sleep(2);
      }
    }

    setTimeout(() => {
      console.log("Drawing points inside the circle");
      drawPoints(results, true);
    }, 10000);

    function sleep(ms: number) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }

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
                  fillColor: "rgba(0, 0, 255, 0.5)",
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
            strokeColor: "rgba(0, 0, 255, 0.5)",
          },
        });

        // Add the polyline to the map
        map.addObject(polyline);
      });
    }
  });
});

// check if a line intersects a circle
function lineIntersectsCircle(
  l1: { lat: number; lng: number },
  l2: { lat: number; lng: number },
  c: { lat: number; lng: number },
  r: number
) {
  // first check if the any of the points are inside the circle
  const distance1 = Math.sqrt(
    Math.pow(c.lat - l1.lat, 2) + Math.pow(c.lng - l1.lng, 2)
  );
  const distance2 = Math.sqrt(
    Math.pow(c.lat - l2.lat, 2) + Math.pow(c.lng - l2.lng, 2)
  );

  // convert the distance to meters
  const distance1InMeters = distance1 * 111000;
  const distance2InMeters = distance2 * 111000;

  if (distance1InMeters <= r || distance2InMeters <= r) {
    return true;
  }

  // convert the points to meters
  const l1InMeters = {
    lat: l1.lat * 111000,
    lng: l1.lng * 111000,
  };

  const l2InMeters = {
    lat: l2.lat * 111000,
    lng: l2.lng * 111000,
  };

  // convert the circle center to meters
  const cInMeters = {
    lat: c.lat * 111000,
    lng: c.lng * 111000,
  };

  /*
    Formula
    // parameters: ax ay bx by cx cy r
    ax -= cx;
    ay -= cy;
    bx -= cx;
    by -= cy;
    a = (bx - ax)^2 + (by - ay)^2;
    b = 2*(ax*(bx - ax) + ay*(by - ay));
    c = ax^2 + ay^2 - r^2;
    disc = b^2 - 4*a*c;
    if(disc <= 0) return false;
    sqrtdisc = sqrt(disc);
    t1 = (-b + sqrtdisc)/(2*a);
    t2 = (-b - sqrtdisc)/(2*a);
    if((0 < t1 && t1 < 1) || (0 < t2 && t2 < 1)) return true;
    return false;
  */

  const ax = l1InMeters.lat - cInMeters.lat;
  const ay = l1InMeters.lng - cInMeters.lng;
  const bx = l2InMeters.lat - cInMeters.lat;
  const by = l2InMeters.lng - cInMeters.lng;
  const a = Math.pow(bx - ax, 2) + Math.pow(by - ay, 2);
  const b = 2 * (ax * (bx - ax) + ay * (by - ay));
  const c1 = Math.pow(ax, 2) + Math.pow(ay, 2) - Math.pow(r, 2);
  const disc = Math.pow(b, 2) - 4 * a * c1;

  if (disc <= 0) {
    return false;
  }

  const sqrtdisc = Math.sqrt(disc);
  const t1 = (-b + sqrtdisc) / (2 * a);
  const t2 = (-b - sqrtdisc) / (2 * a);

  if ((0 < t1 && t1 < 1) || (0 < t2 && t2 < 1)) {
    return true;
  }

  return false;
}
