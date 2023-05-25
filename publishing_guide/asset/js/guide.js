/*----------------------------------------
	window load
 ----------------------------------------*/
$(window).on('load',function(){
	popupSource(); //소스보기 팝업
})



/*----------------------------------------
	popupSource		소스보기 팝업
 ----------------------------------------*/
var popupSource = function(){
    let $sourceDim = '<div class="source-dim"></div>',
        $sourceWindow ='<div class="source-window"><div class="source-window-close">X</div><textarea class="source-view" rows="" cols=""></textarea></div>';

 	$(document).on('click','.copy', function(){
        var tempSource = $(this).parents('.ex-type').find('.source-code').html();

		$('body').append($sourceDim,$sourceWindow);		
		$('.source-window .source-view').text(tempSource);
	});
    
	$(document).on('click','.source-window .source-window-close, .source-dim', function(){
		$('.source-window, .source-dim').remove();
	});
 };



	
	



