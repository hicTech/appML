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
				"text": "<div style='min-height:90px'><img style='float:left; margin:0px 10px 0px 0px' src='themes/fishInItaly/img/stand.png'><b>Fish in Italy</b> è una partnership di sviluppo tra imprese che appartengono a due territori del sud:la Calabria e la Sicilia.</div>"
			},
				{
				"type": "menu",
				"className": "arrow_list",
				"title": "Aziende in Italia",
				"items": [
					{
					"className": "arrow",
					"linked_page_id": "abru",
					"label": "Abruzzo"
				},
					{
					"className": "arrow",
					"linked_page_id": "cala",
					"label": "Calabria"
				},
					{
					"className": "arrow",
					"linked_page_id": "emil",
					"label": "Emilia Romagna"
				},
					{
					"className": "arrow",
					"linked_page_id": "friu",
					"label": "Friuli"
				},
					{
					"className": "arrow",
					"linked_page_id": "lomb",
					"label": "Lombardia"
				},
					{
					"className": "arrow",
					"linked_page_id": "marc",
					"label": "Marche"
				},
					{
					"className": "arrow",
					"linked_page_id": "pugl",
					"label": "Puglia"
				},
					{
					"className": "arrow",
					"linked_page_id": "sici",
					"label": "Sicilia"
				},
					{
					"className": "arrow",
					"linked_page_id": "tosc",
					"label": "Toscana"
				},
					{
					"className": "arrow",
					"linked_page_id": "vene",
					"label": "Veneto"
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
				"text": "<div style='min-height:110px'><img style='float:left; margin:0px 10px 0px 0px' src='themes/fishInItaly/img/regioni/calabria.png'><b>pagina Calabria</b> è una partnership di sviluppo tra imprese che appartengono a due territori del sud:la Calabria e la Sicilia.</div>"
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
				"prePath": "http://www.fishinitaly.eu/app/aziende/calabria/ross_2000",
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
		},
			{
			"id": "abru",
			"title": "Abruzzo",
			"contents": [
				{
				"type": "paragraph",
				"text": "<div style='min-height:110px'><img style='float:left; margin:0px 10px 0px 0px' src='themes/fishInItaly/img/regioni/abruzzo.png'><b>pagina Abruzzo</b> è una partnership di sviluppo tra imprese che appartengono a due territori del sud:la Calabria e la Sicilia.</div>"
			},
				{
				"type": "menu",
				"className": "arrow_list",
				"title": "Aziende in Abruzzo",
				"items": [
					{
					"className": "arrow",
					"linked_page_id": "nuova_la_selva",
					"label": "Nuova La Selva Pesca srl"
				}
				]
			}
			]
		},
			{
			"id": "nuova_la_selva",
			"title": "Nuova La Selva Pesca srl",
			"contents": [
				{
				"type": "paragraph",
				"text": "<div style='min-height:110px'><b>nuova_la_selva</b> è una partnership di sviluppo tra imprese che appartengono a due territori del sud:la Calabria e la Sicilia.</div>"
			},
				{
				"type": "button",
				"label": " vedi su mappa",
				"linked_page_id": "map_nuova_la_selva"
			},
				{
				"type": "carousel",
				"items_type": "foto",
				"prePath": "http://www.fishinitaly.eu/app/aziende/abruzzo/buona_pesc",
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
			"id": "map_nuova_la_selva",
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
					"lat": "40.8574888",
					"lon": "9.2678847"
				}
				]
			}
			]
		},
			{
			"id": "emil",
			"title": "Emilia Romagna",
			"contents": [
				{
				"type": "paragraph",
				"text": "<div style='min-height:110px'><img style='float:left; margin:0px 10px 0px 0px' src='themes/fishInItaly/img/regioni/emilia.png'><b>pagina Abruzzo</b> è una partnership di sviluppo tra imprese che appartengono a due territori del sud:la Calabria e la Sicilia.</div>"
			},
				{
				"type": "menu",
				"className": "arrow_list",
				"title": "Aziende in Emilia Romagna",
				"items": [
					{
					"className": "arrow",
					"linked_page_id": "buona_pesc",
					"label": "Buona Pesca"
				},
					{
					"className": "arrow",
					"linked_page_id": "ass_prod_pesc",
					"label": "Ass. Produttori Pesca"
				},
					{
					"className": "arrow",
					"linked_page_id": "gio_mare",
					"label": "Gio Mare"
				},
					{
					"className": "arrow",
					"linked_page_id": "cons_pesc_srl",
					"label": "Consorzio Pescatori srl"
				},
					{
					"className": "arrow",
					"linked_page_id": "itt_s_giorgio",
					"label": "Ittica S.Giorgio"
				},
					{
					"className": "arrow",
					"linked_page_id": "soc_coop_goro",
					"label": "Soc. Coop. Consor. Pescatori Goro"
				},
					{
					"className": "arrow",
					"linked_page_id": "cost_adri",
					"label": "Costa Adriatica"
				},
					{
					"className": "arrow",
					"linked_page_id": "goro_pesc",
					"label": "Goro Pesca"
				},
					{
					"className": "arrow",
					"linked_page_id": "s_benedetto",
					"label": "S.Benedetto Unipersonale srl"
				},
					{
					"className": "arrow",
					"linked_page_id": "lpa_pesc",
					"label": "L.P.A. Pesca srl"
				}
				]
			}
			]
		},
			{
			"id": "buona_pesc",
			"title": "Buona pesca",
			"contents": [
				{
				"type": "paragraph",
				"text": "<div style='min-height:110px'><b>Buona pesca</b> è una partnership di sviluppo tra imprese che appartengono a due territori del sud:la Calabria e la Sicilia.</div>"
			},
				{
				"type": "button",
				"label": " vedi su mappa",
				"linked_page_id": "map_buona_pesc"
			},
				{
				"type": "carousel",
				"items_type": "foto",
				"prePath": "http://www.fishinitaly.eu/app/aziende/emilia/buona_pesc",
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
			"id": "map_buona_pesc",
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
					"lat": "43.8574888",
					"lon": "9.2678847"
				}
				]
			}
			]
		},
			{
			"id": "ass_prod_pesc",
			"title": "Ass. Produttori Pesca",
			"contents": [
				{
				"type": "paragraph",
				"text": "<div style='min-height:110px'><b>ass_prod_pesca</b> è una partnership di sviluppo tra imprese che appartengono a due territori del sud:la Calabria e la Sicilia.</div>"
			},
				{
				"type": "button",
				"label": " vedi su mappa",
				"linked_page_id": "map_ass_prod_pesca"
			},
				{
				"type": "carousel",
				"items_type": "foto",
				"prePath": "http://www.fishinitaly.eu/app/aziende/emilia/ass_prod_pesc",
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
			"id": "map_ass_prod_pesca",
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
					"lat": "43.8574888",
					"lon": "9.2678847"
				}
				]
			}
			]
		},
			{
			"id": "gio_mare",
			"title": "Giò Mare",
			"contents": [
				{
				"type": "paragraph",
				"text": "<div style='min-height:110px'><b>gio_mare</b> è una partnership di sviluppo tra imprese che appartengono a due territori del sud:la Calabria e la Sicilia.</div>"
			},
				{
				"type": "button",
				"label": " vedi su mappa",
				"linked_page_id": "map_gio_mare"
			},
				{
				"type": "carousel",
				"items_type": "foto",
				"prePath": "http://www.fishinitaly.eu/app/aziende/emilia/gio_mare",
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
			"id": "map_gio_mare",
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
					"lat": "43.8574888",
					"lon": "9.2678847"
				}
				]
			}
			]
		},
			{
			"id": "cons_pesc_srl",
			"title": "Consorzio Pescatori srl",
			"contents": [
				{
				"type": "paragraph",
				"text": "<div style='min-height:110px'><b>cons_pesc_srl</b> è una partnership di sviluppo tra imprese che appartengono a due territori del sud:la Calabria e la Sicilia.</div>"
			},
				{
				"type": "button",
				"label": " vedi su mappa",
				"linked_page_id": "map_cons_pesc_srl"
			},
				{
				"type": "carousel",
				"items_type": "foto",
				"prePath": "http://www.fishinitaly.eu/app/aziende/emilia/cons_pesc_srl",
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
			"id": "map_cons_pesc_srl",
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
					"lat": "43.8574888",
					"lon": "9.2678847"
				}
				]
			}
			]
		},
			{
			"id": "itt_s_giorgio",
			"title": "Ittica S.Giorgio",
			"contents": [
				{
				"type": "paragraph",
				"text": "<div style='min-height:110px'><b>itt_s_giorgio</b> è una partnership di sviluppo tra imprese che appartengono a due territori del sud:la Calabria e la Sicilia.</div>"
			},
				{
				"type": "button",
				"label": " vedi su mappa",
				"linked_page_id": "map_itt_s_giorgio"
			},
				{
				"type": "carousel",
				"items_type": "foto",
				"prePath": "http://www.fishinitaly.eu/app/aziende/emilia/itt_s_giorgio",
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
			"id": "map_itt_s_giorgio",
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
					"lat": "43.8574888",
					"lon": "9.2678847"
				}
				]
			}
			]
		},
			{
			"id": "soc_coop_goro",
			"title": "Soc. Coop. Consor. Pescatori goro",
			"contents": [
				{
				"type": "paragraph",
				"text": "<div style='min-height:110px'><b>soc_coop_goro</b> è una partnership di sviluppo tra imprese che appartengono a due territori del sud:la Calabria e la Sicilia.</div>"
			},
				{
				"type": "button",
				"label": " vedi su mappa",
				"linked_page_id": "map_soc_coop_goro"
			},
				{
				"type": "carousel",
				"items_type": "foto",
				"prePath": "http://www.fishinitaly.eu/app/aziende/emilia/soc_coop_goro",
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
			"id": "map_soc_coop_goro",
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
					"lat": "43.8574888",
					"lon": "9.2678847"
				}
				]
			}
			]
		},
			{
			"id": "cost_adri",
			"title": "Costa Adriatica",
			"contents": [
				{
				"type": "paragraph",
				"text": "<div style='min-height:110px'><b>cost_adri</b> è una partnership di sviluppo tra imprese che appartengono a due territori del sud:la Calabria e la Sicilia.</div>"
			},
				{
				"type": "button",
				"label": " vedi su mappa",
				"linked_page_id": "map_cost_adri"
			},
				{
				"type": "carousel",
				"items_type": "foto",
				"prePath": "http://www.fishinitaly.eu/app/aziende/emilia/cost_adri",
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
			"id": "map_cost_adri",
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
					"lat": "43.8574888",
					"lon": "9.2678847"
				}
				]
			}
			]
		},
			{
			"id": "goro_pesc",
			"title": "Goro Pesca",
			"contents": [
				{
				"type": "paragraph",
				"text": "<div style='min-height:110px'><b>goro_pesc</b> è una partnership di sviluppo tra imprese che appartengono a due territori del sud:la Calabria e la Sicilia.</div>"
			},
				{
				"type": "button",
				"label": " vedi su mappa",
				"linked_page_id": "map_goro_pesc"
			},
				{
				"type": "carousel",
				"items_type": "foto",
				"prePath": "http://www.fishinitaly.eu/app/aziende/emilia/goro_pesc",
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
			"id": "map_goro_pesc",
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
					"lat": "43.8574888",
					"lon": "9.2678847"
				}
				]
			}
			]
		},
			{
			"id": "s_benedetto",
			"title": "S.Benedetto",
			"contents": [
				{
				"type": "paragraph",
				"text": "<div style='min-height:110px'><b>s_benedetto</b> è una partnership di sviluppo tra imprese che appartengono a due territori del sud:la Calabria e la Sicilia.</div>"
			},
				{
				"type": "button",
				"label": " vedi su mappa",
				"linked_page_id": "map_s_benedetto"
			},
				{
				"type": "carousel",
				"items_type": "foto",
				"prePath": "http://www.fishinitaly.eu/app/aziende/emilia/s_benedetto",
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
			"id": "map_s_benedetto",
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
					"lat": "43.8574888",
					"lon": "9.2678847"
				}
				]
			}
			]
		},
			{
			"id": "lpa_pesc",
			"title": "LPA Pesca",
			"contents": [
				{
				"type": "paragraph",
				"text": "<div style='min-height:110px'><b>lpa_pesc</b> è una partnership di sviluppo tra imprese che appartengono a due territori del sud:la Calabria e la Sicilia.</div>"
			},
				{
				"type": "button",
				"label": " vedi su mappa",
				"linked_page_id": "map_lpa_pesc"
			},
				{
				"type": "carousel",
				"items_type": "foto",
				"prePath": "http://www.fishinitaly.eu/app/aziende/emilia/map_lpa_pesc",
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
			"id": "map_lpa_pesc",
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
					"lat": "43.8574888",
					"lon": "9.2678847"
				}
				]
			}
			]
		},
			{
			"id": "friu",
			"title": "Friuli",
			"contents": [
				{
				"type": "paragraph",
				"text": "<div style='min-height:110px'><img style='float:left; margin:0px 10px 0px 0px' src='themes/fishInItaly/img/regioni/friuli.png'><b>pagina Friuli</b> è una partnership di sviluppo tra imprese che appartengono a due territori del sud:la Calabria e la Sicilia.</div>"
			},
				{
				"type": "menu",
				"className": "arrow_list",
				"title": "Aziende in Friuli",
				"items": [
					{
					"className": "arrow",
					"linked_page_id": "soc_agra_ste",
					"label": "Società Agricola Sterpo spa"
				},
					{
					"className": "arrow",
					"linked_page_id": "friu_pesc",
					"label": "Friulipesca srl"
				}
				]
			}
			]
		},
			{
			"id": "soc_agra_ste",
			"title": "Consorzio Pescatori srl",
			"contents": [
				{
				"type": "paragraph",
				"text": "<div style='min-height:110px'><b>soc_agra_ste</b> è una partnership di sviluppo tra imprese che appartengono a due territori del sud:la Calabria e la Sicilia.</div>"
			},
				{
				"type": "button",
				"label": " vedi su mappa",
				"linked_page_id": "map_soc_agra_ste"
			},
				{
				"type": "carousel",
				"items_type": "foto",
				"prePath": "http://www.fishinitaly.eu/app/aziende/friuli/soc_agra_ste",
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
			"id": "map_soc_agra_ste",
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
					"lat": "43.8574888",
					"lon": "9.2678847"
				}
				]
			}
			]
		},
			{
			"id": "friu_pesc",
			"title": "Consorzio Pescatori srl",
			"contents": [
				{
				"type": "paragraph",
				"text": "<div style='min-height:110px'><b>friu_pesc</b> è una partnership di sviluppo tra imprese che appartengono a due territori del sud:la Calabria e la Sicilia.</div>"
			},
				{
				"type": "button",
				"label": " vedi su mappa",
				"linked_page_id": "map_friu_pesc"
			},
				{
				"type": "carousel",
				"items_type": "foto",
				"prePath": "http://www.fishinitaly.eu/app/aziende/friuli/friu_pesc",
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
			"id": "map_friu_pesc",
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
					"lat": "43.8574888",
					"lon": "9.2678847"
				}
				]
			}
			]
		},
			{
			"id": "lomb",
			"title": "Lobardia",
			"contents": [
				{
				"type": "paragraph",
				"text": "<div style='min-height:110px'><img style='float:left; margin:0px 10px 0px 0px' src='themes/fishInItaly/img/regioni/lombardia.png'><b>pagina Lombardia</b> è una partnership di sviluppo tra imprese che appartengono a due territori del sud:la Calabria e la Sicilia.</div>"
			},
				{
				"type": "menu",
				"className": "arrow_list",
				"title": "Aziende in Lombardia",
				"items": [
					{
					"className": "arrow",
					"linked_page_id": "agr_lom",
					"label": "Agroittica Lombarda"
				},
					{
					"className": "arrow",
					"linked_page_id": "coldfish",
					"label": "Coldfish srl"
				},
					{
					"className": "arrow",
					"linked_page_id": "deton",
					"label": "Deton Italia srl"
				},
					{
					"className": "arrow",
					"linked_page_id": "fjord",
					"label": "Fjord spa"
				},
					{
					"className": "arrow",
					"linked_page_id": "ittimar",
					"label": "Ittimar srl"
				},
					{
					"className": "arrow",
					"linked_page_id": "verbano",
					"label": "Verbano Ittica srl"
				}
				]
			}
			]
		},
			{
			"id": "agr_lom",
			"title": "Agroittica Lombarda",
			"contents": [
				{
				"type": "paragraph",
				"text": "<div style='min-height:110px'><b>agr_lom</b> è una partnership di sviluppo tra imprese che appartengono a due territori del sud:la Calabria e la Sicilia.</div>"
			},
				{
				"type": "button",
				"label": " vedi su mappa",
				"linked_page_id": "map_agr_lom"
			},
				{
				"type": "carousel",
				"items_type": "foto",
				"prePath": "http://www.fishinitaly.eu/app/aziende/lombardia/agr_lom",
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
			"id": "map_agr_lom",
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
					"lat": "43.8574888",
					"lon": "9.2678847"
				}
				]
			}
			]
		},
			{
			"id": "coldfish",
			"title": "Coldfish srl",
			"contents": [
				{
				"type": "paragraph",
				"text": "<div style='min-height:110px'><b>coldfish</b> è una partnership di sviluppo tra imprese che appartengono a due territori del sud:la Calabria e la Sicilia.</div>"
			},
				{
				"type": "button",
				"label": " vedi su mappa",
				"linked_page_id": "map_coldfish"
			},
				{
				"type": "carousel",
				"items_type": "foto",
				"prePath": "http://www.fishinitaly.eu/app/aziende/lombardia/coldfish",
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
			"id": "map_coldfish",
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
					"lat": "43.8574888",
					"lon": "9.2678847"
				}
				]
			}
			]
		},
			{
			"id": "deton",
			"title": "Deton Italia srl",
			"contents": [
				{
				"type": "paragraph",
				"text": "<div style='min-height:110px'><b>deton</b> è una partnership di sviluppo tra imprese che appartengono a due territori del sud:la Calabria e la Sicilia.</div>"
			},
				{
				"type": "button",
				"label": " vedi su mappa",
				"linked_page_id": "map_deton"
			},
				{
				"type": "carousel",
				"items_type": "foto",
				"prePath": "http://www.fishinitaly.eu/app/aziende/lombardia/deton",
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
			"id": "map_deton",
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
					"lat": "43.8574888",
					"lon": "9.2678847"
				}
				]
			}
			]
		},
			{
			"id": "fjord",
			"title": "Fjord spa",
			"contents": [
				{
				"type": "paragraph",
				"text": "<div style='min-height:110px'><b>fjord</b> è una partnership di sviluppo tra imprese che appartengono a due territori del sud:la Calabria e la Sicilia.</div>"
			},
				{
				"type": "button",
				"label": " vedi su mappa",
				"linked_page_id": "map_fjord"
			},
				{
				"type": "carousel",
				"items_type": "foto",
				"prePath": "http://www.fishinitaly.eu/app/aziende/lombardia/fjord",
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
			"id": "map_fjord",
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
					"lat": "43.8574888",
					"lon": "9.2678847"
				}
				]
			}
			]
		},
			{
			"id": "ittimar",
			"title": "Ittimar srl",
			"contents": [
				{
				"type": "paragraph",
				"text": "<div style='min-height:110px'><b>ittimar</b> è una partnership di sviluppo tra imprese che appartengono a due territori del sud:la Calabria e la Sicilia.</div>"
			},
				{
				"type": "button",
				"label": " vedi su mappa",
				"linked_page_id": "map_ittimar"
			},
				{
				"type": "carousel",
				"items_type": "foto",
				"prePath": "http://www.fishinitaly.eu/app/aziende/lombardia/ittimar",
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
			"id": "map_ittimar",
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
					"lat": "43.8574888",
					"lon": "9.2678847"
				}
				]
			}
			]
		},
			{
			"id": "verbano",
			"title": "Verbano Ittica srl",
			"contents": [
				{
				"type": "paragraph",
				"text": "<div style='min-height:110px'><b>verbano</b> è una partnership di sviluppo tra imprese che appartengono a due territori del sud:la Calabria e la Sicilia.</div>"
			},
				{
				"type": "button",
				"label": " vedi su mappa",
				"linked_page_id": "map_verbano"
			},
				{
				"type": "carousel",
				"items_type": "foto",
				"prePath": "http://www.fishinitaly.eu/app/lombardia/calabria/verbano",
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
			"id": "map_verbano",
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
					"lat": "43.8574888",
					"lon": "9.2678847"
				}
				]
			}
			]
		},
			{
			"id": "marc",
			"title": "Marche",
			"contents": [
				{
				"type": "paragraph",
				"text": "<div style='min-height:110px'><img style='float:left; margin:0px 10px 0px 0px' src='themes/fishInItaly/img/regioni/marche.png'><b>pagina Marche</b> è una partnership di sviluppo tra imprese che appartengono a due territori del sud:la Calabria e la Sicilia.</div>"
			},
				{
				"type": "menu",
				"className": "arrow_list",
				"title": "Aziende nelle Marche",
				"items": [
					{
					"className": "arrow",
					"linked_page_id": "maroni",
					"label": "Maroni Fratelli srl"
				},
					{
					"className": "arrow",
					"linked_page_id": "mare_piu",
					"label": "Mare Più srl"
				},
					{
					"className": "arrow",
					"linked_page_id": "broker",
					"label": "Broker Fish Company srl"
				},
					{
					"className": "arrow",
					"linked_page_id": "indust",
					"label": "Indusrtia Conserviera Ittica srl"
				}
				]
			}
			]
		},
			{
			"id": "maroni",
			"title": "Maroni Fratelli srl",
			"contents": [
				{
				"type": "paragraph",
				"text": "<div style='min-height:110px'><b>maroni</b> è una partnership di sviluppo tra imprese che appartengono a due territori del sud:la Calabria e la Sicilia.</div>"
			},
				{
				"type": "button",
				"label": " vedi su mappa",
				"linked_page_id": "map_maroni"
			},
				{
				"type": "carousel",
				"items_type": "foto",
				"prePath": "http://www.fishinitaly.eu/app/aziende/marche/maroni",
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
			"id": "map_maroni",
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
					"lat": "43.8574888",
					"lon": "9.2678847"
				}
				]
			}
			]
		},
			{
			"id": "mare_piu",
			"title": "Mare Più srl",
			"contents": [
				{
				"type": "paragraph",
				"text": "<div style='min-height:110px'><b>mare_piu</b> è una partnership di sviluppo tra imprese che appartengono a due territori del sud:la Calabria e la Sicilia.</div>"
			},
				{
				"type": "button",
				"label": " vedi su mappa",
				"linked_page_id": "map_mare_piu"
			},
				{
				"type": "carousel",
				"items_type": "foto",
				"prePath": "http://www.fishinitaly.eu/app/aziende/marche/mare_piu",
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
			"id": "map_mare_piu",
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
					"lat": "43.8574888",
					"lon": "9.2678847"
				}
				]
			}
			]
		},
			{
			"id": "broker",
			"title": "Broker Fish Company srl",
			"contents": [
				{
				"type": "paragraph",
				"text": "<div style='min-height:110px'><b>broker</b> è una partnership di sviluppo tra imprese che appartengono a due territori del sud:la Calabria e la Sicilia.</div>"
			},
				{
				"type": "button",
				"label": " vedi su mappa",
				"linked_page_id": "map_broker"
			},
				{
				"type": "carousel",
				"items_type": "foto",
				"prePath": "http://www.fishinitaly.eu/app/aziende/marche/broker",
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
			"id": "map_broker",
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
					"lat": "43.8574888",
					"lon": "9.2678847"
				}
				]
			}
			]
		},
			{
			"id": "indust",
			"title": "Indusrtia Conserviera Ittica srl",
			"contents": [
				{
				"type": "paragraph",
				"text": "<div style='min-height:110px'><b>indust</b> è una partnership di sviluppo tra imprese che appartengono a due territori del sud:la Calabria e la Sicilia.</div>"
			},
				{
				"type": "button",
				"label": " vedi su mappa",
				"linked_page_id": "map_indust"
			},
				{
				"type": "carousel",
				"items_type": "foto",
				"prePath": "http://www.fishinitaly.eu/app/aziende/marche/indust",
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
			"id": "map_indust",
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
					"lat": "43.8574888",
					"lon": "9.2678847"
				}
				]
			}
			]
		},
			{
			"id": "pugl",
			"title": "Puglia",
			"contents": [
				{
				"type": "paragraph",
				"text": "<div style='min-height:110px'><img style='float:left; margin:0px 10px 0px 0px' src='themes/fishInItaly/img/regioni/puglia.png'><b>pagina Puglia</b> è una partnership di sviluppo tra imprese che appartengono a due territori del sud:la Calabria e la Sicilia.</div>"
			},
				{
				"type": "menu",
				"className": "arrow_list",
				"title": "Aziende in Puglia",
				"items": [
					{
					"className": "arrow",
					"linked_page_id": "dituri",
					"label": "Dituri srl"
				},
					{
					"className": "arrow",
					"linked_page_id": "mitos",
					"label": "Mitors srl"
				},
					{
					"className": "arrow",
					"linked_page_id": "gioioso",
					"label": "Gioioso Ittica"
				},
					{
					"className": "arrow",
					"linked_page_id": "lepore",
					"label": "Lepore Mare"
				}
				]
			}
			]
		},
			{
			"id": "dituri",
			"title": "Dituri srl",
			"contents": [
				{
				"type": "paragraph",
				"text": "<div style='min-height:110px'><b>dituri</b> è una partnership di sviluppo tra imprese che appartengono a due territori del sud:la Calabria e la Sicilia.</div>"
			},
				{
				"type": "button",
				"label": " vedi su mappa",
				"linked_page_id": "map_dituri"
			},
				{
				"type": "carousel",
				"items_type": "foto",
				"prePath": "http://www.fishinitaly.eu/app/aziende/puglia/dituri",
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
			"id": "map_dituri",
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
					"lat": "43.8574888",
					"lon": "9.2678847"
				}
				]
			}
			]
		},
			{
			"id": "mitos",
			"title": "Mitos srl",
			"contents": [
				{
				"type": "paragraph",
				"text": "<div style='min-height:110px'><b>mitos</b> è una partnership di sviluppo tra imprese che appartengono a due territori del sud:la Calabria e la Sicilia.</div>"
			},
				{
				"type": "button",
				"label": " vedi su mappa",
				"linked_page_id": "map_mitos"
			},
				{
				"type": "carousel",
				"items_type": "foto",
				"prePath": "http://www.fishinitaly.eu/app/aziende/puglia/mitos",
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
			"id": "map_mitos",
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
					"lat": "43.8574888",
					"lon": "9.2678847"
				}
				]
			}
			]
		},
			{
			"id": "gioioso",
			"title": "Gioioso Ittica",
			"contents": [
				{
				"type": "paragraph",
				"text": "<div style='min-height:110px'><b>gioioso</b> è una partnership di sviluppo tra imprese che appartengono a due territori del sud:la Calabria e la Sicilia.</div>"
			},
				{
				"type": "button",
				"label": " vedi su mappa",
				"linked_page_id": "map_gioioso"
			},
				{
				"type": "carousel",
				"items_type": "foto",
				"prePath": "http://www.fishinitaly.eu/app/aziende/puglia/gioioso",
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
			"id": "map_gioioso",
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
					"lat": "43.8574888",
					"lon": "9.2678847"
				}
				]
			}
			]
		},
			{
			"id": "lepore",
			"title": "Lepore Mare",
			"contents": [
				{
				"type": "paragraph",
				"text": "<div style='min-height:110px'><b>lepore</b> è una partnership di sviluppo tra imprese che appartengono a due territori del sud:la Calabria e la Sicilia.</div>"
			},
				{
				"type": "button",
				"label": " vedi su mappa",
				"linked_page_id": "map_lepore"
			},
				{
				"type": "carousel",
				"items_type": "foto",
				"prePath": "http://www.fishinitaly.eu/app/aziende/puglia/lepore",
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
			"id": "map_lepore",
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
					"lat": "43.8574888",
					"lon": "9.2678847"
				}
				]
			}
			]
		},
			{
			"id": "sici",
			"title": "Sicilia",
			"contents": [
				{
				"type": "paragraph",
				"text": "<div style='min-height:110px'><img style='float:left; margin:0px 10px 0px 0px' src='themes/fishInItaly/img/regioni/sicilia.png'><b>pagina Sicilia</b> è una partnership di sviluppo tra imprese che appartengono a due territori del sud:la Calabria e la Sicilia.</div>"
			},
				{
				"type": "menu",
				"className": "arrow_list",
				"title": "Aziende in Sicilia",
				"items": [
					{
					"className": "arrow",
					"linked_page_id": "balist",
					"label": "Balisteri Girolamo"
				},
					{
					"className": "arrow",
					"linked_page_id": "pesc_azz",
					"label": "Pesce Azzurro Cefalù"
				},
					{
					"className": "arrow",
					"linked_page_id": "maestri",
					"label": "Maestri del Gusto srl"
				},
					{
					"className": "arrow",
					"linked_page_id": "benedetto_sca",
					"label": "Benedetto Scalia srl"
				},
					{
					"className": "arrow",
					"linked_page_id": "dal_mare",
					"label": "Dal Mare Soc. Coop. Consortile"
				}
				]
			}
			]
		},
			{
			"id": "balist",
			"title": "Balisteri Girolamo",
			"contents": [
				{
				"type": "paragraph",
				"text": "<div style='min-height:110px'><b>balist</b> è una partnership di sviluppo tra imprese che appartengono a due territori del sud:la Calabria e la Sicilia.</div>"
			},
				{
				"type": "button",
				"label": " vedi su mappa",
				"linked_page_id": "map_balist"
			},
				{
				"type": "carousel",
				"items_type": "foto",
				"prePath": "http://www.fishinitaly.eu/app/aziende/sicilia/balist",
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
			"id": "map_balist",
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
					"lat": "43.8574888",
					"lon": "9.2678847"
				}
				]
			}
			]
		},
			{
			"id": "pesc_azz",
			"title": "Pesce Azzurro Cefalù",
			"contents": [
				{
				"type": "paragraph",
				"text": "<div style='min-height:110px'><b>pesc_azz</b> è una partnership di sviluppo tra imprese che appartengono a due territori del sud:la Calabria e la Sicilia.</div>"
			},
				{
				"type": "button",
				"label": " vedi su mappa",
				"linked_page_id": "map_pesc_azz"
			},
				{
				"type": "carousel",
				"items_type": "foto",
				"prePath": "http://www.fishinitaly.eu/app/aziende/sicilia/pesc_azz",
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
			"id": "map_pesc_azz",
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
					"lat": "43.8574888",
					"lon": "9.2678847"
				}
				]
			}
			]
		},
			{
			"id": "maestri",
			"title": "Maestri del Gusto",
			"contents": [
				{
				"type": "paragraph",
				"text": "<div style='min-height:110px'><b>maestri</b> è una partnership di sviluppo tra imprese che appartengono a due territori del sud:la Calabria e la Sicilia.</div>"
			},
				{
				"type": "button",
				"label": " vedi su mappa",
				"linked_page_id": "map_maestri"
			},
				{
				"type": "carousel",
				"items_type": "foto",
				"prePath": "http://www.fishinitaly.eu/app/aziende/sicilia/maestri",
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
			"id": "map_maestri",
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
					"lat": "43.8574888",
					"lon": "9.2678847"
				}
				]
			}
			]
		},
			{
			"id": "benedetto_sca",
			"title": "Benedetto Scalia srl",
			"contents": [
				{
				"type": "paragraph",
				"text": "<div style='min-height:110px'><b>benedetto_sca</b> è una partnership di sviluppo tra imprese che appartengono a due territori del sud:la Calabria e la Sicilia.</div>"
			},
				{
				"type": "button",
				"label": " vedi su mappa",
				"linked_page_id": "map_benedetto_sca"
			},
				{
				"type": "carousel",
				"items_type": "foto",
				"prePath": "http://www.fishinitaly.eu/app/aziende/sicilia/benedetto_sca",
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
			"id": "map_benedetto_sca",
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
					"lat": "43.8574888",
					"lon": "9.2678847"
				}
				]
			}
			]
		},
			{
			"id": "dal_mare",
			"title": "Dal Mare Soc. Coop. Consortile",
			"contents": [
				{
				"type": "paragraph",
				"text": "<div style='min-height:110px'><b>dal_mare</b> è una partnership di sviluppo tra imprese che appartengono a due territori del sud:la Calabria e la Sicilia.</div>"
			},
				{
				"type": "button",
				"label": " vedi su mappa",
				"linked_page_id": "map_dal_mare"
			},
				{
				"type": "carousel",
				"items_type": "foto",
				"prePath": "http://www.fishinitaly.eu/app/aziende/sicilia/dal_mare",
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
			"id": "map_dal_mare",
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
					"lat": "43.8574888",
					"lon": "9.2678847"
				}
				]
			}
			]
		},
			{
			"id": "tosc",
			"title": "Toscana",
			"contents": [
				{
				"type": "paragraph",
				"text": "<div style='min-height:110px'><img style='float:left; margin:0px 10px 0px 0px' src='themes/fishInItaly/img/regioni/toscana.png'><b>pagina Toscana</b> è una partnership di sviluppo tra imprese che appartengono a due territori del sud:la Calabria e la Sicilia.</div>"
			},
				{
				"type": "menu",
				"className": "arrow_list",
				"title": "Aziende in Toscana",
				"items": [
					{
					"className": "arrow",
					"linked_page_id": "coop_pam",
					"label": "Coop. P.A.M."
				},
					{
					"className": "arrow",
					"linked_page_id": "ghezzi",
					"label": "Ghezzi Alimentari spa"
				},
					{
					"className": "arrow",
					"linked_page_id": "mobil",
					"label": "Mobil Pesca Surgelati spa"
				}
				]
			}
			]
		},
			{
			"id": "coop_pam",
			"title": "Coop. P.A.M.",
			"contents": [
				{
				"type": "paragraph",
				"text": "<div style='min-height:110px'><b>coop_pam</b> è una partnership di sviluppo tra imprese che appartengono a due territori del sud:la Calabria e la Sicilia.</div>"
			},
				{
				"type": "button",
				"label": " vedi su mappa",
				"linked_page_id": "map_coop_pam"
			},
				{
				"type": "carousel",
				"items_type": "foto",
				"prePath": "http://www.fishinitaly.eu/app/aziende/toscana/coop_pam",
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
			"id": "map_coop_pam",
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
					"lat": "43.8574888",
					"lon": "9.2678847"
				}
				]
			}
			]
		},
			{
			"id": "ghezzi",
			"title": "Ghezzi Alimentari spa",
			"contents": [
				{
				"type": "paragraph",
				"text": "<div style='min-height:110px'><b>ghezzi</b> è una partnership di sviluppo tra imprese che appartengono a due territori del sud:la Calabria e la Sicilia.</div>"
			},
				{
				"type": "button",
				"label": " vedi su mappa",
				"linked_page_id": "map_ghezzi"
			},
				{
				"type": "carousel",
				"items_type": "foto",
				"prePath": "http://www.fishinitaly.eu/app/aziende/toscana/ghezzi",
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
			"id": "map_ghezzi",
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
					"lat": "43.8574888",
					"lon": "9.2678847"
				}
				]
			}
			]
		},
			{
			"id": "mobil",
			"title": "Mobil Pesca Surgelati spa",
			"contents": [
				{
				"type": "paragraph",
				"text": "<div style='min-height:110px'><b>mobil</b> è una partnership di sviluppo tra imprese che appartengono a due territori del sud:la Calabria e la Sicilia.</div>"
			},
				{
				"type": "button",
				"label": " vedi su mappa",
				"linked_page_id": "map_mobil"
			},
				{
				"type": "carousel",
				"items_type": "foto",
				"prePath": "http://www.fishinitaly.eu/app/aziende/toscana/mobil",
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
			"id": "map_mobil",
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
					"lat": "43.8574888",
					"lon": "9.2678847"
				}
				]
			}
			]
		},
			{
			"id": "vene",
			"title": "Veneto",
			"contents": [
				{
				"type": "paragraph",
				"text": "<div style='min-height:110px'><img style='float:left; margin:0px 10px 0px 0px' src='themes/fishInItaly/img/regioni/veneto.png'><b>pagina Veneto</b> è una partnership di sviluppo tra imprese che appartengono a due territori del sud:la Calabria e la Sicilia.</div>"
			},
				{
				"type": "menu",
				"className": "arrow_list",
				"title": "Aziende in Veneto",
				"items": [
					{
					"className": "arrow",
					"linked_page_id": "busanel",
					"label": "R. Busanel & F.li srl"
				},
					{
					"className": "arrow",
					"linked_page_id": "flli",
					"label": "F.lli Pasquato II srl"
				},
					{
					"className": "arrow",
					"linked_page_id": "caviar",
					"label": "Giaveri Rodolfo"
				},
					{
					"className": "arrow",
					"linked_page_id": "grupp",
					"label": "Gruppo Azzurra srl"
				},
					{
					"className": "arrow",
					"linked_page_id": "belmar",
					"label": "Belmare srl"
				},
					{
					"className": "arrow",
					"linked_page_id": "salmon",
					"label": "Salmon Club srl"
				},
					{
					"className": "arrow",
					"linked_page_id": "blue",
					"label": "Blue Sails srl"
				}
				]
			}
			]
		},
			{
			"id": "busanel",
			"title": "R. Busanel & F.li srl",
			"contents": [
				{
				"type": "paragraph",
				"text": "<div style='min-height:110px'><b>busanel</b> è una partnership di sviluppo tra imprese che appartengono a due territori del sud:la Calabria e la Sicilia.</div>"
			},
				{
				"type": "button",
				"label": " vedi su mappa",
				"linked_page_id": "map_busanel"
			},
				{
				"type": "carousel",
				"items_type": "foto",
				"prePath": "http://www.fishinitaly.eu/app/aziende/veneto/busanel",
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
			"id": "map_busanel",
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
					"lat": "43.8574888",
					"lon": "9.2678847"
				}
				]
			}
			]
		},
			{
			"id": "flli",
			"title": "F.lli Pasquato II srl",
			"contents": [
				{
				"type": "paragraph",
				"text": "<div style='min-height:110px'><b>flli</b> è una partnership di sviluppo tra imprese che appartengono a due territori del sud:la Calabria e la Sicilia.</div>"
			},
				{
				"type": "button",
				"label": " vedi su mappa",
				"linked_page_id": "map_flli"
			},
				{
				"type": "carousel",
				"items_type": "foto",
				"prePath": "http://www.fishinitaly.eu/app/aziende/veneto/flli",
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
			"id": "map_flli",
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
					"lat": "43.8574888",
					"lon": "9.2678847"
				}
				]
			}
			]
		},
			{
			"id": "caviar",
			"title": "Caviar Giavieri",
			"contents": [
				{
				"type": "paragraph",
				"text": "<div style='min-height:110px'><b>caviar</b> è una partnership di sviluppo tra imprese che appartengono a due territori del sud:la Calabria e la Sicilia.</div>"
			},
				{
				"type": "button",
				"label": " vedi su mappa",
				"linked_page_id": "map_caviar"
			},
				{
				"type": "carousel",
				"items_type": "foto",
				"prePath": "http://www.fishinitaly.eu/app/aziende/veneto/caviar",
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
			"id": "map_caviar",
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
					"lat": "43.8574888",
					"lon": "9.2678847"
				}
				]
			}
			]
		},
			{
			"id": "grupp",
			"title": "Gruppo Azzurra srl",
			"contents": [
				{
				"type": "paragraph",
				"text": "<div style='min-height:110px'><b>grupp</b> è una partnership di sviluppo tra imprese che appartengono a due territori del sud:la Calabria e la Sicilia.</div>"
			},
				{
				"type": "button",
				"label": " vedi su mappa",
				"linked_page_id": "map_grupp"
			},
				{
				"type": "carousel",
				"items_type": "foto",
				"prePath": "http://www.fishinitaly.eu/app/aziende/veneto/grupp",
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
			"id": "map_grupp",
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
					"lat": "43.8574888",
					"lon": "9.2678847"
				}
				]
			}
			]
		},
			{
			"id": "belmar",
			"title": "Belmare srl",
			"contents": [
				{
				"type": "paragraph",
				"text": "<div style='min-height:110px'><b>belmar</b> è una partnership di sviluppo tra imprese che appartengono a due territori del sud:la Calabria e la Sicilia.</div>"
			},
				{
				"type": "button",
				"label": " vedi su mappa",
				"linked_page_id": "map_belmar"
			},
				{
				"type": "carousel",
				"items_type": "foto",
				"prePath": "http://www.fishinitaly.eu/app/aziende/veneto/belmar",
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
			"id": "map_belmar",
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
					"lat": "43.8574888",
					"lon": "9.2678847"
				}
				]
			}
			]
		},
			{
			"id": "salmon",
			"title": "Salmon Club srl",
			"contents": [
				{
				"type": "paragraph",
				"text": "<div style='min-height:110px'><b>salmon</b> è una partnership di sviluppo tra imprese che appartengono a due territori del sud:la Calabria e la Sicilia.</div>"
			},
				{
				"type": "button",
				"label": " vedi su mappa",
				"linked_page_id": "map_salmon"
			},
				{
				"type": "carousel",
				"items_type": "foto",
				"prePath": "http://www.fishinitaly.eu/app/aziende/veneto/salmon",
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
			"id": "map_salmon",
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
					"lat": "43.8574888",
					"lon": "9.2678847"
				}
				]
			}
			]
		},
			{
			"id": "blue",
			"title": "Blue Sails srl",
			"contents": [
				{
				"type": "paragraph",
				"text": "<div style='min-height:110px'><b>blue</b> è una partnership di sviluppo tra imprese che appartengono a due territori del sud:la Calabria e la Sicilia.</div>"
			},
				{
				"type": "button",
				"label": " vedi su mappa",
				"linked_page_id": "map_blue"
			},
				{
				"type": "carousel",
				"items_type": "foto",
				"prePath": "http://www.fishinitaly.eu/app/aziende/veneto/blue",
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
			"id": "map_blue",
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
					"lat": "43.8574888",
					"lon": "9.2678847"
				}
				]
			}
			]
		},

			]
	},
		{
		"id": "progetto",
		"title": "Il Progetto",
		"icon": "fish.png",
		"pages": [
			{
			"id": "manifestazione_pagina_1",
			"title": "Titolo pag1",
			"contents": [
				{
				"type": "paragraph",
				"text": "<div style='min-height:90px'><img style='float:left; margin:0px 10px 0px 0px' src='themes/fishInItaly/img/regioni/calabria.png'><b>Fish in Italy</b> è una partnership di sviluppo tra imprese che appartengono a due territori del sud:la Calabria e la Sicilia.</div>"
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
					"linked_page_id": "ricettario",
					"label": "Il Ricettario"
				},
					{
					"className": "arrow",
					"linked_page_id": "uff_stampa",
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
		},
			{
			"id": "ricettario",
			"title": "Titolo pag1",
			"contents": [
				{
				"type": "paragraph",
				"text": "<div style='min-height:90px'><img style='float:left; margin:0px 10px 0px 0px' src='themes/fishInItaly/img/regioni/calabria.png'><b>Fish in Italy</b> è una partnership di sviluppo tra imprese che appartengono a due territori del sud:la Calabria e la Sicilia.</div>"
			}
			]
		},
			{
			"id": "uff_stampa",
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
 * ################# DATI APP ENG ###################
 * ################# DATI APP ENG  ###################
 * ################# DATI APP ENG  ###################
 * ################# DATI APP ENG  ###################
 * ################# DATI APP ENG  ###################
 */

				
appMLjson_en={
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
		initial_loading_fake_delay:(!! urlParameters.initial_loading_fake_delay) ? urlParameters.initial_loading_fake_delay : 2400,
		sidebar:(!! urlParameters.sidebar) ? urlParameters.sidebar : "26%",
		sidebarScrollable:false,
		add2HomeTooltip: true,
		forcedStartingPage: (!! urlParameters.forcedStartingPage) ? urlParameters.forcedStartingPage : null
	};

/* merge defaults and options, without modifying defaults */
var appMLconf = $.extend({}, appMLconf, options);