/*----------------------------------------
	window load
----------------------------------------*/
/* document */
$(document).ready(function(){
});

/* window */
$(window).on('load', function(){
    layout();
});

$(window).on('resize', function(){
    layout();
});



/*----------------------------------------
	popupSource		소스보기 팝업
----------------------------------------*/
 var layout = function(){
    var layout = $('.framework');
    var header = layout.find('.header');
    var viewer = layout.find('.viewer');

    var winW = $(window).outerWidth();
    
    if( winW < 1300 ){
        layout.addClass('mobile');
    }else{
        layout.removeClass('mobile');
    };
    
    var headerH = header.outerHeight();
    
    viewer.css({ 'padding-top': headerH });
    
};


/*------------------------------------------------------------------------------
   event
-------------------------------------------------------------------------------*/
$(document).on('click' , '.app_wrap .app', function(){
    var url = $(this).children('a').attr('href');
    var target = $(this).children('a').attr('target');
    if ( target == '_self') {   
        location.href = url;
    } else {
        $('.viewer iframe').attr('src', url);
        $(this).addClass('active').siblings().removeClass('active');
    }
});



	
	



