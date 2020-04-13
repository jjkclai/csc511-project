var fixture_data;
loadFixtures(8);

//function for year selection
function year_click(clicked_id) {
 d3.select("svg").remove();
 //alert(clicked_id);
 switch (clicked_id) {
  case 'year2019':
   loadFixtures(8);
   break;
  case 'year2018':
   loadFixtures(7);
   break;
  case 'year2017':
   loadFixtures(6);
   break;
  case 'year2016':
   loadFixtures(5);
   break;
  case 'year2015':
   loadFixtures(4);
   break;
  case 'year2014':
   loadFixtures(3);
   break;
  case 'year2013':
   loadFixtures(2);
   break;
  case 'year2012':
   loadFixtures(1);
   break;
  case 'year2011':
   loadFixtures(0);
   break;
  default:
   text = "No results";
 }
}

//function for yearly Fixture 
function loadFixtures(i) {
 //console.log(i);

 d3.csv("https://raw.githubusercontent.com/jkclai/csc511-project/master/src/assets/csv/Lol_worldChampionshipMain.csv").then(function(data) {
  //console.log(data[8].Q_R2_R_flag); 
  fixture_data = {
   "name": data[i].Champion,
   "img": data[i].Champion_flag,
   "score": data[i].Score_Champion,
   "level": "A",
   "matchDate":data[i].final_Date,

   "children": [{
     "name": data[i].Champion,
    "img": data[i].Champion_flag,
    "score": data[i].Score_SemiC,
    "stroke_color": "#55AE3A",
    "Stroke_width": "4px",
	"level": "B1",
	"matchDate":data[i].semifinal_Date_C,

    "children": [{
     "name": data[i].Champion,
     "img": data[i].Champion_flag,
     "score": data[i].Score_SemiC,
     "stroke_color": "#55AE3A",
     "Stroke_width": "4px",
	 "level": "C1",
	 "matchDate":data[i].Q_R1_date,
	 
      "children": [{
	"name": data[i].Q_R1_C,
     "img": data[i].Q_R1_C_flag,
     "score": data[i].Q_R1_C_Score,
     "stroke_color": "#55AE3A",
     "Stroke_width": "4px",
	  },{
	 "name": data[i].Q_R1_R,
     "img": data[i].Q_R1_R_flag,
     "score": data[i].Q_R1_R_Score,
	 "stroke_color": "#8da0cb",
     "Stroke_width": "3px",
	  }]

    }, {
     "name": data[i].Semifinal_withC,
     "score": data[i].Score_Semifinal_withC,
     "img": data[i].Semifinal_withC_flag,
     "stroke_color": "#8da0cb",
     "Stroke_width": "3px",
	 "level": "C2",
	 "matchDate":data[i].Q_R2_date,

	"children": [{
	"name": data[i].Q_R2_C,
     "img": data[i].Q_R2_C_flag,
     "score": data[i].Q_R2_C_Score,
     "stroke_color": "#55AE3A",
     "Stroke_width": "4px",
	  },{
	 "name": data[i].Q_R2_R,
     "img": data[i].Q_R2_R_flag,
     "score": data[i].Q_R2_R_Score,
	 "stroke_color": "#8da0cb",
     "Stroke_width": "3px",
	  }]

    }]

   }, {
    "name": data[i].Runner_Up,
    "score": data[i].Score_RunnerUp,
    "img": data[i].RunnerUp_flag,
    "stroke_color": "#8da0cb",
    "Stroke_width": "3px",
	"level": "B2",
	"matchDate":data[i].semifinal_Date_R,


    "children": [{
     "name": data[i].Runner_Up,
     "score": data[i].Score_SemiR,
     "img": data[i].RunnerUp_flag,
     "stroke_color": "#55AE3A",
     "Stroke_width": "4px",
	 "level": "C3",
	 "matchDate":data[i].Q_R3_date,
	 
	 "children": [{
	"name": data[i].Q_R3_C,
     "img": data[i].Q_R3_C_flag,
     "score": data[i].Q_R3_C_Score,
     "stroke_color": "#55AE3A",
     "Stroke_width": "4px",
	  },{
	 "name": data[i].Q_R3_R,
     "img": data[i].Q_R3_R_flag,
     "score": data[i].Q_R3_R_Score,
	 "stroke_color": "#8da0cb",
     "Stroke_width": "3px",
	  }]

    }, {
     "name": data[i].Semifinal_withR,
     "score": data[i].Score_Semifinal_withR,
     "img": data[i].Semifinal_withR_flag,
     "stroke_color": "#8da0cb",
     "Stroke_width": "3px",
	 "level": "C4",
	 "matchDate":data[i].Q_R4_date,

	 
	       "children": [{
	"name": data[i].Q_R4_C,
     "img": data[i].Q_R4_C_flag,
     "score": data[i].Q_R4_C_Score,
     "stroke_color": "#55AE3A",
     "Stroke_width": "4px",
	  },{
	 "name": data[i].Q_R4_R,
     "img": data[i].Q_R4_R_flag,
     "score": data[i].Q_R4_R_Score,
	 "stroke_color": "#8da0cb",
     "Stroke_width": "3px",
	  }]


    }]
   }]

  }

  fixture();
 })
}

function fixture() {

 // set the dimensions and margins of the diagram
 //var margin = {top: 20, right: 90, bottom: 30, left: 90},
 var width = 900,
  height = 580;

 // declares a tree layout and assigns the size
 var treemap = d3.tree()
  .size([height, width - 200]);

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
  .attr("width", width)
  .attr("height", height)
 g = svg.append("g")
  .attr("transform", "translate(40,-27)");


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
   return d.data.stroke_color;
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
  .attr("r", 20)
  .style("stroke", "#e41a1c");

 //add text to the node
 node.append("text")
  .attr("dx", 40)
  .attr("dy", ".35em")
  .text(function(d) {
	  if(d.data.level!="B1" && d.data.level!="B2" && d.data.level!="C1" && d.data.level!="C2"&& d.data.level!="C3"&& d.data.level!="C4" ){
   return d.data.name;
	  }
  });

 // Append images
 var images = node.append("svg:image")
  .attr("xlink:href", function(d) {
   return d.data.img;
  })
  .attr("x", function(d) {
   return -18;
  })
  .attr("y", function(d) {
   return -18;
  })
  .attr("height", 36)
  .attr("width", 36);

 var setEvents = images
  .on('click', function(d) {
	 var team = d.data.name.split(" ")[0];
	 var date = new Date(d.data.matchDate).toDateString().replace(/\s+/g, "-");
   localStorage.setItem("query", "team: " + team + " && " + "date: " + date);

   window.open("./map.html", "_self");
  })

  .on('mouseenter', function() {
   // select element in current context
   d3.select(this)
    .transition()
    .attr("x", function(d) {
     return -30;
    })
    .attr("y", function(d) {
     return -30;
    })
    .attr("height", 60)
    .attr("width", 60);
  })
  // set back
  .on('mouseleave', function() {
   d3.select(this)
    .transition()
    .attr("x", function(d) {
     return -18;
    })
    .attr("y", function(d) {
     return -18;
    })
    .attr("height", 36)
    .attr("width", 36);
  });

}


