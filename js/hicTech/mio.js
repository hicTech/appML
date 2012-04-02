$(document).ready(function(){
	
	function getSiteMap(obj){
		if(! wellFormattedData(obj) )
			return false
		var html = '<navigation height="44px"></navigation>';
				for(i in obj.panels)
					html += getPanel(obj.panels[i]);
			html += '<toolbar></toolbar>';
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
	}
	
	
	function wellFormattedData(obj){
		return true;
		/*var arrPanelId = new Array();
		for(i in obj.panels){
			if(arrPanelId[obj.panels[i].id] != undefined)
				arrPanelId.push(obj.panels[i].id);
		}
		alert("ecco "+arrPanelId)
			
		return true;
		*/
	}
	
	/*
	 * MODULI
	 */
	
	
	function getMenu(obj){
		var html = '<ul class="arrow_list">'+
					'<li class="box_title">'+ obj.title +'</li>';
					for(i in obj.items)
						html += '<li class="'+ obj.items[i].className +'"><a href="#'+obj.items[i].linked_page_id+'">'+ obj.items[i].label +'</a></li>'
			  html += '</ul>';
		return html;
	}
	
	
	function getParagraph(obj){
		return '<div class="info" style="text-align:justify">'+ obj.text +'</div>';	
	}
	
	

	( getSiteMap(dati) != false) ? $("content").html( getSiteMap(dati) ) : null;
})
