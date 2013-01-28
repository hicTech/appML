
function getSiteMap(obj){
	if(appMLconf.dataValidation && ! wellFormattedData(obj) )
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
	var scrollable = (obj.scrollable == "false" ) ? "not_scrollable" : "";
	var html = '<page id="'+ obj.id +'" title="'+ obj.title +'" >';
			   html += '<div class="dynamic_scroll_container '+scrollable+'">';
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
	if(obj.type == "map")
		return getMap(obj);
	if(obj.type == "button")
		return getButton(obj);
	if(obj.type == "test")
		return getTest(obj);
}


function wellFormattedData(obj){
	var arrPanelId = new Array();
	var arrPageId = new Array();
	var arrLink = new Array();
	for(i in obj.panels){

		if(! _.include(arrPanelId,obj.panels[i].id))
			arrPanelId.push(obj.panels[i].id);
		else{
			alert("ATTENZIONE!\n\n il panel 'id:"+obj.panels[i].id+"'\n\n ‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚Äö√Ñ‚Ä†‚Äö√†√∂‚Äö√†√á¬¨¬®¬¨¬Æ‚Äö√†√∂‚àö√∫ presente pi‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚Äö√Ñ‚Ä†‚Äö√†√∂‚Äö√†√á‚Äö√¢√†‚àö¬®‚Äö√†√∂‚àö√´ di una volta");
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
				alert("ATTENZIONE!\n\n la page 'id:"+obj.panels[i].pages[j].id+"'\n\n ‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚Äö√Ñ‚Ä†‚Äö√†√∂‚Äö√†√á¬¨¬®¬¨¬Æ‚Äö√†√∂‚àö√∫ presente pi‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚Äö√Ñ‚Ä†‚Äö√†√∂‚Äö√†√á‚Äö√¢√†‚àö¬®‚Äö√†√∂‚àö√´ di una volta");
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

function getButton(obj){
	return '<p><br><a href="#" data-linked_page_id="'+obj.linked_page_id+'" class="whiteButton">'+obj.label+'</a><br></p>';	
}

function getCarousel(obj){

	var device = (appML.getEnviroment().isDesktop) ? "desktop" : (appML.getEnviroment().isSmartphone) ? "smartphone" : "tablet";
	
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
	var html = '<div style="margin:10px auto; width:'+ width +'px;">'+
					'<div class="auto_Carousel" width="'+ width +'" height="'+ height +'">'+
						'<ul style=" height:'+ height +'px">';
						for(i in obj.items){
							var caption = ( !! obj.items[i].caption ) ? "<div>"+obj.items[i].caption+"</div>" : "";
							html += '<li style="display:none;">'+ caption +'<img style="width:'+ width +'px; height:'+ height +'px" data-src="'+obj.prePath+'/'+deviceFolder+'/'+obj.items[i].url+'"/></li>';
						}
		  				html += '</ul>'+
					'</div>'+
					'<div style="height:10px">&nbsp;</div>'+
				'</div>';
	return html;
	
}



var user_lat=50.897834; //bruxelles expo
var user_lon=4.339727;

function getMap(obj){
	var points_menu_visibility = (obj.points_menu == false) ? "display:none" : "display:block";
	var id = obj.points[0].lat+'_'+obj.points[0].lon;
	var id = id.replace(".","").replace(".","").replace(".","").replace(".","");
	var html = '<div >'+
						'<div style="position:absolute; top:25px; right:-40px;  width:160px; z-index:50000">'+
								'<div id="side-bar-map-risultati_'+id+'" style="'+points_menu_visibility+'">';
								
									// user position (bruxelles expo)
									html += '<div class="map-location" data-jmapping="{id:200, point: {lng: '+user_lon+', lat: '+user_lat+'},category:\'expo\'}"> '+
											'<a href="#" class="map-link" style="font-size:16px; margin:5px;color:#fff"><div class="pure_button" style="width:100px">Brussels EXPO</div> </a> '+
											'<div class="info-box"> '+
												'<p> BRUSSELS EXPO</p>'+ 
											'</div> '+
										'</div>';
								
									for(i in obj.points){
										var point = obj.points[i];
										html += '<div class="map-location" data-jmapping="{id:'+Math.floor(Math.random()*1001)+', point: {lng: '+point.lon+', lat: '+point.lat+'},category:\'point\'}"> '+
											'<a href="#" class="map-link" style="font-size:16px; margin:5px;color:#fff"><div class="pure_button" style="width:100px">'+point.label+'</div> </a> '+
											'<div class="info-box"> '+
												'<p>'+point.description+'</p>'+ 
											'</div> '+
										'</div>';
									
									}
								
								html += '</div> '+
						'</div>'+
						'<div class="automatic_mapContainer" data-id="'+id+'"></div>'+ 
					'</div> ';
	return html;
}





function getTest(obj){
	var ret = "<div class='skillTest' >" ;
			var test = obj.test;
			var tot_questions = _.keys(test).length;
			_.each(test,function(question,index){
				ret += getQuestion(question,index,tot_questions);
			});	
		ret += "</div>" ;
	return ret;
}


function getQuestion(q,i,tot_questions){
	var ret  ="<div class='single_question' id='question_number_"+i+"'>"
			ret +="<div class='timer'><div class='timer_bg'>&nbsp;</div></div>";
			ret += '<ul class="form question" data-time="'+q.time+'">';
					ret += '<li class="box_title">'+i+'/'+tot_questions+' - '+ q.question +' </li>';
					var answers = q.answers;
					_.each(answers,function(answer,index){
						ret += getAnswer(answer,i,index);
					});
			
			ret +='<li>';
				ret +='<div>';
					ret += '<div class="confirm"><a href="#"  style="font-size:14px" class="blueButton">Conferma</a></div>';
				ret +='</div>';
			ret +='</li>';
			ret +='<li>'
				ret +='<div class="confirm_buttons" style="display:none">';
					ret += '<div class="deny"><a href="#" style="font-size:14px" class="redButton">Annulla</a></div>';
				ret +='</div>';
			ret +='</li>';
			
			ret += '</ul>';
			ret +='<div class="info" style="text-align:center"><font style="font-size:14px">Area Tematica: </font> '+q.thematic_area+' &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<font style="font-size:14px">Complessit√†: </font> '+q.complexity+'</div>';
		ret +="</div>";
	return ret;
}

function getAnswer(a,i,j){
	return '<li class="question_li">'+
				'<div class="question_li_table" style="display:table; width:100%">'+
					'<div class="question_li_row" style="display:table-row">'+
						'<div class="question_li_cell toggle_text" >'+ a +'</div>'+
						'<div class="question_li_cell toggle_container">'+
							'<div class="toggle">'+
								'<input type="checkbox" name="toggle" value="'+ i +'_'+ j +'">'+
							'</div>'+
						'</div>'+
					'</div>'+
				'</div>'+
			'</li>';
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
					
					


