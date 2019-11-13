var collegeData = []; 

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
    //TODO: scatterplot setup
}




//main()
loadData();

