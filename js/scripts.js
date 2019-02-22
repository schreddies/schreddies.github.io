/**
 * 1. Search Popup
 * 2. Index Tiled
 * 3. Menu Mobile
 * 4. Project Detail
 * 5. Preload
 */

'use strict';

(function ($) {

	$(document).on('ready', function () {

		var $header = $('.header'),
			$search = $('.fa-search', $header);

		// 1. Search Popup
		$search.on('click', function (e) {
			e.preventDefault();
			$('.box-search').slideToggle(400);
		});



		// 2. Index Grid
		var $gridLayout = $('.grid-layout');
		$gridLayout.imagesLoaded( function () {
			$gridLayout.masonry({
				itemSelector: '.post',
			});
		});

		// 3. Menu Mobile
		var $btnMenu = $('.menu-mobile'),
			$hideMenu = $('.hide-menu');

		$btnMenu.on('click', function () {
			$header.toggleClass('active');

			if ($header.hasClass('active')) {
				$hideMenu.addClass('active');
			}
			else {
				$hideMenu.removeClass('active');
			}
		});
		$hideMenu.on('click', function () {
			$header.removeClass('active');
			$hideMenu.removeClass('active');
		});

		$('.menu-item-has-children', '.main-menu').on('click', ' > a', function (e) {
			var ww = $(window).width();

			if (ww <=991) {
				var $parent = $(e.target).closest('.menu-item-has-children');
				e.preventDefault();
				$('>.sub-menu', $parent).slideToggle(400);
			}
		});

		// 5. Preload

		var $preload = $('#preload');

		if ($preload.length) {
			$(window).on('load', function () {
				$preload.fadeOut(400);
			});
		}
	});

})(jQuery);