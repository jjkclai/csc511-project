function gridUpdate(side) {
    if(d3.select("input#grid-checkbox-" + side).property("checked")){
        showGrid(side);
    } else {
        hideGrid(side);
    }
}

function showGrid(side) {
    let targetP1 = ["14%", "32%", "50%", "68%", "86%"];
    let targetX2 = (side == "b") ? "0%" : "100%";
    let targetY2 = (side == "b") ? "100%" : "0%";

    targetP1.forEach(function(item, index) {
        mapSvg.append("line")
            .attr("class", "map-grid-" + side + " dashed-line")
            .attr("x1", item)
            .attr("y1", item)
            .attr("x2", targetX2)
            .attr("y2", targetY2)
            .attr("stroke-width", 5)
            .attr("stroke", "white");
    });
}

function hideGrid(side) {
    d3.selectAll("line.map-grid-" + side).remove();
}