/**************************************************************************
 * $.themepunch.revolution.js - $ Plugin for kenburn Slider
 * @version: 1.4.5 (07.10.2012)
 * @requires $ v1.4 or later
 * @author Krisztian Horvath
**************************************************************************/


(function($,undefined){


	////////////////////////////////////////
	// THE REVOLUTION PLUGIN STARTS HERE //
	///////////////////////////////////////

	$.fn.extend({

		///////////////////////////
		// MAIN PLUGIN  FUNCTION //
		///////////////////////////
		showbizpro: function(options) {

				var defaults = {

				};

				options = $.extend({}, $.fn.showbizpro.defaults, options);


				return this.each(function() {

					var container=$(this);
					if (options.entrySizeOffset!=undefined) container.data('eoffset',options.entrySizeOffset);
					if (options.containerOffsetRight!=undefined) container.data('croffset',options.containerOffsetRight);
					if (options.heightOffsetBottom!=undefined) container.data('hboffset',options.heightOffsetBottom);



					var tr = container.find('.showbiz-teaser');
					initTeaserRotator(container,tr);

				})
			},

		///////////////////////
		// METHODE RESUME    //
		//////////////////////
		showbizhode: function(option) {
				return this.each(function() {
					// CATCH THE CONTAINER
					var container=$(this);
				})
		},

		showbizorder: function() {

					// CATCH THE CONTAINER
					var container=$(this);
					return container.data('lastorder');

		},

		showbizremix: function(order) {
				return this.each(function() {
					// CATCH THE CONTAINER
					var container=$(this);


				})
		},

		showbizfilter: function(filter) {
				return this.each(function() {
					// CATCH THE CONTAINER
					var container=$(this);

				})
		}
	})



		///////////////////////////////////////
		// FUNCTION HOVER ON SQUARE ELEMENTS //
		///////////////////////////////////////
		function initTeaserRotator(container,tr) {


			var lb = jQuery(tr.data('left'));
			var rb = jQuery(tr.data('right'));

			var ul = jQuery(this).find('ul');
			//container.css({"overflow":"hidden"});
			lb.data('teaser',tr);
			rb.data('teaser',tr);


			tr.data('offset',0);

			rebuildTeasers(0,container,tr);

			jQuery(this).waitForImages(function() { rebuildTeasers(200,container,tr);})


			// THE RIGHT CLICK EVENT ON TEASER ROTATOR
			// THE LEFT CLICK EVENT ON TEASER ROTATOR
			rb.click(function() {
				var tr=jQuery(this).data('teaser');
				tr.data('offset',tr.data('offset')+1);
				rebuildTeasers(200,container,tr);
			});


			// THE LEFT CLICK EVENT ON TEASER ROTATOR
			lb.click(function() {
				var tr=jQuery(this).data('teaser');
				tr.data('offset',tr.data('offset')-1);
				rebuildTeasers(200,container,tr);
			});

			// IF WINDOW IS RESIZED, TEASER SHOUL REPOSITION ITSELF
			jQuery(window).resize(function() {
				clearTimeout(jQuery(window).data('teaserreset'));
				jQuery(window).data('teaserreset',setTimeout(function() {
						tr.data('offset',0);
					   rebuildTeasers(0,container,tr);
				},150));
			});


			for (var j=0;j<10;j++) {
				jQuery(window).data('teaserreset',setTimeout(function() {
					rebuildTeasers(200,container,tr);
				},j*500));
			}



		}



		/////////////////////////////////////////////////////
		// FUNCTION TO REPOSITION AND REBUILD THE TEASERS //
		////////////////////////////////////////////////////

		function rebuildTeasers(speed,container,tr) {


					var ul = tr.find('ul');
					var offset=tr.data('offset');
					var di = container.innerWidth();



					var ul = tr.find('ul:first');
					maxitem=ul.find('>li').length;
					var rb=$(tr.data('right'));
					rb.removeClass('notclickable');

					var lb=$(tr.data('left'));
					lb.removeClass('notclickable');

					var visibleamount=3;

					if (di>980)  {
							visibleamount=3;
							if (offset>=maxitem-3) {
								offset=maxitem-3;
								rb.addClass("notclickable");

							}
					}

					if (di<981 && di>768)  {
							visibleamount=3;
							if (offset>=maxitem-3) {
								offset=maxitem-3;
								rb.addClass("notclickable");

							}
					}

					if (di<769 && di>420)  {
								visibleamount=2;
								if (offset>=maxitem-2) {
									offset=maxitem-2;
									rb.addClass("notclickable");

								}
					}

					if (di<421)  {
								visibleamount=1;
								if (offset>=maxitem-1) {
									offset=maxitem-1;
									rb.addClass("notclickable");

								}
					}




					if (offset<=0) {
						offset=0;
						lb.addClass("notclickable");
					}

					var space = ul.find('>li:first-child').outerWidth(true) - ul.find('>li:first-child').width();

					var eo=0;
					if (container.data('eoffset')!=undefined) eo=container.data('eoffset') * (visibleamount-1);

					var cro=0;
					if (container.data('croffset')!=undefined) cro=container.data('croffset');



					step=(((di-cro)-(visibleamount-1)*space)/visibleamount);
					step=step-eo;


					tr.data('offset',offset);

					ul.find('>li').each(function() { $(this).width(step) });
					step=ul.find('li:first').outerWidth(true);
					tr.data('step',step);

					if (speed==0)
						ul.css({'left':(0 - (step*offset))+"px"});
					else
						ul.animate({'left':(0 - (step*offset))+"px"},{duration:speed});

					// SET THE HEIGHTS OF THE OUTTER CONTIANER

					var hbo=0;
					if (container.data('hboffset')!=undefined) hbo=container.data('hboffset');
					setTimeout(function() {
							var aktheight=0;
							ul.find('li').each(function(){

									if ($(this).outerHeight(true)>aktheight) aktheight=$(this).outerHeight(true);


							});

							ul.animate({height:(aktheight+hbo)+"px"},{duration:300,queue:false});
							ul.parent().animate({height:(aktheight+hbo)+"px"},{duration:300,queue:false});

					 },410)


		}




})($);




