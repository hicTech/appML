/*
 * ################# DATI APP ITA ###################
 * ################# DATI APP ITA  ###################
 * ################# DATI APP ITA  ###################
 * ################# DATI APP ITA  ###################
 * ################# DATI APP ITA  ###################
 */



appMLjson = {
	"panels": [
		{
		"id": "home",
		"title": "Home",
		"icon": "home.png",
		"pages": [
			{
			"id": "home_page",
			"title": "Home",
			"contents": [
				{
				"type": "paragraph",
				"text": "<div style='min-height:90px'><img style='float:left; margin:0px 10px 0px 0px' src='packaging/apple-touch-icon-57x57.png'><b>Fish in Italy</b> è una partnership di sviluppo tra imprese che appartengono a due territori del sud:la Calabria e la Sicilia.</div>"
				},
				{
				"type": "button",
				"label": " vedi su mappa",
				"linked_page_id": "cala"
			},
				{
				"type": "menu",
				"className": "arrow_list",
				"title": "Aziende in Italia",
				"items": [
							{
								"className": "arrow",
								"linked_page_id": "cala",
								"label": "Calabria"
							}	
						]
				},
				{
				"type": "carousel",
				"items_type": "foto",
				"prePath": "img/interior",
				"sizes": {
					"tablet": {
						"width": "580",
						"height": "386"
					},
					"desktop": {
						"width": "700",
						"height": "465"
					},
					"smartphone": {
						"width": "310",
						"height": "206"
					}
				},
				"items": [
					{
					"url": "1.jpg",
					"caption": "Relax Chair"
				},
					{
					"url": "2.jpg",
					"caption": "Stool"
				}
				]
			}
			]
		},
			{
			"id": "cala",
			"title": "Calabria",
			"contents": [
				{
				"type": "paragraph",
				"text": "<div style='min-height:110px'><img style='float:left; margin:0px 10px 0px 0px' src='packaging/apple-touch-icon-57x57.png'><b>pagina Calabria</b> è una partnership di sviluppo tra imprese che appartengono a due territori del sud:la Calabria e la Sicilia.</div>"
			},
				{
				"type": "menu",
				"className": "arrow_list",
				"title": "Aziende in Calabria",
				"items": [
					{
					"className": "arrow",
					"linked_page_id": "ross_2000",
					"label": "Rossano 2000"
				},
					{
					"className": "arrow",
					"linked_page_id": "stocco",
					"label": "Stocco & Stocco"
				}
				]
			}
			]
		},
			{
			"id": "ross_2000",
			"title": "Rossano 2000",
			"contents": [
				{
				"type": "paragraph",
				"text": "<div style='min-height:110px'><b>Fish in Italy</b> è una partnership di sviluppo tra imprese che appartengono a due territori del sud:la Calabria e la Sicilia.</div>"
			},
			{
				"type": "button",
				"label": " vedi su mappa",
				"linked_page_id": "map_ross_2000"
			},
				{
				"type": "carousel",
				"items_type": "foto",
				"prePath": "immGallery/interior",
				"sizes": {
					"tablet": {
						"width": "580",
						"height": "386"
					},
					"desktop": {
						"width": "700",
						"height": "465"
					},
					"smartphone": {
						"width": "310",
						"height": "206"
					}
				},
				"items": [
					{
					"url": "1.jpg",
					"caption": "Relax Chair"
				},
					{
					"url": "2.jpg",
					"caption": "Stool"
				}
				]
			}
			]
		},
			{
			"id": "map_ross_2000",
			"title": "Mappa",
			"scrollable": "false",
			"contents": [
				{
				"type": "map",
				"points_menu": "true",
				"points": [
					{
					"label": "Un punto",
					"description": "Informazioni primo punto",
					"lat": "42.85734888",
					"lon": "9.2678847"
				}
				]
			}
			]
		},
			{
			"id": "stocco",
			"title": "Stocco & Stocco",
			"contents": [
				{
				"type": "paragraph",
				"text": "<div style='min-height:110px'><b>Fish in Italy</b> è una partnership di sviluppo tra imprese che appartengono a due territori del sud:la Calabria e la Sicilia.</div>"
			},
				{
				"type": "button",
				"label": " vedi su mappa",
				"linked_page_id": "map_stocco"
			},
				{
				"type": "carousel",
				"items_type": "foto",
				"prePath": "http://www.fishinitaly.eu/app/aziende/calabria/stocco",
				"sizes": {
					"tablet": {
						"width": "580",
						"height": "386"
					},
					"desktop": {
						"width": "700",
						"height": "465"
					},
					"smartphone": {
						"width": "310",
						"height": "206"
					}
				},
				"items": [
					{
					"url": "1.jpg",
					"caption": "Relax Chair"
				},
					{
					"url": "2.jpg",
					"caption": "Stool"
				}
				]
			}
			]
		},
			{
			"id": "map_stocco",
			"title": "Mappa",
			"scrollable": "false",
			"contents": [
				{
				"type": "map",
				"points_menu": "true",
				"points": [
					{
					"label": "Un punto",
					"description": "Informazioni punto",
					"lat": "43.8574888",
					"lon": "19.2678847"
				}
				]
			}
			]
		}

			]
	},
		
		{
		"id": "altro",
		"title": "Altro",
		"icon": "altro.png",
		"pages": [
			{
			"id": "altro_pagina_2",
			"title": "Titolo pag3",
			"contents": [
				{
				"type": "paragraph",
				"text": "<b>we</b><br>we!!!!"
			},
				{
				"type": "menu",
				"className": "arrow_list",
				"title": "Atro",
				"items": [
					{
					"className": "arrow",
					"linked_page_id": "eventi",
					"label": "Gli Eventi"
				},
					{
					"className": "arrow",
					"linked_page_id": "eventi",
					"label": "Il Ricettario"
				},
					{
					"className": "arrow",
					"linked_page_id": "eventi",
					"label": "L'ufficio Stampa"
				}
				]
			}
			]
		},
			{
			"id": "eventi",
			"title": "Titolo pag1",
			"contents": [
				{
				"type": "paragraph",
				"text": "<div style='min-height:90px'><img style='float:left; margin:0px 10px 0px 0px' src='themes/fishInItaly/img/regioni/calabria.png'><b>Fish in Italy</b> è una partnership di sviluppo tra imprese che appartengono a due territori del sud:la Calabria e la Sicilia.</div>"
			}
			]
		}
		]
	}
	]
}




/*
 * ################# OPTIONS APP ###################
 * ################# OPTIONS APP ###################
 * ################# OPTIONS APP ###################
 * ################# OPTIONS APP ###################
 * ################# OPTIONS APP ###################
 */
var options = { 
		spinning_loading_options : {
				  lines: 11, // The number of lines to draw
				  length: 3, // The length of each line
				  width: 3, // The line thickness
				  radius: 7, // The radius of the inner circle
				  rotate: 0, // The rotation offset
				  color: '#fff', // #rgb or #rrggbb
				  speed: 1, // Rounds per second
				  trail: 38, // Afterglow percentage
				  shadow: false, // Whether to render a shadow
				  hwaccel: false, // Whether to use hardware acceleration
				  className: 'spinner', // The CSS class to assign to the spinner
				  zIndex: 2e9, // The z-index (defaults to 2000000000)
				  top: 'auto', // Top position relative to parent in px
				  left: 'auto' // Left position relative to parent in px
		},
		loading_timeout : 25000, // milliseconds after force overlay hidding
		initial_loading_fake_delay:(!! urlParameters.initial_loading_fake_delay) ? urlParameters.initial_loading_fake_delay : 150,
		sidebar:(!! urlParameters.sidebar) ? urlParameters.sidebar : "26%",
		sidebarScrollable:false,
		dataValidation: true, // check for id duplications, link consistency etc...
		add2HomeTooltip: true,
		refreshOnOrientationChange: true,
		forcedStartingPage: (!! urlParameters.forcedStartingPage) ? urlParameters.forcedStartingPage : null
	};

/* merge defaults and options, without modifying defaults */
var appMLconf = $.extend({}, appMLconf, options);