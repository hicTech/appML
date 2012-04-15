/* tableEditor function constructor and prototype... */

	var tableManager = {
		
		config: {
			// each table entry has a coordinate properties: one table is an array of entries 
			fields: {
				coordinates: "coordinates",
				row: "y",
				col: "x",
				width: "h",
				height: "w"
			},
			functions: {
				objectHtml: function(object){
					return "<div>"+JSON.stringify(object)+"</div>";
				},
				tableHtml: function(){
					var html = "<table>";
					for(var i=0; i<this.table.length; i++){
						html+="<tr>";
						for(var j=0; j<this.table[i].length; j++)
							html+="<td data-row='"+i+"' data-col='"+j+"' onclick='tableManager.cellClicked(this);'>"+this.callFn("cellHtml", [this.table[i][j], i, j])+"</td>";
						html+="</tr>";
					}
					html+="</table>";
					return html;
				},
				cellHtml: function(object, x, y){
					return ((_.isNull(object) || _.isUndefined(object)) ? "---" : " X ");
				},
				editorHtml: function(){
					var html = "";
					var cell = this.cell();
					if(!!cell){
						var row = this.row(cell);
						var col = this.col(cell);
						var item = this.getItem(row,col);
						var action = this.action();
						var selection = this.selection();
						
						html += "Cella {"+col+", "+row+"}: ";
						if(_.isString(action)){
							html += (action=="add" ? "Aggiunta elemento" : (action=="move" ? "Spostamento" : "Rimozione") );
							html += " <input type='button' value='Annulla' onclick='tableManager.cancelAction(this)' />";
							html += "<br/><br/>";
							
							var steps = (_.isArray(selection)) ? selection.length : 0;
							if(steps>0){
								html += "Celle selezionate: ";
								for(var i=0;i<steps;i++)
									html += ( (i>0) ? "," : "" ) + "{ " + this.row(selection[i]) + ", " + this.col(selection[i]) + " }";
								html+="<br/><br/>";
							}
							html += (steps==0 ? "Clicca su tre celle della tabella per definire gli estremi della posizione" :
								( steps==1 ? "Clicca su altre due celle per definire gli estremi della posizione" : 
									"Clicca su un'altra cella per terminare l'individuazione della posizione" ) );
						}
						else{
							if(!!item){
								html+=" Occupata. "+
										"<input type='button' value='Rimuovi item' onclick='tableManager.removeItem(this);' /> "+
										"<input type='button' value='Sposta item' onclick='tableManager.moveItem(this);' /> "+
										"<br/> ";
								html+= "Oggetto presente: <br/>"+this.callFn("objectHtml",item);
							}
							else{
								html+="Libera. <input type='button' value='Aggiungi item' onclick='tableManager.addItem(this);' /> <br/>";
							}
						}
					}
					else
						html+="Click on an item of the table on the left to see the contained object or to add one";
					
					return html;
				}
			},
			css_classes: {
				
			},
			defaults: {
				rows: 5,
				cols: 5,
				w: 1,
				h: 1
			},
			add_items_when_creating: false,
			id_prefix : "tableEditor_"
		},
		
		conf: function(prop, new_value){
			if(!_.isUndefined(new_value))
				this.config[prop] = new_value;
			return this.config[prop];
		},
		
		getId: function(id){
			var prefix = this.conf("id_prefix");
			return (_.isString(id) && id.length>0) ? prefix+"_"+id : _.id(prefix);
		},
		
		tables : {},
		
		table: function(id){
			if(_.isElement(id))
				id = $(id).is(".table_editor") ? $(id).attr("id") : $(id).parents(".table_editor").attr("id");
			if(_.isString(id) && id.length>0)
				return this.tables[id];
			else
				return null;
		},
		
		created: function(table){
			this.tables[table.id] = table;
		},
		
		cellClicked: function(cell){
			var table = tableManager.table(cell);
			var $cell = $(cell);
			var row = parseInt($cell.attr("data-row"));
			var col = parseInt($cell.attr("data-col"));
			table.cellClicked(row, col);
			table.refreshEditorHtml();
		},
		
		setAction: function(cell, action){
			var table = tableManager.table(cell);
			table.action(action);
			table.refreshEditorHtml();
		},
		
		cancelAction: function(cell){
			tableManager.setAction(cell, null);
		},
		
		addItem: function(cell){
			tableManager.setAction(cell, "add");
		},
		
		removeItem: function(cell){
			tableManager.setAction(cell, "remove");
		},
		
		moveItem: function(cell){
			tableManager.setAction(cell, "move");
		}
		
	};
	
	
/* tableEditor function constructor and prototype... */

	var tableEditor = function(rows, cols, items, options, id){
		
		this.config = tableManager.config;
		_.extend(this.config,options);

		this.id = tableManager.getId(id);		
		this.table = this.createTable(rows, cols, items, (!this.conf("add_items_when_creating")));
		
	};
	
	tableEditor.prototype = {
		
		conf: function(prop, new_value){
			if(!_.isUndefined(new_value))
				this.config[prop] = new_value;
			return this.config[prop];
		},
		
		field: function(field){
			return this.conf("fields")[field];
		},
		
		css: function(name){
			return this.conf("css_classes")[name];
		},
		
		def: function(name){
			return this.conf("defaults")[name];
		},
		
		fn: function(name){
			return this.conf("functions")[name];
		},
		
		callFn: function(name, args){
			if(!_.isArray(args))
				args = (_.isNull(args) || _.isUndefined(args)) ?  new Array() : [args];
			return this.fn(name).apply(this, args);
		},
		
		isDim: function(value){
			return (_.isNumber(value) && value>0);
		},
		
		isCoord: function(value){
			return (_.isNumber(value) && value>=0);
		},
		
		getOtherDim: function(area, first_dim){
			return ( area/first_dim ) + ( ( area%first_dim > 0 ) ? 1 : 0 );
		},
		
		getCoords: function(item, no_default_value){
			var coords = ( !(_.isNull(item) || _.isUndefined(item)) ) ? item[this.field("coordinates")] : ( no_default_value ? null : {} );
			if(coords){
				if(!_.isNumber(this.w(coords)))
					this.w(coords, this.def("width"));
				if(!_.isNumber(this.h(coords)))
					this.h(coords, this.def("height"));
			}
			return coords;
		},
		
		items: function(){
			var arr = new Array();
			var elem = null;
			for(var i=0; i<this.table.length; i++){
				for(var j=0; j<this.table[i].length; j++){
					elem = this.table[i][j];
					if(!(_.isNull(elem) || _.isUndefined(elem)))
						arr.push(elem);
				}
			}
			return _.unique(arr);
		},
		
		row: function(coords_or_item, value){
			return this.getCoordField(coords_or_item, "row", value);
		},
		col: function(coords_or_item, value){
			return this.getCoordField(coords_or_item, "col", value);
		},
		w: function(coords_or_item, value){
			return this.getCoordField(coords_or_item, "width", value);
		},
		h: function(coords_or_item, value){
			return this.getCoordField(coords_or_item, "height", value);
		},
		getCoordField: function(coord_or_item, field, value){
			if(!coord_or_item)
				return null;
			var coord = (!!coord_or_item[this.field("coordinates")]) ? coord_or_item[this.field("coordinates")] : coord_or_item;
			field = this.field(field);
			if(_.isNumber(value))
				coord[field] = value;
			return coord[field];
		},
		
		elemArea: function(coords){
			var w = this.w(coords);
			var h = this.h(coords);
			return ( this.isDim(w) ? w : this.def("width") ) * ( this.isDim(h) ? h : this.def("height") );
		},
		
		findArea: function(items, only_with_coordinates){
			var area = 0;
			var coords = null;
			for(var i=0;i<items.length;i++){
				coords = this.getCoords(items[i], only_with_coordinates);
				if(coords)
					area += this.elemArea(coords); 
			}
			return area;
		},
		
		
		
		
		
		createTable: function(rows, cols, items, only_with_coordinates){
			var table = new Array(); 
			// find the minimum table area to host the items (if present) 
			var area = 0;
			var items_present = (_.isArray(items) && items.length>0); 
			if(items_present)
				area = this.findArea(items);
			else
				area = this.def("rows") * this.def("cols");
			// set rows and columns, if not declared, to a suitable value  
			if(!this.isDim(cols)){
				if(this.isDim(rows))
					cols = this.getOtherDim(area,rows);
				else{
					cols = this.def("cols");
					rows = this.getOtherDim(area,cols);
				}
			}
			else if(!this.isDim(rows)){
				rows = this.getOtherDim(area,cols);
			}
			else if(items_present){
				// assure the rows and columns arguments can host the items 
				if(rows*cols<area)
					rows = this.getOtherDim(area,cols);
			}
			// create the table 
			for(var i=0;i<rows;i++)
				table.push(new Array(cols));
			// fill the table with the items (if present) 
			if(items_present){
				// we add the items with a coordinates object first, the others will get the free spaces.. 
				this.addItemsInternal(items, table, true);
				if(!only_with_coordinates)
					this.addItemsInternal(items, table, false);
			}
			// notify the manager and return
			tableManager.created(this);
			return table;
		},
		
		addItemsInternal: function(items, table, with_coordinates){
			var coords = null;
			for(var i=0;i<items.length;i++){
				coords = this.getCoords(items[i], true);
				if( ((!!with_coordinates) && (!!coords)) || ((!with_coordinates) && (!coords)) )
					this.addItem(items[i], table);
			}
		},
		
		replaceCells: function(x,y,w,h,item){
			var prev_arr = new Array();
			var prev = null;
			for(var i=x; ( i<(x+w) && i<this.table.length ); i++){
				for(var j=y; ( j<(y+h) && j<this.table[i].length ); j++){
					prev = this.table[i][j];
					if(!(_.isNull(prev) || _.isUndefined(prev)))
						prev_arr.push(prev);
					this.table[i][j] = item;
				}
			}
			return prev_arr;
		},
		
		replaceCoordinate: function(coords, replacement){
			return this.replaceCells(this.row(coords), this.col(coords), this.w(coords), this.h(coords), replacement);
		},
		
		addItem: function(item, table){
			if(_.isNull(table) || _.isUndefined(table))
				table = this.table;
			if(this.fillPos(item, table)){
				var coords = this.getCoords(item,true);
				var replaced = this.replaceCoordinate(coords,item); 
				this.refreshItems(replaced);
				return true;
			}
			else
				return false;
		},
		
		removeItem: function(x, y){
			var item = this.table[x][y];
			var coords = this.getCoords(item,true);
			this.replaceCoordinate(coords,null);
		},
		
		moveItem: function(x, y, new_coords){
			var item = this.table[x][y];
			this.removeItem(x,y);
			item[this.field("coordinates")] = new_coords;
			this.addItem(item);
		},
		
		refreshItems: function(items){
			if(_.isArray(items)){
				items = _.uniq(items);
				for(var i=0; i<items.length; i++)
					this.refreshItemCoords(items[i]);
			}
		},
		
		findItemCells: function(item){
			var coords = this.getCoords(item,true);
			var x = this.row(coords);
			var y = this.col(coords);
			var last_x = (x + this.w(coords));
			var last_y = (y + this.h(coords));
			var arr = new Array();
			for(var i=x; i<last_x; i++){
				for(var j=y; j<last_y; j++){
					if(this.table[i][j]==item)
						arr.push(this.getPosCoords(i, j));
				}
			}
			return arr;
		},
		
		refreshItemCoords: function(item){
			var cells = this.findItemCells(item);
			var coords = this.extractCoordinates(cells);
			item[this.field("coordinates")] = coords;
		},
		
		fillPos: function(item, table){
			var coords = this.getCoords(item);
			var x = this.row(coords);
			if(!_.isNumber(x))
				x = 0;
			var y = this.col(coords);
			if(!_.isNumber(y))
				y = 0;
			
			var free = this.isFree(x,y,table);
			if(!free){
				var free_coords = this.findFreeCoords(x,y,table);
				if(!_.isNull(free_coords)){
					this.row(coords, this.row(free_cords));
					this.col(coords, this.col(free_cords));
					item[this.field("coordinates")] = coords;
					free = true;
				}
			}
			return free;
		},
		
		getItem: function(x, y, table){
			if(_.isNull(table) || _.isUndefined(table))
				table = this.table;
			var value = (this.isCoord(x) && this.isCoord(y)) ? table[x][y] : null;
			return value;
		},
		
		isFree: function(x, y, table){
			var value = this.getItem(x, y, table);
			return (_.isNull(value) || _.isUndefined(value));
		},

		findFreeCoords: function(starting_x, starting_y, table){
			if(_.isNull(table) || _.isUndefined(table))
				table = this.table;
			if(!(_.isNumber(starting_x) && starting_x>=0))
				starting_x = 0;
			if(!(_.isNumber(starting_y) && starting_y>=0))
				starting_y = 0;
			var x = starting_x;
			var y = starting_y;
			
			for(; x<table.length; x++){
				for(; y<table[x].length;y++){
					if(this.isFree(x,y,table))
						return this.getPosCoords(x,y);
				}
				y=0;
			}
			
			if(starting_x>0 || starting_y>0){
				for(x=0; (x<table.length && x<=starting_x); x++){
					for(y=0; (y<table[x].length && (x<starting_x || y<starting_y));y++){
						if(this.isFree(x,y,table))
							return this.getPosCoords(x,y);
					}
				}
			}
			return null;
		},
		
		getPosCoords: function(x,y){
			var ret = {};
			this.row(ret,x);
			this.col(ret,y);
			return ret;
		},
		
		
		
		
		
		html: function(){
			var html="<div id='"+this.id+"' class='table_editor'><div class='table_editor_message'></div><div class='table_editor_table'>";
				html+=this.callFn("tableHtml");
				html+="</div><div class='table_editor_state'>";
				html+=this.callFn("editorHtml");
			html+="</div></div>";
			return html;
		},
		
		refreshHtml: function(){
			this.refreshTableHtml();
			this.refreshEditorHtml();
		},
		
		refreshTableHtml: function(){
			var html = this.callFn("tableHtml");
			$("#"+this.id).children(".table_editor_table").html(html);
		},
		
		refreshEditorHtml: function(){
			var html = this.callFn("editorHtml");
			$("#"+this.id).children(".table_editor_state").html(html);
		},
		
		edit_state: {},
		
		cellClicked: function(x, y){
			if(!!this.cell()){
				var action = this.action();
				if(_.isString(action)){
					var selection = this.selection();
					if(action=="add" || action=="move"){
						if(!_.isArray(selection))
							selection = this.selection(new Array());
						if(selection.length<3)
							this.edit_state.selection.push(this.getPosCoords(x,y));
						if(selection.length==3)
							this.actionDone();
					} 
					else
						this.actionDone();
				}
				else
					this.cell(this.getPosCoords(x,y));
			}
			else
				this.cell(this.getPosCoords(x,y));
		},
		
		cell: function(cell){
			if(!_.isUndefined(cell)){
				this.edit_state.cell = cell;
				this.edit_state.selection = null;
			}
			return this.edit_state.cell;
		},
		
		selection: function(selection){
			if(!_.isUndefined(selection))
				this.edit_state.selection = selection;
			return this.edit_state.selection;
		},
		
		coordinates: function(){
			var cell = this.cell();
			var sel = this.selection();
			if(_.isArray(sel)){
				if(sel.length<3)
					sel.splice(0,0,cell);
				return this.extractCoordinates(sel);
			}
		},
		
		extractCoordinates: function(arr){
			if(!_.isArray(arr))
				arr = this.selection();
			if(!_.isArray(arr))
				return null;
			
			var min_x = this.row(arr[0]);
			var max_x = this.row(arr[0]);
			var min_y = this.col(arr[0]);
			var max_y = this.col(arr[0]);
			var x= 0;
			var y= 0;
			for(var i=1;i<arr.length;i++){
				x = this.row(arr[i]);
				y = this.col(arr[i]);
				if(x<min_x)
					min_x = x;
				if(x>max_x)
					max_x = x;
				if(y<min_y)
					min_y = y;
				if(y>max_y)
					max_y = y;
			}
			var coords = {};
			this.row(coords, min_x);
			this.col(coords, min_y);
			this.w(coords, (max_x-min_x+1));
			this.h(coords, (max_y-min_y+1));
			return coords;
		},
		
		action: function(action){
			if(!_.isUndefined(action)){
				this.edit_state.action = action;
				if(!action)
					this.selection(null);
				else if(action=="add")
					this.selection( [this.cell()] );
				else if(action=="remove")
					this.actionDone();
			}
			return this.edit_state.action;
		},
		
		actionDone: function(){
			var action = this.action();
			if(action=="add"){
				var coords = this.extractCoordinates();
				var item = {};
				item[this.field("coordinates")] = coords;
				this.addItem(item);
			}
			else if(action=="remove"){
				var cell = this.cell();
				this.removeItem(this.row(cell),this.col(cell));
			}
			else if(action=="move"){
				var cell = this.cell();
				var coords = this.extractCoordinates();
				this.moveItem(this.row(cell),this.col(cell),coords);
				this.cell(this.getPosCoords( this.row(coords), this.col(coords)));
			}
			this.action(null);
			this.refreshHtml();
		}
	

	};
