var g_tracts;

var width = 960,
    height = 700,
    active = d3.select(null);


var path = d3.geo.path()
    .projection(null);

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

svg.append("rect")
    .attr("class", "background")
    .attr("width", width)
    .attr("height", height)
    .on("click", reset);

var g = svg.append("g")
    .style("stroke-width", "1.5px");

d3.json("GA_map/ca-simple-topo.json", function(error, ny) {
    if (error) throw error;

    var tracts = ny.objects.tracts;
    g_tracts = tracts

    g.selectAll("path")
        .data(topojson.feature(ny, tracts).features)
        .enter().append("path")
        .attr("class", "tract")
        .attr("d", path)
        .on("click", clicked)
        .style("fill", function(d){
            if (d.properties.COUNTYFP == "121") {
                console.log(d.properties)
                return "blue"
            }
        })
        .append("title")
        .text(function(d, i) { return d.id; })

    ;

    g.append("path")
        .attr("class", "tract-border")
        .datum(topojson.mesh(ny))
        .attr("d", path);

    console.log(g)
});


function clicked(d) {
    console.log("inside clicked");
    if (active.node() === this) return reset();
    active.classed("active", false);
    active = d3.select(this).classed("active", true);

    var bounds = path.bounds(d),
        dx = bounds[1][0] - bounds[0][0],
        dy = bounds[1][1] - bounds[0][1],
        x = (bounds[0][0] + bounds[1][0]) / 2,
        y = (bounds[0][1] + bounds[1][1]) / 2,
        scale = .01 / Math.max(dx / width, dy / height),
        translate = [width / 2 - scale * x, height / 2 - scale * y];

    g.transition()
        .duration(200)
        .style("stroke-width", 1.5 / scale + "px")
        .attr("transform", "translate(" + translate + ")scale(" + scale + ")");
}

function reset() {
    active.classed("active", false);
    active = d3.select(null);

    g.transition()
        .duration(750)
        .style("stroke-width", "1.5px")
        .attr("transform", "");
}


d3.select(self.frameElement).style("height", height + "px");