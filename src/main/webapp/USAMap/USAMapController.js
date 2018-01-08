/**
 * Created by juliechen on 4/12/15.
 */
"use strict";
define(['app-config', 'd3', 'queue', 'topojson'], function (app, d3, queue, topojson) {
    app.register.controller('USAMapController', ['$rootScope', '$scope', '$location', '$http',
        function (rsc, sc, loc, hp) {

        /*--- IMPORTANT GUIDELINES ---
        1. Use div #canvas-svg for svg rendering
            var svg = d3.select("#canvas-svg");
        2. 'data' variable contains JSON data from Data tab
           'config' variable contains data from Properties tab
            Do NOT overwrite these variables
        3. To define customizable properties, use capitalized variable names,
            and define them in Properties tab ---*/

        var config = {width: 900, height: 500, valueDataFormat: ".2%", color1: "#d3e5ff", color2: "#08306B", countyId: "id", countyValue: "rate" }

        var width = config.width,
            height = config.height;

        var valueDataFormat = d3.format(config.valueDataFormat);

        var rateById = d3.map();

        var COLOR_COUNTS = 9;

        var SCALE = 0.7;

        function Interpolate(start, end, steps, count) {
            var s = start,
                e = end,
                final = s + (((e - s) / steps) * count);
            return Math.floor(final);
        }

        function Color(_r, _g, _b) {
            var r, g, b;
            var setColors = function(_r, _g, _b) {
                r = _r;
                g = _g;
                b = _b;
            };

            setColors(_r, _g, _b);
            this.getColors = function() {
                var colors = {
                    r: r,
                    g: g,
                    b: b
                };
                return colors;
            };
        }

        function hexToRgb(hex) {
            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
            } : null;
        }

        function valueFormat(d) {
          if (d > 1000000000) {
            return Math.round(d / 1000000000 * 10) / 10 + "B";
          } else if (d > 1000000) {
            return Math.round(d / 1000000 * 10) / 10 + "M";
          } else if (d > 1000) {
            return Math.round(d / 1000 * 10) / 10 + "K";
          } else {
            return d;
          }
        }

        var COLOR_FIRST = config.color1, COLOR_LAST = config.color2;

        var rgb = hexToRgb(COLOR_FIRST);

        var COLOR_START = new Color(rgb.r, rgb.g, rgb.b);

        rgb = hexToRgb(COLOR_LAST);
        var COLOR_END = new Color(rgb.r, rgb.g, rgb.b);

        var startColors = COLOR_START.getColors(),
            endColors = COLOR_END.getColors();

        var colors = [];

        for (var i = 0; i < COLOR_COUNTS; i++) {
          var r = Interpolate(startColors.r, endColors.r, COLOR_COUNTS, i);
          var g = Interpolate(startColors.g, endColors.g, COLOR_COUNTS, i);
          var b = Interpolate(startColors.b, endColors.b, COLOR_COUNTS, i);
          colors.push(new Color(r, g, b));
        }

        var quantize = d3.scale.quantize()
            .range(d3.range(COLOR_COUNTS).map(function(i) { return i }));

        var path = d3.geo.path();

        var svg = d3.select("#canvas-svg").append("svg")
            .attr("width", width)
            .attr("height", height);

        d3.tsv("properties/unemployment.tsv", function(data) {

          data.forEach(function(d) {
             rateById.set(d[config.countyId], +d[config.countyValue]);
          });

          quantize.domain([d3.min(data, function(d){ return +d[config.countyValue] }),
            d3.max(data, function(d){ return +d[config.countyValue] })]);

        });

        function valueFormat(d) {
          if (d > 1000000000) {
            return Math.round(d / 1000000000 * 10) / 10 + "B";
          } else if (d > 1000000) {
            return Math.round(d / 1000000 * 10) / 10 + "M";
          } else if (d > 1000) {
            return Math.round(d / 1000 * 10) / 10 + "K";
          } else {
            return d;
          }
        }

        d3.json("properties/usa-counties.json", function(error, us) {
        d3.tsv("properties/us-county-names.tsv", function(error, county_names) {
          var countyById = {};
          county_names.forEach(function(c) {
            countyById[c[config.countyId]] = c.name;
          });

          var map_svg = svg.append("g")
              .attr("class", "counties");

          map_svg.selectAll("path")
              .data(topojson.feature(us, us.objects.counties).features)
            .enter().append("path")
              .style("fill", function(d) {
                if (rateById.get(d[config.countyId])) {
                  var i = quantize(rateById.get(d[config.countyId]));
                  var color = colors[i].getColors();
                  return "rgb(" + color.r + "," + color.g +
                      "," + color.b + ")";
                } else {
                  return "";
                }
              })
              .attr("d", path)
              .on("mousemove", function(d) {
                var html = "";

                html += "<div class=\"tooltip_kv\">";
                html += "<span class=\"tooltip_key\">";
                html += countyById[d[config.countyId]];
                html += "</span>";
                html += "<span class=\"tooltip_value\">";
                html += (rateById.get(d[config.countyId]) ? valueDataFormat(rateById.get(d[config.countyId])) : "");
                html += "";
                html += "</span>";
                html += "</div>";

                /* $("#tooltip-container").html(html);
                $(this).attr("fill-opacity", "0.8");
                $("#tooltip-container").show(); */

                d3.select("#tooltip-container").html(html);
                d3.select(this).attr("fill-opacity", "0.8");
                d3.select("#tooltip-container").style("display", "inline-block");

                var coordinates = d3.mouse(this);

                /* var map_width = $('.counties')[0].getBoundingClientRect().width;  */
                var map_width = d3.select('.counties').node().getBoundingClientRect().width;

                if (d3.event.pageX < map_width / 2) {
                  d3.select("#tooltip-container")
                    .style("top", (d3.event.pageY + 15) + "px")
                    .style("left", (d3.event.pageX + 15) + "px");
                } else {
                  /* var tooltip_width = $("#tooltip-container").width(); */
                  var tooltip_width = d3.select("#tooltip-container").style("width");

                  d3.select("#tooltip-container")
                    .style("top", (d3.event.pageY + 15) + "px")
                    .style("left", (d3.event.pageX - tooltip_width - 30) + "px");
                }
              })
              .on("mouseout", function() {
                  /* $(this).attr("fill-opacity", "1.0");
                  $("#tooltip-container").hide(); */

                  d3.select(this).attr("fill-opacity", "0.8");
                  d3.select("#tooltip-container").style("display", "none");
              });

          svg.append("path")
              .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
              .attr("class", "states")
              .attr("d", path);

          // rescale map svg to fit width and height
          var bbox = map_svg.node().getBBox();
          var scale = config.width / bbox.width * 0.9;
          map_svg.attr("transform", "scale(" + scale + ")");
        });
        });


    }]);
});