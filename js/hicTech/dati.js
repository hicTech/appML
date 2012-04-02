	var dati={
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
								text: "<b>Titolo pag 2</b><br>Some text long, very long... too long!<br>Some text long, very long... too long!<br>Some text long, very long... too long!<br>Some text long, very long... too long!<br>Some text long, very long... too long!<br>Some text long, very long... too long!<br>Some text long, very long... too long!<br>Some text long, very long... too long!<br>Some text long, very long... too long!<br>Some text long, very long... too long!<br>Some text long, very long... too long!<br>Some text long, very long... too long!"
							},
							{
								type:"menu",
								className:"arrow_list",
								title:"Link in home",
								items:[
									{
										className:"arrow",
										linked_page_id:"home_pagina_2",
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
						id:"home_pagina_2",
						title:"Titolo pag2",
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
										linked_page_id:"home_pagina_3",
										label:"vai a pag 3"
									}
								]
							}
						]
					},
					{
						id:"home_pagina_3",
						title:"Titolo pag3",
						contents:[
							{
								type: "paragraph",
								text: "<b>Titolo pag 3</b><br>I'm wait for you!!!!"
							}
						]
					}
				]
			}
		]
	}