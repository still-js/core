'use strict';
$(function () {
    initCharts();
    initAvgChart();
    initGaugeChart();
    floatchart();
    
    $('#chat-conversation').slimscroll({
		  height: '240px',
		  size: '5px'
		});
		$('.recent-comment').slimscroll({
		  height: '380px',
		  size: '5px'
		});
		
});
//Charts
function initCharts() {
    $('.chart.chart-bar2').sparkline(undefined, {
        type: 'bar',
        barColor: '#54B253',
        negBarColor: '#000',
        barWidth: '5px',
        height: '67px'
    });
}

function initAvgChart() {

var chart = document.getElementById('echart_sonar');
    var sonarChart = echarts.init(chart);

    sonarChart.setOption({
        height:'130px',
        tooltip : {
            trigger: 'axis'
        },
        legend: {
            data:['Type A','Type B']
        },
        calculable : true,
        xAxis : [
            {
                type : 'category',
                boundaryGap : false,
                data : ['2001','2002','2003','2004','2005','2006','2007'],
                 axisLabel : {
                    color: '#bdb5b5'
                }
            }
        ],
        yAxis : [
            {
                type : 'value',
                axisLabel : {
                    color: '#bdb5b5'
                }
            }
        ],
        series : [
            {
                name:'Type A',
                type:'line',
                itemStyle: {color: '#54C7C7'},
                data:[11, 11, 15, 13, 12, 13, 10],
                markPoint : {
                    data : [
                        {type : 'max', name: 'Minimum'},
                        {type : 'min', name: 'Maximum'}
                    ]
                },
                markLine : {
                    data : [
                        {type : 'average', name: 'Average'}
                    ]
                }
            },
            {
                name:'Type B',
                type:'line',
                itemStyle: {color: '#B79CDC'},
                data:[1, -2, 2, 5, 3, 2, 0],
                markPoint : {
                    data : [
                        {name : 'Week Minimum', value : -2, xAxis: 1, yAxis: -1.5}
                    ]
                },
                markLine : {
                    data : [
                        {type : 'average', name : 'Average'}
                    ]
                }
            }
        ]
    });

}
function initGaugeChart() {

    var ctx = document.getElementById("banner-chart5");
    ctx.height = 140;
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ["2010", "2011", "2012", "2013", "2014", "2015", "2016"],
            type: 'line',

            datasets: [{
                data: [28, 35, 36, 48, 46, 42, 60],
                backgroundColor: "rgba(255,164,34,0.32)",
                borderColor: "#F4A52E",
                borderWidth: 3,
                strokeColor: "#F4A52E",
                capBezierPoints: !0,
                pointColor: "#F4A52E",
                pointBorderColor: "#F4A52E",
                pointBackgroundColor: "#F4A52E",
                pointBorderWidth: 3,
                pointRadius: 5,
                pointHoverBackgroundColor: "#F4A52E",
                pointHoverBorderColor: "#F4A52E",
                pointHoverRadius: 7
            }]
        },
        options: {
            responsive: true,
            tooltips: {
                enabled: true,
            },
            legend: {
                display: false,
                position: 'top',
                labels: {
                    usePointStyle: true,

                },


            },
            scales: {
                xAxes: [{
                    display: false,
                    gridLines: {
                        display: false,
                        drawBorder: false
                    },
                    scaleLabel: {
                        display: false,
                        labelString: 'Month'
                    }
                }],
                yAxes: [{
                    display: false,
                    gridLines: {
                        display: false,
                        drawBorder: false
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Value'
                    }
                }]
            },
            title: {
                display: false,
            }
        }
    });

}

function floatchart() {

		 var ctx = document.getElementById("banner-chart1");
    ctx.height = 140;
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ["2010", "2011", "2012", "2013", "2014", "2015", "2016"],
            type: 'line',

            datasets: [{
                data: [28, 35, 36, 48, 46, 42, 60],
                backgroundColor: "rgba(255,164,34,0.32)",
                borderColor: "#F4A52E",
                borderWidth: 3,
                strokeColor: "#F4A52E",
                capBezierPoints: !0,
                pointColor: "#F4A52E",
                pointBorderColor: "#F4A52E",
                pointBackgroundColor: "#F4A52E",
                pointBorderWidth: 3,
                pointRadius: 5,
                pointHoverBackgroundColor: "#F4A52E",
                pointHoverBorderColor: "#F4A52E",
                pointHoverRadius: 7
            }]
        },
        options: {
            responsive: true,
            tooltips: {
                enabled: true,
            },
            legend: {
                display: false,
                position: 'top',
                labels: {
                    usePointStyle: true,

                },


            },
            scales: {
                xAxes: [{
                    display: false,
                    gridLines: {
                        display: false,
                        drawBorder: false
                    },
                    scaleLabel: {
                        display: false,
                        labelString: 'Month'
                    }
                }],
                yAxes: [{
                    display: false,
                    gridLines: {
                        display: false,
                        drawBorder: false
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Value'
                    }
                }]
            },
            title: {
                display: false,
            }
        }
    });
    
    var ctx = document.getElementById("banner-chart2");
    ctx.height = 140;
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ["2010", "2011", "2012", "2013", "2014", "2015", "2016"],
            type: 'line',

            datasets: [{
                data: [28, 35, 36, 48, 46, 42, 60],
                backgroundColor: "rgba(0,175,240,0.32)",
                borderColor: "#50AAED",
                borderWidth: 3,
                strokeColor: "#50AAED",
                capBezierPoints: !0,
                pointColor: "#50AAED",
                pointBorderColor: "#50AAED",
                pointBackgroundColor: "#50AAED",
                pointBorderWidth: 3,
                pointRadius: 5,
                pointHoverBackgroundColor: "#50AAED",
                pointHoverBorderColor: "#50AAED",
                pointHoverRadius: 7
            }]
        },
        options: {
            responsive: true,
            tooltips: {
                enabled: true,
            },
            legend: {
                display: false,
                position: 'top',
                labels: {
                    usePointStyle: true,

                }
            },
            scales: {
                xAxes: [{
                    display: false,
                    gridLines: {
                        display: false,
                        drawBorder: false
                    },
                    scaleLabel: {
                        display: false,
                        labelString: 'Month'
                    }
                }],
                yAxes: [{
                    display: false,
                    gridLines: {
                        display: false,
                        drawBorder: false
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Value'
                    }
                }]
            },
            title: {
                display: false,
            }
        }
    });
    
    var ctx = document.getElementById("banner-chart3");
    ctx.height = 140;
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ["2010", "2011", "2012", "2013", "2014", "2015", "2016"],
            type: 'line',

            datasets: [{
                data: [28, 35, 36, 48, 46, 42, 60],
                backgroundColor: "rgba(156,39,176,0.32)",
                borderColor: "#A668FD",
                borderWidth: 3,
                strokeColor: "#A668FD",
                capBezierPoints: !0,
                pointColor: "#A668FD",
                pointBorderColor: "#A668FD",
                pointBackgroundColor: "#A668FD",
                pointBorderWidth: 3,
                pointRadius: 5,
                pointHoverBackgroundColor: "#A668FD",
                pointHoverBorderColor: "#A668FD",
                pointHoverRadius: 7
            }]
        },
        options: {
            responsive: true,
            tooltips: {
                enabled: true,
            },
            legend: {
                display: false,
                position: 'top',
                labels: {
                    usePointStyle: true,

                },


            },
            scales: {
                xAxes: [{
                    display: false,
                    gridLines: {
                        display: false,
                        drawBorder: false
                    },
                    scaleLabel: {
                        display: false,
                        labelString: 'Month'
                    }
                }],
                yAxes: [{
                    display: false,
                    gridLines: {
                        display: false,
                        drawBorder: false
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Value'
                    }
                }]
            },
            title: {
                display: false,
            }
        }
    });
    
    var ctx = document.getElementById("banner-chart4");
    ctx.height = 140;
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ["2010", "2011", "2012", "2013", "2014", "2015", "2016"],
            type: 'line',

            datasets: [{
                data: [28, 35, 36, 48, 46, 42, 60],
                backgroundColor: "rgba(113,216,117,0.32)",
                borderColor: "#77DC77",
                borderWidth: 3,
                strokeColor: "#77DC77",
                // capBezierPoints: !0,
                pointColor: "#77DC77",
                pointBorderColor: "#77DC77",
                pointBackgroundColor: "#77DC77",
                pointBorderWidth: 3,
                pointRadius: 5,
                pointHoverBackgroundColor: "#77DC77",
                pointHoverBorderColor: "#77DC77",
                pointHoverRadius: 7
            }]
        },
        options: {
            responsive: true,
            tooltips: {
                enabled: true,
            },
            legend: {
                display: false,
                position: 'top',
                labels: {
                    usePointStyle: true,

                }
            },
            scales: {
                xAxes: [{
                    display: false,
                    gridLines: {
                        display: false,
                        drawBorder: false
                    },
                    scaleLabel: {
                        display: false,
                        labelString: 'Month'
                    }
                }],
                yAxes: [{
                    display: false,
                    gridLines: {
                        display: false,
                        drawBorder: false
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Value'
                    }
                }]
            },
            title: {
                display: false,
            }
        }
    });
	
}