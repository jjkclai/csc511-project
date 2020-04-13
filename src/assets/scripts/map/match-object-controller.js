function visualizeHistory(data) {
    let schedule = data.filter(d => d["playerid"] == "1");
    
    let width = timeSvg.style("width").replace("px", "");
    let height = timeSvg.style("height").replace("px", "");

    let marginFocus = {top: height * 0.10, right: width * 0.05, bottom: height * 0.40, left: width * 0.05};
    let marginContext = {top: height * 0.80, right: width * 0.05, bottom: height * 0.10, left: width * 0.05};

    let widthFocus = width - marginFocus.right - marginFocus.left;
    let heightFocus = height - marginFocus.top - marginFocus.bottom;

    let widthContext = width - marginContext.right - marginContext.left;
    let heightContext = height - marginContext.top - marginContext.bottom;

    let svgFocus = timeSvg.append("g")
        .attr("class", "focus")
        .attr("transform", "translate(" + marginFocus.left + ", " + marginFocus.top + ")");
    
    let svgContext = timeSvg.append("g")
        .attr("class", "context")
        .attr("transform", "translate(" + marginContext.left + ", " + marginContext.top + ")");

    let xScaleFocus = d3.scaleTime()
        .range([0, widthFocus])
        .domain([
            d3.min(schedule, function(d) {
                return new Date(d["date_"].getTime()).setDate(d["date_"].getDate() - 1);
            }),
            d3.max(schedule, function(d) {
                return new Date(d["date_"].getTime()).setDate(d["date_"].getDate() + 1);
            })
        ]);

    let yScaleFocus = d3.scaleLinear()
        .range([heightFocus, 0])
        .domain([0, d3.max(schedule, function(d) {
            return d["count"];
        })]);

    let xScaleContext = d3.scaleTime()
        .range(xScaleFocus.range())
        .domain([
            d3.min(window.data, function(d) {
                return new Date(d["date_"].getTime()).setDate(d["date_"].getDate() - 1);
            }),
            d3.max(window.data, function(d) {
                return new Date(d["date_"].getTime()).setDate(d["date_"].getDate() + 1);
            })
        ]);

    let yScaleContext = d3.scaleLinear()
        .range([heightContext, 0])
        .domain([0, d3.max(window.data, function(d) {
            return d["count"];
        })]);

    let brush = d3.brushX()
        .extent([[0, 0], [widthContext, heightContext]])
        .on("brush end", brushed);
    
    let xAxisFocus = d3.axisBottom(xScaleFocus);
    let yAxisFocus = d3.axisLeft(yScaleFocus);

    let xAxisContext = d3.axisBottom(xScaleContext);

    svgFocus.append("g")
        .attr("class", "x-axis")
        .attr("transform", "translate(0, " + heightFocus + ")")
        .call(xAxisFocus);

    svgFocus.append("g")
        .attr("class", "y-axis")
        .attr("transform", "translate(0, 0)")
        .call(yAxisFocus);

    svgContext.append("g")
        .attr("class", "x-axis")
        .attr("transform", "translate(0, " + heightContext + ")")
        .call(xAxisContext);

    svgContext.append("g")
        .attr("class", "brush")
        .call(brush)
        .selectAll("rect")
            .attr("y", -10)
            .attr("height", heightContext + 15);
    
    let clipFocus = timeSvg.append("defs").append("clipPath")
        .attr("id", "clip-focus")
        .append("rect")
            .attr("width", widthFocus)
            .attr("height", heightFocus);
    
    var clipChartFocus = svgFocus.append("g")
        .attr("transform", "translate(" + 0 + "," + 0 + ")")
        .attr("clip-path", "url(#clip-focus)");

    let xLengthFocus = xScaleFocus(new Date("January 2, 2020")) - xScaleFocus(new Date("January 1, 2020"));
    let yLengthFocus = yScaleFocus(0) - yScaleFocus(1);

    clipChartFocus.append("g")
        .selectAll("rect")
        .data(schedule)
        .enter()
        .append("rect")
            .attr("id", function(d) {
                return d["unique"];
            })
            .attr("class", function(d) {
                return "match-object _" + d["unique"];
            })
            .style("opacity", matchObjectOffOpacity)
            .style("stroke", "black")
            .style("fill", function(d) {
                if(d["result"] == "1") {
                    return "blue";
                }
                else {
                    return "red";
                }
            })
            .attr("x", d => xScaleFocus(d["date_"]) - xLengthFocus / 2)
            .attr("y", d => yScaleFocus(d["count"]))
            .attr("width", xLengthFocus)
            .attr("height", yLengthFocus)
            .on("mouseover", matchMouseOver)
            .on("mousemove", matchMouseMove)
            .on("mouseout", matchMouseOut)
            .on("click", matchClick);
    
    let xLengthContext = xScaleContext(new Date("January 2, 2020")) - xScaleContext(new Date("January 1, 2020"));
    let yLengthContext = yScaleContext(0) - yScaleContext(1);

    svgContext.append("g")
        .selectAll("rect")
        .data(schedule)
        .enter()
        .append("rect")
            .style("opacity", matchObjectOffOpacity)
            .style("stroke", "black")
            .style("fill", function(d) {
                if(d["result"] == "1") {
                    return "blue";
                }
                else {
                    return "red";
                }
            })
            .attr("x", d => xScaleContext(d["date_"]) - xLengthContext / 2)
            .attr("y", d => yScaleContext(d["count"]))
            .attr("width", xLengthContext)
            .attr("height", yLengthContext)

    function brushed() {
        let extent = d3.event.selection;

        xScaleFocus.domain((extent === null) ? xScaleContext.domain() : d3.event.selection);

        if(extent === null) {
            xScaleFocus.domain(xScaleContext.domain());
        }
        else {
            xScaleFocus.domain(extent.map(xScaleContext.invert, xScaleContext));
        }

        xLengthFocus = xScaleFocus(new Date("January 2, 2020")) - xScaleFocus(new Date("January 1, 2020"));

        svgFocus.select(".x-axis").call(xAxisFocus);

        svgFocus.selectAll("rect")
            .attr("x", d => xScaleFocus(d["date_"]) - xLengthFocus / 2)
            .attr("width", xLengthFocus);
    }
}

function matchMouseOver(d) {
    timeSvg.selectAll("rect")
        .select(function(c) {
            return c === d ? this : null;
        })
        .transition()
        .duration(100)
        .style("opacity", matchObjectOnOpacity)
        .style("fill", "black");
        
    loadMapData(d["unique"], 1, 1);
    mapSvg.selectAll(".player-object").filter("._" + d["unique"])
        .transition()
        .duration(100)
        .style("opacity", playerObjectOnOpacity);

    clearTimeline();
    loadTimelineData(d["unique"], -1);

    timeSvgTooltip.transition()
        .duration(200)
        .style("opacity", tooltipObjectOnOpacity);
    
    timeSvgTooltip.html(
        "<div class='tooltip-text'>" +
            "<table>" +
                "<tr>" +
                    "<th>Game ID</th>" +
                    "<td>" + d["gameid"] + "</td>" +
                "</tr>" +
                "<tr>" +
                    "<th>League</th>" +
                    "<td>" + d["league"] + "</td>" +
                "</tr>" +
                "<tr>" +
                    "<th>Date</th>" +
                    "<td>" + d["date_"].toDateString() + "</td>" +
                "</tr>" +
            "</table>" +
        "</div>"
    );
}

function matchMouseMove() {
    timeSvgTooltip.style("top", (event.pageY-10)+"px")
        .style("left",(event.pageX+10)+"px");
}

function matchMouseOut(d) {
    let target = timeSvg.selectAll("rect")
        .select(function(c) {
            return c === d ? this : null;
        })
    
    if(target.attr("class").includes("on")) {
        target.transition()
        .duration(100)
        .style("fill", function(d) {
            if(d["result"] == "1") {
                return "blue";
            }
            else {
                return "red";
            }
        });

        unloadMapData(d["unique"]);
        loadMapData(d["unique"], 0, 1)
    }
    else {
        target.transition()
        .duration(100)
        .style("opacity", matchObjectOffOpacity)
        .style("fill", function(d) {
            if(d["result"] == "1") {
                return "blue";
            }
            else {
                return "red";
            }
        });

        unloadMapData(d["unique"]);
    }

    clearTimeline();

    mapSvg.selectAll(".player-object").filter("._" + d["unique"])
        .transition()
        .duration(100)
        .style("opacity", playerObjectOffOpacity);
    
    timeSvgTooltip.transition()
        .duration(200)
        .style("opacity", tooltipObjectOffOpacity);
}

function matchClick(d) {
    let target = timeSvg.selectAll("rect")
        .select(function(c) {
            return c === d ? this : null;
        })
    
    if(target.attr("class").includes("on")) {
        target.attr("class", target.attr("class").replace(" on", ""));
    }
    else {
        target.attr("class", target.attr("class") + " on");
    }
}
