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
							"id": "skillTestPanel",
							"title": "Skill Test",
							"icon": "skilltest.png",
							"pages": [
								{
									"id": "skillTestHomePage",
									"title": "Titolo pag3",
									"contents": [

										{
											"type": "skillTestsStatusPanel",
											"skillTests":[
											              {
											            	  "id":"skillTest1",
											            	  "name" : "Test di velocità",
											            	  "difficulty" : "Media",
											            	  "questions" : 4
											              },{
											            	  "id":"skillTest2",
											            	  "name" : "Cultura Generale",
											            	  "difficulty" : "Media",
											            	  "questions" : 2
											              }
											 ]
										}
									]
								},
								{
									"id": "skillTest1",
									"scrollable": "false",
									"title": "Skill Test 1",
									"contents": [
										{
											"type": "test",
											"test": {
												"1": {
													"question": "Amazon è stata fondata nel 1994 da:",
													"time": 434,
													"thematic_area": "Generale",
													"complexity": "Media",
													"answers": {
														"1": "Phil Knight",
														"2": "Jeff Bezos",
														"3": "Larry Ellison"
					
					
					
					
					
					
													}
												},
												"2": {
													"question": "Quanti omicidi hai commesso?",
													"time": 45,
													"thematic_area": "Menaging",
													"complexity": "Media",
													"answers": {
														"1": "10",
														"2": "2",
														"3": "Nessuno"
													}
												},
												"3": {
													"question": "Se io sono io e tu sei tu, chi ‚àö¬Æ pi‚àöœÄ fesso io o tu?",
													"time": 22,
													"thematic_area": "Bobbino",
													"complexity": "Alta",
													"answers": {
														"1": "io",
														"2": "tu",
														"3": "tu e mammata"
													}
												},
												"4": {
													"question": "A chi vuoi pi‚àöœÄ bene, a mamma o pap‚àö‚Ä†?",
													"time": 33,
													"thematic_area": "Salame",
													"complexity": "Bassa",
													"answers": {
														"1": "mamma",
														"2": "pap‚àö‚Ä†",
														"3": "a suarta"
													}
												}
											}
										}
									]
								},
								{
									"id": "skillTest2",
									"scrollable": "false",
									"title": "Skill Test 2",
									"contents": [
										{
											"type": "test",
											"test": {
												"1": {
													"question": "22222à necessario che l'autobus sia in orario affinch√© Alessandra arrivi in tempo all'appuntamento‚Äù:",
													"time": 445,
													"thematic_area": "Problem solving",
													"complexity": "Alta",
													"answers": {
														"1": "Quantificare (in termini di livelli potenziali di fatturato o di numero di unit√† di prodotto vendibili) ",
														"2": "Quantificare (in termini di livelli potenziali di fatturato o di numero di unit√† di prodotto vendibili) ",
														"3": "Quantificare (in termini di livelli potenziali di fatturato o di numero di unit√† di prodotto vendibili) ",
														"4": "Quantificare (in termini di livelli potenziali di fatturato o di numero di unit√† di prodotto vendibili) "
													}
												},
												"2": {
													"question": "Quanti omicidi hai commesso?",
													"time": 45,
													"thematic_area": "Menaging",
													"complexity": "Media",
													"answers": {
														"1": "10",
														"2": "2",
														"3": "Nessuno"
													}
												}
											}
										}
									]
								}
							]
						},
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
									"text": "<div style='min-height:90px'><img style='float:left; margin:0px 10px 0px 0px' src='packaging/apple-touch-icon-57x57.png'><b>Fish in Italy</b> partnership di sviluppo tra imprese che appartengono a due territori del sud:la Calabria e la Sicilia.</div>"
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
		   			"id": "user",
		   			"title": "User",
		   			"icon": "user.png",
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
		   									"linked_page_id": "map_stocco",
		   									"label": "Gli Eventi"
		   								},
		   								{
		   									"className": "arrow",
		   									"linked_page_id": "home_page",
		   									"label": "Il Ricettario"
		   								},
		   								{
		   									"className": "arrow",
		   									"linked_page_id": "altro_pagina_2",
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
		   							"text": "<div style='min-height:90px'><img style='float:left; margin:0px 10px 0px 0px' src='themes/fishInItaly/img/regioni/calabria.png'><b>Fish in Italy</b> ‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚àö√´‚Äö√†√∂‚Äö√†√á‚Äö√Ñ√∂‚àö‚Ä†‚àö‚àÇ‚Äö√Ñ√∂‚àö√ë‚Äö√Ñ‚Ä†‚Äö√Ñ√∂‚àö‚Ä†‚àö‚àÇ‚Äö√Ñ√∂‚àö‚Ä†‚àö√°¬¨¬®¬¨¬Æ¬¨¬®¬¨√Ü‚Äö√Ñ√∂‚àö‚Ä†‚àö‚àÇ‚Äö√†√∂‚àö‚à´ una partnership di sviluppo tra imprese che appartengono a due territori del sud:la Calabria e la Sicilia.</div>"
		   						}
		   					]
		   				}
		   			]
		   		},
		   		
		   		{
		   			"id": "crea",
		   			"title": "New test",
		   			"icon": "altro.png",
		   			"pages": [
		   				{
		   					"id": "ertwsserqet",
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
		   									"linked_page_id": "map_stocco",
		   									"label": "Gli Eventi"
		   								},
		   								{
		   									"className": "arrow",
		   									"linked_page_id": "home_page",
		   									"label": "Il Ricettario"
		   								},
		   								{
		   									"className": "arrow",
		   									"linked_page_id": "altro_pagina_2",
		   									"label": "L'ufficio Stampa"
		   								}
		   							]
		   						}
		   					]
		   				}
		   			]
		   		},
		   		
		   		{
		   			"id": "scores",
		   			"title": "Scores",
		   			"icon": "classifiche.png",
		   			"pages": [
		   				{
		   					"id": "4re",
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
		   									"linked_page_id": "map_stocco",
		   									"label": "Gli Eventi"
		   								},
		   								{
		   									"className": "arrow",
		   									"linked_page_id": "home_page",
		   									"label": "Il Ricettario"
		   								},
		   								{
		   									"className": "arrow",
		   									"linked_page_id": "altro_pagina_2",
		   									"label": "L'ufficio Stampa"
		   								}
		   							]
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
		sidebarScrollable:true,
		dataValidation: true, // check for id duplications, link consistency etc...
		add2HomeTooltip: false,
		refreshOnOrientationChange: true
		
		//initial_loading_fake_delay:(!! urlParameters.initial_loading_fake_delay) ? urlParameters.initial_loading_fake_delay : 150,
		//sidebar:(!! urlParameters.sidebar) ? urlParameters.sidebar : "26%",
		//forcedStartingPage: (!! urlParameters.forcedStartingPage) ? urlParameters.forcedStartingPage : null
	};



/* merge defaults and options, without modifying defaults */
var appMLconf = $.extend({}, appMLconf, options);