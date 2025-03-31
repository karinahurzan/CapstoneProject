'use strict';

/* global L */

var map = L.map("map", {
  center: [48.7484, 30.221], 
  zoom: 13,
});

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: ["a", "b", "c"],
}).addTo(map);


var marks = [
  { text: "Софіївка", latlng: [48.7572, 30.2358] },
  { text: "Центр міста", latlng: [48.7484, 30.221] },
  {
    text: "Уманський нац. університет садівництва",
    latlng: [48.7518, 30.2223],
  },
];

for (var i = 0; i < marks.length; i++) {
  L.marker(marks[i].latlng)
    .bindTooltip(marks[i].text, {
      direction: "top",
      sticky: false,
      offset: [0, -15],
    })
    .addTo(map);
}
