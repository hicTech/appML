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
							type: "paragraph",
							text: "<b>Titolo pag 2</b><br>Some text "
						},
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
									linked_page_id:"home_pagina_3",
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
									linked_page_id:"home_pagina_3",
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