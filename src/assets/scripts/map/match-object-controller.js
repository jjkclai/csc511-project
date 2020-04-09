function visualizeTimeLine(data) {
    let schedule = data.filter(d => d["playerid"] == "1");

    schedule.sort(function(a, b) {
        if(a["datetime"] > b["datetime"]) {
            return 1;
        }
        else if(a["datetime"] < b["datetime"]) {
            return -1;
        }
        return 0;
    });

    scheduleHash = {};
    schedule.forEach(function(d) {
        if(d["date"] in scheduleHash) {
            scheduleHash[d["date"]]++;
        }
        else {
            scheduleHash[d["date"]] = 1;
        }

        d["count"] = scheduleHash[d["date"]];
    });
    
    let width = timeSvg.style("width").replace("px", "");
    let height = timeSvg.style("height").replace("px", "");
    let margin = width * 0.05;

    let xScale = d3.scaleTime()
        .domain(d3.extent(schedule, function(d) {
            return d["date"];
        }))
        .range([margin, width - margin]);
    let yScale = d3.scaleLinear()
        .domain([0, d3.max(schedule, function(d) {
            return d["count"];
        })])
        .range([height - margin, margin]);
    
    let xAxis = d3.axisBottom(xScale).tickFormat(d3.timeFormat("%Y-%m-%d"));
    let yAxis = d3.axisLeft(yScale);

    let radius = (yScale(0) - yScale(1)) / 2;

    timeSvg.append("g")
        .call(xAxis)
        .attr("transform", "translate(0, " + (height - margin) + ")");

    timeSvg.append("g")
        .call(yAxis)
        .attr("transform", "translate(" + margin + ", 0)");
    
    timeSvg.append("g")
        .selectAll("circle")
        .data(schedule)
        .enter()
        .append("circle")
            .attr("id", function(d) {
                return d["gameid"];
            })
            .attr("class", function(d) {
                return "match-object _" + d["gameid"];
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
            .attr("cx", d => xScale(d["date"]) + radius)
            .attr("cy", d => yScale(d["count"]) + radius)
            .attr("r", radius)
            .on("mouseover", matchMouseOver)
            .on("mousemove", matchMouseMove)
            .on("mouseout", matchMouseOut)
            .on("click", matchClick);
}

function matchMouseOver(d) {
    timeSvg.selectAll("circle")
        .select(function(c) {
            return c === d ? this : null;
        })
        .transition()
        .duration(100)
        .style("opacity", matchObjectOnOpacity)
        .style("fill", "black");
        
    loadMapData(d["gameid"], 1, 1);
    mapSvg.selectAll(".player-object").filter("._" + d["gameid"])
        .transition()
        .duration(100)
        .style("opacity", playerObjectOnOpacity);

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
                    "<th>Date</th>" +
                    "<td>" + d["date"].toDateString() + "</td>" +
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
    let target = timeSvg.selectAll("circle")
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

        unloadMapData(d["gameid"]);
        loadMapData(d["gameid"], 0, 1)
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

        unloadMapData(d["gameid"]);
    }

    mapSvg.selectAll(".player-object").filter("._" + d["gameid"])
        .transition()
        .duration(100)
        .style("opacity", playerObjectOffOpacity);
    
    timeSvgTooltip.transition()
        .duration(200)
        .style("opacity", tooltipObjectOffOpacity);
}

function matchClick(d) {
    let target = timeSvg.selectAll("circle")
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
