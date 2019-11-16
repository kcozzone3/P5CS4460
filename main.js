var collegeData = [];

const width = 600;
const height= 600;

var currGraph = 0;
const lastGraph = 2;

//set currently selected point (linking) to be a number > items in dataset
var currentlySelectedPoint = Number.MAX_SAFE_INTEGER;

const label = {
    'name'          : 'Name',
    'control'       : 'Control',
    'admissionRate' : 'Admission Rate',
    'actMed'        : 'ACT Median',
    'satAvg'        : 'SAT Average',
    'costAvg'       : 'Average Cost',
    'expPerStudent' : 'Expenditure Per Student',
    'debtMed'       : 'Median Debt on Graduation',
    'earningsAvg'   : 'Mean Earnings 8 years After Entry',
    'earningsMed'   : 'Median Earnings 8 years After Entry'
};

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

        graph(0);
    })
}

function graph(num) {
    switch (num) {
        case 0: setupGraph('satAvg', 'actMed');         break;
        case 1: setupGraph('costAvg', 'expPerStudent'); break;  //TODO: graph with same x and y scales, e.g. both [0, 150k]
        case 2: setupGraph('earningsMed', 'debtMed');   break;
        //TODO: add more graph options
        default: break;
    }
}

function setupGraph(x, y) {
    //update labels based on graph params
    document.getElementById("label1").innerHTML = label[x] + ':';
    document.getElementById("label2").innerHTML = label[y] + ':';


    // get the data we care about
    var xExtent = d3.extent(collegeData, function(row) { return row[x]; });
    var yExtent = d3.extent(collegeData, function(row) { return row[y]; });


    // Axis setup
    var xScale = d3.scaleLinear().domain(xExtent).range([50, 570]);
    var yScale = d3.scaleLinear().domain(yExtent).range([570, 30]);

    var xAxis = d3.axisBottom().scale(xScale);
    var yAxis = d3.axisLeft().scale(yScale);

    //Create SVGs for chart
    var scatterplot = d3.select("#scatterplot")
                    .append("svg:svg")
                    .attr("width",width)
                    .attr("height",height);


    // add points
    var points = scatterplot.selectAll("circle")
       .data(collegeData)
       .enter()
       .append("circle")
       .attr("id", function(d,i) {return "p" + i;})
       .attr("class", function(d) {
            if (d.control == "Public") {
                return "public";
            } else {
                return "private";
            }
       })
       .attr("cx", function(d) { return xScale(d[x]); })
       .attr("cy", function(d) { return yScale(d[y]); })
       .attr("r", 5)
       .on("click", function(d,i) {
            if (currentlySelectedPoint < Number.MAX_SAFE_INTEGER) {
                if (collegeData[currentlySelectedPoint]["control"] == "Public") {
                    d3.select("#p" + currentlySelectedPoint).attr("class", "public");
                } else {
                    d3.select("#p" + currentlySelectedPoint).attr("class", "private");
                }
            }
            currentlySelectedPoint = i;
            highlightPoint(d, x, y);
        });


    //retain selection between graphs
    if (currentlySelectedPoint < Number.MAX_SAFE_INTEGER) {
        highlightPoint(collegeData[currentlySelectedPoint], x, y);
    }


    // add axis labels
    scatterplot
        .append("g")
        .attr("transform", "translate(0,"+ (width -30)+ ")")
        .call(xAxis)
        .append("text")
        .attr('fill', 'black')
        .attr("class", "label")
        .attr("x", width-16)
        .attr("y", -6)
        .style("text-anchor", "end")
        .text(label[x]);

    scatterplot
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
        .text(label[y]);
}

function highlightPoint(d, x, y) {
    d3.select("#p" + currentlySelectedPoint).attr("class", "selected");
    updateValues(d, x, y);
}

function updateValues(d, x, y) {
        document.getElementById("college").innerHTML = d.name;
        document.getElementById("type").innerHTML = d.control;
        document.getElementById("val1").innerHTML = d[x];
        document.getElementById("val2").innerHTML = d[y];
}

function nextGraph(curr) {
    clearGraph();

    currGraph++;
    graph(currGraph);

    //disable/enable buttons
    if (currGraph == lastGraph) {
        document.getElementById("next").disabled = true;
    } else {
        document.getElementById("next").disabled = false;
    }
    document.getElementById("prev").disabled = false;
}

function prevGraph(curr) {
    clearGraph();

    currGraph--;
    graph(currGraph);

    //disable/enable buttons
    if (currGraph == 0) {
        document.getElementById("prev").disabled = true;
    } else {
        document.getElementById("prev").disabled = false;
    }
    document.getElementById("next").disabled = false;
}

function clearGraph() {
    //clear graph
    document.getElementById("scatterplot").innerHTML = "";

    //clear labels
    document.getElementById("label1").innerHTML = "";
    document.getElementById("val1").innerHTML = "";
    document.getElementById("label2").innerHTML = "";
    document.getElementById("val2").innerHTML = "";
}


//main()
loadData();

