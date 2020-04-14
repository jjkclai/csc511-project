function visualizePlayer(data) {
    let blueTeam = data.filter(d => d["playerid"] == 100);
    let redTeam = data.filter(d => d["playerid"] == 200);
    let players = data.filter(d => d["playerid"] <= 10);

    players.sort(function(a, b) {
        if(a["totalgold"] > b["totalgold"]) {
            return -1;
        }
        else if(a["totalgold"] < b["totalgold"]) {
            return 1;
        }
        return 0;
    });

    mapSvg.append("g")
        .selectAll("circle")
        .data(players)
        .enter()
        .append("circle")
            .attr("id", function(d) {
                return d["unique"] + "-" + d["side"].toLowerCase() + "-" + d["position"].toLowerCase();
            })
            .attr("class", function(d) {
                return "player-object _" + d["unique"];
            })
            .style("opacity", playerObjectOffOpacity)
            .style("stroke", "black")
            .style("fill", function(d) {
                return d["side"];
            })
            .attr("cx", function(d) {
                return getIconPos(d)[0] + "%";
            })
            .attr("cy", function(d) {
                return (100 - getIconPos(d)[1]) + "%";
            })
            .attr("r", function(d) {
                return getIconRad(d, blueTeam, redTeam) + "%";
            })
            .on("mouseover", playerMouseOver)
            .on("mousemove", playerMouseMove)
            .on("mouseout", playerMouseOut);
}

function playerMouseOver(d) {
    mapSvg.selectAll("circle")
        .select(function(c) {
            return c["unique"] == d["unique"] ? this : null;
        })
        .transition()
        .duration(100)
        .style("opacity", playerObjectOnOpacity);
    
    timeSvg.selectAll(".match-object").filter("._" + d["unique"])
        .transition()
        .duration(100)
        .style("opacity", matchObjectOnOpacity)
        .style("fill", "black");

    clearTimeline();
    loadTimelineData(d["unique"], d["playerid"] % 5);

    mapSvgTooltip.transition()
        .duration(200)
        .style("opacity", tooltipObjectOnOpacity);
    
    mapSvgTooltip.html(
        "<img class='tooltip-image' src='" + "./assets/images/" + d["champion"] + "Square.png" + "'>" +
        "<div class='tooltip-text'>" +
            "<table>" +
                "<tr>" +
                    "<th>Team</th>" +
                    "<td>" + d["team"] + "</td>" +
                "</tr>" +
                "<tr>" +
                    "<th>Player</th>" +
                    "<td>" + d["player"] + "</td>" +
                "</tr>" +
                "<tr>" +
                    "<th>KDA</th>" +
                    "<td>" + d["k"] + "/" + d["d"] + "/" + d["a"] + "</td>" +
                "</tr>" +
                "<tr>" +
                    "<th>Gold</th>" +
                    "<td>" + d["totalgold"] + "</td>" +
                "</tr>" +
            "</table>" +
        "</div>"
    );
}

function playerMouseMove() {
    mapSvgTooltip.style("top", (event.pageY-10)+"px")
        .style("left",(event.pageX+10)+"px");
}

function playerMouseOut(d) {
    mapSvg.selectAll("circle")
        .select(function(c) {
            return c["unique"] == d["unique"] ? this : null;
        })
        .transition()
        .duration(100)
        .style("opacity", playerObjectOffOpacity);
    
    timeSvg.selectAll(".match-object").filter("._" + d["unique"])
        .transition()
        .duration(100)
        .style("opacity", matchObjectOnOpacity)
        .style("fill", function(d) {
            if(d["result"] == "1") {
                return "blue";
            }
            else {
                return "red";
            }
        });
    
    clearTimeline();

    mapSvgTooltip.transition()
        .duration(200)
        .style("opacity", tooltipObjectOffOpacity);
}

function getIconPos(player) {
    function getBase(side) {
        if(side == "Blue") {
            return 50;
        }
        return 50;
    }

    function getDirection(side) {
        if(side == "Blue") {
            return 1;
        }
        return -1;
    }

    function getOffset(k, d, a) {
        return 2 * k + (-2) * d + 1 * a;
    }

    function getIntersection(lineA, lineB) {
        xDiff = [(lineA[0][0] - lineA[1][0]), (lineB[0][0] - lineB[1][0])];
        yDiff = [(lineA[0][1] - lineA[1][1]), (lineB[0][1] - lineB[1][1])];

        function det(a, b) {
            return a[0] * b[1] - a[1] * b[0];
        }

        div = det(xDiff, yDiff);

        d = [det(lineA[0], lineA[1]), det(lineB[0], lineB[1])];
        x = det(d, xDiff) / div;
        y = det(d, yDiff) / div;

        return [x, y];
    }

    let targetP2 = [14, 32, 50, 86, 68];

    let offset = getDirection(player["side"]) * getOffset(player["k"], player["d"], player["a"]);
    
    let p1 = offset > 0 ? 100 : 0;
    let p2 = targetP2[(player["playerid"] - 1) % 5];

    let p = getBase(player["side"]) + offset;

    return getIntersection([[p1, p1], [p2, (100 - p2)]], [[0, 2 * p], [2 * p, 0]]);
}

function getIconRad(player, blueTeam, redTeam) {
    let pGold = player["totalgold"] - 0;
    let bGold = blueTeam[0]["totalgold"] - 0;
    let rGold = redTeam[0]["totalgold"] - 0;

    return 20 * (pGold / (bGold + rGold));
}
