function setImgCover(e) {
	e.each(function() {
		$(this).parent().css({
			'background-image': 'url("'+$(this).attr('src')+'")',
			'background-repeat': 'no-repeat',
			'background-position': 'center center',
			'background-size': 'cover'
		});
	});
}
function setImgContain(e) {
	e.each(function() {
		$(this).parent().css({
			'background-image': 'url("'+$(this).attr('src')+'")',
			'background-repeat': 'no-repeat',
			'background-position': 'center center',
			'background-size': 'contain'
		});
	});
}
function setRatio() {
	$('[data-ratio]').each(function() {
		var t = $(this).find('.scale');
		t.outerHeight(t.outerWidth()*$(this).attr('data-ratio'));
	});
}
$(function() {
	setImgCover($('.img-cover'));
	setImgContain($('.img-contain'));
	var isMobile = false;
	var justSwitched = false;
	function detectDevice() {
		var temp = isMobile;
		if ( Modernizr.mq('(max-width:779px)') ) {
			isMobile = true;
		} else {
			isMobile = false;
		}
		if ( temp == isMobile ) {
			justSwitched = false;
		} else {
			justSwitched = true;
		}
	}
	$('.slider__inner').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
		dots: true,
		infinite: true,
		cssEase: 'ease',
		speed: 500,
		adaptiveHeight: true,
		responsive: [
			{
				breakpoint: 779,
				settings: {
					dots: false
				}
			}
		]
	});
	$('.history__slider').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
		dots: true,
		infinite: true,
		cssEase: 'ease',
		speed: 500,
		adaptiveHeight: true,
		responsive: [
			{
				breakpoint: 779,
				settings: {
					dots: false
				}
			}
		]
	});
	$('.articles-t__slider').slick({
		slidesToShow: 3,
		slidesToScroll: 3,
		arrows: false,
		dots: true,
		infinite: true,
		cssEase: 'ease',
		speed: 500,
		adaptiveHeight: true,
		responsive: [
			{
				breakpoint: 779,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
		]
	});
	$('.clients__slider').slick({
		slidesToShow: 5,
		slidesToScroll: 1,
		arrows: true,
		dots: false,
		infinite: true,
		cssEase: 'ease',
		speed: 500,
		adaptiveHeight: true,
		responsive: [
			{
				breakpoint: 999,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1
				}
			}, {
				breakpoint: 779,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
		]
	});
	$('.description .notebook .slider').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
		dots: false,
		infinite: true,
		cssEase: 'ease',
		speed: 500
		/*responsive: [
			{
				breakpoint: 1639,
				settings: {
					slidesToShow: 4,
					slidesToScroll: 4
				}
			}
		]*/
	});
	function openMenu() {
		$('.menu-drop').addClass('is-opened');
		$('.fade-bg').addClass('is-opened');
		$('body').addClass('is-locked');
	}
	function closeMenu() {
		$('.menu-drop').removeClass('is-opened');
		$('.fade-bg').removeClass('is-opened');
		$('body').removeClass('is-locked');
	}
	function equalClients() {
		$('[data-equal]').each(function() {
			var t = $(this);
			if ( Modernizr.mq('(min-width:1000px)') ) {
				var line = 5;
			} else if ( Modernizr.mq('(max-width:999px)') && Modernizr.mq('(min-width:780px)') ) {
				var line = 3;
			} else if ( Modernizr.mq('(max-width:779px)') ) {
				var line = 1;
			}
			var size = t.find('.clients__item').size();
			t.find('.clients__item p').outerHeight('auto');
			for ( var i=0; i<Math.floor(size/line); i++ ) {
				var max = 0;
				for ( var j=1; j<=line; j++ ) {
					var n = i*line+j;
					var h = t.find('.clients__item:nth-child('+n+') p').outerHeight();
					max = h > max ? h : max;
				}
				for ( var j=1; j<=line; j++ ) {
					var n = i*line+j;
					t.find('.clients__item:nth-child('+n+') p').outerHeight(max);
				}
			}
		});
	}
	function startApp() {
		detectDevice();
		if ( justSwitched ) {
			if ( isMobile ) {
				$('.header__row').append('<span class="menu-open"></span>');
				if ( $('.history__row').length ) {
					$('.history__row').each(function() {
						$(this).find('.history--pic').detach().insertBefore($(this).find('.history__lc'));
					});
				}
				if ( $('.contacts-b').length ) {
					$('.contacts-b').each(function() {
						$(this).find('.contacts-b__map').detach().insertBefore($(this).find('.contacts-b__lc'));
					});
				}
				if ( $('.consulting__row').length ) {
					$('.consulting__row').each(function() {
						$(this).find('.consulting__rc').detach().insertBefore($(this).find('.consulting__lc'));
					});
				}
			} else {
				$('.menu-open').remove();
				if ( $('.history__row').length ) {
					$('.history__row').each(function() {
						$(this).find('.history--pic').detach().insertAfter($(this).find('.history__lc'));
					});
				}
				if ( $('.contacts-b').length ) {
					$('.contacts-b').each(function() {
						$(this).find('.contacts-b__map').detach().insertAfter($(this).find('.contacts-b__lc'));
					});
				}
				if ( $('.consulting__row').length ) {
					$('.consulting__row').each(function() {
						$(this).find('.consulting__rc').detach().insertAfter($(this).find('.consulting__lc'));
					});
				}
				closeMenu();
			}
		}
		setRatio();
		equalClients();
	}
	startApp();
	var lastWidth = $(window).width();
	$(window).on('resize', _.debounce(function() {
		if ( $(window).width() != lastWidth ) {
			startApp();
			lastWidth = $(window).width();
		}
	}, 100));
	
	$('[data-open]').on('click', function(e) {
		e.preventDefault();
		$(this).addClass('is-active');
		var t = $('[data-target="'+$(this).attr('data-open')+'"]');
		t.siblings('[data-target]').removeClass('is-opened is-active');
		$('.fade-bg').addClass('is-opened');
		t.addClass('is-opened');
		var h = $(window).scrollTop()+($(window).height()-t.outerHeight())/2;
		if ( !isMobile ) {
			var diff = 23;
		} else {
			var diff = 15;
		}
		if ( h < $(window).scrollTop()+(diff*2) ) {
			h = $(window).scrollTop()+diff;
		}
		t.css({
			'top': h+'px'
		}).addClass('is-active').siblings('[data-target]').removeClass('is-active');
	});
	$('[data-target] .modal--close, .fade-bg').on('click', function(e) {
		e.preventDefault();
		$('[data-target], .fade-bg').removeClass('is-opened');
		$('[data-open]').removeClass('is-active');
	});
	$('.fade-bg').on('click', function(e) {
		closeMenu();
	});
	
	
	$(document).on('click', function(e) {
		if ( !$(e.target).closest('.breadcrumbs .dropable').length && !$(e.target).closest('.breadcrumbs .drop').length ) {
			$('.breadcrumbs .dropable').removeClass('is-active');
		}
	});
	$(document).on('click', '.menu-open', function(e) {
		openMenu();
	});
	$(document).on('click', '.menu-close', function(e) {
		closeMenu();
	});

	$('input, textarea').each(function() {
		$(this).data('holder', $(this).attr('placeholder'));
		$(this).focusin(function() {
			$(this).attr('placeholder', '');
		});
		$(this).focusout(function() {
			$(this).attr('placeholder', $(this).data('holder'));
		});
	});
});