$(function(){
	jQuery.scrollSpeed(200, 800);
	// Header Scroll Script
 	//  $(window).scroll(function(){
	// 	var scrollTop = $(window).scrollTop();
	// 	var wind_width = $(window).width();
	// 	if(scrollTop >= 70){
	// 		$('header').addClass('header_bg');
	// 	} else {
	// 		$('header').removeClass('header_bg');
	// 	}
	// 	if(scrollTop >= 70 && wind_width>767){
	// 		$('.logo').addClass('logo-hide');
	// 	} else {
	// 		$('.logo').removeClass('logo-hide');
	// 	}
	// });
	// End Header Scroll Script

	// Menu Script
	$('.btn-mobmenu').on('click', function(){
		$('.menu').toggleClass('mobmenushow');
		$(this).toggleClass('whiteicon');
		// $(this).children('.fa').toggleClass('fa-bars fa-times');
	});
	// $('.plus-minus').on('click', function(){
	// 	$(this).next().slideToggle();
	// 	$(this).toggleClass('fa-minus fa-plus');
	// });
	//End Menu Script


	// On scroll animate
	var $animation_elements = $('.animation-element');
	var $window = $(window);

	function check_if_in_view() {
	  var window_height = $window.height();
	  var window_top_position = $window.scrollTop();
	  var window_bottom_position = (window_top_position + window_height);
	 
	  $.each($animation_elements, function() {
	    var $element = $(this);
	    var element_height = $element.outerHeight();
	    var element_top_position = $element.offset().top;
	    var element_bottom_position = (element_top_position + element_height);

	    // console.log(element_bottom_position + "===="+ window_top_position)
	 
	    //check to see if this current container is within viewport
	    if ((element_bottom_position >= window_top_position) &&
	        (element_top_position <= window_bottom_position)) {
	      	$element.addClass('in-view');
	    } 	
	    else {
	      $element.removeClass('in-view');
	    }
	  });
	}

	$window.on('scroll resize', check_if_in_view);
	$window.trigger('scroll');

	window.smoothScroll = function(target) {
	  var scrollContainer = target;
	  do { //find scroll container
	      scrollContainer = scrollContainer.parentNode;
	      if (!scrollContainer) return;
	      scrollContainer.scrollTop += 1;
	  } while (scrollContainer.scrollTop == 0);
	  
	  var targetY = 0;
	  do { //find the top of target relatively to the container
	      if (target == scrollContainer) break;
	      targetY += target.offsetTop;
	  } while (target = target.offsetParent);
	  
	  scroll = function(c, a, b, i) {
	      i++; if (i > 30) return;
	      c.scrollTop = a + (b - a) / 30 * i;
	      setTimeout(function(){ scroll(c, a, b, i); }, 20);
	  }
	  scroll(scrollContainer, scrollContainer.scrollTop, targetY, 0);
	}


	// Modal Script
	 $('[data-moadlshow]').on('click', function(){
	  var modalval = $(this).data('moadlshow');
	  $('#'+modalval).fadeIn();
	 });

	 $('.close-modal').on('click', function(){
	  $(this).parent().parent().fadeOut();
	 });


	$(".dropdown-menu-age li a").click(function(){
	  var selText = $(this).text();
	  $(this).parents('.dropdown-age').find('.dropdown-toggle').html(selText+' <span class="fa fa-angle-down"></span>');
	});


	// - - - - - -Scroll Parallax script - - - - - ->
	var lastId,
	topMenu = $(".scroll-circle"),
	// All list items
	menuItems = topMenu.find("a"),
	// Anchors corresponding to menu items
	scrollItems = menuItems.map(function(){
	  var item = $($(this).attr("href"));
	  if (item.length) { return item; }
	});

	menuItems.click(function(e){
	  var headerHt = $('header').height();
	  var href = $(this).attr("href"),
	      offsetTop = href === "#" ? 0 : $(href).offset().top;
	  $('html, body').stop().animate({ 
	      scrollTop: offsetTop - headerHt
	  },1000);
	  e.preventDefault();
	});

	// Parallaxing + add class active on scroll
	$(document).scroll(function () {
	  // add class active to nav a on scroll
	  var scrollPos = $(document).scrollTop() + 100;
	  $('.scroll-circle a').each(function () {
	    var currLink = $(this);
	    var refElement = $(currLink.attr("href"));
	    if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
	      $('.scroll-circle a').removeClass("active");
	      currLink.addClass("active");
	    }
	  });  
	});

});

;