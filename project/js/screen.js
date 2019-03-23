
/* #On Document Ready
================================================== */




jQuery(document).ready(function() {


		// Delegate .transition() calls to .animate()
		// if the browser can't do CSS transitions.
		if (!jQuery.support.transition)
			jQuery.fn.transition = jQuery.fn.animate;


	/*	NAVIGATION INITALISATION  */
	initNav();

	/* INIT RESPONSIVE MENU HANDLER */
	menuHandler();

	/*	FULLWIDTH SLIDER ON HOMEPAGE  */
	initFullWidthSilder();

	/* NEGATIVE HOVER EFFECT */
	initNegativeHover();


	/* INIT THE SCROLLPANE FUNCTIONS */
	initScroll();

	/* INFINITE BOX HANDLING */
	infiniteboxInit();

	/* SHOW HIDDEN CONTENT */
	initShowHiddenContent();

	/* INIT SHOWBIZ CONTAINERS */
	initShowBizContainer();



	/* INIT GOOGLE MAP */
	initGoogleMap();

	/* INIT MEDIAS */
	initVideo();
	initAudio();

	/* INIT THE BOOTSTRAP CAROUSEL */
	initCarousel();


	/* INIT PORTFOLIO */
	initPortfolio();

	/* INIT THE REVOLUTION SLIDER IF THERE IS ANY */
	/*initRevSlider();*/

	/* INIT TABS */
	initTabs();


	/* INIT THE FANCYBOX HERE */
	//initFancyBox();

	/* INIT THE SEARCH FIELD HANDLER */
	initSearchFieldLupe();

	/* INIT INPUT FIELDS */
	initInputFields();


	/*INIT HE TWITTER CAROUSEL */
	initTwitterCarousel();

	/*	Init Testimonials */
	initTestimonials();

	/* INIT NEGATIVE HOLDER */
	initNegativeHover();

	/* INIT THE PREVIEW CONFIGURATOR */
	initConfigurator();


	/* INIT HOVER ON BORDEREDBOX */
	initBorderedBox();

});




		/******************************/
		/* THE PREVIEW JQUERY SCRIPT  */
		/******************************/
		function initConfigurator() {

						jQuery('#config-wrapper').css({display:'block'});
						jQuery('.config-closer').click(function()
							{
								var cm=jQuery('#config-menu');
								if (cm.hasClass('active'))
									cm.removeClass('active');
								else
									cm.addClass('active');

							});


						// CLICK ON THE SIZE SWITCHER
						jQuery('.size-switch').each(function() {

							jQuery(this).click(function() {
								jQuery('body').removeClass('boxedlayout').addClass(jQuery(this).data('size'));
								jQuery('#config-menu ul li').each(function() {
										jQuery(this).removeClass('selectedss')
								});
								jQuery(this).addClass('selectedss');
								try { jQuery(window).trigger('resize');
									//revapi5.revnext();
								} catch(e) {}
							})
						})


						// CLICK ON THE COLOR SWITCHER
						jQuery('.config-color').each(function() {

							jQuery(this).click(function() {
									jQuery(this).closest('li').find('div').each(function() { jQuery(this).removeClass('selectedcc')})
									jQuery(this).addClass("selectedcc");

									var maincolor = jQuery('.highlightcolors .selectedcc').data('hex');
									setColor(maincolor);

									jQuery('body').removeClass('red').removeClass('blue').removeClass('green').removeClass('orange').removeClass('ocean').addClass(jQuery('.highlightcolors .selectedcc').data('class'));

									return false;
								});
						});

						// CLICK ON THE COLOR SWITCHER
						jQuery('.bg-image').each(function() {

							jQuery(this).click(function() {
									jQuery(this).closest('li').find('div').each(function() { jQuery(this).removeClass('selectedcc')})
									jQuery(this).addClass("selectedcc");
									var bgurl = "url(images/pattern/"+jQuery(this).data('bg')+".png)";
									jQuery('body').css({"backgroundImage":bgurl});
									return false;
								});
						});


						// SHOW A BIT THE CONFIGURATOR FIRST
						setTimeout(function() {
								//jQuery('.config-closer').click()
								setTimeout(function() {
									//jQuery('.config-closer').click()
								},1000);

							},3000);


		}


		function setColor(maincolor) {
				if (jQuery('#krikilink').length>0) {
						jQuery("#krikilink").remove();
				}
				jQuery("<link/>", {
					id : "krikilink",
					rel: "stylesheet",
					type: "text/css",
					href: "http://www.thunderbuddies4life.com/sixth_html/css/style.php?maincolor="+maincolor
				}).appendTo("head");

		}

			//////////////////////////////
			//	INIT THE BORDEREDBOX	//
			/////////////////////////////
			function initBorderedBox() {
				jQuery('.borderedbox').each(function() {
					var bb=jQuery(this);
					bb.hover(function() {
						if (jQuery(window).width()>767) {
							clearTimeout(bb.data('timer'));

							var bh = bb.find('.box-hidesection');
							if (!bh.hasClass("hovered")) {
								bb.animate({'marginTop':(0-bh.height())+"px"},{duration:200,queue:false});
								clearTimeout(bh.data('timer'));
								bh.addClass("hovered");
								bh.data('timer',setTimeout(function() {bh.slideDown(200);},300));
							}
						}

					},
					function() {
						if (jQuery(window).width()>767) {
							clearTimeout(bb.data('timer'));
							bb.data('timer',setTimeout(function() {

								var bh = bb.find('.box-hidesection');
								bh.removeClass("hovered");
								clearTimeout(bh.data('timer'));
								bh.data('timer',setTimeout(function() {
									bb.animate({'marginTop':"0px"},{duration:100,queue:false});
								},100));
								bh.slideUp(100);
							},550));
						}
					})
				})
			}


			//////////////////////////////
			//	INIT THE TESTIMONIALS	//
			/////////////////////////////
			function initTestimonials() {
				jQuery('.testimonials').each(function() {

					var test=jQuery(this);
					var ul=test;
					var lbutton = jQuery('#'+jQuery(this).data('navigation')).find('.leftbutton');
					var rbutton = jQuery('#'+jQuery(this).data('navigation')).find('.rightbutton');
					pos=0;

					var maxe = test.find('>li').length;


					// IF WINDOW IS RESIZED, THEN SLIDES NEED TO BE MOVED INTO THE RIGHT POSITION
					jQuery(window).resize(function() {
						clearTimeout(test.data('resized'));
						test.data('resized',setTimeout(function() {
							test.find('>li').each(function(i) {
								var li=jQuery(this);
								if (i!=pos) {
									li.animate({'opacity':0});
								} else {
									li.animate({'opacity':1});
									ul.animate({'height':li.outerHeight()+"px"},{duration:300});
								}
							});

						},200));

					});


					test.find('>li').each(function(i) {
						var li=jQuery(this);
						if (i!=0) {
							li.animate({'opacity':0});
						} else {
							li.animate({'opacity':1});
							ul.animate({'height':li.outerHeight()+"px"},{duration:300});
						}

					});

					lbutton.click(function() {


						pos=pos-1;
						if (pos<0) pos=maxe-1;
						test.find('>li').each(function(i) {
							var li=jQuery(this);
							li.stop();
							if (i!=pos) {
								li.animate({'top':'20px','opacity':0},{duration:400,queue:false});
								li.data('timer1',setTimeout(function() {li.css({'display':'none'})},400));
							 } else {
								clearTimeout(li.data('timer1'));
								li.css({'top':'-20px','opacity':0,'display':'block'});

								setTimeout(function() {li.animate({'top':'0px','opacity':1},{duration:300,queue:false});},100);
								ul.stop();
								ul.animate({'height':li.outerHeight()+"px"},{duration:300,queue:false});
							}
						});
					});

					rbutton.click(function() {

						pos=pos+1;
						if (pos==maxe) pos=0;
						test.find(' >li').each(function(i) {
							var li=jQuery(this);
							li.stop();
							if (i!=pos) {
								li.animate({'top':'20px','opacity':0},{duration:400,queue:false});
								li.data('timer1',setTimeout(function() {li.css({'display':'none'})},400));
							 } else {
								clearTimeout(li.data('timer1'));
								li.css({'top':'-20px','opacity':0,'display':'block'});

								setTimeout(function() {li.animate({'top':'0px','opacity':1},{duration:300,queue:false});},100);
								ul.stop();
								ul.animate({'height':li.outerHeight()+"px"},{duration:300,queue:false});
							}
						});
					});

				});
			}

		///////////////////////
		// INIT INPUT FIELDS //
		//////////////////////

		function initInputFields() {

			// Check the Search value on Standard
				jQuery(".prepared-input, .searchinput").each(function() {
					var field=jQuery(this);
					field.data('standard',field.val());
				});


				jQuery(".prepared-input, .searchinput").focus(function(){
					var $this = jQuery(this);

					$this.val($this.val()== $this.data('standard') ? "" : $this.val());
				});
				jQuery(".prepared-input, .searchinput").blur(function(){
					var $this = jQuery(this);
					$this.val($this.val()== "" ? $this.data('standard') : $this.val());
				});
		}


		////////////////////
		// INIT REVSLIDER //
		////////////////////
		function initRevSlider() {
			jQuery('.banner').revolution(
						{
							delay:9000,
							startheight:380,
							startwidth:1140,


							hideThumbs:200,

							thumbWidth:100,							// Thumb With and Height and Amount (only if navigation Tyope set to thumb !)
							thumbHeight:50,
							thumbAmount:5,

							navigationType:"none",				// bullet, thumb, none
							navigationArrows:"solo",				// nexttobullets, solo (old name verticalcentered), none

							navigationStyle:"round",				// round,square,navbar,round-old,square-old,navbar-old, or any from the list in the docu (choose between 50+ different item), custom


							navigationHAlign:"center",				// Vertical Align top,center,bottom
							navigationVAlign:"bottom",					// Horizontal Align left,center,right
							navigationHOffset:0,
							navigationVOffset:20,

							soloArrowLeftHalign:"left",
							soloArrowLeftValign:"center",
							soloArrowLeftHOffset:20,
							soloArrowLeftVOffset:0,

							soloArrowRightHalign:"right",
							soloArrowRightValign:"center",
							soloArrowRightHOffset:20,
							soloArrowRightVOffset:0,

							touchenabled:"on",						// Enable Swipe Function : on/off
							onHoverStop:"on",						// Stop Banner Timet at Hover on Slide on/off

							stopAtSlide:-1,							// Stop Timer if Slide "x" has been Reached. If stopAfterLoops set to 0, then it stops already in the first Loop at slide X which defined. -1 means do not stop at any slide. stopAfterLoops has no sinn in this case.
							stopAfterLoops:-1,						// Stop Timer if All slides has been played "x" times. IT will stop at THe slide which is defined via stopAtSlide:x, if set to -1 slide never stop automatic

							hideCaptionAtLimit:0,					// It Defines if a caption should be shown under a Screen Resolution ( Basod on The Width of Browser)
							hideAllCaptionAtLilmit:0,				// Hide all The Captions if Width of Browser is less then this value
							hideSliderAtLimit:0,					// Hide the whole slider, and stop also functions if Width of Browser is less than this value

							shadow:1,								//0 = no Shadow, 1,2,3 = 3 Different Art of Shadows  (No Shadow in Fullwidth Version !)
							fullWidth:"on"							// Turns On or Off the Fullwidth Image Centering in FullWidth Modus
						});
		}




		////////////////////////////////
		// INIT HE TWITTER CAROUSEL //
		/////////////////////////////
		function initTwitterCarousel() {
			jQuery('.tweets').each(function() {
				var tw=jQuery(this);
				var initT= setInterval(function() {
						tw.find('li').each(function(i) {
							var li = jQuery(this);
							if (i>0) li.slideUp(0);
						});
						if (tw.find('li').length>0) {
							clearInterval(initT);
							tw.data('ready',1);
						}
					},100);

				var lb = jQuery(tw.data('left'));
				var rb = jQuery(tw.data('right'));

				lb.click(function() {
					if (tw.data('ready') == 1) {
						tw.find('li:first-child').slideUp(500,function() {
								jQuery(this).appendTo(jQuery(this).parent());
							});
						tw.find('li:nth-child(2)').slideDown(500);
					}
				});

				rb.click(function() {
					if (tw.data('ready') == 1) {
						tw.find('li:nth-child(1)').slideUp(500);
						tw.find('li:last-child').prependTo(tw.find('ul'));
						tw.find('li:first-child').slideDown(500);

					}
				});
			});

		}












		///////////////////////////
		// INIT THE RATING STARS //
		///////////////////////////
		function initRatings() {
			jQuery('.rating-available .icon-star').on('mouseenter',function() {
				var cur=jQuery(this);
				if (cur.parent().hasClass('rating-available'))
					cur.parent().find('.icon-star').each(function() {

						if (jQuery(this).index()<=cur.index())
							jQuery(this).addClass('selected');
						else
							jQuery(this).removeClass('selected');

					});
			});

			jQuery('.rating-available .icon-star').on('mouseleave',function() {
				var cur=jQuery(this);

				if (cur.parent().hasClass('rating-available'))
					cur.parent().find('.icon-star').each(function() {
							jQuery(this).removeClass('selected');
					});
			});

			jQuery('.rating-available .icon-star').on('click',function() {
				var cur=jQuery(this);
				cur.parent().find('.icon-star').each(function() {

					if (jQuery(this).data('selected')==true) {
						jQuery(this).addClass('selected');
					} else {
						jQuery(this).removeClass('selected');
					}

				});
				cur.parent().removeClass('rating-available');
			});

			jQuery('.rating-available').on( 'mouseleave',function() {
				var cur=jQuery(this);
				cur.find('.icon-star').each(function() {

					if (jQuery(this).data('selected')==true) {
						jQuery(this).addClass('selected');
					} else {
						jQuery(this).removeClass('selected');
					}

				});
			});
		}



		///////////////////////////////////
		// INIT THE LIKE SOMETHING HERE  //
		///////////////////////////////////
		function initLikeSomething() {
			jQuery('.not-liked-yet').on('click',function() {
				var hea = jQuery(this).find('.icon-heart');
				hea.html(parseInt(hea.html(),0)+1);
				jQuery(this).unbind('click');
			});
		}



		///////////////////////////
		// POST SLIDER DRAG&DROP //
		///////////////////////////
		function initPostSliderEffects()  {

			var settings = {
				showArrows: false,
				hideFocus: true,
				autoReinitialise: true
			};
			var pane = jQuery('.postslider_navigation')
			pane.jScrollPane(settings);
			var api = pane.data('jsp');

		}



		////////////////////
		//	INIT FANCYBOX //
		///////////////////
		function initFancyBox() {
			//HELPER FUNCTION FOR HTML5 VALIDATION
			jQuery(".fancybox, .fancybox-media").each(function(){
				$this = jQuery(this);
				$this.attr("rel",$this.data("rel"));
			});

			// FANCY BOX ( LIVE BOX) WITH MEDIA SUPPORT
			jQuery(".fancybox").fancybox({
				openEffect  : 'none',
				closeEffect : 'none',
				autoCenter : 'true',
				helpers : {
					media : {}
				}
			});

			jQuery(".fancybox-media").fancybox({
				openEffect  : 'none',
				closeEffect : 'none',
				autoCenter : 'true',
				helpers : {
					media : {}
				}
			});

		}


		////////////////////
		//	INIT SEARCH //
		///////////////////
		function initSearchFieldLupe() {
			var sw=jQuery('.sticky-right .search_wrap');
			var socw = jQuery('.sticky-right .social_wrap');
			sw.find('.searchbutton').click(function() {
				if (sw.hasClass("opened")) {
					sw.removeClass("opened")
					socw.removeClass("hidden")

				} else {
					sw.addClass("opened");
					socw.addClass("hidden")
				}
			})
		}


		////////////////
		//	INIT TABS //
		///////////////
		function initTabs() {
			//	jQuery(".tab-content div:first , .tabinit li:first").addClass("active in");
		}

		///////////////////////////////////////
		//	-	SCROLLPANE INITIALISATION -  //
		///////////////////////////////////////
		function initScroll() {

			var settings = {
				showArrows: false,
				autoReinitialise: true
			};
			var pane = jQuery('.scroll-pane')
			pane.jScrollPane(settings);
			var api = pane.data('jsp');




		}




		//////////////////////////////////////////
		//	-	CALL THE PORTFOLIO PLUGIN	-	//
		//////////////////////////////////////////
		function initPortfolio(){


			if (jQuery('.portfolio.portfolio_rotator').length) {

				var row_items=1;

				if (jQuery('.portfolio.portfolio_rotator .span2').length>0)
					row_items=6;


				if (jQuery('.portfolio.portfolio_rotator .span3').length>0)
					row_items=4;

				if (jQuery('.portfolio.portfolio_rotator .span4').length>0)
					row_items=3;

				if (jQuery('.portfolio.portfolio_rotator .span6').length>0)
					row_items=2;

				if (jQuery('.portfolio.portfolio_rotator .span12').length>0)
					row_items=1;


				jQuery('body').tpportfolio({
					speed:500,
					row:row_items,
					nonSelectedAlpha:0,
					portfolioContainer:'.portfolio'
				});
			}


		}



	/////////////////////////////////
	// FUNCTION TO FIT THE VIDEO   //
	////////////////////////////////
	function initCarousel() {
		jQuery('.carousel').carousel({
			interval: 2000
			})
	}


	/////////////////////////////////
	// FUNCTION TO FIT THE VIDEO   //
	////////////////////////////////
	function initVideo(){
		//fit all videos in their parent container
		jQuery(".scalevid").fitVids();
	}

	/////////////////////////////////
	// FUNCTION TO INIT THE AUDIO   //
	////////////////////////////////
	function initAudio() {
		jQuery('audio,video').mediaelementplayer({
			pluginPath: 'js/',
			// name of flash file
			flashName: 'flashmediaelement.swf',
			// name of silverlight file
			silverlightName: 'silverlightmediaelement.xap',
			success: function(player, node) {
				jQuery('#' + node.id + '-mode').html('mode: ' + player.pluginType);
			}
		});
	}


	//////////////////////////////////////
	// FUNCTION TO INIT THE GOOGLE MAP  //
	/////////////////////////////////////
	function initGoogleMap() {
		 jQuery(window).load(function(){
				    			              //set google map with marker
				    					      jQuery("#googlemap1").gMap({
				    			                  markers: [{
				    			                              address: "Fenway Park, Boston"}],
				    			                  zoom: 14,
				    			                  maptype : "ROADMAP"
				    			              });
				    			          });
	}





	///////////////////////////////////////////////
	// FUNCTION TO INIT THE SHOWBOZ CONTAINERS   //
	//////////////////////////////////////////////
	function initShowBizContainer() {
			jQuery(document).ready(function() {

					jQuery('.showbiz-container').showbizpro({
							containerOffsetRight:0,
							heightOffsetBottom:3
						});
					});
	}

	///////////////////////////////////////////////
	// FUNCTION TO SHOW HIDDEN CONTENT HANDLING //
	//////////////////////////////////////////////
	function initShowHiddenContent() {
		jQuery('body').find('.showhiddencontent').each(function() {
			var shc=jQuery(this);
			var hc= shc.parent().find('.hidden_content');

			if (shc.parent().hasClass("isshowing")) {
					shc.addClass("active");
					shc.parent().addClass("isshowing");
					hc.slideDown(300);
			}

			shc.click(function() {
				var shc=jQuery(this);
				var hc= shc.parent().find('.hidden_content');

				if (shc.parent().hasClass("isshowing")) {
					shc.removeClass("active");

					hc.slideUp(300, function() {shc.parent().removeClass("isshowing");});
				} else {
					shc.addClass("active");
					shc.parent().addClass("isshowing");
					hc.slideDown(300);
				}
			})
		})
	}

	//////////////////////////////////////
	// FUNCTION TO infinitebox HANDLING //
	//////////////////////////////////////
	function infiniteboxInit(spapi) {
		jQuery('.infinitebox').each(function() {
			var ibox=jQuery(this).addClass("closed");

			// CLICKING ON ONE ICON SHOULD OPEN / CLOSE THE BOX
			ibox.find('.ib-draw').each(function(i) {

			var draw=jQuery(this);

				draw.click(function() {
					if (jQuery(window).width()>767) {
							var ibicon=draw.find('.ib-icon');
							closeOtherInfinite(ibox.attr('id'));

							if (ibicon.hasClass('selected')) {
								ibox.removeClass('opened').addClass("closed");
								ibox.find('.selected').removeClass("selected");
							} else {

								if (ibox.hasClass('opened')) {
									ibox.removeClass("opened").addClass("closed");
									setTimeout(function() {
												ibox.find('.active').removeClass("active");
												jQuery(draw.data('targetwrap')).addClass("active");
												ibox.addClass("opened").removeClass("closed");
												//spapi.reinitalise(700)
											},600);
								} else {
										ibox.find('.active').removeClass("active");
										jQuery(draw.data('targetwrap')).addClass("active");
										ibox.addClass("opened").removeClass("closed");
								}
								ibox.find('.selected').removeClass("selected");
								ibicon.addClass("selected");
							}
					}
				});

				if (i==0) draw.click();
			});
		});


		jQuery(window).resize(function() {
			if (jQuery(window).width()<980 && jQuery(window).width()>767)  closeOtherInfinite();
		});


	}

	//////////////////////////////
	// CLOSE ALL INFINITE BOX  //
	/////////////////////////////
	function closeOtherInfinite(current) {

		jQuery('.infinitebox').each(function() {
					var ibox=jQuery(this);

					if (ibox.attr('id')!=current && jQuery(window).width()<980) {

						ibox.find('.ib-draw').each(function() {
								var draw=jQuery(this);
								var ibicon=draw.find('.ib-icon');
								ibox.removeClass('opened').addClass("closed");
								ibox.find('.selected').removeClass("selected");
						});
					}
		});
	}



	//////////////////////////////
	// NAVIGATION INITALISATION //
	//////////////////////////////
	function initNav() {
		var nav = jQuery('#nav');

		// PREPARRING
		nav.find('>ul>li').each(
			function() {
				nav.find('>ul>li').css({'z-index':1});
				jQuery(this).css({'z-index':2});
				var maxw=0;
				jQuery(this).find('li').each(function() {
					var li=jQuery(this).find('a');
					if (maxw<li.innerWidth()) maxw=li.innerWidth();
				})

				jQuery(this).find('ul').each(function() {
					var ul=jQuery(this);
					if (!ul.hasClass("adjusted")) {
						if (ul.parent().hasClass("hassubmenu"))
							ul.width(maxw).addClass("adjusted");
						else
							ul.width(maxw).addClass("adjusted");
					}

					ul.find('a').each(function() {
						var a=jQuery(this);
						var curw=a.innerWidth(true);
						var curpr=a.css('paddingRight');
						if (curpr==undefined) curpr=0;

						var dif = maxw-parseInt(curw.width(),0)-parseInt(curpr,0);
						a.css({'paddingRight':dif});
					});

				});
			});



		nav.find('>ul>li').hover(
			function() {
				nav.find('>ul>li').css({'z-index':1});
				resetNavWidth(nav);
				jQuery(this).css({'z-index':2});
				var maxw=0;
				jQuery(this).find('li').each(function() {
					var li=jQuery(this).find('a');
					if (maxw<li.innerWidth()) maxw=li.innerWidth(true);
				})

				jQuery(this).find('ul').each(function() {
					var ul=jQuery(this);
					if (!ul.hasClass("adjusted")) {
						if (ul.parent().hasClass("hassubmenu"))
							ul.width(maxw).addClass("adjusted");
						else
							ul.width(maxw).addClass("adjusted");
					}

					ul.find('a').each(function() {
						var a=jQuery(this);
						var curw=a.innerWidth(true);
						var curpr=a.css('paddingRight');
						if (curpr==undefined) curpr=0;

							var dif = maxw-parseInt(curw.width(),0)-parseInt(curpr,0);
						a.css({'paddingRight':dif});
					});

				});
			},
			function() {
				jQuery(".showsubmenu").each(function() {jQuery(this).removeClass("showsubmenu")});
		});

		function resetNavWidth(nav) {
			nav.find('>ul>li>ul>li>ul').each(function() {
				var ul=jQuery(this);
				var li=ul.parent();
				var papaul =li.closest('ul');
				ul.css({'left':(-3-ul.outerWidth(true))+'px'});
			});
		}

	}

	//////////////////////////////
	// FULLWIDTH SLIDER			 //
	//////////////////////////////

	function initFullWidthSilder() {


		jQuery('.fullwidth_slider').each(function() {
			// CATCH ALL THE ENTRIES

			var fwslider = jQuery(this);
			fwslider.find('.fs-entry').each(function() {
					var ent=jQuery(this);


					// WRAP THE ENTRIES IN DIVS
					ent.append('<div class="imageholder"></div>');

					// SET THE BG OF THE CONTAINERS
					ent.find('.imageholder').css({'background-image':'url('+ent.data("src")+')'});

					// ON HOVER WE HIDETHE OTHER ENTRIES
					ent.find('.seemore').hover(
					function() {
						if (jQuery('.fullwidth_slider').data('drag') != 1)
							jQuery('.fullwidth_slider .fs-entry').each(function() {
								jQuery(this).addClass("notselected");
								ent.removeClass("notselected");
							})
					},
					function() {
						jQuery('.fullwidth_slider .fs-entry').each(function() {
							jQuery(this).removeClass("notselected");
						})
					})

					ent.find('.seemore').click(function() {
						var ent=jQuery(this).parent();

						jQuery('.fullwidth_slider .fs-entry').each(function() {
							jQuery(this).removeClass("notselected").addClass("allnotselected").removeClass('selected');
						});
						ent.removeClass('allnotselected').addClass("selected");
						var mi=ent.closest('.slider_wrapper').find('.fs-moreinfo');

						mi.slideUp(300);
						setTimeout(function() { mi.html(ent.data('content'));},300);
						mi.delay(100).slideDown(500);
					})
			});


			// CALL THE SWIPE FUNCTION TO THE ITEM
			fwslider.parent().overscroll({
				cancelOn: '.no-drag',
				hoverThumbs: true,
				//persistThumbs: true,
				showThumbs: false,
				scrollLeft: 300,
				direction:"horizontal",
				wheelDirection:"vertical",
				scrollDelta:5.7,
				scrollLeft: 0,
				captureThreshold:1,
				driftDecay:1.1,
				driftTimeout: 100
			}).on('overscroll:dragstart overscroll:driftstart', function(event){

				jQuery('.fullwidth_slider .fs-entry').each(function() {
							jQuery(this).removeClass("notselected");
						})
				fwslider.data('drag',1);
			}).on('overscroll:dragend overscroll:driftend', function(event){
								fwslider.data('drag',0);
			});




		});



		// RESIZE THE ENTRIES, AND TAN RESIZE EVERY TIME WE NEED
		resizeFullWidthSlider();
		jQuery(window).resize(function() {
			resizeFullWidthSlider();
		});
	}

	///////////////////////////////////
	// THE FULLWIDTH SLIDER RESIZING //
	///////////////////////////////////
	function resizeFullWidthSlider() {



		jQuery('.fullwidth_slider').each(function() {
			var l=0;
			var t=0;
			var fwslider=jQuery(this);

			// WIDTH OF THE SCREEN
			var sw=jQuery(window).width();

			var spaces=20;

			if (sw<720) spaces=10;

			// THE DIMENSION OF THE CURRENT ITEM
			var ww=0;
			var hh=0;

			// THE HEIGHT OF THE FULLWIDTH SLIDER
			var fwheight = 450;
			var fwwidth = 450;

			if (sw<1200 && sw>420) {
				var prop = (sw/1200)*1.4;
				if (prop>1) prop=1;
				fwheight=Math.round(fwheight*prop);
				fwwidth=Math.round(fwwidth*prop);
			}

			if (sw<421) {
				var prop = (sw/1200)*1.9;
				if (prop>1) prop=1;
				fwheight=Math.round(fwheight*prop);
				fwwidth=Math.round(fwwidth*prop);
			}

			// SET THE RIGHT HEIGHT OF THE ELEMENT
			fwslider.height(fwheight);

			jQuery(this).find('.fs-entry').each(function() {
					var ent=jQuery(this);

					// SIZING THE BOXES
					if (ent.hasClass("fs-maxw")) ww=fwwidth;
					if (ent.hasClass("fs-twothirdw")) ww=fwwidth/3*2;
					if (ent.hasClass("fs-onethirdw")) ww=fwwidth/3;
					if (ent.hasClass("fs-halfw")) ww=fwwidth/2;

					if (ent.hasClass("fs-maxh")) hh=fwheight;
					if (ent.hasClass("fs-twothirdh")) hh=(fwheight/3*2)-(spaces/2);
					if (ent.hasClass("fs-onethirdh")) hh=(fwheight/3)-(spaces*2/3);
					if (ent.hasClass("fs-halfh")) hh=(fwheight/2)-(spaces/2);

					// POSITION OF THE ITEMS
					ent.css({'width':ww+"px", 'height':hh+"px",'left':l+"px", 'top':t+"px"});

					// REPOSITION THE NEXT ITEM

					if (t+ent.height()<fwheight-4)
						t=t+ent.height()+spaces;
					else
						{
							t=0;
							l=l+ent.width()+spaces;
						}
					fwslider.width(l);
			})
		})
	  }


			//////////////////////////
			//	MENU HANDLER  	    //
			//////////////////////////
			function menuHandler() {

				var defpar = jQuery('#nav').parents().length;

				jQuery('#nav >ul>li').each(function(i) {
					var main=jQuery(this);

					var newtxt=jQuery("<div>"+main.text()+"</div>").text();
					if (main.find('.toplevel')) newtxt = jQuery("<div>"+main.find('.toplevel').text()+"</div>").text().toLowerCase();



					if (main.find('ul').length>0)
						jQuery('#responsive-menu ul').append('<li class="rev-toplevel">'+newtxt+'</li>');
					else
						jQuery('#responsive-menu ul').append('<a href="'+main.find('a').attr('href')+'"><li class="rev-toplevel">'+newtxt+'</li></a>');

					main.find('>ul>li').each(function() {
						var sub=jQuery(this);
						var newtxt=jQuery("<div>"+sub.html()+"</div>").html().split('<ul')[0];

						jQuery('#responsive-menu ul').append('<li class="rev-sublevel">'+newtxt+'</li>');

						sub.find('>ul>li').each(function() {
							var subsub=jQuery(this);
							var newtxt=jQuery("<div>"+subsub.html()+"</div>").html().split('<ul')[0];
							jQuery('#responsive-menu ul').append('<li class="rev-subsublevel">'+newtxt+'</li>');
						});

					});



				});

				/*jQuery('#nav li a').each(function(i) {
					var a=jQuery(this);
					var par= a.parents().length-defpar -3;


					if (par==0)
						var newtxt=jQuery("<div>"+a.text()+"</div>").text();
					else
						if (par==2)
							var newtxt=jQuery("<div>&nbsp;&nbsp;&nbsp;"+a.text()+"</div>").text();
						else
							if (par==4)
								var newtxt=jQuery("<div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+a.text()+"</div>").text();
					var submenu="res-mainmenu";

					if (par==3) submenu="res-submenu";
					if (par==5) alert("k");

					 jQuery('#responsive-menu ul').append('<a href="'+a.attr('href')+'"><li class="'+submenu+'">'+a.text()+'</li></a>');
				});


*/


				jQuery(document).scroll(function() {
					var pos=Math.abs(jQuery(document).scrollTop());
					var jm=jQuery('#responsive-menu');
					var max=jm.position().top+jm.height();
					if (pos>max-100) pos=max-100;
					jQuery('.resp-closer').css({top:+pos+"px"});
				})

				jQuery('.resp-navigator').click(function() {
					setTimeout(function() {jQuery('#responsive-menu').addClass('active');},100);
					jQuery('.responsive_wrapper').addClass('active');
					setTimeout(function() {jQuery('.resp-closer').css({top:Math.abs(jQuery(document).scrollTop())+"px"});},100);
					setTimeout(function() {jQuery('.responsive_wrapper').height(jQuery('#responsive-menu').height()+500)},600);

				})

				jQuery('.resp-closer').click(function() {

					jQuery('#responsive-menu').removeClass('active');
					setTimeout(function() {
						jQuery('.responsive_wrapper').removeClass('active');
					},1000);

				})


			}

	///////////////////////////////////
	// Negative Hover Effect Init    //
	///////////////////////////////////
	function initNegativeHover() {

		jQuery('.negativehover').each(function() {
			var gr=jQuery(this);
			gr.find('.nhitem').each(function() {
						var it=jQuery(this);
						it.hover(
							function() {
										gr.find('.nhitem').each(function() {
												jQuery(this).addClass('faded');
										})
										jQuery(this).removeClass('faded');
								},
								function() {
										gr.find('.nhitem').each(function() {
													jQuery(this).removeClass('faded');
											})
								})
			})
		})
	}




