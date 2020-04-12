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
  d3.select('#svg_fixture').remove();

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

function fixture() {

 // set the dimensions and margins of the diagram
 //var margin = {top: 20, right: 90, bottom: 30, left: 90},
 var width = 700,
  height = 500;

 // declares a tree layout and assigns the size
 var treemap = d3.tree()
  .size([height, width - 250]);

 //  assigns the data to a hierarchy using parent-child relationships
 var nodes = d3.hierarchy(fixture_data, function(d) {
  return d.children;
 });

 // maps the node data to the tree layout
 nodes = treemap(nodes);

 // append the svg object to the body of the page
 // appends a 'group' element to 'svg'
 // moves the 'group' element to the top left margin
 var svg = d3.select("body").append("svg")
  .attr("id", "svg_fixture")
  .attr("width", width)
  .attr("height", height)
 g = svg.append("g")
  .attr("transform", "translate(40,-40)");

 // adds the links between the nodes

 var link = g.selectAll(".link")
  .data(nodes.descendants().slice(1))
  .enter()
  .append("g")
  .attr("class", "link");

 link.append("path")
  .attr("fill", "none")
  .style("stroke-width", function(d) {
   return d.data.Stroke_width;
  })
  .style("stroke", function(d) {
   return d.data.level;
  })
  .attr("d", function(d) {
   return "M" + d.y + "," + d.x +
    "C" + (d.y + d.parent.y) / 2 + "," + d.x +
    " " + (d.y + d.parent.y) / 2 + "," + d.parent.x +
    " " + d.parent.y + "," + d.parent.x;
  });

 //text to link
 link.append("text")
  .attr("stroke", "red")
  .style("font", "bold 14px Arial")
  .attr("transform", function(d) {
   return "translate(" +
    ((d.y + d.parent.y) / 2) + "," +
    ((d.x + d.parent.x) / 2) + ")";
  })
  .attr("dy", "-0.5em")
  .attr("text-anchor", "middle")
  .text(function(d) {
   //console.log(d.parent.data.score);
   return d.data.score;
  });

 // adds each node as a group
 var node = g.selectAll(".node")
  .data(nodes.descendants())
  .enter().append("g")
  .attr("class", function(d) {
   return "node" +
    (d.children ? " node--internal" : " node--leaf");
  })
  .attr("transform", function(d) {
   return "translate(" + d.y + "," + d.x + ")";
  });

 //add node circle
 node.append("circle")
  .attr("r", 30)
  .style("stroke", "#e41a1c");

 //add text to the node
 node.append("text")
  .attr("dx", 40)
  .attr("dy", ".35em")
  .text(function(d) {
   return d.data.name;
  });

 // Append images
 var images = node.append("svg:image")
  .attr("xlink:href", function(d) {
   return d.data.img;
  })
  .attr("x", function(d) {
   return -25;
  })
  .attr("y", function(d) {
   return -25;
  })
  .attr("height", 50)
  .attr("width", 50);

 var setEvents = images
  .on('click', function(d) {
   //show match details
  })

  .on('mouseenter', function() {
   // select element in current context
   d3.select(this)
    .transition()
    .attr("x", function(d) {
     return -35;
    })
    .attr("y", function(d) {
     return -35;
    })
    .attr("height", 80)
    .attr("width", 80);
  })
  // set back
  .on('mouseleave', function() {
   d3.select(this)
    .transition()
    .attr("x", function(d) {
     return -25;
    })
    .attr("y", function(d) {
     return -25;
    })
    .attr("height", 50)
    .attr("width", 50);
  });
}
