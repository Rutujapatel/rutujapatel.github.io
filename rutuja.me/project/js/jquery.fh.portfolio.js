/*******************************************************************************
 * jquery.themepunch.Banner.js - jQuery Plugin for Simple Slides Plugin
 * @version: 1.0 (10.01.2012)
 * @requires jQuery v1.2.2 or later
 * @author Krisztian Horvath
********************************************************************************/




(function($,undefined){



	////////////////////////////
	// THE PLUGIN STARTS HERE //
	////////////////////////////

	$.fn.extend({


		// OUR PLUGIN HERE :)
		tpportfolio: function(options) {



		////////////////////////////////
		// SET DEFAULT VALUES OF ITEM //
		////////////////////////////////
		var defaults = {
			portfolioContainer:".portfolio"
		};

			options = $.extend({}, $.fn.tpportfolio.defaults, options);


			return this.each(function() {
				var opt=options;

				var main = $('body').find(opt.portfolioContainer);
				opt.max=main.find('ul:first >li').length;
				//main.find('ul:first').addClass('listfade-img');
				initItems(main,opt);
				arrangeFilters(main,opt);
				arrangeSorters(main,opt);
				arrangeMore(main,opt);
			});

		}
	});

			//////////////////////////////////
			//	SEARCH PREV LI IN THE LIST //
			////////////////////////////////
			function searchPrevLi(li) {
							var ul=li.closest('ul');
							var item=ul.find('li:last-child');
							var lix = li.index();

							if (li.index() == ul.find('li:first-child').index()) lix=999;


							ul.find('li').each(function() {
									if (lix>$(this).index() && $(this).find('.pmore') && $(this).css('display')=="block") {
										item=$(this);
									}
							});

							if (item.find('.pmore').length>0) {
								var pd = $('#portfolio_details .tochange');
								pd.animate({'opacity':0},{duration:250});
								setTimeout(function() {
										item.find('.pmore').click();
										pd.animate({'opacity':1},{duration:250});
								},300);

							} else {
								searchPrevLi(item);
							}
			}


			//////////////////////////////////
			//	SEARCH NEXT LI IN THE LIST //
			////////////////////////////////
			function searchNextLi(li) {
						var ul=li.closest('ul');
						var item=ul.find('li:first-child');
						var lix = li.index();
						var gotit=0;
						if (li.index() == ul.find('li:last-child').index()) lix=-1;


						ul.find('li').each(function() {
							if (gotit==0) {
								if (lix<$(this).index() && $(this).find('.pmore') && $(this).css('display')=="block") {
									item=$(this);
									gotit=1;
								}
							}
						});



						if (item.find('.pmore').length>0) {
							var pd = $('#portfolio_details .tochange');
							pd.animate({'opacity':0},{duration:250});
							setTimeout(function() {
								item.find('.pmore').click();
								pd.animate({'opacity':1},{duration:250});
							},300);
						} else {
							searchNextLi(item);
						}
			}




			///////////////////////////////
			//	ARRANGE THE MORE BUTTONS //
			//////////////////////////////
			function arrangeMore(main,opt) {
				var bod=$('body');
				var pd = $('#portfolio_details');
				main.find('li').each(function(i) {
					$(this).hover(function() {


								$(this).find('.fullcover').height($(this).find('img').height());

					});
				});
				main.find('.pmore').each(function(i) {

					var button = $(this).parent();

					button.click(function() {
						main.removeClass('hoverable');

						$('.portfolio_selector_boss').css({'visibility':'hidden'});
						var li=button.closest('li');



										// UNCLICKABLE LI SIBLINGS
										li.closest('ul').find('li').each(function() {
											var mli = jQuery(this);
											mli.removeClass('selected');
											mli.animate({'opacity':0.3},{duration:200,queue:false});
											mli.addClass('notclickable');
										});
										li.animate({'opacity':1},{duration:200,queue:false});
										li.removeClass('notclickable');
										li.addClass('selected');

										// ADD THE DETAIL INFORMATIONS TO THE DETAIL WINDOW

										pd.find('.portfolio_detail_mediaholder').html(li.data('media'));


										pd.find('.topline').html(li.data('title'));

										pd.find('.subline').html(li.data('subline'));

										pd.find('#detail_innerhtml').html(li.data('innerhtml'));


										// WAIT FOR THE LOADING OF THE BIG IMAGE
										pd.waitForImages(
											function() {
												setTimeout(function() {
													pd.fadeIn(300);
													$('.tp_teaser_navigation').css({'visibility':'visible'});

												},250);
												jQuery('body,html').animate({ scrollTop: (jQuery('#portfolio_details_mask').offset().top - 50)+"px" }, { duration: 500});
											});
										return false;
									});
				});

				bod.find('.tp_teaser_close').click(function() {
					pd.fadeOut(300);
					$('.tp_teaser_navigation').css({'visibility':'hidden'});
					$('.portfolio_selector_boss').css({'visibility':'visible'});
					main.find('li').each(function() {
						var li=$(this);
						li.animate({'opacity':1},{duration:200,queue:false});
						li.removeClass('notclickable');
						li.removeClass('selected');
						pd.find('.portfolio_detail_mediaholder img').attr('src','');
					});
					main.addClass('hoverable');
				});

				bod.find('.tp_teaser_right').click(function() {
					searchNextLi(main.find('li.selected'));
				});

				bod.find('.tp_teaser_left').click(function() {
					searchPrevLi(main.find('li.selected'));
				});

				bod.find('#portfolio_details_mask').each(function() {
					var mask=jQuery(this);
					setInterval(function() {
						mask.stop();
						var newh = pd.height() + 50;
						if (pd.css('display') == "none") newh =0;
						mask.animate({'height':newh+"px"},{duration:200,queue:false});

					},100);
				});

			}


			//////////////////////
			// ARRANGE FILTERS	//
			//////////////////////
			function arrangeFilters(main,opt) {

				var bod=$('body');
				// SET UP THE CLICKS AND THE ANIMATIONS

				bod.find('.portfolio_selector').each(function(){

					// PREPARE THE FIRST START HERE
					var selector=$(this);
					if (selector.data('group') === "grad") {
						selector.addClass('selected_selector');
						selector.parent().addClass('selected_selector');
						opt.filter=selector.data('group');
						removeInactives(main,opt);
						allItemIn(main,opt);
					}


					// CLICK EFFECT
					selector.click(function() {

								if (!main.hasClass("animated")) {
										bod.find('.portfolio_close').click();
										var selector=$(this);
										// ADD AND REMOVE THE FADES FROM THE SELECTORS !!
										// FIRST REMOVE THE SELECTED SELECTORS
										bod.find('.portfolio_selector').each(function(){
											var sels=$(this);
											sels.removeClass('selected_selector');
											sels.parent().removeClass('selected_selector');
										});

										// THAN ADD THE SELECTED SELECTOR TO THE NEW ONE
										selector.addClass("selected_selector");
										selector.parent().addClass('selected_selector');
										opt.filter=selector.data('group');

										allItemOut(main,opt);

											setTimeout(function() {
												removeInactives(main,opt);
												allItemIn(main,opt);
											},350+(opt.max*20));

											setTimeout(function() {
												main.removeClass('zoomanimated');
											},350);

								}

								return false;

					});
				});
			}


			/////////////////////
			// SORT ALPHABETIC //
			////////////////////
			function sortMe(ul,dat,dir){

				ul.find('li').each(function() {
					var ali = $(this);
					var a = ali.data(dat).toLowerCase();
					ul.find('li').each(function() {
						var bli = $(this);
						var b = bli.data(dat).toLowerCase();

						if (dir=="asc") {
									if (dat!="date") {
										if (a>b) bli.after(ali);
									 } else {
										if (Date.parse(a) > Date.parse(b)) bli.after(ali);
									}
						} else {
									if (dat!="date") {
										if (b>a) bli.after(ali);
									} else {
										if (Date.parse(b) > Date.parse(a)) bli.after(ali);
									}
						}


					});
				});
			};


			///////////////////////////
			//  Arrange the Sorters //
			/////////////////////////
			function arrangeSorters(main,opt) {

				var bod=$('body');

				bod.find('#sortoption, #sortdir').change(function() {
					var sele=$(this);
					var txt=sele.find('option:selected').text();
					var val=sele.find('option:selected').val();
					sele.find('.portfolio_sorter_fake').html(txt);

					var dat=bod.find('#sortoption option:selected').val();
					var dir=bod.find('#sortdir option:selected').val();

					if (dat!="null" && dir!="null") {
							bod.find('.portfolio_close').click();
							allItemOut(main,opt);
							setTimeout(function() {
								sortMe(main.find('ul'),dat, dir);
								removeInactives(main,opt);
								allItemIn(main,opt);
							},350+(opt.max*20));

							setTimeout(function() {
								main.removeClass('zoomanimated');
							},350);
					}
				});

				bod.find('#sortoption, #sortdir').each(function() {
					var sele=$(this);
					var val=sele.find('option:selected').text();
					sele.find('.portfolio_sorter_fake').html(val);

					var dat=bod.find('#sortoption option:selected').val();
					var dir=bod.find('#sortdir option:selected').val();

					if (dat!="null" && dir!="null") {

							allItemOut(main,opt);
							setTimeout(function() {
								sortMe(main.find('ul'),dat, dir);
								removeInactives(main,opt);
								allItemIn(main,opt);
							},350+(opt.max*20));

							setTimeout(function() {
								main.removeClass('zoomanimated');
							},350);
					}
				});
			}

			///////////////////////////
			// REMOVE NOT USED ITEMS //
			//////////////////////////
			function removeInactives(main,opt) {

				var st=0;
				main.find('.killerclear').remove();
				main.find('.span3, .span4, .span6, .span2, .span12').each(function() {
					var div=$(this);
					div.removeClass('alpha').removeClass('omega');


					if (div.hasClass(opt.filter)) {

						div.css({'display':'block'});
						if (st==0) {
							div.addClass('alpha');
						} else {
							if (st==opt.row-1) {
								div.addClass('omega');
								div.after('<div class="killerclear" style="clear:both"></div>');
							}
						}

						st=st+1;
						if (st==opt.row)  st=0;


					} else {

						div.css({'display':'none'});
					}
				});


			}

			////////////////////////
			// ALL ITEM  OUT //
			//////////////////////
			function allItemOut(main,opt) {
				main.addClass('zoomanimated');

				main.find('li').each(
						function(i) {

							var item = jQuery(this);
							// CLEAR THE REMOVEMENT IF THERE IS ANY ALREADY
							clearTimeout(item.data('timeout'));
							item.stop();
							//item.delay(i*15).animate({'opacity':0},{duration:300});
							setTimeout(function() {item.addClass("removeme");},i*15); //animate({'opacity':0},{duration:300});
						});
			};


			////////////////////////
			// ALL ITEM  OUT //
			//////////////////////
			function allItemIn(main,opt) {
				main.find('li').each(
						function(i) {

							var item = jQuery(this);

							if (item.css('display')=="block") {
									item.stop();
									//item.delay(i*15).animate({'opacity':1},{duration:300});
									setTimeout(function() {item.removeClass("removeme");},i*15); //animate({'opacity':1},{duration:300});
							}
						});


			};


			/////////////////////
			//	INIT THE ITEMS //
			////////////////////
			function initItems(main,opt) {
				var st=0;
				main.find('.span2, .span3, .span4, .span6, .span12').each(function() {
					var div=$(this);

					div.css({'display':'block'});
						if (st==0) {
							div.addClass('alpha');
						} else {
							if (st==opt.row-1) {
								div.addClass('omega');
								div.after('<div class="killerclear" style="clear:both"></div>');
							}
						}
					st=st+1;
					if (st==opt.row)  st=0;

				});
			}



})(jQuery);


