	

/* Some utility function... */
/*
	_.FNs = {};
	 // Return a unique id, that auto-increments its numeric part at each invocation
	_.FNs.maxId={};
	_.id = function(prefix){
		if(!prefix)
			prefix="_ID";
		if(!(_.FNs.maxId[prefix]))
			_.FNs.maxId[prefix] = 0;
		
		_.FNs.maxId[prefix]++;
		return prefix+"_"+_.FNs.maxId[prefix];
	};
*/

/* jsOn function constructor and prototype... */

	var jsOnFn = function(options, objects){
		this.init(options, objects);
	};
	
	jsOnFn.prototype = {
		
		init: function(options, objects){
			this.objects = (_.isNull(objects) || _.isUndefined(objects) || _.isEmpty(objects)) ? {} : objects;
			this.copies = {};
			this.upload_submits = new Array();
			
			var config = {
				// this separator is used to divide child identifiers in a nested object path. The . is more appropriate (even if you have to access array items as 
				// object fields, with the same . notation instead of the [] brackets...), but you cannot use the jQuery selector ("#"+id), because the . in the id
				// will be interpreted as the starting of a css selector... you can always use jsOn.get$(path) to directly have your jquery object, if you want
				// to use the . seprator... :-)
				path_separator: '-',
				css_classes: {
					container: 'json_container',
					header: 'json_header',
					object: 'json_object',
					object_field: 'json_object_field',
					array: 'json_array',
					array_item: 'json_array_item',
					primitive: 'json_primitive',
					editing: 'json_editing',
					edit_box: 'json_edit_box',
					edit_box_field: 'json_edit_box_field',
					label: 'json_label',
					button: 'json_button',
					field_prefix: 'field_prefix',
					field_suffix: 'field_suffix',
					field_separator: 'field_separator',
					view_mode: 'json_object_view',
					container_marker: 'json_container_marker',
					content_marker: 'json_content_marker'
				},
				data_attributes: {
					id: 'id'
				},
				upload_attributes: {
					server_url: '',
					iframe_src: 'upload',
					iframe_container_css: 'upload_iframe_container',
					iframe_css: 'upload_iframe'
				} 
			};
			_.extend(config,options);
			this.config = config;
		},
		
		exportObjects: function(){
			var cleaned = this.cleanObject(this.objects);
			return this.stringifyObj(cleaned);
		},
		
		importObjects: function(objects){
			this.objects = this.parseAndClean(objects);
		},
		
		cleanObject: function(obj){
			var ret = {};
			var keys = _.keys(obj);
			for(var i=0;i<keys.length;i++)
				if(!_.isUndefined(obj[keys[i]]))
					ret[keys[i]] = obj[keys[i]];
			return ret;
		},
		
		parseAndClean: function(objects){
			if(_.isString(objects))
				objects = JSON.parse(objects);
			else if(_.isNull(objects) || _.isUndefined(objects))
				return objects;
			
			return this.cleanObject(objects);
		},
		
		readObjects: function(){
        	try{
        		var objs = localStorage.getItem("jsOn_objects");
	            if(_.isString(objs)){
	            	this.importObjects(objs);
	            	return true;
	            }
	            else
	            	return false;
        	}catch(err){
        		return false;
        	}
        },
        
        writeObjects: function(){
        	try{
        		localStorage.setItem("jsOn_objects", this.exportObjects());
	            return true;
	        }catch(err){
        		return false;
        	}
        },
        
        deleteObjects: function(){
        	try{
        		localStorage.removeItem("jsOn_objects");
        		this.objects = {};
	            return true;
	        }catch(err){
        		return false;
        	}
        },
        
		conf: function(prop, new_value){
			if(!_.isUndefined(new_value))
				this.config[prop] = new_value;
			return this.config[prop];
		},
		
		sep: function(){
			return this.conf("path_separator");
		},
		
		css: function(name){
			return this.conf("css_classes")[name];
		},
		
		dataAttr: function(name){
			return "data-"+this.conf("data_attributes")[name];
		},
		
		uploadAttr: function(name){
			return this.conf("upload_attributes")[name];
		},
		
		serverUrl: function(relative_url){
			if(relative_url.charAt(0) == '/')
				relative_url = relative_url.substring(1,relative_url.length);
			var serv = this.uploadAttr("server_url");
			return (_.isString(serv) && serv.length>0) ? serv + (serv.charAt(serv.length-1) == '/' ? "" : "/") + relative_url : relative_url;
		},
		
		
		
		create: function(id, container_id, obj, edit_mode, print_container){
			if(!(_.isNull(obj) || _.isUndefined(obj)))
				this.objects[id] = obj;
			else if(!this.objects[id])
				this.objects[id] = {};
			this.makeCopy(id);
			if(_.isString(container_id) && container_id.length>0){
				var html = this.html(id, edit_mode, print_container);
				this.get$(container_id).html(html);
			}
		},
		
		makeCopy: function(id){
			this.copies[id] = this.clone(this.objects[id]);
		},
		
		getCopy: function(id){
			return this.copies[id];
		},
		
		restoreCopy: function(id){
			this.objects[id] = this.clone(this.copies[id]);
		},
		
		clone: function(obj){
			if(_.isArray(obj)){
				var arr = new Array();
				for(var i=0;i<obj.length;i++)
					arr[i] = this.clone(obj[i]);
				return arr;
			}
			else if(_.isString(obj))
				return (""+obj);
			else if(_.isNumber(obj))
				return (0+obj);
			else if(_.isBoolean(obj))
				return (obj && true);
			else if(_.isNull(obj))
				return null;
			else if(_.isUndefined(obj))
				return undefined;
			else{
				var ret = {};
				var keys = _.keys(obj);
				var val = null;
				for(var i=0;i<keys.length;i++){
					val = this.clone(obj[keys[i]]);
					if(!_.isUndefined(val))
						ret[keys[i]] = val;
				}
				return ret;
			}
		},
		
		path: function(id){
			return (_.isString(id) && id.length>0) ? id.split(this.sep()) : (_.isArray(id) ? id : new Array());
		},
		
		childPath: function(path, name){
			return ""+path+this.sep()+name;
		},
		
		parentPath: function(path){
			if(_.isString(path) && path.indexOf(this.sep())>0)
				return path.substring(0,path.lastIndexOf(this.sep()));
			else
				return "";
		},
		
		fieldName: function(path){
			if(_.isString(path) && path.indexOf(this.sep())>0)
				return path.substring(path.lastIndexOf(this.sep())+1, path.length);
			else
				return path;
		},
		
		getNameAsArrayItem: function(name){
			try{
				return parseInt(name);
			}catch(err){
				return name;
			}
		},
		
		getObjChild: function(obj, prop){
			if(_.isArray(obj))
				return obj[this.getNameAsArrayItem(prop)];
			else if( !(_.isNull(obj) || _.isUndefined(obj)) )
				return obj[prop];
			else
				return null;
		},
		
		setObjChild: function(obj, name, value){
			if(_.isArray(obj)){
				var null_name = (_.isNull(name) || _.isUndefined(name) || (_.isString(name) && name.length==0));
				if(_.isUndefined(value) && (!null_name)){
					value = name;
					null_name = true;
				}
				if(null_name)
					obj.push(value);
				else
					obj[this.getNameAsArrayItem(name)] = value;
			}
			else if( !(_.isNull(obj) || _.isUndefined(obj)) )
				obj[name] = value;
		},
		
		getObjectInRoot: function(id_or_obj, sub_prop, root_object){
			if(_.isNull(root_object) || _.isUndefined(root_object))
				return null;
			var arr = this.path(id_or_obj);
			if(arr!=null && arr.length>0){
				var obj = root_object[arr[0]];
				for(var i=1; i<arr.length && obj!=null; i++)
					obj = this.getObjChild(obj, arr[i]);
				if(_.isString(sub_prop) && sub_prop.length>0){
					arr = this.path(sub_prop);
					for(var i=0; i<arr.length && obj!=null; i++)
						obj = this.getObjChild(obj, arr[i]);
				}
				return obj;
			}
			else
				return root_object;
		},
	
		root: function(){
			return this.cleanObject(this.objects);
		},
		
		get: function(id_or_obj, sub_prop){
			return this.getObjectInRoot(id_or_obj, sub_prop, this.objects);
		},
		
		set: function(id_or_obj, name_or_value, value){
			var name = name_or_value;
			if(!_.is(value)){
				value = name_or_value;
				name = null;
			}
			
			if(_.isString(name))
				id_or_obj = this.childPath(id_or_obj, name);
			var parent_path = this.parentPath(id_or_obj);
			name = this.fieldName(id_or_obj);
			var obj = this.get(parent_path);
			//console.log("Obj "+id_or_obj+", "+parent_path+": "+obj+", setting to: "+value);
			if(_.isNull(value) || _.isUndefined(value))
				value="";
			obj[name] = value;
		},
		
		add: function(id_or_obj, name, value){
			var parent_path = this.parentPath(name);
			if(_.isString(parent_path) && parent_path.length>0)
				name = this.fieldName(name);
			var obj = this.get(id_or_obj, parent_path);
			//console.log("Obj "+id_or_obj+", "+parent_path+": "+obj+", adding: "+name+"="+value);
			if(!_.isNull(obj)){
				var prop = this.getObjChild(obj,name);
				value = (_.isNull(prop) || _.isUndefined(prop)) ? value : [prop,value];
				this.setObjChild(obj, name, value);
			}
		},
		
		remove: function(id_or_obj, name, value){
			var obj = this.get(id_or_obj); 
			var prop = obj[name];
			if(!(_.isNull(prop) || _.isUndefined(prop))){
				if(_.isNull(value) || _.isUndefined(value)){
					if(_.isArray(obj)){
						var pos = -1;
						try{
							pos = parseInt(name);
						}catch(err){}
						if(pos>=0)
							obj.splice(pos,1);
					}
					else
						obj[name] = undefined;
				}
				else{
					if(_.isArray(prop)){
						var new_arr = new Array();
						for(var i=0; i<prop.length;i++){
							if(prop[i] != value)
								new_arr.push(prop[i]);
						}
						obj[name] = new_arr;
					}
					else{
						if(prop==value)
							obj[name]=undefined;
					}
				}
			}
			else{
				if(_.isString(id_or_obj) && id_or_obj.length>0){
					this.objects[id_or_obj] = undefined;
				}
				else if(_.isString(name) && name.length>0){
					this.objects[name] = undefined;
				}
				/*else
					throw "Can't remove an object from its value: you must pass the object's id if you want to remove an object!";*/
			}
		},
		
		/* 
		 * FILE UPLOAD: 
		 * assume un upload server-side specifico:
		 * 
		 * quando stampa il form con l'input di tipo file (in un form method='post' enctype='multipart/form-data'), deve includere uno script analogo al seguente
		 * 		(implementando le operazioni commentate oppurtunamente nella propria pagina client e server...):
		 * function doUpload(upload_number){ 
		 * 		// include il parametro upload_number come parametro, per ritornarlo poi al client al termine dell'upload
		 * 		document.getElementById('upload_number_hidden').value = upload_number; 
		 * 		// sottomette il form 
		 * 		document.getElementById('upload_form').submit(); 
		 * }
		 * 
		 * la response al termine dell'upload, invece, deve includere il seguente script:
		 * // numero dell'upload passato alla funzione doUpload quando la richiesta è stata generata
		 * var upload_number = ##; 
		 * // oggetto risultato dell'upload che sarà passato alla funzione listener dell'upload
		 * // deve essere fatto così:
		 * // 		in caso di successo: { result: { url: '## url al quale è stato pubblicato il file ##', size: '## dimensione del file in kb ##'}, errors: [] }
		 * //		in caso di errore: { result: {}, errors: [ { code: '## Codice di errore ##', message: '## Messaggio di errore ##' } , ... ] }
		 * var response = {} 
		 * // invocazione della funzione listener sulla pagina che contiene l'iframe
		 * window.parent.fileUploaded(upload_number, response);   
		 */
		uploadHtml: function(param_name){
			return "<div class='"+this.uploadAttr("iframe_container_css")+"'><b>"+param_name+"</b>: " +
					"<iframe class='"+this.uploadAttr("iframe_css")+"' src='"+this.uploadAttr("iframe_src")+"'></iframe>" +
					this.buttonHtml("Invia","jsOn.doIFrameUpload(this,'"+param_name+"');")+"</div>";
		},
		
		doIFrameUpload: function(upload_button, param_name){
			var iframe = $(upload_button).parent().children("iframe").get(0);
			this.upload_submits.push({ frame: iframe, param: param_name });
			iframe.contentWindow.doUpload(this.upload_submits.length-1);
		},
		
		fileUploaded: function(upload_pos, response){
			if((!!response.errors) && (response.errors.length>0)){
				console.log("Errors while uploading the file: "+this.stringifyObj(response.errors));
			}
			else{
				var file_url = this.serverUrl(response.result.url);
				var upload_submit = (upload_pos>=0 && upload_pos<this.upload_submits.length) ? this.upload_submits[upload_pos] : null;
				if(!!upload_submit){
					var param_name = upload_submit.param;
					var $parent = $(upload_submit.frame).parent();
					$parent.children().remove();
					$parent.html("<div class='"+this.css("edit_box_field")+"'><input type='hidden' name='"+param_name+"' value='"+response.result.url+"' />" +
							" File uploaded at URL: <a href='"+file_url+"'>"+file_url+"</a></div>");
				}
				else
					console.log("File uploaded, pubblished here: "+file_url);
			}
		},
		/* FILE UPLOAD */
		
		
		
		
		isJsonPrimitive: function(obj){
			return (_.isNull(obj) || _.isUndefined(obj) || _.isNaN(obj) || _.isNumber(obj) || _.isBoolean(obj) || _.isDate(obj) || _.isString(obj) ||
					_.isRegExp(obj) || _.isFunction(obj));
		},
		
		labelHtml: function(label, end){
			return end ? "" : "<button  onclick=\"jsOn.toggle(this,'."+this.css("container_marker")+"','."+this.css("content_marker")+"',true)\" class='"+this.css("label")+" BUTTON green medium'> " + label + ": </button>";
			//return "<div class='json_label'> "+ (end ? ":" : "") + label + (end ? "" : ":") + " </div>";
		},
		
		toggle: function(elem, parent_selector, children_selector, effect_type_or_no_effect, all_elems){
			var $el = $(elem);
			if(_.isString(parent_selector))
				$el = (!!all_elems) ? $el.parents() : $el.closest(parent_selector);
			else if(!!parent_selector)
				$el = $el.parent();
			if(_.isString(children_selector))
				$el = $el.find(children_selector);
			if(!all_elems) 
				$el = $el.first();
			var eff = _.isString(effect_type_or_no_effect) ? effect_type_or_no_effect : ((!!effect_type_or_no_effect) ? undefined : "slideDown");
			$el.toggle(eff);
		},
		
		buttonHtml: function(label, click_fn){
			return "<button class='"+this.css("button")+" BUTTON small' onclick=\""+click_fn+"\">"+label+"</button>";
		},
		
		collectionSeparatorHtml: function(label, first_or_last){
			var css = (first_or_last===true) ? "field_prefix" : ( (first_or_last===false) ? "field_suffix" : "field_separator" ); 
			return "<div class='"+this.css(css)+"'>"+label+"</div>";
		},
		
		html: function(path, edit_mode, print_container){
			var html = "";
			if(!!print_container){
				html+="<div class='"+this.css("container_marker")+" "+this.css("container")+"' "+this.dataAttr("id")+"='"+path+"'> ";
					html+="<div class='"+this.css("header")+"'>"+ this.labelHtml(" Object \""+path+"\"");
					html+=this.fieldButtonsHtml(path, true);
					html+="</div>";
			}
			
			html+=this.fieldHtml(path, edit_mode);
			
			if(!!print_container){
				html+="</div>";
			}
			return html;
		},
		
		fieldButtonsHtml: function(path, is_root_object){
			var html = "";
			if(!is_root_object){
				html+=this.buttonHtml(" Salva ","jsOn.save('"+path+"')");
				html+=this.buttonHtml(" Annulla modifiche ","jsOn.cancel('"+path+"')");
				html+=this.buttonHtml(" Rimuovi ","jsOn.removeField('"+path+"');");
				html+=this.buttonHtml(" Importa/Esporta ","jsOn.printObject('"+path+"')");
				html+=this.buttonHtml(" Alerta ","jsOn.alertObject('"+path+"')");
			}
			return html;
		},
		
		editBoxHtml: function(path, obj){
			var html = "<div class='"+this.css("edit_box")+"'>";
			
			if(_.isArray(obj)){
				html+=this.fieldButtonsHtml(path);
				html+="<div class='"+this.css("edit_box_field")+"'>Aggiungi un elemento: <input type='text' name='value' value='' /></div>";
				html+=this.buttonHtml(" Aggiungi elemento ","jsOn.addField('"+path+"');");
			}
			else if(this.isJsonPrimitive(obj)){
				html+="<div class='"+this.css("edit_box_field")+"'><input type='text' name='value' value=\""+obj+"\" /></div>";
				html+=this.buttonHtml(" Rimuovi ","jsOn.removeField('"+path+"');");
			}
			else{
				html+=this.fieldButtonsHtml(path);
				html+="<div class='"+this.css("edit_box_field")+"'> Aggiungi un campo, nome: <input type='text' name='name' value='' /> " +
						"valore: <input type='text' name='value' value='' /></div>";
				html+=this.buttonHtml(" Aggiungi campo ","jsOn.addField('"+path+"');");
			}
			
			html+="</div>";
			return html;
		},
		
		endsWith: function(str, ends){
	      return str.length >= ends.length && str.substring(str.length - ends.length) === ends;
	    },
	    
		fieldHtml: function(path, edit_mode){
			var $elem = $("#"+path);
			if((!(edit_mode===true || edit_mode===false)) && $elem.size()>0)
				edit_mode = $elem.is("."+this.css("editing"));
			var obj = this.get(path); 
			var html = "";
			var _display = (this.endsWith(path,"H") || this.endsWith(path,"instance") || this.endsWith(path,"fields") ) ? 
								" style='display:block' " :	"" ;
			
			if(edit_mode){
				html+="<div id='"+path+"' class='"+( (!!edit_mode) ? this.css("editing")+" " : "" );
				
				if(_.isArray(obj)){
					html+=this.css("content_marker")+" "+this.css("array")+"'> " + this.editBoxHtml(path, obj) + this.collectionSeparatorHtml(" [ ",true);
					var id = null;
					var name = null;
					for(var i=0;i<obj.length;i++){
						if(i>0)
							html+=this.collectionSeparatorHtml(" , ");
						id = this.childPath(path,""+i);
						name = this.fieldName(id);
						html+="<div "+this.dataAttr("id")+"='"+id+"' class='"+this.css("container_marker")+" "+this.css("array_item")+"'>" + 
								this.labelHtml(name);
						html+=this.fieldHtml(id, edit_mode);
						html+=this.labelHtml(name,true)+"</div>";
					}
					html+=this.collectionSeparatorHtml(" ]  // Fine di: "+path,false);
				}
				else if(this.isJsonPrimitive(obj)){
					html+=this.css("primitive")+"'>";
					html+=this.editBoxHtml(path, obj);
				}
				else{
					html+=this.css("content_marker")+" "+this.css("object")+"' "+_display+"> " + 
							this.editBoxHtml(path, obj) + this.collectionSeparatorHtml(" { ",true);
					var keys = _.keys(obj);
					var id = null;
					var name = null;
					for(var i=0;i<keys.length;i++){
						if(!_.isUndefined(obj[keys[i]])){
							if(i>0)
								html+=this.collectionSeparatorHtml(" , ");
							id = this.childPath(path,keys[i]);
							name = this.fieldName(id);
							html+="<div "+this.dataAttr("id")+"='"+id+"' class='"+this.css("container_marker")+" "+this.css("object_field")+"'>"+
									this.labelHtml(name);
							html+=this.fieldHtml(id, edit_mode);
							html+=this.labelHtml(name,true)+"</div>";
						}
					}
					html+=this.collectionSeparatorHtml(" }  // Fine di: "+path,false);
				}
			
				html+="</div>";
			}
			else
				html+="<div class='"+this.css("content_marker")+" "+this.css("view_mode")+"'>"+this.printJson(obj)+"</div>";
				
			//console.log("\nHtml di "+path+":\n"+html+"\n");
			return html;
		},
		
		refreshHtml: function(path){
			var $elem = this.get$(path);
			/*
			var container = $elem.parent();
			if(container.is("."+this.css("container"))){
				var html = this.html(path);
				container.parent().html(html);
			}
			else{ */
				var html = this.fieldHtml(path);
				$elem.before($(html));
				$elem.remove();
			//}
		},
	
		get$: function(path){
			return $(document.getElementById(path));
		},
		
		findFieldName: function(path){
			var input = this.get$(path).children("."+this.css("edit_box")).find("input[name=\"name\"]");
			return input.size()>0 ? input.val() : null;
		},
		
		findFieldValue: function(path){
			var input = this.get$(path).children("."+this.css("edit_box")).find("input[name=\"value\"]");
			return input.size()>0 ? input.val() : null;
		},
		
		addField: function(path){
			var name = this.findFieldName(path);
			var value = this.findFieldValue(path);
			if(_.isString(value) && value.length>0 && (value.charAt(0)=='{' || value.charAt(0)=='[')){
				if(value=="{")
					value={};
				else if(value=="[")
					value=new Array();
				else
					eval("value = "+value);
			}
			//console.log("Adding to object "+path+" field "+name+" = "+value);
			this.add(path,name,value);
			this.refreshHtml(path);
		},
				
		setField: function(path){
			var parent_obj = this.parentPath(path);
			var name = this.fieldName(path);
			var value = this.findFieldValue(path);
			this.set(parent_obj, name, value);
			//console.log("Set "+name+" of "+parent_obj+" on: "+value+", resulting object is: "+JSON.stringify(this.get(parent_obj)));
			this.refreshHtml(path);
		},
		
		removeField: function(path){
			var parent_obj = this.parentPath(path);
			var name = this.fieldName(path);
			//console.log("Removing "+path+" ("+name+" from "+parent_obj+")");
			this.remove(parent_obj,name);
			if(_.isString(parent_obj) && parent_obj.length>0)
				this.refreshHtml(parent_obj);
			else
				this.get$(path).parents("."+this.css("container")+"["+this.dataAttr("id")+"=\""+path+"\"]").remove();
		},
		
		save: function(path){
			var $elem = this.get$(path);
			if($elem.is("."+this.css("primitive")))
				this.setField(path);
			else{
				var _this = this; 
				$elem.find("."+this.css("primitive")).each(function(){
					_this.setField($(this).attr("id"));
				});
			}
			
			this.makeCopy(path);
		},
		
		cancel: function(path){
			this.restoreCopy(path);
			this.refreshHtml(path);
		},
		
		printObject: function(path){
			var obj = this.get(path);
			var html = "<div>Ecco il JSON "+
					"<button class=' BUTTON small' onclick='jsOn.removeObjectPrinting(this);'> { Rimuovi } </button> "+
					"<button class=' BUTTON small' onclick='jsOn.importObjectPrinting(this);'> { Importa } </button> : "+
					"<textarea data-path='"+path+"' cols='200' rows='10' style='width:600'>"+this.stringifyObj(obj)+"</textarea></div>";
			var $elem = this.get$(path);
			$elem.before($(html));
		},
		
		stringifyObj: function(obj){
			return JSON.stringify(obj, null, '  ');
		},
		
		importObjectPrinting: function(button_elem){
			var textarea = $(button_elem).parent().children("textarea");
			var path = textarea.attr("data-path");
			var value = this.parseAndClean(textarea.val());
			this.set(path,null,value);
			this.removeObjectPrinting(button_elem);
			this.refreshHtml(path);
		},

		removeObjectPrinting: function(button_elem){
			$(button_elem).parent().remove();
		},
		
		printJson: function(obj){
			if(_.isString(obj) || _.isNull(obj) || _.isUndefined(obj) || _.isNumber(obj))
				return ""+obj;
			var ret = JSON.stringify(obj, null, "%%");
		
			ret = ret.split("%%%%%%%%%%%%%%%%%%%%").join("<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
			ret = ret.split("%%%%%%%%%%%%%%%%%%").join("<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
			ret = ret.split("%%%%%%%%%%%%%%%%").join("<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
			ret = ret.split("%%%%%%%%%%%%%%").join("<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
			ret = ret.split("%%%%%%%%%%%%").join("<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
			ret = ret.split("%%%%%%%%%%").join("<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
			ret = ret.split("%%%%%%%%").join("<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
			ret = ret.split("%%%%%%").join("<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
			ret = ret.split("%%%%").join("<br/> &nbsp;&nbsp;&nbsp;&nbsp;");
			ret = ret.split("%%").join("<br/> &nbsp;&nbsp;");
		
			ret = ret.substring(0,ret.length-1) + "<br/> "+ret.charAt(ret.length-1);
			return ret;
		},

		alertObject: function(path){
			var obj = this.get(path);
			alert("Here is the JSON: "+JSON.stringify(obj));
		}
		
		
	};

/* jsOn object initialitazion */
var jsOn = new jsOnFn();