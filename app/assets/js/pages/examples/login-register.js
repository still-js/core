"use strict";
jQuery.noConflict();
jQuery(document).ready(function () {
	jQuery(".loginCard .rgstr-btn button").click(function () {
		jQuery('.loginCard .wrapper').addClass('move');
		jQuery('.body').css('background', '#e0b722');
		jQuery(".loginCard .login-btn button").removeClass('active');
		jQuery(this).addClass('active');

	});
	jQuery(".loginCard .login-btn button").click(function () {
		jQuery('.loginCard .wrapper').removeClass('move');
		jQuery('.body').css('background', '#ff4931');
		jQuery(".loginCard .rgstr-btn button").removeClass('active');
		jQuery(this).addClass('active');
	});
});