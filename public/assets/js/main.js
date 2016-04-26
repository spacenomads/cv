jQuery(document).ready(function($) {
	var
		$body = $('body'),
		$section_titles = $body.find('.resume_section .section_title'),
		$header = $body.find('#header');





	/*
	* > Functions
	 */
	/**
	 * Convert a rgb string 'rgb(XX,XX,XX)' into a rgba string with the 'opacity' value
	 * @param  {string} rgb_color
	 * @param  {number} opacity
	 * @return {string} rgba color
	 */
	 var rgb_to_rgba = function(rgb_color, opacity) {
 		return rgb_color.replace(')', ', ' + opacity + ')').replace('rgb', 'rgba');
 	};





	/*
	* > Responsive snitch
	 */
	if ( $body.hasClass('_dev') ) {
		$body.width_snitch({
			style:{}
		})
	}





	/*
	* > Header fixes
	 */
	 var fix_header_background = function() {
	 	if ( $header.data('background') ) {
	 		var default_bg = $header.css('background-color');
	 		$header.css( 'background', $header.data('background') );
			var custom_bg = $header.css('background-color');
			if ( $header.data('opacity') ) {
				var custom_opacity = $header.data('opacity');
				custom_opacity = (custom_opacity-1)*-1;
				var opacity_bg = rgb_to_rgba(default_bg, custom_opacity);
				$header.find( '.wrapper' ).css('background', opacity_bg);
			}
	  }
	 };
	 fix_header_background();




	/*
	* > Section titles color detail
	 */
	$section_titles.each(function(index, el) {
		var
			colored = $(this).text().substring(0,3),
			rest = $(this).text().substring(3),
			color_style = '';

		if ( $(this).data('section-color') ) {
			color_style = ' style="color:' + $(this).data('section-color') + '"';
		}
		$(this).html( '<b' + color_style + '>' + colored + '</b>' + rest );
	});





	/*
	* > Anchor links
	 */
	$body.find( '.anchor').on('click', function(event) {
		event.preventDefault();
		/* Act on the event */
		var target = $(this.hash);
		$('html,body').animate({
			scrollTop: target.offset().top
    }, 1000);
	});




	/*
	* > External links
	 */
	$('.legal a, a.ext').attr('target', '_blank');


});
