'use strict';
$('#basic_demo').owlCarousel({
	loop: true,
	margin: 10,
	nav: true,
	responsive: {
		0: {
			items: 1
		},
		600: {
			items: 3
		},
		1000: {
			items: 5
		}
	}
});
$('#single_slide').owlCarousel({
	loop: true,
	margin: 10,
	nav: true,
	items: 1,
	animateOut: 'fadeOut',
	animateIn: 'fadeIn',
	smartSpeed: 450
});
$('#single_slide_autoplay').owlCarousel({
	items: 1,
	loop: true,
	margin: 10,
	autoplay: true,
	autoplayTimeout: 3000,
	autoplayHoverPause: true
});
$('.play').on('click', function () {
	$('#single_slide_autoplay').trigger('play.owl.autoplay', [3000])
})
$('.stop').on('click', function () {
	$('#single_slide_autoplay').trigger('stop.owl.autoplay')
})
$('#withloop').owlCarousel({
	center: true,
	items: 2,
	loop: true,
	margin: 10,
	responsive: {
		600: {
			items: 4
		}
	}
});
$('#nonloop').owlCarousel({
	center: true,
	items: 2,
	loop: false,
	margin: 10,
	responsive: {
		600: {
			items: 4
		}
	}
});
$('#dashboard_slide').owlCarousel({
	items: 1,
	loop: true,
	margin: 10,
	autoplay: false,
	autoplayTimeout: 2000,
	dots: false,
	autoplayHoverPause: true
});
$('#dashboard_slide2').owlCarousel({
	items: 1,
	loop: true,
	margin: 10,
	autoplay: true,
	autoplayTimeout: 3000,
	dots: false,
	autoplayHoverPause: true
});