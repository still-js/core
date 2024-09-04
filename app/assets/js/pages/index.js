'use strict';
$(function () {


$('#new-orders').slimscroll({
		height: '500px',
		size: '5px'
	});

	amChartLineHome();
	amChartCylinder();

	desktopCalendar();
	initCardChart();
	initSparkline();
	initLineChart();
	initSalesChart();
	chartdata1();
	chartdata2();
	chartdata3();
});


function amChartLineHome() {
	// Themes begin
	am4core.useTheme(am4themes_animated);
	// Themes end
	// Create chart instance
	var chart = am4core.create("amChartLineHome", am4charts.XYChart);

	// Add data
	chart.data = [{
		"date": "2012-03-01",
		"price": 20
	}, {
		"date": "2012-03-02",
		"price": 75
	}, {
		"date": "2012-03-03",
		"price": 15
	}, {
		"date": "2012-03-04",
		"price": 75
	}, {
		"date": "2012-03-05",
		"price": 158
	}, {
		"date": "2012-03-06",
		"price": 57
	}, {
		"date": "2012-03-07",
		"price": 107
	}, {
		"date": "2012-03-08",
		"price": 89
	}];

	// Create axes
	var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
	dateAxis.renderer.grid.template.location = 0;
	dateAxis.renderer.minGridDistance = 50;
	dateAxis.renderer.labels.template.fill = am4core.color("#9aa0ac");

	var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
	valueAxis.logarithmic = true;
	valueAxis.renderer.minGridDistance = 20;
	valueAxis.renderer.labels.template.fill = am4core.color("#9aa0ac");

	// Create series
	var series = chart.series.push(new am4charts.LineSeries());
	series.dataFields.valueY = "price";
	series.dataFields.dateX = "date";
	series.tensionX = 0.8;
	series.strokeWidth = 3;

	var bullet = series.bullets.push(new am4charts.CircleBullet());
	bullet.circle.fill = am4core.color("#fff");
	bullet.circle.strokeWidth = 3;

	// Add cursor
	chart.cursor = new am4charts.XYCursor();
	chart.cursor.fullWidthLineX = true;
	chart.cursor.xAxis = dateAxis;
	chart.cursor.lineX.strokeWidth = 0;
	chart.cursor.lineX.fill = am4core.color("#000");
	chart.cursor.lineX.fillOpacity = 0.1;


}


function amChartCylinder() {
	am4core.useTheme(am4themes_animated);
	// Themes end

	// Create chart instance
	var chart = am4core.create("amChartCylinderHome", am4charts.XYChart3D);

	chart.titles.create().text = "Chart Data";

	// Add data
	chart.data = [{
		"category": "Q1",
		"value1": 30,
		"value2": 70
	}, {
		"category": "Q2",
		"value1": 15,
		"value2": 85
	}, {
		"category": "Q3",
		"value1": 50,
		"value2": 50
	}, {
		"category": "Q4",
		"value1": 35,
		"value2": 65
	}, {
		"category": "Q5",
		"value1": 15,
		"value2": 85
	}, {
		"category": "Q6",
		"value1": 40,
		"value2": 60
	}, {
		"category": "Q7",
		"value1": 60,
		"value2": 40
	}];

	// Create axes
	var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
	categoryAxis.dataFields.category = "category";
	categoryAxis.renderer.grid.template.location = 0;
	categoryAxis.renderer.grid.template.strokeOpacity = 0;
	categoryAxis.renderer.labels.template.fill = am4core.color("#9aa0ac");

	var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
	valueAxis.renderer.grid.template.strokeOpacity = 0;
	valueAxis.min = -10;
	valueAxis.max = 110;
	valueAxis.strictMinMax = true;
	valueAxis.renderer.baseGrid.disabled = true;
	valueAxis.renderer.labels.template.fill = am4core.color("#9aa0ac");
	valueAxis.renderer.labels.template.adapter.add("text", function (text) {
		if ((text > 100) || (text < 0)) {
			return "";
		}
		else {
			return text + "%";
		}
	})

	// Create series
	var series1 = chart.series.push(new am4charts.ConeSeries());
	series1.dataFields.valueY = "value1";
	series1.dataFields.categoryX = "category";
	series1.columns.template.width = am4core.percent(60);
	series1.columns.template.fillOpacity = 0.9;
	series1.columns.template.strokeOpacity = 1;
	series1.columns.template.strokeWidth = 2;

	var series2 = chart.series.push(new am4charts.ConeSeries());
	series2.dataFields.valueY = "value2";
	series2.dataFields.categoryX = "category";
	series2.stacked = true;
	series2.columns.template.width = am4core.percent(60);
	series2.columns.template.fill = am4core.color("#000");
	series2.columns.template.fillOpacity = 0.1;
	series2.columns.template.stroke = am4core.color("#000");
	series2.columns.template.strokeOpacity = 0.2;
	series2.columns.template.strokeWidth = 2;
}


function initCardChart() {


	//Chart Bar
	$('.chart.chart-bar').sparkline([6, 4, 8, 6, 8, 10, 5, 6, 7, 9, 5, 6, 4, 8, 6, 8, 10, 5, 6, 7, 9, 5], {
		type: 'bar',
		barColor: '#FF9800',
		negBarColor: '#fff',
		barWidth: '4px',
		height: '45px'
	});


	//Chart Pie
	$('.chart.chart-pie').sparkline([30, 35, 25, 8], {
		type: 'pie',
		height: '45px',
		sliceColors: ['#65BAF2', '#F39517', '#F44586', '#6ADF42']
	});


	//Chart Line
	$('.chart.chart-line').sparkline([9, 4, 6, 5, 6, 4, 7, 3], {
		type: 'line',
		width: '60px',
		height: '45px',
		lineColor: '#65BAF2',
		lineWidth: 2,
		fillColor: 'rgba(0,0,0,0)',
		spotColor: '#F39517',
		maxSpotColor: '#F39517',
		minSpotColor: '#F39517',
		spotRadius: 3,
		highlightSpotColor: '#F44586'
	});

	// live chart
	var mrefreshinterval = 500; // update display every 500ms
	var lastmousex = -1;
	var lastmousey = -1;
	var lastmousetime;
	var mousetravel = 0;
	var mpoints = [];
	var mpoints_max = 30;
	$('html').on("mousemove", function (e) {
		var mousex = e.pageX;
		var mousey = e.pageY;
		if (lastmousex > -1) {
			mousetravel += Math.max(Math.abs(mousex - lastmousex), Math.abs(mousey - lastmousey));
		}
		lastmousex = mousex;
		lastmousey = mousey;
	});
	var mdraw = function () {
		var md = new Date();
		var timenow = md.getTime();
		if (lastmousetime && lastmousetime != timenow) {
			var pps = Math.round(mousetravel / (timenow - lastmousetime) * 1000);
			mpoints.push(pps);
			if (mpoints.length > mpoints_max)
				mpoints.splice(0, 1);
			mousetravel = 0;
			$('#liveChart').sparkline(mpoints, {
				width: mpoints.length * 2,
				height: '45px',
				tooltipSuffix: ' pixels per second'
			});
		}
		lastmousetime = timenow;
		setTimeout(mdraw, mrefreshinterval);
	};
	// We could use setInterval instead, but I prefer to do it this way
	setTimeout(mdraw, mrefreshinterval);
}
function initSparkline() {
	$(".sparkline").each(function () {
		var $this = $(this);
		$this.sparkline('html', $this.data());
	});
}

function initLineChart() {
	try {

		//line chart
		var ctx = document.getElementById("lineChart");
		if (ctx) {
			ctx.height = 150;
			var myChart = new Chart(ctx, {
				type: 'line',
				data: {
					labels: ["January", "February", "March", "April", "May", "June", "July"],
					defaultFontFamily: "Poppins",
					datasets: [
						{
							label: "My First dataset",
							borderColor: "rgba(0,0,0,.09)",
							borderWidth: "1",
							backgroundColor: "rgba(0,0,0,.07)",
							data: [22, 44, 67, 43, 76, 45, 12]
						},
						{
							label: "My Second dataset",
							borderColor: "rgba(0, 123, 255, 0.9)",
							borderWidth: "1",
							backgroundColor: "rgba(0, 123, 255, 0.5)",
							pointHighlightStroke: "rgba(26,179,148,1)",
							data: [16, 32, 18, 26, 42, 33, 44]
						}
					]
				},
				options: {
					legend: {
						position: 'top',
						labels: {
							fontFamily: 'Poppins'
						}

					},
					responsive: true,
					tooltips: {
						mode: 'index',
						intersect: false
					},
					hover: {
						mode: 'nearest',
						intersect: true
					},
					scales: {
						xAxes: [{
							ticks: {
								fontFamily: "Poppins"

							}
						}],
						yAxes: [{
							ticks: {
								beginAtZero: true,
								fontFamily: "Poppins"
							}
						}]
					}

				}
			});
		}


	} catch (error) {
		console.log(error);
	}
}

function initSalesChart() {

	try {
		//Sales chart
		var ctx = document.getElementById("sales-chart");
		if (ctx) {
			ctx.height = 150;
			var myChart = new Chart(ctx, {
				type: 'line',
				data: {
					labels: ["2010", "2011", "2012", "2013", "2014", "2015", "2016"],
					type: 'line',
					defaultFontFamily: 'Poppins',
					datasets: [{
						label: "Foods",
						data: [0, 30, 10, 120, 50, 63, 10],
						backgroundColor: 'transparent',
						borderColor: '#222222',
						borderWidth: 2,
						pointStyle: 'circle',
						pointRadius: 3,
						pointBorderColor: 'transparent',
						pointBackgroundColor: '#222222',
					}, {
						label: "Electronics",
						data: [0, 50, 40, 80, 40, 79, 120],
						backgroundColor: 'transparent',
						borderColor: '#f96332',
						borderWidth: 2,
						pointStyle: 'circle',
						pointRadius: 3,
						pointBorderColor: 'transparent',
						pointBackgroundColor: '#f96332',
					}]
				},
				options: {
					responsive: true,
					tooltips: {
						mode: 'index',
						titleFontSize: 12,
						titleFontColor: '#000',
						bodyFontColor: '#000',
						backgroundColor: '#fff',
						titleFontFamily: 'Poppins',
						bodyFontFamily: 'Poppins',
						cornerRadius: 3,
						intersect: false,
					},
					legend: {
						display: false,
						labels: {
							usePointStyle: true,
							fontFamily: 'Poppins',
						},
					},
					scales: {
						xAxes: [{
							display: true,
							gridLines: {
								display: false,
								drawBorder: false
							},
							scaleLabel: {
								display: false,
								labelString: 'Month'
							},
							ticks: {
								fontFamily: "Poppins"
							}
						}],
						yAxes: [{
							display: true,
							gridLines: {
								display: false,
								drawBorder: false
							},
							scaleLabel: {
								display: true,
								labelString: 'Value',
								fontFamily: "Poppins"

							},
							ticks: {
								fontFamily: "Poppins"
							}
						}]
					},
					title: {
						display: false,
						text: 'Normal Legend'
					}
				}
			});
		}


	} catch (error) {
		console.log(error);
	}
}
function desktopCalendar() {
	var startdate;
	var enddate;
	var today = new Date();
	var year = today.getFullYear();
	var month = today.getMonth();
	var day = today.getDate();
	$('#desktopCal').fullCalendar({
		defaultDate: today,
		defaultView: 'month',
		navLinks: true,
		selectable: true,
		selectHelper: true,
		editable: true,
		header: {
			right: 'prev,today,next'
		},
		events: [{
			title: "Holiday",
			start: new Date(year, month, day - 10),
			end: new Date(year, month, day - 8),
			backgroundColor: "#00bcd4"
		}, {
			title: "Priya Sarma",
			start: new Date(year, month, day - 3, 13, 30),
			end: new Date(year, month, day - 3, 14, 10),
			backgroundColor: "#fe9701"
		}, {
			title: "Meeting",
			start: new Date(year, month, day - 6, 17, 30),
			end: new Date(year, month, day - 6, 18, 10),
			backgroundColor: "#F3565D"
		}, {
			title: "Sarah Smith",
			start: new Date(year, month, day, 19, 10),
			end: new Date(year, month, day, 19, 30),
			backgroundColor: "#1bbc9b"
		}, {
			title: "Airi Satou",
			start: new Date(year, month, day + 1, 19, 10),
			end: new Date(year, month, day + 1, 19, 30),
			backgroundColor: "#DC35A9",
		}, {
			title: "Angelica Ramos",
			start: new Date(year, month, day + 3, 21, 10),
			end: new Date(year, month, day + 3, 21, 30),
			backgroundColor: "#fe9701",
		}, {
			title: "Palak Jani",
			start: new Date(year, month, day + 10, 11, 30),
			end: new Date(year, month, day + 10, 12, 10),
			backgroundColor: "#00bcd4"
		}, {
			title: "Priya Sarma",
			start: new Date(year, month, day + 5, 2, 30),
			end: new Date(year, month, day + 7, 3, 10),
			backgroundColor: "#9b59b6"
		},
		{
			title: "Jay Soni",
			start: new Date(year, month, day + 17, 2, 30),
			end: new Date(year, month, day + 19, 3, 10),
			backgroundColor: "#1bbc9b"
		}]

	});


}
function chartdata1() {
	// Themes begin
	am4core.useTheme(am4themes_animated);
	// Themes end
	var chart = am4core.create("chartdata1", am4charts.ChordDiagram);

	chart.data = [
		{ from: "A", to: "D", value: 10 },
		{ from: "B", to: "D", value: 8 },
		{ from: "B", to: "E", value: 4 },
		{ from: "B", to: "C", value: 2 },
		{ from: "C", to: "E", value: 14 },
		{ from: "E", to: "D", value: 8 },
		{ from: "C", to: "A", value: 4 },
		{ from: "G", to: "A", value: 7 },
		{ from: "D", to: "B", value: 1 }
	];

	chart.dataFields.fromName = "from";
	chart.dataFields.toName = "to";
	chart.dataFields.value = "value";

	// make nodes draggable
	var nodeTemplate = chart.nodes.template;
	nodeTemplate.readerTitle = "Click to show/hide or drag to rearrange";
	nodeTemplate.showSystemTooltip = true;

	var nodeLink = chart.links.template;
	var bullet = nodeLink.bullets.push(new am4charts.CircleBullet());
	bullet.fillOpacity = 1;
	bullet.circle.radius = 5;
	bullet.locationX = 0.5;

	// create animations
	chart.events.on("ready", function () {
		for (var i = 0; i < chart.links.length; i++) {
			var link = chart.links.getIndex(i);
			var bullet = link.bullets.getIndex(0);

			animateBullet(bullet);
		}
	})

	function animateBullet(bullet) {
		var duration = 3000 * Math.random() + 2000;
		var animation = bullet.animate([{ property: "locationX", from: 0, to: 1 }], duration)
		animation.events.on("animationended", function (event) {
			animateBullet(event.target.object);
		})
	}
}

function chartdata2() {

	// Themes begin
	am4core.useTheme(am4themes_animated);
	// Themes end

	// Create chart instance
	var chart = am4core.create("chartdata2", am4charts.PieChart);

	// Add data
	chart.data = [{
		"country": "Lithuania",
		"litres": 501.9
	}, {
		"country": "Germany",
		"litres": 165.8
	}, {
		"country": "Austria",
		"litres": 128.3
	}, {
		"country": "Belgium",
		"litres": 60
	}, {
		"country": "The Netherlands",
		"litres": 50
	}];

	// Set inner radius
	chart.innerRadius = am4core.percent(40);

	// Add and configure Series
	var pieSeries = chart.series.push(new am4charts.PieSeries());
	pieSeries.dataFields.value = "litres";
	pieSeries.dataFields.category = "country";
	pieSeries.slices.template.stroke = am4core.color("#fff");
	pieSeries.slices.template.strokeWidth = 1;
	pieSeries.slices.template.strokeOpacity = 1;
	pieSeries.labels.template.fill = am4core.color("#9aa0ac");

	// This creates initial animation
	pieSeries.hiddenState.properties.opacity = 1;
	pieSeries.hiddenState.properties.endAngle = -90;
	pieSeries.hiddenState.properties.startAngle = -90;
}
function chartdata3() {
	// Themes begin
	am4core.useTheme(am4themes_animated);
	// Themes end



	// Create chart instance
	var chart = am4core.create("chartdata3", am4charts.RadarChart);

	// Add data
	chart.data = [{
		"category": "Type 1",
		"value": 80,
		"full": 100
	}, {
		"category": "Type 2",
		"value": 35,
		"full": 100
	}, {
		"category": "Type 3",
		"value": 92,
		"full": 100
	}];

	// Make chart not full circle
	chart.startAngle = -90;
	chart.endAngle = 180;
	chart.innerRadius = am4core.percent(20);

	// Set number format
	chart.numberFormatter.numberFormat = "#.#'%'";

	// Create axes
	var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
	categoryAxis.dataFields.category = "category";
	categoryAxis.renderer.grid.template.location = 0;
	categoryAxis.renderer.grid.template.strokeOpacity = 0;
	categoryAxis.renderer.labels.template.horizontalCenter = "right";
	categoryAxis.renderer.labels.template.fontWeight = 500;
	categoryAxis.renderer.labels.template.adapter.add("fill", function (fill, target) {
		return (target.dataItem.index >= 0) ? chart.colors.getIndex(target.dataItem.index) : fill;
	});
	categoryAxis.renderer.minGridDistance = 10;

	var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
	valueAxis.renderer.grid.template.strokeOpacity = 0;
	valueAxis.min = 0;
	valueAxis.max = 100;
	valueAxis.strictMinMax = true;
	valueAxis.renderer.labels.template.fill = am4core.color("#9aa0ac");

	// Create series
	var series1 = chart.series.push(new am4charts.RadarColumnSeries());
	series1.dataFields.valueX = "full";
	series1.dataFields.categoryY = "category";
	series1.clustered = false;
	series1.columns.template.fill = new am4core.InterfaceColorSet().getFor("alternativeBackground");
	series1.columns.template.fillOpacity = 0.08;
	series1.columns.template.cornerRadiusTopLeft = 20;
	series1.columns.template.strokeWidth = 0;
	series1.columns.template.radarColumn.cornerRadius = 20;

	var series2 = chart.series.push(new am4charts.RadarColumnSeries());
	series2.dataFields.valueX = "value";
	series2.dataFields.categoryY = "category";
	series2.clustered = false;
	series2.columns.template.strokeWidth = 0;
	series2.columns.template.tooltipText = "{category}: [bold]{value}[/]";
	series2.columns.template.radarColumn.cornerRadius = 20;


	series2.columns.template.adapter.add("fill", function (fill, target) {
		return chart.colors.getIndex(target.dataItem.index);
	});

	// Add cursor
	chart.cursor = new am4charts.RadarCursor();
}