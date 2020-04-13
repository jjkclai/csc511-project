function loadMapData(targetUnique, isTeam, isPlayer) {
    let target = window.data.filter(d => d["unique"] == targetUnique);

    if(isTeam == 1) {
        visualizeTeam(target);
    }

    if(isPlayer == 1) {
        visualizePlayer(target);
    }
}

function unloadMapData(targetClass) {
    mapSvg.selectAll(".team-object").filter("._" + targetClass).remove();
    mapSvg.selectAll(".player-object").filter("._" + targetClass).remove();
}

function loadTimelineData(targetUnique, targetPos) {
    let target = window.data.filter(d => d["unique"] == targetUnique);

    visualizeTimeline(target, targetPos);
}

function clearTime() {
    timeSvg.selectAll("*").remove();
}

function clearTimeline() {
    timelineSvg.selectAll("*").remove();
}

function clearAll() {
    mapSvg.selectAll("*").remove();
    timeSvg.selectAll("*").remove();

    mapSvg.append("image")
        .attr("xlink:href", "./assets/images/minimap.png")
        .attr("width", "100%")
        .attr("height", "100%");
}
