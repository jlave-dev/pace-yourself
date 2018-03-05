/* global Gauge */

const opts = {
  angle: 0.2, // The span of the gauge arc
  lineWidth: 0.44, // The line thickness
  radiusScale: 1, // Relative radius
  pointer: {
    length: 0.5, // // Relative to gauge radius
    strokeWidth: 0.049, // The thickness
    color: '#000000', // Fill color
  },
  limitMax: true, // If false, max value increases automatically if value > maxValue
  limitMin: true, // If true, the min value of the gauge will be fixed
  // colorStart: '#6FADCF', // Colors
  // colorStop: '#FF1493', // just experiment with them
  percentColors: [
    [0.0, '#CB1D1D'],
    [0.25, '#FFD94E'],
    [0.5, '#3FE376'],
    [0.75, '#FFD94E'],
    [1.0, '#CB1D1D'],
  ],
  strokeColor: '#E0E0E0', // to see which ones work best for you
  generateGradient: true,
  highDpiSupport: true, // High resolution support
};
const target = document.getElementById('gauge'); // your canvas element
const gauge = new Gauge(target).setOptions(opts); // create sexy gauge!
gauge.minValue = 0;
gauge.maxValue = 300;
gauge.set(0);

export default gauge;
