window.addEventListener('load',init);

function init(){
	runChart();
	document.getElementById('displaygraph').classList.toggle('active');
	//showMap();
}


//function init(){
function runChart(){
	$.ajax({
	    url: 'data/mydata.json',
	    type: 'GET',
	    failure: function(err){
	    	console.log ("Could not get the data");
	    	return alert("Something went wrong");
	    },
	    success: function(data) {
	    	console.log(data);
	    	setChartDefaults();
	    	buildDoughnutChart(data);
	    	buildBarChart(data);
	    	//buildLineChart(data);
	    	buildPolarChart();
	    	buildRadarChart();
	    }
	});
}

// set default options for ALL charts
// see 
function setChartDefaults(){
	// make it responsive
	Chart.defaults.global.responsive = true;
	// set the font color
	Chart.defaults.global.defaultFontColor = '#222';
	// set the font family
	Chart.defaults.global.defaultFontFamily = "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif";
}


function buildDoughnutChart(data){

	var data = {
	    labels: [
	    	"Repeated",
	        "Singular",
	        
	    ],
	    datasets: [
	        {
	            data: [data.overall.repeated , data.overall.singular],
	            backgroundColor: [
	                "#68d7c5",
	                "#fc625d",
	            ],
	            hoverBackgroundColor: [
	                "#b3e5d6",
	                "#f64c63",
	            ],
	            borderColor:[
	            "#f1f1f1",
	            "#f1f1f1",
	            ]
	        }]
	};

	// create chart options (this is optional)
	// see list of options:
	// http://www.chartjs.org/docs/#doughnut-pie-chart-chart-options
	var options = {
		scaleShowVerticalLines: false,
		segmentShowStroke: false,
	    animateRotate: true,
	    animateScale: false,
	    percentageInnerCutout: 50,
		legend: {
			display: false,
			position: 'bottom',
			labels: {
				fontColor: '#222',
				boxWidth: 12.5,
				padding: 20
			},
		},
    tooltips: {
        backgroundColor: '#222',
    },		
    animation:{
        animateScale:false
    }
	} 

	// first, get the context of the canvas where we're drawing the chart
	var ctx = document.getElementById("doughnutChart").getContext("2d");
	
	// now, create the doughnut chart, passing in:
	// 1. the type (required)
	// 2. the data (required)
	// 3. chart options (optional)
	var myDoughnutChart = new Chart(ctx,{
	    type: 'doughnut',
	    data: data,
	    options: options
	});	

	document.getElementById('js-legend').innerHTML = myDoughnutChart.generateLegend();	
}

// see http://www.chartjs.org/docs/#bar-chart-introduction
function buildBarChart(data){

	// first, let's prepare the data
	// let's pull out the labels we need; i.e. the place names
	var labelsArray = [];
	data.placefeeling.forEach(function(e){
		labelsArray.push(e.place)
	});

	//let's pull out the frustrated stats we need
	var frustratedArray = [];
	data.placefeeling.forEach(function(e){
		frustratedArray.push(e.frustrated);
	})

	//let's pull out the content stats we need
	var contentArray = [];
	data.placefeeling.forEach(function(e){
		contentArray.push(e.content);
	})

	// now, let's make the chart
	// a chart can take 2 objects:
	// 1. data - the data/information (required)
	// 2. options - chart options (optional)
	var data = {
	    // chart labels
	    labels: labelsArray,
	    // array of datasets to plot
	    // could be only 1 if there's just 1 dataset
	    datasets: [
	        {
	            label: "Content",
	            backgroundColor: "#7d4d76",
	            data: frustratedArray
	        },
	        {
	            label: "Frustrated",
	            backgroundColor: "#fc625d",
	            data: contentArray
	        }
	    ]
	};

	// create chart options (this is optional)
	// see list of options:
	// http://www.chartjs.org/docs/#bar-chart-chart-options
	var options = {
			// scaleShowLabels : false,
            scales: {
                yAxes: [{
                	display: false,
                    gridLines: {
                        lineWidth: 0,
                        color: "rgba(0,0,0,0)"
                    }
                }],
                xAxes: [{
                    gridLines: {
                        lineWidth: 0,
                        color: "rgba(255,255,255,0)"
                    }
                }],
            },
		legend: {
			position: 'bottom',
			labels: {
				fontColor: '#222',
				boxWidth: 12.5,
				padding: 20
			},
		},
    tooltips: {
        backgroundColor: '#222',
    },
	} 

	// first, get the context of the canvas where we're drawing the chart
	var ctx = document.getElementById("barChart").getContext("2d");
	
	// now, create the bar chart, passing in:
	// 1. the type (required)
	// 2. the data (required)
	// 3. chart options (optional)
	var myBarChart = new Chart(ctx, {
	    type: 'bar',
	    // type: 'horizontalBar', // horizontal bards
	    data: data,
	    options: options
	});	
}

function buildPolarChart(data){

	var data = {
	    datasets: [{
	        data: [
	            4,
	            9,
	            8,
	            6,
	            3
	        ],
	        backgroundColor: [
	            "#68d7c5",
	            "#fc625d",
	            "#64404c",
	            "#7d4d76",
	            "#fdab52"
	        ],
	        label: 'My dataset' // for legend
	    }],
	    labels: [
	    	"Very Much",
	        "Yes",
	        "Sure",
	        "Of Course",
	        "Something Like That"
	    ]
	};

	var ctx = document.getElementById("polarArea").getContext("2d");

	var myPolarChart = new Chart(ctx, {
	data: data,
    type: "polarArea",
    options: {
    	showScale: false,

    	scales: {
    		drawOnChartArea: false,
    		display: false,
    		scaleShowLabels : false,
                yAxes: [{
                	display: false,
                    gridLines: {
                        lineWidth: 0,
                        color: "rgba(255,255,255,0)"
                    }
                }],
                xAxes: [{
                	display: false,
                    gridLines: {
                        lineWidth: 0,
                        color: "rgba(255,255,255,0)"
                    }
                }],
            },
    	legend: {
			display: false,
			position: 'bottom',
			labels: {
				fontColor: '#222',
				boxWidth: 12.5,
				padding: 20
			},
		},
    // tooltips: {
    //     callbacks: {
    //        label: function(tooltipItem) {
    //               return tooltipItem.yLabel;
    //        }
    //     }
    // },
        elements: {
            arc: {
                borderColor: "#f1f1f1"
	            }
	        },

	    }	});
	document.getElementById('rd-legend').innerHTML = myPolarChart.generateLegend();
}

function buildRadarChart(data){

	var data = {
    labels: ["Very Much", "Sure", "Barely", "Not Sure"],
    datasets: [
        {
            label: "Worthy?",
            backgroundColor: "rgba(	104, 215, 197,0.5)",
            borderColor: "rgba(	104, 215, 197,1)",
            pointBackgroundColor: "rgba(104, 215, 197,1)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba( 104, 215, 197,1)",
            data: [5, 8, 3, 9]
        },
        {
            label: "Doubt?",
            backgroundColor: "rgba(125,77,118,0.4)",
            borderColor: "rgba(125,77,118,1)",
            pointBackgroundColor: "rgba(125,77,118,1)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(125,77,118,1)",
            data: [6, 7, 7, 3]
        }
    ]
};

	var ctx = document.getElementById("radarChart").getContext("2d");

	var myRadarChart = new Chart(ctx, {
    type: "radar",
    data: data,
    fill: false,
    options: {
    	scaleShowLabels : false,
    	scales: {
            yAxes: [{
            	display: false,
                gridLines: {
                    lineWidth: 0,
                    color: "rgba(255,255,255,0)"
                }
            }],
            xAxes: [{
            	display: false,
                gridLines: {
                    lineWidth: 0,
                    color: "rgba(255,255,255,0)"
                }
            }],
        },
		legend: {
		//display: false,
		position: 'bottom',
		labels: {
			fontColor: '#222',
			boxWidth: 12.5,
			padding: 20
		},
		},
    		backgroundColor: "transparent",
            scale: {

                reverse: false,
                ticks: {
                    beginAtZero: true
                }
            }
    }
	});
}