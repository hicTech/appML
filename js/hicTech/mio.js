
function getSiteMap(obj){
	if(! wellFormattedData(obj) )
		return false
	var html = '<navigation height="44px"></navigation>';
			for(i in obj.panels)
				html += getPanel(obj.panels[i]);
	return html;
}

function getPanel(obj){
	var html = '<panel id="'+ obj.id+'" title="'+ obj.title +'" icon="'+ obj.icon +'" >';
		
		for (i in obj.pages)
			html += getPage(obj.pages[i]);
		html += "</panel>";
	return html;
}

function getPage(obj){
	var html = '<page id="'+ obj.id +'" title="'+ obj.title +'" >';
			   html += '<div class="dynamic_scroll_container">';
					for (i in obj.contents){
						html += getGenericContent(obj.contents[i]);
					}
				html +='</div>';
		html +="</page>";
	return html;		
}

function getGenericContent(obj){
	if(obj.type == "menu")
		return getMenu(obj);
	if(obj.type == "paragraph")
		return getParagraph(obj);
	if(obj.type == "carousel")
		return getCarousel(obj);
}


function wellFormattedData(obj){
	var arrPanelId = new Array();
	var arrPageId = new Array();
	var arrLink = new Array();
	for(i in obj.panels){

		if(! _.include(arrPanelId,obj.panels[i].id))
			arrPanelId.push(obj.panels[i].id);
		else{
			alert("ATTENZIONE!\n\n il panel 'id:"+obj.panels[i].id+"'\n\n è presente più di una volta");
			return false;		
		}
		
		for(j in obj.panels[i].pages){
			if(! _.include(arrPageId,obj.panels[i].pages[j].id)){
				arrPageId.push(obj.panels[i].pages[j].id);
				for(k in obj.panels[i].pages[j].contents){
					if( obj.panels[i].pages[j].contents[k].type == "menu" )
						for (z in obj.panels[i].pages[j].contents[k].items)
							arrLink.push(obj.panels[i].pages[j].contents[k].items[z].linked_page_id);
				}
			}
			else{
				alert("ATTENZIONE!\n\n la page 'id:"+obj.panels[i].pages[j].id+"'\n\n è presente più di una volta");
				return false;		
			}
			
		}
		
	}
	
	if( _.difference(arrLink , arrPageId) != ""){
		alert("non esistono le pagine per i seguenti link_page_id:\n"+ _.difference(arrLink , arrPageId));
		return false;
	}
	
	if( _.difference(arrPageId , arrLink) != ""){
		console.log("WARNING!! non esistono link per le pagine :\n"+  _.difference(arrPageId , arrLink));
	}
	
	return true;
	
}

/*
 * MODULI
 */


function getMenu(obj){
	var html = '<ul class="arrow_list">'+
				'<li class="box_title">'+ obj.title +'</li>';
				for(i in obj.items)
					html += '<li class="'+ obj.items[i].className +'" data-page-link="'+obj.items[i].linked_page_id+'"><a>'+ obj.items[i].label +'</a></li>'
		  html += '</ul>';
	return html;
}


function getParagraph(obj){
	return '<div class="info" style="text-align:justify">'+ obj.text +'</div>';	
}


function getCarousel(obj){

	var device = (appML.getEnviroment().isDesktop) ? "desktop" : (appML.getEnviroment().isSmartphone) ? "smartphone" : "tablet";
	//var size = (!!size && appML.getEnviroment().isDesktop) ? obj.sizes["desktop"] : (!!size && appML.getEnviroment().isSmartphone) ? obj.sizes["smartphone"] : (!!size) ? obj.sizes["tablet"] : undefined; 
	
	var width,height;
	
	var default_size = {
				tablet:{
					width : 580,
					height : 386
				},
				desktop:{
					width : 310,
					height : 465
				},
				smartphone:{
					width : 310,
					height : 206
				}
			}
	size = $.extend({}, default_size, obj.sizes);		

	deviceFolder = (appML.getEnviroment().isDesktop) ? "desktop" : (appML.getEnviroment().isSmartphone) ? "smartphone" : "tablet";
	
	var width = size[device].width;
	var height = size[device].height;
	var html = '<div style="margin:0px auto; width:'+ width +'px">'+
					'<div class="auto_Carousel" width="'+ width +'" height="'+ height +'">'+
						'<ul >';
						for(i in obj.items){
							var caption = ( !! obj.items[i].caption ) ? "<div>"+obj.items[i].caption+"</div>" : "";
							html += '<li>'+ caption +'<img style="width:'+ width +'px; height:'+ height +'px" src="'+obj.prePath+'/'+deviceFolder+'/'+obj.items[i].url+'"/></li>';
						}
		  				html += '</ul>'+
					'</div>'+
				'</div>';
	return html;
	
}


/*
 * RANDOM
 */

/*
for(var i=0;i<20;i++){
						appMLjson.panels[0].pages[1].contents[1].items.push({
														className:"arrow",
														linked_page_id:"home_pagina_"+i,
														label:"vai a pag "+i
												});
												
						appMLjson.panels[0].pages.push({
										id:"home_pagina_"+i,
										title:"vai a pag"+i,
										contents:[
											{
												type: "paragraph",
												text: "<b>Ben venuto a pag "+i+"</b><br>I'm wait for you!!!!Some text long, very long... too long!<b>Titolo pag 2</b><br>Some text long,Some text long, very long... too long!<b>Titolo pag 2</b><br>Some text long,Some text long, very long... too long!<b>Titolo pag 2</b><br>Some text long,Some text long, very long... too long!<b>Titolo pag 2</b><br>Some text long,"
											}
										]
								});
					}
					
*/					
					
					


