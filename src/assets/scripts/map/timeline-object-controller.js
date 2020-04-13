function visualizeTimeline(data, targetPos) {
    let blueTeam = data.filter(d => d["playerid"] == 100)[0];
    let redTeam = data.filter(d => d["playerid"] == 200)[0];

    let bluePlayer;
    let redPlayer;

    switch(targetPos) {
        case 1:
            bluePlayer = data.filter(d => d["playerid"] == 1)[0];
            redPlayer = data.filter(d => d["playerid"] == 6)[0];
            break;

        case 2:
            bluePlayer = data.filter(d => d["playerid"] == 2)[0];
            redPlayer = data.filter(d => d["playerid"] == 7)[0];
            break;

        case 3:
            bluePlayer = data.filter(d => d["playerid"] == 3)[0];
            redPlayer = data.filter(d => d["playerid"] == 8)[0];
            break;

        case 4:
            bluePlayer = data.filter(d => d["playerid"] == 4)[0];
            redPlayer = data.filter(d => d["playerid"] == 9)[0];
            break;

        case 0:
            bluePlayer = data.filter(d => d["playerid"] == 5)[0];
            redPlayer = data.filter(d => d["playerid"] == 10)[0];
            break;

        default:
            bluePlayer = blueTeam;
            redPlayer = redTeam;
            break;
    }

    let width = timelineSvg.style("width").replace("px", "");
    let height = timelineSvg.style("height").replace("px", "");

    let marginBlue = {top: height * 0.50, right: width * 0, bottom: height * 0, left: width * 0};
    let marginRed = {top: height * 0, right: width * 0, bottom: height * 0.50, left: width * 0};

    let widthBlue = width - marginBlue.right - marginBlue.left;
    let heightBlue = height - marginBlue.top - marginBlue.bottom;

    let widthRed = width - marginRed.right - marginRed.left;
    let heightRed = height - marginRed.top - marginRed.bottom;

    let xScale = d3.scaleLinear()
        .range([width * 0.10, width * 0.90])
        .domain([0, blueTeam["gamelength"]]);

    let xAxis = d3.axisBottom(xScale);

    timelineSvg.append("g")
        .attr("class", "x-axis")
        .attr("transform", "translate(" + 0 + ", " + (height / 2) + ")")
        .call(xAxis);

    let svgBlue = timelineSvg.append("g")
        .attr("class", "blue")
        .attr("transform", "translate(" + marginBlue.left + ", " + marginBlue.top + ")");

    svgBlue.append("rect")
        .style("opacity", 0.3)
        .style("fill", "blue")
        .attr("width", "100%")
        .attr("height", "50%");
    
    let svgRed = timelineSvg.append("g")
        .attr("class", "red")
        .attr("transform", "translate(" + marginRed.left + ", " + marginRed.top + ")");

    svgRed.append("rect")
        .style("opacity", 0.3)
        .style("fill", "red")
        .attr("width", "100%")
        .attr("height", "50%");
    
    svgBlue.append("text")
        .attr("x", "10%")
        .attr("y", "40%")
        .attr("fill", "blue")
        .attr("dominant-baseline", "middle")
        .attr("text-anchor", "left")
        .text(blueTeam["team"]);
    
    svgRed.append("text")
        .attr("x", "10%")
        .attr("y", "10%")
        .attr("fill", "red")
        .attr("dominant-baseline", "middle")
        .attr("text-anchor", "left")
        .text(redTeam["team"]);

    if(bluePlayer["fd"] == "1") {
        svgBlue.append("image")
            .attr("xlink:href", "./assets/images/First_DrakeSquare.png")
            .style("opacity", timelineObjectOpacity)
            .attr("x", xScale(blueTeam["fdtime"]))
            .attr("y", heightBlue / 2)
            .attr("width", height * 0.15)
            .attr("height", height * 0.15)
    }
    else if(redPlayer["fd"] == "1") {
        svgRed.append("image")
            .attr("xlink:href", "./assets/images/First_DrakeSquare.png")
            .style("opacity", timelineObjectOpacity)
            .attr("x", xScale(redTeam["fdtime"]))
            .attr("y", heightRed / 4)
            .attr("width", height * 0.15)
            .attr("height", height * 0.15)
    }

    if(bluePlayer["fb"] == "1") {
        svgBlue.append("image")
            .attr("xlink:href", "./assets/images/First_BloodSquare.png")
            .style("opacity", timelineObjectOpacity)
            .attr("x", xScale(blueTeam["fbtime"]))
            .attr("y", heightBlue / 2)
            .attr("width", height * 0.15)
            .attr("height", height * 0.15)
    }
    else if(redPlayer["fb"] == "1") {
        svgRed.append("image")
            .attr("xlink:href", "./assets/images/First_BloodSquare.png")
            .style("opacity", timelineObjectOpacity)
            .attr("x", xScale(redTeam["fbtime"]))
            .attr("y", heightRed / 4)
            .attr("width", height * 0.15)
            .attr("height", height * 0.15)
    }

    if(bluePlayer["ft"] == "1") {
        svgBlue.append("image")
            .attr("xlink:href", "./assets/images/First_TurretSquare.png")
            .style("opacity", timelineObjectOpacity)
            .attr("x", xScale(blueTeam["fttime"]))
            .attr("y", heightBlue / 2)
            .attr("width", height * 0.15)
            .attr("height", height * 0.15)
    }
    else if(redPlayer["ft"] == "1") {
        svgRed.append("image")
            .attr("xlink:href", "./assets/images/First_TurretSquare.png")
            .style("opacity", timelineObjectOpacity)
            .attr("x", xScale(redTeam["fttime"]))
            .attr("y", heightRed / 4)
            .attr("width", height * 0.15)
            .attr("height", height * 0.15)
    }

    if(bluePlayer["fbaron"] == "1") {
        svgBlue.append("image")
            .attr("xlink:href", "./assets/images/First_BaronSquare.png")
            .style("opacity", timelineObjectOpacity)
            .attr("x", xScale(blueTeam["fbarontime"]))
            .attr("y", heightBlue / 2)
            .attr("width", height * 0.15)
            .attr("height", height * 0.15)
    }
    else if(redPlayer["fbaron"] == "1") {
        svgRed.append("image")
            .attr("xlink:href", "./assets/images/First_BaronSquare.png")
            .style("opacity", timelineObjectOpacity)
            .attr("x", xScale(redTeam["fbarontime"]))
            .attr("y", heightRed / 4)
            .attr("width", height * 0.15)
            .attr("height", height * 0.15)
    }

    if(bluePlayer["herald"] == "1") {
        svgBlue.append("image")
            .attr("xlink:href", "./assets/images/First_HeraldSquare.png")
            .style("opacity", timelineObjectOpacity)
            .attr("x", xScale(blueTeam["heraldtime"]))
            .attr("y", heightBlue / 2)
            .attr("width", height * 0.15)
            .attr("height", height * 0.15)
    }
    else if(redPlayer["herald"] == "1") {
        svgRed.append("image")
            .attr("xlink:href", "./assets/images/First_HeraldSquare.png")
            .style("opacity", timelineObjectOpacity)
            .attr("x", xScale(redTeam["heraldtime"]))
            .attr("y", heightRed / 4)
            .attr("width", height * 0.15)
            .attr("height", height * 0.15)
    }

    goldDifference = [];
    goldDifference.push({"time": "0", "value": "0"});
    goldDifference.push({"time": "10", "value": bluePlayer["gdat10"]});
    goldDifference.push({"time": "15", "value": bluePlayer["gdat15"]});
    goldDifference.push({"time": blueTeam["gamelength"], "value": (bluePlayer["totalgold"] - redPlayer["totalgold"]).toString()})

    let scaleGoldDifference = d3.scaleLinear()
        .range([height * 0.90, height * 0.10])
        .domain([5000, -5000]);

    let yAxisGoldDifference = d3.axisLeft(scaleGoldDifference);

    timelineSvg.append("g")
        .attr("class", "y-axis-gold-difference")
        .attr("transform", "translate(" + width * 0.09 + ", " + 0 + ")")
        .call(yAxisGoldDifference);

    let lineGoldDifference = d3.line()
        .x(function(d) {
            return xScale(d["time"]);
        })
        .y(function(d) {
            return scaleGoldDifference(d["value"]);
        });
    
    timelineSvg.append("path")
        .datum(goldDifference)
        .style("fill", "none")
        .style("stroke", "yellow")
        .style("stroke-width", "2")
        .attr("d", lineGoldDifference);
    
    csDifference = [];
    csDifference.push({"time": "0", "value": "0"});
    csDifference.push({"time": "10", "value": bluePlayer["csdat10"]});
    csDifference.push({"time": "15", "value": bluePlayer["csdat15"]});
    csDifference.push({"time": blueTeam["gamelength"], "value": (bluePlayer["cspm"] * blueTeam["gamelength"] - redPlayer["cspm"] * blueTeam["gamelength"]).toString()})

    let scaleCsDifference = d3.scaleLinear()
        .range([height * 0.90, height * 0.10])
        .domain([100, -100]);
    
    let yAxisCsDifference = d3.axisRight(scaleCsDifference);

    timelineSvg.append("g")
        .attr("class", "y-axis-cs-difference")
        .attr("transform", "translate(" + width * 0.91 + ", " + 0 + ")")
        .call(yAxisCsDifference);

    let lineCsDifference = d3.line()
        .x(function(d) {
            return xScale(d["time"]);
        })
        .y(function(d) {
            return scaleCsDifference(d["value"]);
        });
    
    timelineSvg.append("path")
        .datum(csDifference)
        .style("fill", "none")
        .style("stroke", "purple")
        .style("stroke-width", "2")
        .attr("d", lineCsDifference);
}