'use strict';
// Draw a sparkline for the #sparkline element
$('#sparkline').sparkline([5, 4, 5, -2, 0, 3, 5, 4, 5, -2, 0, 3], {
	type: 'bar',
	barColor: '#06a9f4',
	negBarColor: '#fda582',
	barWidth: '4px',
	height: '30px'
});
$("#sparkline1").sparkline([0, 23, 43, 35, 44, 45, 56, 37, 40, 45, 56, 7, 10, 44, 45, 56, 37, 40, 45, 56, 7, 10], {
	type: 'line',
	width: '100%',
	height: '70',
	lineColor: '#ffffff',
	fillColor: 'transparent',
	lineWidth: 1.5,
	spotRadius: 4,
	spotColor: '#ffffff',
	minSpotColor: '#ffffff',
	maxSpotColor: '#ffffff',
	highlightSpotColor: '#ffffff',
	highlightLineColor: '#ffffff'
});
$("#sparkline2").sparkline([5, 6, 7, 9, 9, 5, 3, 2, 2, 4, 6, 7], {
	type: 'line',
	width: '100%',
	fillColor: '#5fc29d54',
	lineColor: '#ffffff',
	lineWidth: 1,
	spotRadius: 2,
	spotColor: '#ffffff',
	minSpotColor: '#ffffff',
	maxSpotColor: '#ffffff',
	highlightSpotColor: '#ffffff',
	highlightLineColor: '#ffffff',
	height: '70',
});
$("#sparkline3").sparkline([5, 6, 7, 9, 9, 5, 3, 2, 2, 4, 6, 7, 9, 5, 3, 2, 2, 4, 6, 7], {
	type: 'line',
	height: '30px'
});

$("#sparkline4").sparkline([1, 1, 2], {
	type: 'pie',
	height: '30px'
});
$("#sparkline5").sparkline([10, 12, 12, 9, 7], {
	type: 'bullet'
});
$("#sparkline6").sparkline([5, 6, 7, 2, 0, -4, -2, 4], {
	type: 'bar',
	height: '30px'
});
$("#sparkline7").sparkline([4, 6, 7, 7, 4, 3, 2, 1, 4, 4, 3, 2, 1, 4, 4], {
	type: 'discrete',
	height: '30px'
});
$('#sparkline8').sparkline([5, 4, 5, -2, 0, 3, 5, 4, 5, -2, 0, 3], {
	type: 'bar',
	barColor: '#06a9f4',
	negBarColor: '#fda582',
	barWidth: '4px',
	height: '30px'
});
$('.sparkline9').sparkline([6, 4, 8, 6, 8, 10, 5, 6, 7, 9, 5, 6, 4, 8, 6, 8, 10, 5, 6, 7, 9, 5], {
	type: 'bar',
	barColor: '#ffffff',
	negBarColor: '#fda582',
	barWidth: '6px',
	height: '50px'
});
$("#sparkline10").sparkline([5, 6, 7, 9, 9, 5, 3, 2, 2, 4, 6, 7, 9, 5, 3, 2, 2, 4, 6, 7], {
	type: 'line',
	height: '30px'
});
$("#sparkline11").sparkline([4, 6, 7, 7, 4, 3, 2, 1, 4, 4, 3, 2, 1, 4, 4], {
	type: 'discrete',
	height: '30px'
});