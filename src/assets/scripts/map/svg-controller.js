function loadMapData(targetId, isTeam, isPlayer) {
    let target = window.data.filter(d => d["gameid"] == targetId);

    if(isTeam == 1) {
        visualizeTeam(target);
    }

    if(isPlayer == 1) {
        visualizePlayer(target);
    }
}

function unloadMapData(targetId) {
    mapSvg.selectAll(".team-object").filter("._" + targetId).remove();
    mapSvg.selectAll(".player-object").filter("._" + targetId).remove();
}

function clearTime() {
    timeSvg.selectAll("*").remove();
}

function clearAll() {
    mapSvg.selectAll("*").remove();
    timeSvg.selectAll("*").remove();

    mapSvg.append("image")
        .attr("xlink:href", "./assets/images/minimap.png")
        .attr("width", "100%")
        .attr("height", "100%");
}
