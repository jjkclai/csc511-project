function visualizeTeam(data) {
    let blueTeam = data.filter(d => d["side"] == "Blue");
    let redTeam = data.filter(d => d["side"] == "Red");

    mapSvg.append("text")
        .attr("id", blueTeam[0]["unique"] + "-" + "blue")
        .attr("class", "team-text heavy-font team-object _" + blueTeam[0]["unique"])
        .attr("x", "15%")
        .attr("y", "85%")
        .attr("fill", "blue")
        .attr("dominant-baseline", "middle")
        .attr("text-anchor", "middle")
        .text(blueTeam[0]["team"]);
    
    mapSvg.append("text")
        .attr("id", redTeam[0]["unique"] + "-" + "red")
        .attr("class", "team-text heavy-font team-object _" + redTeam[0]["unique"])
        .attr("x", "85%")
        .attr("y", "15%")
        .attr("fill", "red")
        .attr("dominant-baseline", "middle")
        .attr("text-anchor", "middle")
        .text(redTeam[0]["team"]);
}