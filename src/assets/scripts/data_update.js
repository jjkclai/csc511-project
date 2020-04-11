let years = [2016,2017,2018,2019];
let year = 2016;

d3.csv("https://raw.githubusercontent.com/jkclai/csc511-project/master/src/assets/csv/"+year+"-worlds.csv").then(function(rows) {
    window.data=rows;
});

function updateData(y) {
  d3.csv("https://raw.githubusercontent.com/jkclai/csc511-project/master/src/assets/csv/"+y+"-worlds.csv").then(function(rows) {
      window.data=rows;
  });
}

/// Slider

var sliderStep = d3
  .sliderBottom()
  .min(d3.min(years))
  .max(d3.max(years))
  .width(500)
  .tickFormat(d3.format('0'))
  .ticks(3)
  .step(1)
  .default(year)
  .on('onchange', val => {
    d3.select('p#value-step').text(val);
    year = val;
    console.log(year);
    updateData(year);
  });

var gStep = d3
  .select('div#slider-step')
  .append('svg')
  .attr('width', 600)
  .attr('height', 100)
  .append('g')
  .attr('transform', 'translate(30,30)');

gStep.call(sliderStep);

d3.select('p#value-step').text(sliderStep.value());
