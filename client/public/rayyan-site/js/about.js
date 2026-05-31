$(function(){
	// about Text block Scroll Script
	if($(window).width()>1024){
		var aboutTextOfsetTop = $('#aboutText-block').offset().top;
		$('#aboutText-block').css({"top": +aboutTextOfsetTop });

		$(window).scroll(function(){
			var scrollTop = $(window).scrollTop();
			var aboutTextscrolTop = aboutTextOfsetTop - scrollTop;
			$('#aboutText-block').css({"top": +aboutTextscrolTop });
		});
	}


	// Drop magnifire and Depth drop
	var dropfsetTop = $('#dropbox-zoom').offset().top - 240;
	var dropfsetTop2 = $('#dropbox-main').offset().top + 50;
	$('#dropbox-zoom').css({"background-position": 'center ' + dropfsetTop + 'px'});
	$('#dropbox-main').css({"top": +dropfsetTop2});

	$(window).scroll(function(){
		var scrollTop = $(window).scrollTop();
		var dropscrolTop = dropfsetTop - 20 - scrollTop;
		var dropscrolTop2 = dropfsetTop2 + scrollTop;
		var dropdepth = dropscrolTop2/4.7;
		var depth = parseFloat(dropdepth.toString().split(".")[0]);
		
		if(scrollTop<=255){
			$('#dropbox-zoom').css({"background-position": 'center ' + dropscrolTop + 'px'});
			$('#dropbox-main').css({"top": +dropscrolTop2 * 1.1});
			$('#mejordpth').css({"top": +dropscrolTop2});
			$('#mejordpth h1 span').text(depth);
		}
	});

	// About Tab script
	$('.tabmenu').on('click', function(){
		$('[role="presentation"]').removeClass('active');
		$(this).parent().toggleClass('active');
		$('.story-description').removeClass('active');
		$(this).next().toggleClass('active');
	});

	// append div for our values wave
	var pageLimit=360;
	$(document).ready(function() {
    for(var i = 1; i <= pageLimit; i++) {
        $('#wave-container').append('<div class="line"></div>' )
     } 
	});

});

;