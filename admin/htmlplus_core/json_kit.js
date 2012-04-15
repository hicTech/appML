
/* jsOn function constructor and prototype... */


		
/////////////////////////////////////////////////////////////////////////////////////////////////////////
		// Initialization and configuration
/////////////////////////////////////////////////////////////////////////////////////////////////////////		


	var jsOnFn = function(options, objects){
		this.init(options, objects);
	};
	
	jsOnFn.prototype = {
		
		init: function(options, objects){
			this.objects = (_.isNullOrEmpty(objects)) ? {} : objects;
			this.copies = {};
			this.types = {};
			this.templates = {};
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
					view_mode: 'json_object_view'
				},
				data_attributes: {
					H: 'H',
					role: 'role',
					type: 'type',
					id: 'id'
				},
				upload_attributes: {
					server_url: '',
					iframe_src: 'upload',
					iframe_container_css: 'upload_iframe_container',
					iframe_css: 'upload_iframe'
				},
				html_roles: {
					templates_container: "templates_container",
					template: "template"
				},
				null_is_undefined: false,
				/* sintassi per gli escape -% %- e -%= %-
				template_settings:{
					evaluate : /\-\%([\s\S]+?)\%\-/g,
					interpolate : /\-\%\=([\s\S]+?)\%\-/g
				},
				*/
				core_page: "core.jsp"
			};
			_.extend(config,options);
			this.config = config;
			
			// set the objects navigator
			this.navigator = _.nav(objects, this.sep());
			// set underscore template style and define system types
			var settings = this.conf("template_settings");
			if(!_.isNullOrEmpty(settings))
				_.templateSettings = settings;
			
			// import html, javascript and css resources of the defined types 
			this.importCore();
		},

		
		conf: function(prop, overriding_value){
			if(_.is(overriding_value))
				return overriding_value;
			else
				return this.config[prop];
		},
		
		sep: function(){
			return this.conf("path_separator");
		},
		
		nav: function(){
			return this.navigator;
		},
		
		css: function(name){
			return this.conf("css_classes")[name];
		},
		
		dataAttr: function(name){
			return "data-"+this.conf("data_attributes").H+"-"+this.conf("data_attributes")[name];
		},
		
		uploadAttr: function(name){
			return this.conf("upload_attributes")[name];
		},
		
		roleAttr: function(name){
			return this.conf("html_roles")[name];
		},
		
		dataSelector: function(data_type, data_value){
			return "["+this.dataAttr(data_type)+"=\""+data_value+"\"]";
		},
		
		roleSelector: function(role){
			return this.dataSelector("role", this.roleAttr(role));
		},
		
		// TODO: farlo senza parametri (o con comportamento di default...), che lo prende dal queryString... si può mettere anche in _plus...
		serverUrl: function(relative_url){
			if(relative_url.charAt(0) == '/')
				relative_url = relative_url.substring(1,relative_url.length);
			var serv = this.uploadAttr("server_url");
			return (_.isString(serv) && serv.length>0) ? serv + (serv.charAt(serv.length-1) == '/' ? "" : "/") + relative_url : relative_url;
		},
		
		
		
/////////////////////////////////////////////////////////////////////////////////////////////////////////
		// General objects utility
/////////////////////////////////////////////////////////////////////////////////////////////////////////		
		
		
		isNot: function(obj, null_is_undefined){
			null_is_undefined = this.conf("null_is_undefined", null_is_undefined);
			return null_is_undefined ? _.isNot(obj) : _.isUndefined(obj); 
		},
		
		root: function(){
			return this.objects;
		},
		
		exportObjects: function(){
			var cleaned = _.clean(this.objects);
			return JSON.stringify(cleaned);
		},
		
		importObjects: function(objects){
			this.objects = this.parseAndClean(objects);
		},
		
		parseAndClean: function(objects, clean_null_values){
			if(this.isNot(objects))
				return objects;
			else if(_.isString(objects)){
				try{
					objects = _.parse(objects);//JSON.parse(objects);
				}catch(err){
					// that was a string, not a json string...
					return objects;
				}
			}
			return _.clean(objects);
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
        
		
		createObject: function(id, obj){
			if(!this.isNot(obj))
				this.objects[id] = obj;
			else if(!this.objects[id])
				this.objects[id] = {};
			this.backupObject(id);
		},
		
		backupObject: function(id){
			var obj = this.objects[id];
			if(_.isObject(obj)){
				var copy = _.deepClone( _.is(obj, this.H_Object) ? obj.value() : obj );
				this.copies[id] = copy;
			}
		},
		
		restoreObject: function(id){
			var copy = this.copies[id];
			var obj = this.objects[id];
			var type = (_.is(obj, this.H_Object)) ? obj.type() : undefined;
			var restored = ( _.is(type) ? type.create(copy) : copy );
			this.objects[id] = restored;
		},
		
		
		path: function(id_or_object){
			return _.isString(id_or_object) ? this.nav().path(id_or_object) : "Path still not implemented!";
		},
		
		childPath: function(path, name){
			return this.nav().childPath(path, name); return ""+path+this.sep()+name;
		},
		
		parentPath: function(path){
			return this.nav().parentPath(path);
		},
		
		fieldName: function(path){
			return this.nav().fieldName(path);
		},
		
		fieldPath: function(id_or_obj, sub_prop){
			return _.isString(id_or_obj) ? ( (_.isString(sub_prop) && sub_prop.length>0) ? id_or_obj+this.sep()+sub_prop : id_or_obj ) : 
				(_.isString(sub_prop) ? sub_prop : null);
		},
		
		get: function(id_or_obj, sub_prop, root_object){
			var root_object = _.isObject(id_or_obj) ? id_or_obj : (_.isObject(root_object) ? root_object : undefined);
			var path = this.fieldPath(id_or_obj, sub_prop);
			return this.nav().get(path, root_object);
		},
	
		set: function(id_or_obj, name, value){
			var root_object = _.isObject(id_or_obj) ? id_or_obj : undefined;
			var path = this.fieldPath(id_or_obj, name);
			this.nav().set(path, value, root_object);
		},
		
		add: function(id_or_obj, name, value){
			var root_object = _.isObject(id_or_obj) ? id_or_obj : undefined;
			var path = this.fieldPath(id_or_obj, name);
			this.nav().add(path, value, root_object);
		},
		
		remove: function(id_or_obj, name, value, weak_equals){
			var root_object = _.isObject(id_or_obj) ? id_or_obj : undefined;
			var path = this.fieldPath(id_or_obj, name);
			this.nav().remove(path, value, weak_equals, root_object);
		},
		
		
		
/////////////////////////////////////////////////////////////////////////////////////////////////////////
		// Core assembling functions
/////////////////////////////////////////////////////////////////////////////////////////////////////////		
		
		importCore: function(){
			var that = this;
			var success_fn = function(data, params, xhr, status){
				
				// Templates importing...
				var containers = that.extractTagContents(data,"templates");
				var templates = null; var id = null;
				for(var i=0;i<containers.length;i++){
					templates = that.extractTagContents(containers[i],"template",true);
					for(var j=0;j<templates.length;j++){
						id = templates[j].attributes.id;
						if(_.isNotEmptyString(id))
							that.templates[id] = _.template(templates[j].content);
					}
				}
				_.log("Html+ : Templates imported");
				
				// Types importing...
				containers = that.extractTagContents(data,"js");
				for(var i=0; i<containers.length; i++)
					eval(containers[i]);
				_.log("Html+ : Types imported");
				
				// Css importing...
				containers = that.extractTagContents(data,"css");
				/*for(var i=0; i<containers.length; i++)
					eval(containers[i]);*/
				_.log("Html+ : CSS still not imported: "+containers);
				
				// Callbacks executing...
				var fn = null;
				for(var i=0; i<that.load_callbacks.length; i++){
					fn = that.load_callbacks[i];
					if(_.isFunction(fn))
						fn.call();
					else if(_.isNotEmptyString(fn))
						eval(fn);
				}
			};
			var error_fn = function(errors, params, xhr, status){
				alert("Errore nella richiesta del core!");
			};
			var options = {
				data:{
					user_agent: navigator.userAgent
				},
				dataType: "text"
			};
			this.ajax(this.conf("core_page"),success_fn,error_fn,options);
		},
		
		// TODO: al momento è cablata, nel senso che bisogna specificare se un tag ha attributi o meno (altrimenti sbaglia!), 
		// ma per uso interno va bene...
		extractTagContents: function(str, tag, has_attributes){
			var search = "<"+tag+ ( (!!has_attributes) ? " " : ">" );
			var pos = str.indexOf(search);
			var end_pos = -1; var content = null; var attrs = {};
			var ret = new Array();
			while(pos>=0){
				pos+=search.length;
				if(!!has_attributes){
					attrs = {};
					pos = this.extractAttributes(str, pos, attrs);
				}
				end_pos = str.indexOf("</"+tag+">",pos);
				if(end_pos<0)
					end_pos = str.length;
				content = str.substring(pos, end_pos);
				ret.push( (!!has_attributes) ? {attributes: attrs, content: content} : content);
				pos = str.indexOf(search,end_pos);
			}
			return ret;
		},
		
		extractAttributes: function(str, pos, attrs){
			var end_tag = str.indexOf(">",pos);
			if(end_tag<0)
				end_tag = str.length;
			var equal = -1; var start = -1; var end = -1; var name=null; var value=null;
			while(pos<end_tag){
				equal = str.indexOf("=",pos);
				start = str.lastIndexOf(" ",equal)+1;
				end = str.indexOf( (str.charAt(equal+1)=="'" ? "'" : '"'), equal+2 );
				name = str.substring(start, equal);
				value = str.substring(equal+2,end);
				attrs[name] = value;
				pos = end+1;
				// TODO: qui non stiamo facendo il check che il carattere di fine > sia incluso o meno nell'attributo: ASSUMIAMO DI NO!!!
			}
			return end_tag+1;
		},
		
		load_callbacks : new Array(),
		onLoad: function(callback){
			this.load_callbacks.push(callback);
		},

		
/////////////////////////////////////////////////////////////////////////////////////////////////////////
		// Types and objects functions
/////////////////////////////////////////////////////////////////////////////////////////////////////////		
		
		H_Type: _.getFn(function(name, object_fn, type_object){
			this.H = {
				name: name,
				object: object_fn,
				struct: type_object
			};
		},{
			name: function(){
				return this.H.name;
			},
			
			create: function(obj, path){
				var path = _.isNotEmptyString(path) ? path : _.id(this.name()+"_new");
				var ret = new this.H.object(this,path, _.is(obj) ? obj : this.defaultNew() );
				return ret;
			},
			
			defaultNew: function(){
				return {};
			}
		}),
		
		H_Object: _.getFn(function(type, path, value){
			// constructor
			this.H = {
				type: type,
				path: path,
				value: this.construct(value)
			};
		},{
			// prototype
			type: function(){
				return this.H.type;
			},
			
			path: function(){
				return this.H.path;
			},
			
			construct: function(obj){
				return obj;
			},
			
			value: function(){
				return this.H.value;
			}
			
		}),
		
		createType: function(type_id, type_object){
			if(_.isNotEmptyString(type_id) && _.isObject(type_object)){
				var _static = type_object.type;
				var instance = type_object.instance;
				var object_fn = _.extendFn(this.H_Object, instance);
				var type_fn = _.extendFn(this.H_Type, _static);
				var type = new type_fn(type_id, object_fn, type_object);
				return type;
			}
		},
		
		extendType: function(type_id, type_object){
			var type = this.type(type_id);
			if(_.is(type, this.H_Type)){
				var struct = _.deepClone(type.H.struct);
				var new_struct = _.extendObj(struct, type_object);
				return new_struct;
			}
			else
				throw "Type "+type_id+" not found!";
		},
		
		type: function(name_or_object, type){
			if(_.isNotEmptyString(name_or_object)){
				if(_.isObject(type))
					this.types[name_or_object] = type; //this.createType(type);
				return this.types[name_or_object];
			}
			else if(_.isObject(name_or_object)){
				var type = this.hInfo(name_or_object,"type");
				if(_.isNotEmptyString(type))
					return this.types[type];
				else
					return this.types["object"];
			}
			return null;
		},
		
		hInfo: function(obj, field){
			if(_.isObject(obj)){
				var info = obj[this.conf("data_attributes").H];
				if(_.isObject(info))
					return _.isNotEmptyString(field) ? info[field] : info;
				else
					return null;
			}
		},
		
		
/////////////////////////////////////////////////////////////////////////////////////////////////////////
		// Templating functions
/////////////////////////////////////////////////////////////////////////////////////////////////////////		
		
		templating_includes: new Array(),
		
		// the template function is not multi-threaded, be aware in server-side executions...
		template : function(template_name, obj_or_obj_id, args){
			if(_.isNotEmptyString(template_name)){
				var obj = _.isString(obj_or_obj_id) ? this.get(obj_or_obj_id) : obj_or_obj_id;
				if(!_.is(obj, this.H_Object))
					obj = new this.H_Object();
				
				// start the templating process
				this.templating_includes = new Array();
				var result = this.printTemplate(template_name, obj, args);
				// process the templating result with the generated includes
				var html = $(result.html);
				result.html = html;
				// process included contents
				if(this.templating_includes.length>0){
					this.templating_includes.reverse();
					var spans = html.find("span[data-h-include-id]").get();
					// replace included spans with templated contents
					_.each(this.templating_includes, function(include){
						var replacement = _.find(spans,function(span){ 
							return ( $(span).attr("data-h-include-id") == include.include_id ); 
						});   
						var included = $(include.html);
						$(replacement).replaceWith(included);
						include.html = included;
					});
					// call the listener functions on all the included contents when the whole template is ready
					_.each(this.templating_includes, this.callTemplateListener);
					this.templating_includes = new Array();
				}
				// call the listener function on the resulting template
				this.callTemplateListener(result);
				return result.html;
			}
		},
		
		callTemplateListener: function(template_result){
			var fn = template_result.fn;
			if(_.isFunction(fn)){
				var obj = template_result.obj;
				fn.call(obj.type(),template_result.html,obj);
			}
		},
		
		// private function 
		printTemplate: function(template_name, obj, args){
			var template = template_name.charAt(0)=="#" ? {
				id: template_name.substring(1, template_name.length) 
			} : ( _.is(obj.type()) && _.isObject(obj.type().templates) ) ? obj.type().templates[template_name] : undefined;
			
			if(_.isObject(template) && _.isNotEmptyString(template.id)){
				var template_obj = (_.isObject(obj) && (!!obj.H_template_arg)) ? obj : undefined;
				if(_.isNot(template_obj,true)){
					var that = this;
					var templating_obj = obj;
					var templating_args = args;
					var include_fn = function(_template_name,_obj,_args){
						return that.includeTemplate(_template_name,_obj,_args,templating_obj,templating_args);
					};
					template_obj =  {
						H_template_arg: true,
						obj: obj,
						path: obj.path(),
						value: obj.value(),
						args: _.isObject(args) ? args : {},
						device: _.device(),
						type: that.type(obj),
						include: include_fn,
						alert: function(){alert("WE WE!");}
					};			
				}
				var result = this.templates[template.id](template_obj);
				return {
					html: result,
					fn: template.on,
					obj: obj
				};
			}
			else throw "Template not found: "+template_name;
		},
		
		// private function 
		includeTemplate : function(template_id,_obj,_args,_templating_obj,_templating_args){
			var templating_obj = _.is(_templating_obj) ? _templating_obj : obj; // if not passed, try to get it from the closure
			var templating_args = _.is(_templating_args) ? _templating_args : args; // if not passed, try to get it from the closure
			if(!_.is(_obj))
				_obj = templating_obj;
			else if(_.isString(_obj))
				_obj = templating_obj[_obj];
			if(!_.is(_args))
				_args = templating_args;
			else if(_.isObject(_args))
				_args = _(templating_args).deepClone().extendObj(_args);
			
			var result = this.printTemplate(template_id,_obj,_args);
			var include_id = _.id("H_include");
			result.include_id = include_id;
			this.templating_includes.push(result);
			return "<span data-h-include-id='"+include_id+"'></span>";
		},
		
		
		
		argOrObj: function(){
			var name_or_names = _.toArray(arguments);
			var ret = null;
			for(var i=0;i<name_or_names.length && _.isNot(ret,true); i++){
				ret = this.singleArgOrObj(name_or_names[i]);
			}
			return ret;
		},
		
		singleArgOrObj: function(name){
			if(_.isNotEmptyString(name)){
				if(_.isObject(args) && _.is(args[name]))
					return args[name];
				else if(_.isObject(obj))
					return obj[name];
			}
		},
		
		view : function(id_or_object, args){
			return this.template("view", id_or_object, args);
		},
		
		edit: function(id_or_object, args){
			return this.template("edit", id_or_object, args);
		},
		
		create: function(type_or_type_id, args){
			var type = _.isString(type_or_type_id) ? this.type(type_or_type_id) : type_or_type_id;
			var obj = type.create();
			this.createObject(obj.path(), obj);
			return this.edit(obj.path(), args);
		},
		
		messageDiv: function(message){
			return $("<div class='H_error_message'>"+message+"</div>");
		},
		
		
		
		
		print: function(id_or_object, as_type, template_name){
			var obj = _.isObject(id_or_object) ? id_or_object : this.get(id_or_object);
			if(_.isObject(obj)){
				var type = _.isNotEmptyString(as_type) ? this.type(as_type) : this.type(obj);
				var nav = _.nav(type);
				var container = nav.get("templates."+template_name+".container");
				if(_.isNotEmptyString(container)){
					var template_obj = {
						value: obj,
						type: type,
						get: function(){alert("WE WE!");}
					};
					var html = this.simpleTemplate(container,template_obj);
					/*var nodes = $(html).get();
					var arg = (nodes.length>1) ? nodes : nodes[0];*/
					var fn = nav.get("templates."+template_name+".bindings");
					var arg = $(html);
					if(_.isFunction(fn))
						fn.call(type,arg);
					return arg;
				}
			}
			else
				return this.messageDiv("Null object: "+(_.isObject(id_or_object) ? JSON.stringify(id_or_object) : id_or_object));
		},
		
		simpleTemplate : function(template_id_or_obj, obj_or_template_id){
			var id = _.isString(template_id_or_obj) ? template_id_or_obj : obj_or_template_id;
			var obj = _.isString(template_id_or_obj) ? obj_or_template_id : template_id_or_obj;
			return this.templates[id](obj);
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
			if(_.isNotEmptyString(value))
				value = (value=="{") ? {} : ((value=="[") ? [] : _.parse(value));
			//_.log("Adding to object "+path+" field "+name+" = "+value);
			this.add(path,name,value);
			this.refreshHtml(path);
		},
				
		setField: function(path){
			var parent_obj = this.parentPath(path);
			var name = this.fieldName(path);
			var value = this.findFieldValue(path);
			this.set(parent_obj, name, value);
			//_.log("Set "+name+" of "+parent_obj+" on: "+value+", resulting object is: "+JSON.stringify(this.get(parent_obj)));
			this.refreshHtml(path);
		},
		
		removeField: function(path){
			var parent_obj = this.parentPath(path);
			var name = this.fieldName(path);
			//_.log("Removing "+path+" ("+name+" from "+parent_obj+")");
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
			
			this.backupObject(path);
		},
		
		cancel: function(path){
			this.restoreObject(path);
			this.refreshHtml(path);
		},
		
		printObject: function(path){
			var obj = this.get(path);
			var html = "<div>Ecco il JSON "+
					"<span onclick='jsOn.removeObjectPrinting(this);'> { Rimuovi } </span> "+
					"<span onclick='jsOn.importObjectPrinting(this);'> { Importa } </span> : "+
					"<textarea data-path='"+path+"'>"+JSON.stringify(obj)+"</textarea></div>";
			var $elem = this.get$(path);
			$elem.before($(html));
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
			return JSON.stringify(obj,""," ");
		},

		alertObject: function(path){
			var obj = this.get(path);
			alert(JSON.stringify(obj,""," "));
		},
		
		
		
/////////////////////////////////////////////////////////////////////////////////////////////////////////
		// Upload functions
/////////////////////////////////////////////////////////////////////////////////////////////////////////		
		/* 
		 * Questo meccanismo di upload assume una pagina server-side specifica:
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
				_.log("Errors while uploading the file: "+JSON.stringify(response.errors));
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
					_.log("File uploaded, pubblished here: "+file_url);
			}
		},
		/* FILE UPLOAD */
		

		
/////////////////////////////////////////////////////////////////////////////////////////////////////////
		// Ajax functions
/////////////////////////////////////////////////////////////////////////////////////////////////////////		
			    
	    // success and errors take parsed data (or an array of errors: if null, there was an ajax error), the 'callback_params' object, xhr and status as arguments. 
	    // complete takes only the 'callback_params' object, xhr and status. 
	    // callback params is always extended with the _request_data field, containing informations on the current request...
	    // passing an "hide_errors" field in callback_params will cause the errors to not be displayed to the user
	    ajax : function(url, success_fn, error_fn, opts, callback_params, complete_fn, data_in_fake_ajax){
	    	var ajax_opts = {
	            data: _.isString(url) ? {} : url,
	            dataType: "text"
	        };
	        if(!!opts)
	            _.extend(ajax_opts, opts);
	        
	        if(!_.isString(url))
	            url = "";
	        
	        if(!callback_params)
	            callback_params = {};
	        callback_params._request = {
	            data: (!!data_in_fake_ajax) ? data_in_fake_ajax : ajax_opts.data,
	            options: opts,
	            success: success_fn, 
	            error: error_fn, 
	            complete: complete_fn
	        };
	        
	        var that = this;
	        var callbacks = {
	            success: function(data, status, xhr){
	            	if(ajax_opts.dataType=="json"){
		            	// assumes that data always contains 'data' and 'errors' fields (eventually empty) to do an higher level error check 	
		            	//_.log("AJAX SUCCESS: "+JSON.stringify(data)+", status: "+status);
		            	if(_.isArray(data.errors) && data.errors.length>0)
		            		that.handleAjaxErrors(data.errors, callback_params, xhr, status);
		                else 
		                	that.handleAjaxSuccess(data.result, callback_params, xhr, status);
	            	}
	            	else{
	            		// directly pass the result to the success function 	
	            		that.handleAjaxSuccess(data, callback_params, xhr, status);
	            	}
	            },
	            error: function(xhr, status){
	                //_.log("AJAX ERROR: "+status);
	            	that.handleAjaxErrors([], callback_params, xhr, status);
	            },
	            complete : function(xhr, status){
	            	if(_.isFunction(complete_fn))
	                    complete_fn.call(null, callback_params, xhr, status);
	            }       
	        };
	        
	        _.extend(ajax_opts,callbacks);
	        $.ajax(url,ajax_opts);
	    },
		
		handleAjaxSuccess : function(data, params, xhr, status){
	        // call the callback function...
			var success_fn = params._request.success;
	        if(_.isFunction(success_fn))
	            success_fn.call(null, data, params, xhr, status);
	    },
	    
	    handleAjaxErrors : function(errors, params, xhr, status){
	    	// call the error callback function...
	        var error_fn = params._request.error;
	        if(_.isFunction(error_fn))
	            error_fn.call(null, errors, params, xhr, status);
	    }
		
		
	};

/* jsOn object initialitazion */
var jsOn = new jsOnFn();
var H = jsOn;




















var RestAPI = function(api_object){
	this.setAPI(api_object);
};

RestAPI.prototype = {
	
	setAPI: function(api_object){
		this.api_object = api_object;
	},
	refresh: function(){ 
		if(!!window.API_object)
			this.setAPI(API_object); 
	},
	refreshIfMust: function(){
		if(!this.api_object)
			this.refresh();
	},
	
	// if container_div is not passed, api_div is used as container and replaced with the generated API HTML
	print: function(template_div, container_div){
		this.refreshIfMust();
			
		if(!!this.api_object){		
			if(_.isString(template_div))
				template_div = document.getElementById(template_div);
			if(_.isString(container_div))	
				container_div = document.getElementById(container_div);
				
			var template_html = template_div.innerHTML;
			template_html = template_html.split("&lt;").join("<");
			template_html = template_html.split("&gt;").join(">");
			template_html = template_html.split("&quot;").join("'");
			var api_template = _.template(template_html);
			var api_html = api_template(this.api_object);
			if(!container_div)
				container_div = template_div;
			container_div.innerHTML = api_html;
			container_div.style.display = "block";
		}
		else
			alert("API object not present!");
	},
	
	sections: function(){
		this.refreshIfMust();
		return (!!this.api_object) ? this.api_object.sections : null;
	},
	
	section: function(id){
		var sections = this.sections();
		return (!!sections) ? _.find(sections, function(section){ 
				return section.id==id; 
			}) : null; 
	},
	
	findMethodInSection: function(url, section){
		if(!!section){
			var methods = section.methods;
			return (!!methods) ? _.find(methods, function(method){
				return method.url==url;
			}) : null;
		}
		else
			return null;
	},
	
	method: function(url){
		var sections = this.sections();
		var ret = null;
		if(!!sections)
			_.find(sections,function(section){
				ret = RestAPI.prototype.findMethodInSection(url, section)
				return (!!ret);
			});
		return ret;
	},
	
	sectionByMethod: function(url){
		var sections = this.sections();
		return (!!sections) ? _.find(sections,function(section){
				return (!!RestAPI.prototype.findMethodInSection(url, section));
			}) : null;
	},
	
	obj: function(obj){
		this.refreshIfMust();
		
		if(_.isString(obj))
			return this.api_object.constants.objects[obj];
		else
			return obj;
	},
	
	err: function(err){
		this.refreshIfMust();
		
		if(!err)
			return {};
		var err_code = _.isString(err) ? err : err.code;
		if(!!err_code){
			var ret = _.deepClone(this.api_object.constants.errors[err_code]);
			ret.code = err_code;
			_.extend(ret, err);
			return ret;
		}
		else
			return err;
	},
		
	orderParams: function(params){
		var required = new Array();
		var optional = new Array();
		_.each(params, function(param){
			if(!!param.required)
				required.push(param);
			else
				optional.push(param);
		});
		return required.concat(optional);
	},
		
	printUrl: function(base_url, params){
		var full_url = base_url;
		params = RestAPI.prototype.orderParams(params);
		_.each(params, function(param, index){
			full_url+=RestAPI.prototype.printParamInUrl(param, index==0);
		});
		return full_url;
	},

	printParamInUrl: function(param, is_first, value_replacement){
		var ret = ((!!is_first) ? "?" : "&") + param.name + "=" + ((!!value_replacement) ? value_replacement : "X");
		return (!!param.required) ? ret : "["+ret+"]";
	},

	// a raw json html printer
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
	
	hasResultObject: function(method){
		return (!!method.result.object);
	},
	
	hasResultDescription: function(method){
		return ( (!!method.result.description) && (method.result.description.length>0) );
	},
	
	
	////////////////////////////////////////////////////
    // Some useful function to test the API... 
    
	formAttr: function(method, attr){
		if(attr=="action"){
			var ret = this.api_object.server_url+method.url;
			return ret;
		}
		else if(attr=="method")  // GET   o    POST
			return "GET"; 
		else if(attr=="enctype")  // application/x-www-form-urlencoded    o    multipart/form-data
			return "application/x-www-form-urlencoded";
		else
			return "";
	},
	
	paramType: function(param){
		return (param.type=="File" || param.type=="file") ? "file" : "text";
	},
	
	printInput: function(param){
		return "<input name='"+param.name+"' type='"+RestAPI.prototype.paramType(param)+"' / >";
	}
		
	
	
};

// a global object containing the RestAPI eventually specified by the 'API_object' global variable. The API_object can also be setted later, calling API.refresh(). You can always construct and use a different RestAPI object.
var API = new RestAPI();



