var collegeData = [];
var width = 500;
var height= 500;

function loadData() {
    d3.csv("colleges.csv", function(csv) {
        //loads into collegeData[]
        csv.forEach(function(d) {
            collegeData.push({
                name:           String(d['Name']),
                control:        String(d['Control']),
                admissionRate:  Number(d['Admission Rate']),
                actMed:         Number(d['ACT Median']),
                satAvg:         Number(d['SAT Average']),
                costAvg:        Number(d['Average Cost']),
                expPerStudent:  Number(d['Expenditure Per Student']),
                debtMed:        Number(d['Median Debt on Graduation']),
                earningsAvg:    Number(d['Mean Earnings 8 years After Entry']),
                earningsMed:    Number(d['Median Earnings 8 years After Entry'])
            })
        })

        setup();
    })
}

function setup() {
    // get the data we care about
    var satAvg = d3.extent(collegeData, function(row) { return row.satAvg; });
    var actMed = d3.extent(collegeData, function(row) { return row.actMed; });


    // Axis setup
    var xScale = d3.scaleLinear().domain(satAvg).range([50, 470]);
    var yScale = d3.scaleLinear().domain(actMed).range([470, 30]);

    var xAxis = d3.axisBottom().scale(xScale);
    var yAxis = d3.axisLeft().scale(yScale);

    var xScale2 = d3.scaleLinear().domain(satAvg).range([50, 470]);
    var yScale2 = d3.scaleLinear().domain(actMed).range([470, 30]);

    var xAxis2 = d3.axisBottom().scale(xScale2);
    var yAxis2 = d3.axisLeft().scale(yScale2);

    //Create SVGs for charts
    var leftScatterplot = d3.select("#scatterplot1")
                    .append("svg:svg")
                    .attr("width",width)
                    .attr("height",height);

    var rightScatterplot = d3.select("#scatterplot2")
                    .append("svg:svg")
                    .attr("width",width)
                    .attr("height",height);


    // add points
    var leftPoints = leftScatterplot.selectAll("circle")
       .data(collegeData)
       .enter()
       .append("circle")
       .attr("class", function(d) {
            if (d.control == "Public") {
                return "public";
            } else {
                return "private";
            }
       })
       .attr("cx", function(d) { return xScale(d.satAvg); })
       .attr("cy", function(d) { return yScale(d.actMed); })
       .attr("r", 5);

    var rightPoints = rightScatterplot.selectAll("circle")
       .data(collegeData)
       .enter()
       .append("circle")
       .attr("class", function(d) {
            if (d.control == "Public") {
                return "public";
            } else {
                return "private";
            }
       })
       .attr("cx", function(d) { return xScale(d.satAvg); })
       .attr("cy", function(d) { return yScale(d.actMed); })
       .attr("r", 5);

    // add axis labels
    leftScatterplot
        .append("g")
        .attr("transform", "translate(0,"+ (width -30)+ ")")
        .call(xAxis)
        .append("text")
        .attr('fill', 'black')
        .attr("class", "label")
        .attr("x", width-16)
        .attr("y", -6)
        .style("text-anchor", "end")
        .text("SAT Average");

    leftScatterplot
        .append("g")
        .attr("transform", "translate(50, 0)")
        .call(yAxis)
        .append("text")
        .attr('fill', 'black')
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("ACT Median");

    rightScatterplot
        .append("g")
        .attr("transform", "translate(0,"+ (width -30)+ ")")
        .call(xAxis)
        .append("text")
        .attr('fill', 'black')
        .attr("class", "label")
        .attr("x", width-16)
        .attr("y", -6)
        .style("text-anchor", "end")
        .text("SAT Average");

    rightScatterplot
        .append("g")
        .attr("transform", "translate(50, 0)")
        .call(yAxis)
        .append("text")
        .attr('fill', 'black')
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("ACT Median");


}




//main()
loadData();

