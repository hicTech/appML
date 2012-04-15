(function(){
	
	var HtmlPlusFn = function(options, objects){
		this.init(options);
	};
	
	HtmlPlusFn.prototype = _.extendObj(__HtmlPlusPrototype,{
		
		
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//												CUSTOM INITIALIZATION      
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		
		
		init: function(options){
			this.commonInit(options);
			
			this.H_tags = {};
			this.H_ui = {};
			
			this.upload_submits = new Array();
			
			// set underscore template style and define system types
			var settings = this.Hconf("template_settings");
			if(!_.isNullOrEmpty(settings))
				_.templateSettings = settings;
			
			// extends H_Object, H_Type, H_Field and H_Action with templating capabilities
			var classes = ["H_Object", "H_Type", "H_Field", "H_Action"];
			_.each(classes, function(class_name){
				this[class_name] = _.extendFn(this[class_name],{
					print: function(args){
						H.print(this,args);
					}
				});
			},this);
		},
		
		
		
		
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//												 DOM-RELATED FUNCTIONS       
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

		
		dataAttr: function(name, elem, value){
			var attr = "data-"+this.Hconf("data_attributes").H+"-"+this.Hconf("data_attributes")[name];
			if(!!elem){
				$elem = $(elem);
				if(_.is(value)){
					value = _.toString(value);
					$elem.attr(attr, value);
					return value;
				}
				else 
					return $elem.attr(attr);
			}
			else
				return attr;
		},
		
		dataSel: function(data_type_or_object, data_value){
			if(_.isObject(data_type_or_object)){
				// composite selector: an object containing the data keys and values as object fields
				var keys = _.keys(data_type_or_object);
				var selector = "";
				for(var i=0; i<keys.length; i++)
					selector += this.dataSel(keys[i], options[keys[i]]);
				return selector;
			}
			else
				return "["+this.dataAttr(data_type_or_object)+"=\""+data_value+"\"]";
		},
		
		// navigate the jQuery object (obtained with the context argument) up (parents) or down (children), with a navigation based on 
		// 'selector' and 'first' arguments... 
		// TODO: replace first with the more meaningful 'until', specifing how many levels have to be traversed (if until is a number) 
		// or a selector that will terminate the traversing when found (if until is a string)
		get$: function(selector, context, down, all){
			var sel = _.isNotEmptyString(selector) ? selector : null;
			var con = _.is(context) ? $(context) : ( (!!sel) ? $() : $([]) );
			if(con.size()>0){
				if(!!sel)
					return (!!down) ? ( (!!all) ? con.find(sel) : con.find(sel).first() ) : ( (!!all) ? con.parents(sel) : con.closest(sel) );
				else
					return (!!down) ? ( (!!all) ? con.find() : con.children().first() ) : ( (!!all) ? con.parents() : con.parent() );
			}
			else
				return con;
		},
		
		data$: function(data_type_or_object, data_value, context, down, all){
			return this.get$(this.dataSel(data_type_or_object, data_value), context, down, all);
		},
		
		uploadConf: function(name){
			return this.Hconf("upload")[name];
		},
		
		// TODO: farlo senza parametri (o con comportamento di default...), che lo prende dal queryString... si può mettere anche in _plus...
		serverUrl: function(relative_url){
			if(relative_url.charAt(0) == '/')
				relative_url = relative_url.substring(1,relative_url.length);
			var serv = this.uploadConf("server_url");
			return (_.isString(serv) && serv.length>0) ? serv + (serv.charAt(serv.length-1) == '/' ? "" : "/") + relative_url : relative_url;
		},
		
		
		
		
		
		
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//		  										LOCAL STORAGE FUNCTIONS       
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		
		
		/*
		readLocalData: function(){
        	try{
        		var objs = localStorage.getItem("jsOn_objects");
	            if(_.isString(objs)){
	            	this.importData(objs);
	            	return true;
	            }
	            else
	            	return false;
        	}catch(err){
        		return false;
        	}
        },
        
        writeLocalData: function(){
        	try{
        		localStorage.setItem("HtmlPlus_Data", this.exportData());
	            return true;
	        }catch(err){
        		return false;
        	}
        },
        
        clearLocalData: function(){
        	try{
        		localStorage.removeItem("HtmlPlus_Data");
        		this.data = {};
	            return true;
	        }catch(err){
        		return false;
        	}
        },
        */
		
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//											CORE ASSEMBLING FUNCTIONS       
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

		importRuntime: function(resources_object){
			var that = this;
			var success_fn = function(data, params, xhr, status){
				
				// Types structs importing...
				var containers = that.extractTagContents(data,"types");
				for(var i=0; i<containers.length; i++){
					var HtmlPlusAppTypes = _.parse(containers[i]);
					if(!_.is(jsOn.get("types")))
						jsOn.set("types",{});
					_.each(HtmlPlusAppTypes, function(HtmlPlusType, type_name){
						jsOn.set("types-"+type_name,HtmlPlusType);
					});
					that.importStructs(HtmlPlusAppTypes);
				}
				_.log("Html+ : Struct imported");
				
				
				containers = that.extractTagContents(data,"conf");
				for(var i=0; i<containers.length; i++){
					var obj = _.parse(containers[i]);
					if(!_.is(jsOn.get("configuration")))
						jsOn.set("configuration",{});
					_.each(obj, function(conf, conf_name){
						jsOn.set("configuration-"+conf_name,conf);
					});
					that.importConfiguration(obj);
				}
				_.log("Html+ : Configuration imported");
				
				
				containers = that.extractTagContents(data,"enums");
				for(var i=0; i<containers.length; i++){
					var obj = _.parse(containers[i]);
					if(!_.is(jsOn.get("enums")))
						jsOn.set("enums",{});
					_.each(obj, function(conf, conf_name){
						jsOn.set("enums-"+conf_name,conf);
					});
					that.importOpenEnums(obj);
				}
				_.log("Html+ : Enumerations imported");
				
				
				// CSS importing...
				containers = that.extractTagContents(data,"css");
				/*for(var i=0; i<containers.length; i++)
					eval(containers[i]);*/
				_.log("Html+ : CSS still not imported: "+containers);
				
				
				// Scripts importing...
				containers = that.extractTagContents(data,"js");
				//var fn;
				for(var i=0; i<containers.length; i++){
					//fn = new Function(containers[i]);
					//fn.call(that);
					that.importScript(containers[i]);
				}
				_.log("Html+ : JS imported");
				
				// Tags importing...
				containers = that.extractTagContents(data,"tags");
				var tags = null;
				for(var i=0;i<containers.length;i++){
					tags = that.extractTagContents(containers[i],"tag",true);
					var without_name = 0;
					_.each(tags, function(tag){
						var attrs = _.isObject(tag.attributes) ? tag.attributes : {};
						if(_.isNotEmptyString(attrs.name)){
							var adjusted = this.adjustTag(tag.template, tag.script, attrs);
							this.registerTag(adjusted);
						}
						else
							without_name++;
					},that);
					if(without_name>0)
						that.printError("Warning, "+without_name+" tags was found without a name attribute: they are not been imported!");
				}
				_.log("Html+ : Tags imported");
				
				// Callbacks executing...
				that.notifyOnLoad();
			};
			var error_fn = function(errors, params, xhr, status){
				alert("Errore nella richiesta del core!");
			};
			var options = {
				data:{
					device: _.toString(this.device().json()),
					resources: _.toString(resources_object)
				},
				dataType: "text"
			};
			this.ajax(this.Hconf("core_page"),success_fn,error_fn,options);
		},
		
		
		// TODO: al momento è cablata, nel senso che bisogna specificare se un tag ha attributi o meno (altrimenti sbaglia!), 
		// ma per uso interno va bene... tanto vale solo per i parsing grossolani dello startup...
		extractTagContents: function(html_string_or_tag_object, tag, has_attributes){
			var ret = new Array();
			var str = _.isObject(html_string_or_tag_object) ? html_string_or_tag_object.html : html_string_or_tag_object;
			if(_.isString(str)){
				var search = "<"+tag+ ( (!!has_attributes) ? " " : ">" );
				var pos = str.indexOf(search);
				var end_pos = -1; var content = null; var object = null; var attrs = {};
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
					object = (!!has_attributes) ? this.getTagObject(tag, content, attrs) : content;
					ret.push(object);
					pos = str.indexOf(search,end_pos);
				}
			}
			return ret;
		},
		
		getTagObject: function(tag, content, attributes){
			var ret = {
				tag: tag,
				attributes: attributes
			};
			var pos = content.indexOf("<");
			if(pos>=0){
				var end_pos = content.indexOf(">",pos);
				var tag_name = (end_pos>0) ? content.substring(pos+1,end_pos) : "";
				if(tag_name=="template" || tag_name=="script"){
					var search = "</"+tag_name+">";
					pos = end_pos+1;
					end_pos = content.indexOf(search, end_pos);
					if(end_pos<0)
						end_pos=content.length;
					ret[tag_name] = content.substring(pos,end_pos);
					if(end_pos<content.length){
						tag_name = (tag_name=="template" ? "script" : "template");
						search = "<"+tag_name+">";
						pos = content.indexOf(search, end_pos);
						if(pos>0){
							pos += search.length;
							end_pos = content.indexOf("</"+tag_name+">");
							if(end_pos<0)
								end_pos = content.length;
							ret[tag_name] = content.substring(pos, end_pos);
						}
					}
				}
				else
					ret.template = content;
			}
			else
				ret.template = content;
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
        
        
		
		
		
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//													TAGS MANAGEMENT       
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

		
		adjustTag: function(html_or_obj, script_or_tag_name, attrs){
			var name = _.isObject(html_or_obj) ? script_or_tag_name : (_.isObject(attrs) ? attrs.name : null);
			var html = _.isObject(html_or_obj) ? html_or_obj.html : html_or_obj;
			var script = _.isObject(html_or_obj) ? html_or_obj.script : script_or_tag_name;
			attrs = _.isObject(html_or_obj) ? html_or_obj : (_.isObject(attrs) ? attrs : {});
			
			var obj = {
				tag: name	
			};
			
			if(_.isString(attrs.type))
				obj.types = this.parseAndTrim(attrs.type);
			else if(_.is(attrs.types))
				obj.types = this.parseAndTrim(attrs.types);
			
			if(_.isString(attrs.view))
				obj.view = attrs.view;

			obj.template = html;
			obj.script = script;
			
			return obj;
		},
		
		/* TODO: sovrascrittura successiva... FACCIAMO ATTENZIONE anche alla definizione di types, ecc., con i rispettivi abbinamenti e registrazioni...
		defineTag: function(tag_name, tag_declaration){
			var obj = this.H_tags[tag_name];
			if(_.is(tag_declaration)){
				tag_declaration = this.adjustTag(tag_declaration);
				if(!_.is(obj))
					obj = {};
				this.H_tags[tag_name] = _.extendObj(obj, tag_declaration);
			}
			return obj;
		},
		*/
		
		tagStruct: function(tag_or_tag_name_or_tag_struct){
			var tag_name = _.isString(tag_or_tag_name_or_tag_struct) ? tag_or_tag_name_or_tag_struct : 
				(_.is(tag_or_tag_name_or_tag_struct, this.H_Tag) ? tag_or_tag_name_or_tag_struct.tag() : null);
			var tag = _.isString(tag_name) ? this.H_tags[tag_name] : 
					(_.isObject(tag_or_tag_name_or_tag_struct) ? tag_or_tag_name_or_tag_struct : null);
			if(_.isObject(tag))
				this.adjustTagStruct(tag, tag_name);
			return tag;
		},
		
		adjustTagStruct: function(tag, tag_name){
			if(!_.is(tag.H)){
				var h_field = {};
				
				try{
					h_field.template = _.isString(tag.template) ? _.template(tag.template) : this.msgTemplate();
				}catch(err){
					this.printError("Unable to compile template for tag "+tag_name+": "+err+"\nTemplate string: "+tag.template, err);
				}
				
				var proto = null;
				if(_.is(tag.script)){
					try{
						if(_.isString(tag.script))
							tag.script = _.parse(tag.script);
						proto = _.isObject(tag.script) ? tag.script : null;
					}catch(err){
						this.printError("Unable to compile script for tag "+tag_name+": "+err+"\nScript string: "+tag.script, err);
					}
				}
				if(!_.isObject(proto))
					proto = {};
				if(!_.is(proto._H))
					proto._H = {};
				proto._H.tag = tag_name;
				proto._H.view = tag.view;
				h_field.fn = _.extendFn(this.H_Tag,proto);
				
				tag.H = h_field;
			}
		},
		
		msgTemplate: function(msg){
			return function(){ return _.isString(msg) ? msg : ""; };
		},
		
		registerTag: function(tag){
			this.H_tags[tag.tag] = tag;
			var types = tag.types;
			if(_.isArray(types)){
				var view = _.isString(tag.view) ? tag.view : "show";
				_.each(types, function(type){
					var struct = this.struct(type);
					if(_.isObject(struct)){
						var tags = this.propAndGo(struct,"tags");
						tags[view] = tag.tag;
					}
				},this);
			}
		},
		
		tagPrototype: function(tag_or_tag_struct_or_tag_name){
			var struct = this.tagStruct(tag_or_tag_struct_or_tag_name);
			if(_.isObject(struct)){
				return struct.script;
			}
		},
		
		hasToLive: function(tag){
			// try to know from the Tag declaration
			if(_.is(tag, this.H_Tag)){
				if(_.isBoolean(tag.live))
					return tag.live;
				else if(_.isFunction(tag.live)){
					try{
						return tag.live();
					}catch(err){
						this.printError("Unable to check if tag "+tag.tag()+" has to live",err);
						return false;
					}
				}
			}
			// if live is not defined, the tag has to live if it has a prototype
			return _.is(this.tagPrototype(tag));
		},
		
		tag: function(tag_name_or_elem, obj_or_path_or_tag_name, args){
			if(_.isDOM(tag_name_or_elem)){
				var $elem = $(tag_name_or_elem);
				if(_.isNotEmptyString(obj_or_path_or_tag_name)){
					var search_type = (obj_or_path_or_tag_name.charAt(0)!=":"); 
					var search = search_type ? obj_or_path_or_tag_name : obj_or_path_or_tag_name.substring(1);
					var tags = $elem.parents("[data-h-tag]").get();
					var found = null;
					_.find(tags, function(tag_elem){
						var tag_id = $(tag_elem).attr("data-h-tag");
						var tag = this.H_ui[tag_id];
						var ret = _.is(tag, this.H_Tag) ? (search_type ? tag.obj().type().is(search) : (tag.tag()==search)) : false;
						if(ret)
							found = tag;
						return ret;
					},this);
					return found;
				}
				else{
					var tag_id = $elem.closest("[data-h-tag]").attr("data-h-tag");
					return _.isString(tag_id) ? this.H_ui[tag_id] : null;
				}
			}
			else{
				var tag = this.tagStruct(tag_name_or_elem);
				if(_.isObject(tag)){
					var obj = H.obj(obj_or_path_or_tag_name);
					return new tag.H.fn(obj,args);
				}
			}
		},
		
		tagBorn: function(tag){
			if(_.is(tag, this.H_Tag))
				this.H_ui[tag.id()] = tag;
		},
		
		tagDie: function(tag_or_tag_id){
			var tag_id = _.is(tag_or_tag_id, this.H_Tag) ? tag_or_tag_id.id() : tag_or_tag_id;
			if(_.isString(tag_id))
				this.H_ui[tag_id] = null;
		},
		
		H_Tag: _.getFn(function(object, args){
			this.H = {};
			this.H.object = object;
			this.H.args = args;
			this.H.id = _.id("H_Tag_");
		},{
			obj: function(){
				return this.H.object;
			},
			args: function(){
				return this.H.args;
			},
			arg: function(path){
				return H.getAndSet(path, this.H.args);
			},
			tag: function(){
				return this._H.tag;
			},
			view: function(){
				return this._H.view;
			},
			id: function(){
				return this.H.id;
			},
			$: function(){
				if((!_.is(this.H.$)) && (!H.isPrinting()))
					H.printTag(this);
				else if(_.isString(this.H.$))
					this.H.$ = $(this.H.$);
				return this.H.$;
			},
			saluto: function(msg){
				console.log("Ciao"+(_.isString(msg) ? ", "+msg : ""));
			}
		}),
		
		
		
		
		
		
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//													TEMPLATING FUNCTIONS       
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


		getTag: function(obj_or_path_or_tag, view_or_args, tag_name_or_args, args){
			// create the tag object from arguments
			var tag = _.is(obj_or_path_or_tag, this.H_Tag) ? obj_or_path_or_tag : null; 
			if(!_.is(tag)){
				var view = _.is(obj_or_path_or_tag, this.H_Object) ? "show" : (_.is(obj_or_path_or_tag, this.H_Type) ? "type" : (_.is(obj_or_path_or_tag, this.H_Field) ? "field" : 
						(_.is(obj_or_path_or_tag, this.H_Action) ? "action" : null)));
				var path = _.isString(obj_or_path_or_tag) ? obj_or_path_or_tag : (_.is(view) ? obj_or_path_or_tag.path() : null);
				var obj = H.obj(_.isString(path) ? path : obj_or_path_or_tag);
				view = _.isString(view_or_args) ? view_or_args : (_.isString(view) ? view : "show"); 
				var args = _.isObject(view_or_args) ? view_or_args : (_.isObject(tag_name_or_args) ? tag_name_or_args : (_.isObject(args) ? args : {}));
				
				tag = _.isString(tag_name_or_args) ? tag_name_or_args : H.findTag(obj, view); 
				if(_.isNotEmptyString(tag))
					tag = this.tag(tag, obj, args);
			}
			return tag;
		},
		
		printTag: function(tag){
			if(_.is(tag, this.H_Tag)){
				// reset templating includes TODO: facciamolo all'interno dei tag quando gestiremo per bene le gerarchie... e così rendiamo la funzione multitask...
				this.templating_includes = {};
				// perform the templating process
				this.templateTag(tag);
				// process the templating result with the generated includes
				var html = tag.$();
				
				html = this.templatingRootContainerEmbedding(html);
				
				// process included contents
				var spans = html.find("span[data-h-including-tag]").get();
				var processed_tags = new Array();
				while(spans.length>0){
					// replace included spans with templated contents
					_.each(spans, function(span){
						var $span = $(span);
						var include_id = $span.attr("data-h-including-tag"); 
						var include = this.templating_includes[include_id]; 
						if(_.is(include)){
							var included = include.$();
							if(this.hasToLive(include))
								included.attr("data-h-tag",include_id);
							$span.replaceWith(included);
							processed_tags.push(include);
						}
					},this);
					spans = html.find("span[data-h-including-tag]").get();
				}
				
				html = this.templatingRootContainerEmbedding(html);
				if(this.hasToLive(tag))
					html.attr("data-h-tag", tag.id());
				
				// call the listener functions on all the included contents when the whole template is ready
				processed_tags.reverse();
				
				var tagOn = function(tag){
					if(_.is(tag, this.H_Tag)){	
						// call the 'on' function if present
						var err_msg = "Error while calling 'on' function on tag "+tag.tag()+", id: "+tag.id()+":\n"+
								"Obj: "+_.toString(tag.obj())+"\nArgs: "+_.toString(tag.args());
						this.callCatched(tag["on"],null,tag,err_msg,true);
						// register the living object if it has to live
						if(tag.$().is("[data-h-tag]"))
							this.tagBorn(tag);
					}
				};
				_.each(processed_tags, tagOn, this);
				// call the listener function on the resulting template
				tagOn.call(this,tag);
				// empty current includes and return
				this.templating_includes = null;
			}
		},
		
		// the template function is not multi-threaded, be aware in server-side executions...
		print : function(obj_or_path_or_tag, view_or_args, tag_name_or_args, args){
			var tag = this.getTag(obj_or_path_or_tag, view_or_args, tag_name_or_args, args);
			if(_.is(tag, this.H_Tag)){
				this.printTag(tag);
				return tag.$();
			}
		},
		
		findTag: function(h_object, view){
			if(this.isH_Function(h_object, true) && _.isString(view)){
				var types = h_object.types();
				var struct;
				for(var i=0;i<types.length;i++){
					struct = this.struct(types[i]);
					if(_.isObject(struct) && _.isObject(struct.tags) && _.isString(struct.tags[view]))
						return struct.tags[view];
				}
			}
		},
		
		isPrinting: function(){
			return _.isObject(this.templating_includes);
		},
		
		templateTag: function(tag, obj, args){
			if(_.is(obj))
				tag.H.object = obj;
			if(_.is(args))
				tag.H.args = args;
			var struct = this.tagStruct(tag.tag());
			var template_fn = (_.isObject(struct) && _.isFunction(struct.H.template)) ? struct.H.template : null;
			if(_.isFunction(template_fn)){
				var that = this;
				// Include can be called on an object and with additional arguments or is called with the current bindings of obj and args.
				// The last parameter (or one of the second or third, in the case of one of them is missing) is a print function 
				// that will be eventually called to print the evaluated string...
				var include_fn = function(view_or_tag_name,_obj_or_print_fn,_args_or_print_fn,_print_fn){
					// arguments acquisition
					var _obj = _.isFunction(_obj_or_print_fn) ? undefined : _obj_or_print_fn;
					var _args = _.isFunction(_args_or_print_fn) ? undefined : _args_or_print_fn;
					if(!_.isFunction(_print_fn))
						_print_fn = _.isFunction(_obj_or_print_fn) ? _obj_or_print_fn :  
									(_.isFunction(_args_or_print_fn) ? _args_or_print_fn : undefined);
					var included = that.includeTag(view_or_tag_name,_obj,_args,tag);
					if(_.isFunction(_print_fn))
						_print_fn(included);
					return included; 
				};
				// Comodity get function that search a parameters against one or more attributes from args and obj objects, supporting a default value
				var get_fn = function(){
					var args_arr = _.toArray(arguments);
					// default value is the last argument (if more than one)
					var arg_def = (args_arr.length>1) ? args_arr.splice(args_arr.length-1,1)[0] : undefined;
					var arg_names = _.isArray(args_arr[0]) ? args_arr[0] : args_arr;
					return that.argOrObj(arg_names,arg_def,tag.obj().value(),tag.args());
				};
				// The object with the bindings for the template functions
				var template_obj =  {
					obj: tag.obj(),
					value: tag.obj().value(),
					type: tag.obj().type(),
					args: tag.args(),
					device: this.device(),
					include: include_fn,
					get: get_fn
				};			
				
				try{
					tag.H.$ = template_fn.call(tag,template_obj);
					return tag.H.$;
				}catch(err){
					H.printError("Error while printing template "+tag.tag()+": ", err, true);
				}
			}
			else
				H.printError("Template not found for tag "+tag.tag());
		},
		
		templatingRootContainerEmbedding: function(html){
			var temp_root_container_attr = "data-h-templating_temp_root_container";
			var new_html = null;
			
			if(html.is("span[data-h-including-tag]")){
				var new_html = $("<div "+temp_root_container_attr+"='true'></div>");
				new_html.append(html);
			}
			else if(html.is("["+temp_root_container_attr+"]"))
				new_html = $(html.children().get());
			
			return _.is(new_html) ? new_html : html;
		},
		
		
		// private function 
		// The first parameter can be a view, or a tag_name (prefixed by :, like :tag_name), or a tag object. 
		includeTag : function(view_or_tag_name_or_tag,_obj,_args,_tag){
			//try{
				// resolve the object
				if(_.is(_obj)){
					if(_.isObject(_obj))
						_obj = H.obj(_obj);
					else{
						if(!_.isString(_obj))
							_obj = ""+_obj;
						_obj = (_obj.charAt(0)=="/") ? H.obj(_obj) : (_obj.length>0 ? _tag.obj().get(_obj) : _tag.obj());
					}
				}
				else 
					_obj = _tag.obj();
				// resolve the arguments
				var templating_args = _.deepClone(_tag.args()); 
				if(!_.is(_args))
					_args = templating_args;
				else if(_.isObject(_args))
					_args = _.extendObj(templating_args,_args);
				// resolve the tag
				var tag = _.is(view_or_tag_name_or_tag, this.H_Tag) ? view_or_tag_name_or_tag : null;
				if(!_.is(tag)){
					var tag_name = (_.isNotEmptyString(view_or_tag_name_or_tag) && view_or_tag_name_or_tag.charAt(0)==":") ?
							view_or_tag_name_or_tag.substring(1,view_or_tag_name_or_tag.length) : null;
					if(!_.isNotEmptyString(tag_name)){
						tag_name = _.isNotEmptyString(view_or_tag_name_or_tag) ? view_or_tag_name_or_tag : "show";
						tag_name = H.findTag(_obj, tag_name);
					}
					tag = this.tag(tag_name,_obj,_args);
				}
				if(_.is(tag)){
					this.templateTag(tag);
					if(_.isObject(this.templating_includes))
						this.templating_includes[tag.id()] = tag;
					return "<span data-h-including-tag='"+tag.id()+"'></span>";
				}
				else
					throw new Error("Tag not found: "+_.toString(view_or_tag_name_or_tag));//return "<span>Tag not found: "+_.toString(view_or_tag_name_or_tag)+"</span>";
			/*}catch(err){
				this.printError("Error while including template "+_.toString(view_or_tag_name_or_tag),err);
			}*/
		},
		
		argOrObj: function(name_or_names, def, obj, args){
			var ret = null;
			if(_.isArray(name_or_names)){
				for(var i=0;i<name_or_names.length && _.isNot(ret,true); i++){
					ret = this.singleArgOrObj(name_or_names[i], obj, args);
				}
			}
			else if(_.isString(name_or_names))
				ret = this.singleArgOrObj(name_or_names, obj, args);
			return _.isNot(ret,true) ? def : ret;
		},
		
		singleArgOrObj: function(name, obj, args){
			if(_.isNotEmptyString(name)){
				if(_.isObject(args) && _.is(args[name]))
					return args[name];
				else if(_.isObject(obj))
					return obj[name];
			}
		},
		
		
		firstNotNullField: function(obj, fields){
			if(_.isObject(obj) && _.isArray(fields)){
				for(var i=0; i<fields.length; i++)
					if(_.isString(fields[i]) && (!this.isNot(obj[fields[i]])))
						return obj[fields[i]];
			}
		},
		
		
		
		
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 												UPLOAD FUNTIONS
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////		
		
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
			return "<div class='"+this.uploadConf("iframe_container_css")+"'><b>"+param_name+"</b>: " +
					"<iframe class='"+this.uploadConf("iframe_css")+"' src='"+this.uploadConf("iframe_src")+"'></iframe>" +
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
		

		
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 													AJAX FUNCTIONS
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////		
			    
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
	    },

		

		
		
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//													OTHER FUNCTIONS       
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		
		saluto: function(){ alert("Ciao, bieddru (Client-Side... :-))!");  }
	
	});
	
	
	// H binding:
	window.H = new HtmlPlusFn();
	
})();
