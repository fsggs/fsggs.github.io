(function($){
	$.extend({
		stopSound : function(){
			return $('#'+arguments[0]).remove();
		},
		playSound : function(){
			return $("<audio id='"+arguments[0]+"' src='"+arguments[1]+"' type='audio/ogg'></audio>").appendTo('music');
		}
	});
})(jQuery);