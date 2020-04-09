let year = 2019;
let data = d3.csv("https://raw.githubusercontent.com/jkclai/csc511-project/master/src/assets/csv/"+year+"-worlds.csv");
let games = [];
let uniqueId = [... new Set(games)];

d3.select("input#load")
  .on("click", function() {
    loadGames();
});

function loadGames(){
  while (games.length > 0){
    games.pop();
  }
  for (var i = 0; i < data.length; i++) {
    if (data[i].week == "QF" || data[i].week == "SF" || data[i].week == "F"){
      var newGameid = data[i].gameid;
      games.push(newGameid);
    }
   }
  console.log(games);
}
