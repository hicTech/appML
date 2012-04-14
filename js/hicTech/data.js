/*
 * ################# DATI APP ITA ###################
 * ################# DATI APP ITA  ###################
 * ################# DATI APP ITA  ###################
 * ################# DATI APP ITA  ###################
 * ################# DATI APP ITA  ###################
 */

				
appMLjson={
	panels:[
		{
			id:"home",
			title:"Home",
			icon:"home.png",
			pages:[
				{
					id:"home_pagina_1",
					title:"Titolo pag1",
					contents:[
						
						{
							type:"menu",
							className:"arrow_list",
							title:"Link in home",
							items:[
								{
									className:"arrow",
									linked_page_id:"home_pagina_finta_2",
									label:"vai a pag finta"
								},
								{
									className:"arrow",
									linked_page_id:"home_pagina_finta_3",
									label:"vai a pag 3"
								},
								{
									className:"arrow",
									linked_page_id:"page_mappa",
									label:"vai alla mappa"
								},
								{
									className:"arrow",
									linked_page_id:"page_mappa2",
									label:"vai alla mappa 2"
								}
							]
						},
						{
							type:"carousel",
							items_type:"foto",
							prePath : "http://www.fishinitaly.eu/app/immGallery/interior",
							sizes : {
								tablet:{
									width : 580,
									height : 386
								},
								desktop:{
									width : 700,
									height : 465
								},
								smartphone:{
									width : 310,
									height : 206
								}
							},
							items:[
								{
									url:"1.jpg",
									caption : "Relax Chair"
								},
								{
									url:"2.jpg",
									caption : "Stool"
								},
								{
									url:"3.jpg",
									caption : "Glass Table"
								},
								{
									url:"4.jpg",
									caption : "Chair 1"
								},
								{
									url:"5.jpg",
									caption : "Chair 2"
								},
								{
									url:"6.jpg",
									caption : "Little table"
								}
							]
						}
					]
				},
				{
					id:"page_mappa2",
					title:"Titolo pag1",
					scrollable:false,
					contents:[
						
						{
							type:"map",
							points_menu:true,
							points:[
								{
									label:"Primo punto",
									description:"Informazioni primo punto",
									lat: 44.8574888,
									lon: 19.2678847
								},
								{
									label:"Secondo punto",
									description:"Informazioni primo punto",
									lat: 4.7574888,
									lon: 9.378847
								}
							]
						},
						
					]
				},
				{
					id:"page_mappa",
					title:"Titolo pag2",
					scrollable:false,
					contents:[
						
						{
							type:"map",
							points_menu:false,
							points:[
								{
									label:"Terzo punto",
									description:"Informazioni primo punto",
									lat: 43.8574888,
									lon: 9.2678847
								}
							]
						},
						
					]
				},
				{
					id:"home_pagina_finta_2",
					title:"Titolo pag2",
					contents:[
						{
							type: "paragraph",
							text: "<b>Titolo pag 2</b>. too long!<br>Some text long, very long... too long!<b>Titolo pag 2</b><br>Some text long, very long... too long!<br>Some text long, very long... too long!<br>Some text long, very long... .. too long!<br>Some text long, very long... too long!"
						},
						{
							type:"menu",
							className:"arrow_list",
							title:"Link in home",
							items:[
								{
									className:"arrow",
									linked_page_id:"home_pagina_finta_3",
									label:"vai a pag 3"
								}
							]
						}
					]
				},
				{
					id:"home_pagina_finta_3",
					title:"Titolo pag3",
					contents:[
						{
							type: "paragraph",
							text: "<b>Titolo pag 3</b><br>I'm wait for you!!!!"
						},
						{
							type:"carousel",
							items_type:"foto",
							prePath : "immGallery/interior",
							sizes : {
								tablet:{
									width : 580,
									height : 386
								},
								desktop:{
									width : 700,
									height : 465
								},
								smartphone:{
									width : 310,
									height : 206
								}
							},
							items:[
								{
									url:"1.jpg",
									caption : "Relax Chair"
								},
								{
									url:"2.jpg",
									caption : "Stool"
								},
								{
									url:"3.jpg",
									caption : "Glass Table"
								},
								{
									url:"4.jpg",
									caption : "Chair 1"
								},
								{
									url:"5.jpg",
									caption : "Chair 2"
								},
								{
									url:"6.jpg",
									caption : "Little table"
								}
							]
						}
					]
				}
			]
		},
		{
			id:"manifestazione",
			title:"La Manifestazione",
			icon:"fish.png",
			pages:[
				{
					id:"manifestazione_pagina_1",
					title:"Titolo pag1",
					contents:[
						{
							type: "paragraph",
							text: "<b>Titolo pag 2</b><br>Some text long, very long... too long!<br>Some text long, very long... too long!<br>Some text long, very long... too long!<br>Some text long, very long... too long!<br>Some text long, very long... too long!<br>Some text long, very long... too long!<br>Some text long, very long... too long!<br>Some text long, very long... too long!<br>Some text long, very long... too long!<br>Some text long, very long... too long!<br>Some text long, very long... too long!<br>Some text long, very long... too long!"
						},
						{
							type:"menu",
							className:"arrow_list",
							title:"Link in home",
							items:[
								{
									className:"arrow",
									linked_page_id:"manifestazione_pagina_2",
									label:"vai a pag 2"
								},
								{
									className:"arrow",
									linked_page_id:"home_pagina_finta_3",
									label:"vai a pag 3"
								}
							]
						}
					]
				},
				{
					id:"manifestazione_pagina_2",
					title:"Titolo pag3",
					contents:[
						{
							type: "paragraph",
							text: "<b>we</b><br>we!!!!"
						}
					]
				}
			]
		},
		{
			id:"altro",
			title:"Altro",
			icon:"altro.png",
			pages:[
				{
					id:"altro_pagina_1",
					title:"Titolo pag1",
					contents:[
						{
							type: "paragraph",
							text: "<b>Titolo pag 2</b><br>Some text long, very long... too long!<br>Some text long, very long... too long!<br>Some text long, very long... too long!<br>Some text long, very long... too long!<br>Some text long, very long... too long!<br>Some text long, very long... too long!<br>Some text long, very long... too long!<br>Some text long, very long... too long!<br>Some text long, very long... too long!<br>Some text long, very long... too long!<br>Some text long, very long... too long!<br>Some text long, very long... too long!"
						},
						{
							type:"menu",
							className:"arrow_list",
							title:"Link in home",
							items:[
								{
									className:"arrow",
									linked_page_id:"altro_pagina_1",
									label:"vai a pag 2"
								},
								{
									className:"arrow",
									linked_page_id:"altro_pagina_1",
									label:"vai a pag 3"
								}
							]
						}
					]
				},
				{
					id:"altro_pagina_2",
					title:"Titolo pag3",
					contents:[
						{
							type: "paragraph",
							text: "<b>we</b><br>we!!!!"
						}
					]
				}
			]
		}
	]
}






/*
 * ################# DATI APP ENG ###################
 * ################# DATI APP ENG  ###################
 * ################# DATI APP ENG  ###################
 * ################# DATI APP ENG  ###################
 * ################# DATI APP ENG  ###################
 */

				
appMLjson_en={
	panels:[
		{
			id:"home",
			title:"Home eng",
			icon:"home.png",
			pages:[
				{
					id:"home_pagina_1",
					title:"Titolo pag1 eng",
					contents:[
						
						{
							type:"menu",
							className:"arrow_list",
							title:"Link in home",
							items:[
								{
									className:"arrow",
									linked_page_id:"home_pagina_finta_2",
									label:"vai a pag finta"
								},
								{
									className:"arrow",
									linked_page_id:"home_pagina_finta_3",
									label:"vai a pag 3"
								}
							]
						},
						{
							type:"carousel",
							items_type:"foto",
							prePath : "immGallery/interior",
							sizes : {
								tablet:{
									width : 580,
									height : 386
								},
								desktop:{
									width : 700,
									height : 465
								},
								smartphone:{
									width : 310,
									height : 206
								}
							},
							items:[
								{
									url:"1.jpg",
									caption : "Relax Chair"
								},
								{
									url:"2.jpg",
									caption : "Stool"
								},
								{
									url:"3.jpg",
									caption : "Glass Table"
								},
								{
									url:"4.jpg",
									caption : "Chair 1"
								},
								{
									url:"5.jpg",
									caption : "Chair 2"
								},
								{
									url:"6.jpg",
									caption : "Little table"
								}
							]
						}
					]
				},
				{
					id:"home_pagina_finta_2",
					title:"Titolo pag2",
					contents:[
						{
							type: "paragraph",
							text: "<b>Titolo pag 2</b>. too long!<br>Some text long, very long... too long!<b>Titolo pag 2</b><br>Some text long, very long... too long!<br>Some text long, very long... too long!<br>Some text long, very long... .. too long!<br>Some text long, very long... too long!"
						},
						{
							type:"menu",
							className:"arrow_list",
							title:"Link in home",
							items:[
								{
									className:"arrow",
									linked_page_id:"home_pagina_finta_3",
									label:"vai a pag 3"
								}
							]
						}
					]
				},
				{
					id:"home_pagina_finta_3",
					title:"Titolo pag3",
					contents:[
						{
							type: "paragraph",
							text: "<b>Titolo pag 3</b><br>I'm wait for you!!!!"
						}
					]
				}
			]
		},
		{
			id:"manifestazione",
			title:"La Manifestazione",
			icon:"fish.png",
			pages:[
				{
					id:"manifestazione_pagina_1",
					title:"Titolo pag1",
					contents:[
						{
							type: "paragraph",
							text: "<b>Titolo pag 2</b><br>Some text long, very long... too long!<br>Some text long, very long... too long!<br>Some text long, very long... too long!<br>Some text long, very long... too long!<br>Some text long, very long... too long!<br>Some text long, very long... too long!<br>Some text long, very long... too long!<br>Some text long, very long... too long!<br>Some text long, very long... too long!<br>Some text long, very long... too long!<br>Some text long, very long... too long!<br>Some text long, very long... too long!"
						},
						{
							type:"menu",
							className:"arrow_list",
							title:"Link in home",
							items:[
								{
									className:"arrow",
									linked_page_id:"manifestazione_pagina_2",
									label:"vai a pag 2"
								},
								{
									className:"arrow",
									linked_page_id:"home_pagina_finta_3",
									label:"vai a pag 3"
								}
							]
						}
					]
				},
				{
					id:"manifestazione_pagina_2",
					title:"Titolo pag3",
					contents:[
						{
							type: "paragraph",
							text: "<b>we</b><br>we!!!!"
						}
					]
				}
			]
		},
		{
			id:"altro",
			title:"Altro",
			icon:"altro.png",
			pages:[
				{
					id:"altro_pagina_1",
					title:"Titolo pag1",
					contents:[
						{
							type: "paragraph",
							text: "<b>Titolo pag 2</b><br>Some text long, very long... too long!<br>Some text long, very long... too long!<br>Some text long, very long... too long!<br>Some text long, very long... too long!<br>Some text long, very long... too long!<br>Some text long, very long... too long!<br>Some text long, very long... too long!<br>Some text long, very long... too long!<br>Some text long, very long... too long!<br>Some text long, very long... too long!<br>Some text long, very long... too long!<br>Some text long, very long... too long!"
						},
						{
							type:"menu",
							className:"arrow_list",
							title:"Link in home",
							items:[
								{
									className:"arrow",
									linked_page_id:"altro_pagina_1",
									label:"vai a pag 2"
								},
								{
									className:"arrow",
									linked_page_id:"altro_pagina_1",
									label:"vai a pag 3"
								}
							]
						}
					]
				},
				{
					id:"altro_pagina_2",
					title:"Titolo pag3",
					contents:[
						{
							type: "paragraph",
							text: "<b>we</b><br>we!!!!"
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
		initial_loading_fake_delay:(!! urlParameters.initial_loading_fake_delay) ? urlParameters.initial_loading_fake_delay : 200,
		sidebar:(!! urlParameters.sidebar) ? urlParameters.sidebar : "26%",
		sidebarScrollable:false,
		add2HomeTooltip: true,
		forcedStartingPage: (!! urlParameters.forcedStartingPage) ? urlParameters.forcedStartingPage : null
	};

/* merge defaults and options, without modifying defaults */
var appMLconf = $.extend({}, appMLconf, options);