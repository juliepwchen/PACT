/**
 * Created by juliechen on 4/12/15.
 */
"use strict";
define(['app-config', 'd3', 'queue', 'topojson'], function (app, d3, queue, topojson) {
    app.register.controller('MortalityMapController', ['$rootScope', '$scope', '$location', '$http',
        function (rsc, sc, loc, hp) {

var COLOR_COUNTS = 9;

var SCALE = 1.0;                    /* Change from 0.7 to 1.0 */

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

var COLOR_FIRST = "#FFE6E6", COLOR_LAST = "#E60000";

var rgb = hexToRgb(COLOR_FIRST);

var COLOR_START = new Color(rgb.r, rgb.g, rgb.b);

rgb = hexToRgb(COLOR_LAST);
var COLOR_END = new Color(rgb.r, rgb.g, rgb.b);

var MAP_STATE = "State";
var MAP_VALUE = "Mortality_Rate";

var width = 1000,
    height = 600;

var valueById = d3.map();

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
    .domain([0, 1.0])
    .range(d3.range(COLOR_COUNTS).map(function(i) { return i }));

var path = d3.geo.path();

var svg = d3.select("#canvas-svg").append("svg")
    .attr("width", width)
    .attr("height", height);

/*--------Start-------------------*/
 var div = d3.select("div.tooltips");
 var cost_data = {}
 var y = d3.scale.linear().range([ height, 0 ]);

 var config = {color1: "#000099", color2: "#009933", state: "Provider State", physicalActivity: " Average Physical Activity ", grainConsumption:" Average Grain Consumption " }
 var BAR_COLOR_1 = config.color1;
 var BAR_COLOR_2 = config.color2;

 d3.json("properties/gluten_physical.json", function(data) {

 data.forEach(function(d) {
   cost_data[d[config.state]] = {};

   /* console.log("d[config.state]= "+ JSON.stringify(d[config.state]));
   console.log("d[config.physicalActivity]= "+ JSON.stringify(d[config.physicalActivity]));
   console.log("d[config.grainConsumption]= "+ JSON.stringify(d[config.grainConsumption])); */

   cost_data[d[config.state]].activity = d[config.physicalActivity];
   cost_data[d[config.state]].consumption = d[config.grainConsumption];

   /* console.log("cost_data[d[config.state]] = "+ JSON.stringify(cost_data[d[config.state]])); */
 });

 y.domain([ 0, d3.max(data, function(d) {
   return +d[config.grainConsumption];
 }) ]);

 });

/*---------End------------------*/

d3.tsv("properties/us-state-names.tsv", function(error, names) {

var name_id_map = {};
var id_name_map = {};
var id_code_map = {};

for (var i = 0; i < names.length; i++) {

  name_id_map[names[i].name] = names[i].id;
  /* console.log("name_id_map[names[i].name]"+name_id_map[names[i].name]); */

  /* console.log("names[i] = "+ JSON.stringify(names[i]));
  console.log("names[i].id = "+ names[i].id); */

  id_name_map[names[i].id] = names[i].name;
  id_code_map[names[i].id] = names[i].code;               /* Add id_code_map for State Code */

  /* console.log("id_name_map[names[i].id] = "+ id_name_map[names[i].id]); */

}

d3.csv("properties/mortality.csv", function(data) {

data.forEach(function(d) {
  /* console.log("d[MAP_STATE]=" + d[MAP_STATE]); */

  var id = name_id_map[d[MAP_STATE]];

  /* console.log("id=" + id);
  console.log("+d[MAP_VALUE]=" + +d[MAP_VALUE]); */

  valueById.set(id, +d[MAP_VALUE]);
});

quantize.domain([d3.min(data, function(d){ return +d[MAP_VALUE] }),
  d3.max(data, function(d){ return +d[MAP_VALUE] })]);

});

d3.json("properties/usa.json", function(error, us) {

  svg.append("g")
      .attr("class", "states-choropleth")
      .attr("transform", "skewY(3)")
    .selectAll("path")
      .data(topojson.feature(us, us.objects.states).features)
    .enter().append("path")
      .attr("transform", "scale(" + SCALE + ")")
      .attr("state", function(d) {
        return d.state;
      })
      .style("fill", function(d) {

        /* console.log("d.id= " + d.id);
        console.log("ValueById= " + valueById.get(d.id)); */

        if (valueById.get(d.id)) {
          var i = quantize(valueById.get(d.id));
          var color = colors[i].getColors();

          /* console.log("i= " + quantize(valueById.get(d.id)));
          console.log("color= " + colors[i].getColors());
          console.log("rgb= " + "rgb(" + color.r + "," + color.g + "," + color.b + ")"); */

          return "rgb(" + color.r + "," + color.g +
              "," + color.b + ")";
        } else {
          return "";
        }
      })
      .attr("d", path)
      .attr("centroid", function(d) {               /* -------------start ----------------------*/
                        /* console.log("path.centroid(d) = " + JSON.stringify(path.centroid(d)));
                        console.log("d.id = " + d.id);
                        console.log("id_code_map[d.id] = " + JSON.stringify(id_code_map[d.id])); */

                        var centroid = path.centroid(d);

                        /* console.log("cost_data[id_code_map[d.id]] = " + JSON.stringify(cost_data[id_code_map[d.id]])); */

                        if (cost_data[id_code_map[d.id]]) {
                          centroid[1] = centroid[1] - cost_data[id_code_map[d.id]].activity;
                          cost_data[id_code_map[d.id]].centroid = centroid;

                        }
                      })                        /*-----------------end -------------------------*/
      .on("mousemove", function(d) {
          var html = "";

          html += "<div class=\"tooltip_kv\">";
          html += "<span class=\"tooltip_key\">";
          html += id_name_map[d.id] + "<br/>";
          html += "</span>";
          html += "<span class=\"tooltip_value\">";
          html += "Diabetes Deaths" + "<br/>";
          html += (valueById.get(d.id) ? valueById.get(d.id) : "");
          html += "/100,000 Population";
          html += "</span>";
          html += "</div>";

          d3.select("#tooltip-container").html(html);
          d3.select(this).attr("fill-opacity", "0.8");
          d3.select("#tooltip-container").style("display", "inline-block");


          var coordinates = d3.mouse(this);
          d3.select("#tooltip-container")
            .style("top", (d3.event.pageY + 15) + "px")
            .style("left", (d3.event.pageX + 15) + "px");
      })
      .on("mouseout", function() {
              /*
              $(this).attr("fill-opacity", "1.0");
              $("#tooltip-container").hide(); */

              d3.select(this).attr("fill-opacity", "1.0");
              d3.select("#tooltip-container").style("display", "none");
          });

  svg.append("path")
      .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
      .attr("class", "states")
      .attr("transform", "scale(" + SCALE + ")")
      .attr("transform", "skewY(3)")
      .attr("d", path);

/*--------------Start-----------------------------*/
          for (var state in cost_data) {
              svg.append("g")
              .attr("transform", "skewY(3)")
              .append("rect")
                  .attr("class", "bar_activity")
                  .style("fill", BAR_COLOR_1)
                  .attr("width", 15)                /* NOTE: it was 5 */
                  .attr("state", state)
                  .attr("transform", function(d) {
                      /* console.log("In For Loop, State= " + state);
                      console.log("cost_data[state]= " + JSON.stringify(cost_data[state]));
                      console.log("cost_data[state].centroid= "+ JSON.stringify(cost_data[state].centroid)); */

                      var centroid = cost_data[state].centroid;
                      centroid[0] = centroid[0] - 10;
                      return "translate(" + centroid + ")";
                  })
                  /* .attr("transform", "skewY(10)")
                  .style("box-shadow", "10px 10px 5px #aaaaaa") */
                  .attr("height", function(d) {
                      if (cost_data[state]) {
                          return cost_data[state].activity;
                      } else {
                          return 0;
                      }
                  })
                  .on("mouseover", function(d) {

                      var state = d3.select(this).attr("state");
                      /* var centroid = cost_data[state].centroid;
                      var x = centroid[0] - 15;
                      var y = centroid[1] - parseFloat(cost_data[state].activity) -20;

                      div.transition().duration(200).style("opacity", 1);
                      div.html(state + "<br/>" + "$" +
                              Math.round(cost_data[state].activity) + "K")
                          .style("left", x + "px")
                          .style("top", y + "px"); */

                      var html = "";

                      html += "<div class=\"tooltip_kv\">";
                      html += "<span class=\"tooltip_key\">";
                      html += state;
                      html += "</span>" + "<br/>";
                      html += "<span class=\"tooltip_value\">";
                      html += "300 Minute Aerobic Activity" + "<br/>";
                      html += (Math.round(cost_data[state].activity) ? Math.round(cost_data[state].activity) : "");
                      html += "% who reported met this Guideline";
                      html += "</span>";
                      html += "</div>";

                      d3.select("#tooltip-container").html(html);
                      d3.select(this).attr("fill-opacity", "0.8");
                      d3.select("#tooltip-container").style("display", "inline-block");

                      var coordinates = d3.mouse(this);
                      d3.select("#tooltip-container")
                        .style("top", (d3.event.pageY + 15) + "px")
                        .style("left", (d3.event.pageX + 15) + "px");

                  })
                  .on("mouseout", function(d) {
                      /* div.transition().duration(500).style("opacity", 0); */

                      d3.select(this).attr("fill-opacity", "1.0");
                      d3.select("#tooltip-container").style("display", "none");
                  });
              svg.append("g")
              .attr("transform", "skewY(3)")
              .append("rect")
                  .attr("class", "bar_consumption")
                  .style("fill", BAR_COLOR_2)
                  .attr("state", state)
                  .attr("width", 15)                            /* NOTE: it was 7 */
                  .attr("transform", function(d) {
                      var centroid = cost_data[state].centroid;

                      /* centroid[0] = centroid[0] - 5; */             /* NOTE: WORKS */
                      /* centroid[0] = centroid[0] + 5; */

                      /* centroid[1] = centroid[1] + cost_data[state].activity / 1000 - cost_data[state].consumption / 1000;
                      console.log("PAY cost_data[state] centroid[1] BEFORE = " + JSON.stringify(centroid[1])); */

                       /* NOTE: WORKS BELOW */
                      /* centroid[1] = centroid[1] + parseFloat(cost_data[state].activity) - parseFloat(cost_data[state].consumption);  */
                      centroid[1] = centroid[1] - parseFloat(cost_data[state].consumption);

                      /* console.log("PAY cost_data[state].activity = " + JSON.stringify(cost_data[state].activity));
                      console.log("PAY cost_data[state].consumption = " + JSON.stringify(cost_data[state].consumption));
                      console.log("PAY cost_data[state] = " + JSON.stringify(cost_data[state]));
                      console.log("PAY cost_data[state].centroid= "+ JSON.stringify(cost_data[state].centroid));
                      console.log("PAY cost_data[state] centroid[0] = " + JSON.stringify(centroid[0]));
                      console.log("PAY cost_data[state] centroid[1] AFTER = " + JSON.stringify(centroid[1])); */

                      return "translate(" + centroid + ")";
                  })
                  .attr("height", function(d) {
                      if (cost_data[state]) {
                          /* return cost_data[state].consumption / 1000; */
                          return cost_data[state].consumption;

                      } else {
                          return 0;
                      }
                  })
                  .on("mouseover", function(d) {

                      var state = d3.select(this).attr("state");
                      /* var centroid = cost_data[state].centroid;
                      var x = centroid[0] - 20;
                      var y = centroid[1] - parseFloat(cost_data[state].consumption) - 20;

                      div.transition().duration(200).style("opacity", 1);
                      div.html(state + "<br/>" + "$" +
                              Math.round(cost_data[state].consumption) + "K")
                          .style("left", x + "px")
                          .style("top", y + "px"); */

                      var html = "";

                      html += "<div class=\"tooltip_kv\">";
                      html += "<span class=\"tooltip_key\">";
                      html += state;
                      html += "</span>" + "<br/>";
                      html += "<span class=\"tooltip_value\">";
                      html += "Total Grains (Wheat, Rye, Rice, Corn)" + "<br/>";
                      html += (Math.round(cost_data[state].consumption) ? Math.round(cost_data[state].consumption) : "NA");
                      html += "0 LBs/Year (Data Under Construction)";
                      html += "</span>";
                      html += "</div>";

                      d3.select("#tooltip-container").html(html);
                      d3.select(this).attr("fill-opacity", "0.8");
                      d3.select("#tooltip-container").style("display", "inline-block");

                      var coordinates = d3.mouse(this);
                      d3.select("#tooltip-container")
                        .style("top", (d3.event.pageY + 15) + "px")
                        .style("left", (d3.event.pageX + 15) + "px");



                  }).on("mouseout", function(d) {
                      /* div.transition().duration(500).style("opacity", 0); */

                      d3.select(this).attr("fill-opacity", "1.0");
                      d3.select("#tooltip-container").style("display", "none");
                  });



          }

/*----------------End----------------------------*/

/*------------------Start-------------------------*/
        var legend = svg.append("g")
            .attr("class", "legend")
            .attr("transform", function(d, i) { return "translate(-825, 540)"; });
            /* .attr("transform", function(d, i) { return "translate(-500,20)"; }); */

        legend.append("rect")
            .attr("x", width - 18)
            .attr("width", 18)
            .attr("height", 18)
            .style("fill", BAR_COLOR_1);

        legend.append("text")
            .attr("x", width - 24)
            .attr("y", 9)
            .attr("dy", ".35em")
            .style("text-anchor", "end")
            .text(function(d) { return "Physical Activity"; });

        var legend = svg.append("g")
            .attr("class", "legend")
            .attr("transform", function(d, i) { return "translate(-825, 522)"; });
            /* .attr("transform", function(d, i) { return "translate(-500,40)"; }); */

        legend.append("rect")
            .attr("x", width - 18)
            .attr("width", 18)
            .attr("height", 18)
            .style("fill", BAR_COLOR_2);

        legend.append("text")
            .attr("x", width - 24)
            .attr("y", 9)
            .attr("dy", ".35em")
            .style("text-anchor", "end")
            .text(function(d) { return "Gluten Consumption"; });

        var legend = svg.append("g")
            .attr("class", "legend")
            .attr("transform", function(d, i) { return "translate(-825, 504)"; });
                    /* .attr("transform", function(d, i) { return "translate(-500,40)"; }); */

            legend.append("rect")
              .attr("x", width - 18)
              .attr("width", 18)
              .attr("height", 18)
              .style("fill", "#F59999");

            legend.append("text")
              .attr("x", width - 24)
              .attr("y", 9)
              .attr("dy", ".35em")
              .style("text-anchor", "end")
              .text(function(d) { return "Diabetes Death Rate"; });

/*------------------End----------------------------*/

});

});



    }]);
});