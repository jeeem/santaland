	$(document).ready(function() {
		//Accordion
		$('.tab_list li:first-child').addClass('active');
		$(".second_tab").champ({
			plugin_type: "accordion",
			side: "left",
			active_tab: "1",
			controllers: "false"
		});
		
		//Scroll To Section
		jQuery(".scrollsecbot").on('click', function(event) {
				if (this.hash !== "") {
				  event.preventDefault();
				  var hash = this.hash;
				  jQuery('html, body').animate({
						scrollTop: jQuery(hash).offset().top
				  }, 800, function(){
					//window.location.hash = hash;
				  });
				}
		});
		
		//Menu click Scroll
		jQuery(".topmenu a").on('click', function(event) {
				if (this.hash !== "") {
				  event.preventDefault();
				  var hash = this.hash;
				  jQuery('html, body').animate({
						scrollTop: jQuery(hash).offset().top
				  }, 800, function(){
					//window.location.hash = hash;
				  });
				}
		});
		
		//Menu Scroll Fix
		var navpos = jQuery('.headersec').offset();
			console.log(navpos.top);
			jQuery(window).bind('scroll', function () {
			if (jQuery(window).scrollTop() > navpos.top) {
				jQuery('.headersec').addClass('headerfix');
			} else {
				jQuery('.headersec').removeClass('headerfix');
			}
		});
		
		/*Add Sidebar Click*/
		jQuery('.opensidebarbtn,.jsrightclose').click(function(){
				jQuery('.rightsidesec').toggleClass("sidebaropen");
				jQuery('body').toggleClass("noscroll");
				//jQuery('.mobilehamburger').toggleClass("openhamburger");		
		});		
		jQuery(document).mouseup(function(e){
			 var popup = jQuery(".rightsidearea");
			 if (!jQuery('.jsrightclose').is(e.target) && !popup.is(e.target) && popup.has(e.target).length == 0) {
				jQuery('.rightsidesec').removeClass("sidebaropen");
				jQuery('body').removeClass("noscroll");
				//jQuery('.mobilehamburger').removeClass("openhamburger");
			 }
		});
		
		/*Mobile Memu*/	
		jQuery('.mobilehamburger').click(function(){
			jQuery('.responsivemenuarea').toggleClass("openmenurespons");
			jQuery('.mobilehamburger').toggleClass("openhamburger");
			
		});
		jQuery('ul.resmenu li a').click(function(){
			jQuery('.mobilehamburger').removeClass("openhamburger");
			jQuery('.responsivemenuarea').removeClass("openmenurespons");
			
		});
	
		
		
		
		
		//Review Slider
		var owl = jQuery('.reviewslider');
		  owl.owlCarousel({
		  	animation: "slide",
			margin: 0,
			nav: false,
			dots: true,
			loop: false,
			responsive: {
			  0: {
				items: 1
			  },
			  767: {
				items: 1
			  },
			  992: {
				items: 1
			  }
			}
		  });
		  
		//Experience Slider
		var owl = jQuery('.experslider');
		  owl.owlCarousel({
		  	center:true,
		  	animation: "slide",
			margin: 0,
			nav: true,
			dots: true,
			loop: true,
			responsive: {
			  0: {
				items: 1
			  },
			  767: {
				items: 2
			  },
			  992: {
				items: 2
			  }
			}
		  });
		  
		  
		  //jQuery("#promotion").fancybox().trigger('click');
		
	});
