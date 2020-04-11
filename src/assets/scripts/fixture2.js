var fixture_data;
loadFixtures(7);
//function for year selection
function showFixture(y) {
  console.log("Im trying to load fixtures!");
  switch (year) {
    case 2016:
      loadFixtures(5);
      break;
    case 2017:
      loadFixtures(6);
      break;
    case 2018:
      loadFixtures(7);
      break;
    case 2019:
      loadFixtures(8);
      break;
  }
}

//function for yearly Fixture
function loadFixtures(i) {
 d3.csv("https://raw.githubusercontent.com/jkclai/csc511-project/master/src/assets/csv/Lol_worldChampionship.csv").then(function(rows) {
   window.data=rows;

   fixture_data = {
    "name": data[i].Champion,
     "img":data[i].Champion_flag,
   "score":data[i].Score_Champion,

    "children": [{
    // "name": data[i].Champion,
   "img":data[i].Champion_flag,
   "score":data[i].Score_SemiC,
   "level":"#55AE3A",
   "Stroke_width":"4px",

     "children": [{
      "name": data[i].Champion,
    "img":data[i].Champion_flag,
    "score":data[i].Score_SemiC,
      "level":"#55AE3A",
    "Stroke_width":"4px",


     }, {
     "name": data[i].Semifinal_withC,
    "score":data[i].Score_Semifinal_withC,
    "img":data[i].Semifinal_withC_flag,
    "level":"#8da0cb",
    "Stroke_width":"3px",

     }]

    }, {
    // "name": data[i].Runner_Up,
   "score":data[i].Score_RunnerUp,
   "img":data[i].RunnerUp_flag,
     "level":"#8da0cb",
   "Stroke_width":"3px",

     "children": [{
      "name": data[i].Runner_Up,
    "score":data[i].Score_SemiR,
    "img":data[i].RunnerUp_flag,
    "level":"#55AE3A",
    "Stroke_width":"4px",

     }, {
      "name": data[i].Semifinal_withR,
    "score":data[i].Score_Semifinal_withR,
    "img":data[i].Semifinal_withR_flag,
    "level":"#8da0cb",
    "Stroke_width":"3px",


     }]
    }]

   }
   console.log("The fixture data is:");
   console.log(fixture_data);
   fixture();
 });
}

function fixture(){
	var width = 700;
  var height = 500;

  var tree = d3.tree()
      .size([height, width -250]);

  var diagonal = d3.linkHorizontal()
  .x(function(d) {
    return d.x;
  })
  .y(function(d) {
    return d.y;
  });

  var svg = d3.select("body").append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(40,-40)");

  var root = fixture_data;
  var nodes = d3.hierarchy(root);
      nodes = tree(nodes);
  var links = nodes.descendants().slice(1);

  var link = svg.selectAll(".link")
      .data(links)
      .enter()
      .append("g")
      .attr("class", "link");

  link.append("path")
      .attr("d", diagonal(fixture_data))
      .attr("fill", "none")
      //.style('stroke-width', '3px')
      //.style("stroke", "#8da0cb")
  	.  style("stroke-width", function(d) { return d.target.Stroke_width; })
      .style("stroke", function(d) { return d.target.level; });

  link.append("text")
      .attr("stroke", "red")
      .style("font", "bold 14px Arial")
      .attr("transform", function(d) {
          return "translate(" +
              ((d.source.y + d.target.y)/2) + "," +
              ((d.source.x + d.target.x)/2) + ")";
      })
      .attr("dy", "-0.5em")
      .attr("text-anchor", "middle")
      .text(function(d) {
          console.log(d.target.score);
           return d.target.score;
      });

  var node = svg.selectAll(".node")
      .data(nodes)
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", function (d) {
          return "translate(" + d.y + "," + d.x + ")";
      });

  node.append("circle")
      .attr("r", 30)
      .style("stroke", "#e41a1c");

  	node.append("text")
      .attr("dx", 40)
      .attr("dy", ".35em")
      .text(function(d) { return d.name });

  	// Append images
  	 var images = node.append("svg:image")
  	.attr("xlink:href",  function(d) { return d.img;})
  	.attr("x", function(d) { return -25;})
  	.attr("y", function(d) { return -25;})
  	.attr("height", 50)
  	.attr("width", 50);

     var setEvents = images
            .on( 'click', function (d) {
             //show match details
  		   })

            .on( 'mouseenter', function() {
              // select element in current context
              d3.select( this )
                .transition()
                .attr("x", function(d) { return -35;})
                .attr("y", function(d) { return -35;})
                .attr("height", 80)
                .attr("width", 80);
            })
            // set back
            .on( 'mouseleave', function() {
              d3.select( this )
                .transition()
                .attr("x", function(d) { return -25;})
                .attr("y", function(d) { return -25;})
                .attr("height", 50)
                .attr("width", 50);
            });

}
