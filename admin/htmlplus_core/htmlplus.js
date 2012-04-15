
	var __HtmlPlusPrototype = {

/////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Initialization and configuration
/////////////////////////////////////////////////////////////////////////////////////////////////////////		
			
		commonInit: function(options){
			var config = {
				// this separator is used to divide child identifiers in a nested object path. The . is more appropriate (even if you have to access array items as 
				// object fields, with the same . notation instead of the [] brackets...), but you cannot use the jQuery selector ("#"+id), because the . in the id
				// will be interpreted as the starting of a css selector... you can always use jsOn.get$(path) to directly have your jquery object, if you want
				// to use the . seprator... :-)
				path_separator: '/',
				data_attributes: {
					H: 'H',
					path: 'path',
					key: 'key',
					type: 'type',
					role: 'role', // container, field_container, object, templates_container, template
					scope: 'scope'  // data, living, local
				},
				upload: {
					server_url: '',
					iframe_src: 'upload',
					iframe_container_css: 'upload_iframe_container',
					iframe_css: 'upload_iframe'
				},
				null_is_undefined: false,
				restorable_objects: true,
				/* sintassi per gli escape -% %- e -%= %-
				template_settings:{
					evaluate : /\-\%([\s\S]+?)\%\-/g,
					interpolate : /\-\%\=([\s\S]+?)\%\-/g
				},
				*/
				core_page: "core.jsp?now="+new Date().getTime(),
				error_prefix : "***** ERROR -> *****",
				error_suffix : "***** ERROR <- *****"
			};
			// set the configuration
			_.extend(config,options);
			this.HtmlPlus_config = config;
			// define system constants	
			this.constants = {
				only_type : "H#see_relative_type"	
			};
			
			
			this.H_structs = {};
			this.H_data = {};
			this.H_conf = {};
			this.H_open_enums = {};
			
			
			this.plus_state = "created";
				
		},
		
		Hconf: function(prop, overriding_value){
			if(_.is(overriding_value))
				return overriding_value;
			else
				return this.HtmlPlus_config[prop];
		},
		
		device: function(){
			return _.device();
		},
		
		/*
		sep: function(){
			return this.Hconf("path_separator");
		},
		
		nav: function(obj){
			return _.is(obj) ? _.nav(obj, this.sep()) : this.navigator;
		},
		*/
		
		errorString: function(msg, sep){
			return this.Hconf("error_prefix")+sep+msg+sep+this.Hconf("error_suffix");
		},
		
		isError: function(obj){
			return (_.is(obj, Error) || _.is(obj, DOMException));
		},
		
		printError: function(msg_or_err, err, print_stack_as_array){
			if((!_.is(err)) && (_.is(msg_or_err, Error)))
				err = msg_or_err;
			var stack = this.isError(err) ? _.getStackTrace(err) : null;
			var msg = _.isString(msg_or_err) ? msg_or_err : null;
			var err_msg = this.isError(err) ? (""+err.type+": "+err.message) : null;
			console.log(this.Hconf("error_prefix"));
			if(_.is(msg))
				console.log(msg);
			if(_.is(err_msg)){
				if(_.is(msg))
					console.log("ERROR:");
				console.log(err);
			}
			if(_.isArray(stack) && stack.length>0){
				console.log("STACK TRACE:");
				if(!!print_stack_as_array)
					console.log(stack);
				else 
					_.each(stack, function(stack_point){ console.log(stack_point); });
			}
			console.log(this.Hconf("error_suffix"));
		},
		
		callCatched: function(fn, args, context, err_msg){
			try{
				if(_.isFunction(fn))
					return fn.apply(context, args);
			}catch(err){
				if(_.isString(err_msg))
					this.printError(err_msg, err);
				else
					this.printError(err);
			}
		},
		
		callCatched: function(fn, args, context, err_msg, print_err_stack_as_array){
			try{
				if(_.isFunction(fn)){
					args = _.isArray(args) ? args : (_.is(args) ? [args] : new Array());
					return fn.apply(context, args);
				}
			}catch(err){
				if(_.isString(err_msg))
					this.printError(err_msg, err, print_err_stack_as_array);
				else
					this.printError(err,null,print_err_stack_as_array);
			}
		},
		
		

		conf: function(path){
			return this.nav(this.H_conf).get(path); 
		},
		
		
		// TODO: implementare meccanismo ajax, ed eventualmente ricerca anche tra quelli presenti (se non lo fa l'autocomplete di jquery...)
		openEnum: function(enum_name, search_term, success_fn, error_fn){
			var values = _.isString(enum_name) ? this.H_open_enums[enum_name] : new Array();
			if(_.isArray(values)){
				this.callCatched(success_fn, [values], null, "Errore nella richiesta dei valori di "+enum_name);
				return values;
			}
			else if(_.isNumber(values)){
				return new Array();
			}
		},
		

		importConfiguration: function(config){
			if(_.isObject(config))
				_.extendObj(this.H_conf, config, true, true);
		},
		
		
		importOpenEnums: function(enums){
			if(_.isObject(enums))
				_.extendObj(this.H_open_enums, enums, true, true);
		},
		
		importScript: function(script){
			eval(script);
		},
		

/////////////////////////////////////////////////////////////////////////////////////////////////////////
		// Stucts functions
/////////////////////////////////////////////////////////////////////////////////////////////////////////		
		
		
		importStructs: function(structs){
			_.each(structs, function(struct, struct_name){
				this.struct(struct_name, struct);
			},this);
		},
		
		parseStruct: function(struct_string_or_obj){
			try{
				var ret = {};
				if(_.isString(struct_string_or_obj)){
					var struct_string = _.trim(struct_string_or_obj);
					
					if(struct_string.length>0 && struct_string.charAt(0)=="{")
						ret = _.parse(struct_string);
					else if(struct_string.indexOf("(")>0){
						ret.is = _.trim(struct_string.substring(0,struct_string.indexOf("(")));
						struct_string = struct_string.substring(struct_string.indexOf("(")+1, struct_string.lastIndexOf(")"));
						ret.args = _.parse(struct_string);
					}
					else
						ret.is = struct_string;
				}
				else if(_.isObject(struct_string_or_obj))
					ret = struct_string_or_obj;
				
				if(_.isObject(ret) && (!_.is(ret.is))){
					var that = this;
					_.each(ret, function(arg, key){
						if(_.isString(arg))
							ret[key] = that.parseStruct(arg);
					});
				}
				
				return ret;
			}catch(err){
				this.printError("Errore nel parsing di: "+struct_string_or_obj,err);
			}
		},
		
		adjustStruct: function(struct){
			var that = this;
			
			if(_.isString(struct))
				struct = this.parseStruct(struct);
			
			if(_.isObject(struct)){
				var type = {};
				var keys = _.keys(struct);
				if(_.include(keys, "is")){
					var struct_args = _.include(keys,"args") ? this.parseStruct(struct.args) : null;
					if(_.is(struct_args) || keys.length>1){
						type.is = struct.is;
						if(!_.is(type.args))
							type.args = {};
						var is_obj_args = _.isObject(struct_args);
						var arg_keys = is_obj_args ? _.keys(struct_args) : keys;
						_.each(arg_keys, function(key){
							if(is_obj_args || key!="is"){
								var key_obj = is_obj_args ? struct.args[key] : struct[key];
								if(_.is(key_obj))
									type.args[key] = key_obj;
							}
						});
					}
					return (keys.length>1) ? type : struct;//struct.is;
				}
				else{
					var def_fields = !_.include(keys,"fields");
					var def_args = (!def_fields) && _.include(keys,"extends") && (!_.include(keys,"args"));
					_.each(keys, function(key){
						if(_.is(struct[key])){
							if(key=="extends"){
								if(_.isString(struct[key]) && struct[key].indexOf("(")>0){
									var ext = that.parseStruct(struct[key]);
									type["extends"] = _.isString(ext) ? ext : ext.is;
									if(_.isObject(ext) && _.isObject(ext.args))
										type.args = ext.args;
								}
								else
									type["extends"] = struct[key];
							}
							else if(key=="static"){
								var static_struct = struct[key];
								var static_keys = _.keys(static_struct);
								var static_type = {};
								_.each(static_keys, function(static_key){
									that.adjustInternalStruct(static_type, static_struct, static_key);
								});
								type[key] = static_type;
							}
							else if(key=="bucket")
								type[key] = struct[key];
							else 
								that.adjustInternalStruct(type, struct, key, def_args, def_fields);
						}
					});
				}
				return type;
			}
			else
				return struct;
			
		},
		
		adjustInternalStruct: function(type, struct, key, def_args, def_fields){
			var that = this;
			if(key=="fields"){
				var fields = struct[key];
				if(!_.is(type.fields))
					type.fields = {};
				_.each(fields, function(field, key){
					if(_.is(field))
						that.addFieldStruct(type, key, field); 
				});
			}
			else if(key=="actions"){
				var actions = struct[key];
				if(!_.is(type.actions))
					type.actions = {};
				_.each(actions, function(action, action_key){
					if(_.isString(action))
						action = that.parseStruct(action);
					if(_.isObject(action)){
						var act = {};
						
						if(_.is(action["ret"])){
							var ret = that.adjustStruct(action["ret"]);
							action["ret"] = undefined;
							act["ret"] = ret;
						}  
						var args = _.is(action.args) ? action.args : action;
						var args_type = that.adjustStruct(args); //that.parseStruct(args);
						act["args"] = args_type;
						
						type.actions[action_key] = act;
					}
				});
			}
			else if(this.isStructKeyword(key)){
				type[key] = struct[key];
			}
			else if(!!def_args){
				if(!_.is(type.args))
					type.args = {};
				type.args[key] = struct[key];
			}
			else if((!_.is(def_fields)) || def_fields===true){
				if(!_.is(type.fields))
					type.fields = {};
				that.addFieldStruct(type, key, struct[key]); 
			}
		},
		
		getStructKeywords: function(){
			return ["is","extends","args","fields","actions","ret","searchables","functions"];
		},
		
		isStructKeyword: function(key){
			return _.include(this.getStructKeywords(),key);
		},
		
		addFieldStruct: function(type, field_key, field_struct){
			var parsed = _.isString(field_struct); 
			if(parsed) 
				field_struct = this.parseStruct(field_struct);
			var has_type_obj = ((!parsed) && _.isObject(field_struct) && _.is(field_struct.type));
			var adjusted_type = this.adjustStruct( has_type_obj ? field_struct.type : field_struct );
			var adjusted = {};
			adjusted.type = adjusted_type;
			if((!parsed) && _.isObject(field_struct)){
				var keys = _.keys(field_struct);
				_.each(keys, function(key){
					if(key!="type")
						adjusted[key] = field_struct[key];
				});
			}
			type.fields[field_key] = adjusted; 
		},
		
		
		struct: function(type_name, struct){
			if(_.is(struct)){
				var type = this.assertStruct(type_name);
				struct = this.adjustStruct(struct);
				_.extendObj(type,struct,true,true);
				//console.log("Ecco la struct di "+type_name+": "+JSON.stringify(type));
				return type;
			}
			else
				return  _.isString(type_name) ? this.findStruct(type_name) : ( _.isObject(type_name) ? type_name : null );
		},
		
		subStruct: function(struct_or_path, sub_path, force_field_or_action, force_instance_or_static){
			return this.findStruct(sub_path, false, false, struct_or_path, force_field_or_action, force_instance_or_static);
		},
		
		findStructPath: function(path, parent_path_or_struct, force_field_or_action, force_instance_or_static){
			return this.findStruct(path, false, true, parent_path_or_struct, force_field_or_action, force_instance_or_static, true);
		},
		
				
		// If always_return is true, the method splice the array to the last found path (if it's passed as an array) and returns the last found struct
		// If return_in_array is also true, the path parameter is not modified, and the last path is returned as the function result, with the last
		// found object pushed as the last item of the array.
		findStruct: function(path_string_or_array, always_return, return_in_array, starting_struct, force_field_or_action, force_instance_or_static, 
				return_path){
			var current = _.isObject(starting_struct) ? starting_struct : (_.isString(starting_struct) ? this.struct(starting_struct) : null);
			var last_current = current;
			var path = this.getPathArray(path_string_or_array);
			var pos=-1;
			var searching = {
				fields: ((!_.is(force_field_or_action)) || (!!force_field_or_action)),
				actions: ((!_.is(force_field_or_action)) || (!force_field_or_action)),
				instance: ((!_.is(force_instance_or_static)) || (!!force_instance_or_static)),
				static: ((!_.is(force_instance_or_static)) || (!force_instance_or_static))
			};
			
			if(path.length>0){
				var tryNext = function(curr_nav, curr_path, path_array, next_path, try_static){
					var try_path = (!!try_static) ? "static/" : "";
					var try_obj = searching.fields ? curr_nav.get(try_path+"fields/"+curr_path) : null;
					if(_.is(try_obj)){
						if(!!path_array){
							path_array.push("fields"); 
							path_array.push(curr_path);
						}
						if((!_.isString(next_path)) || next_path=="type")
							return try_obj;
						else{
							if(!!path_array)
								path_array.push("type");
							return try_obj.type;
						}
					}
					else{
						try_obj = searching.actions ? curr_nav.get(try_path+"actions/"+curr_path) : null;
						if(_.is(try_obj)){
							if(!!path_array){
								path_array.push("actions"); 
								path_array.push(curr_path);
							}
							if((!_.isString(next_path)) || next_path=="args" || next_path=="ret") 
								return try_obj;
							else{
								if(!!path_array)
									path_array.push("args");
								try_obj.args;
							}
						}
						else
							return null;
					}
				};
				
				var curr_path = null;
				var curr_nav = null;
				var current_struct_path = (!!return_path) ? (_.isArray(starting_struct) ? starting_struct : 
						(_.isString(starting_struct) ? this.getPathArray(starting_struct) : new Array())) : null; 
				if(!_.is(current)){
					current = this.H_structs[path[0]];
					last_current = current;		
					pos++;
					if(!!current_struct_path)
						current_struct_path.push(path[0]);
				}
				
				while(_.isObject(current) && (pos<path.length-1)){
					pos++;
					curr_path = path[pos];
					curr_nav = _.nav(current,"/");
					var try_obj = searching.instance ? tryNext(curr_nav, curr_path, current_struct_path, (pos<path.length-1) ? path[pos+1] : null) : null;
					if(!_.is(try_obj))
						try_obj = searching.static ? tryNext(curr_nav, curr_path, current_struct_path, (pos<path.length-1) ? path[pos+1] : null, true) : null;
					current = _.is(try_obj) ? try_obj : null;
					if(_.isString(current)){
						var found = this.findStruct(current);
						if(_.is(found)){
							if(!!current_struct_path)
								current_struct_path = this.getPathArray(current);
							current = found;
						}
					}
					if(_.is(current))
						last_current = current;
				}
			}
			
			if(_.isObject(current))
				return (!!current_struct_path) ? ((!!return_in_array) ? current_struct_path : this.path(current_struct_path)) : current;
			else if(!!always_return){
				if(pos<0)
					pos = 0;
				if(!!return_in_array){
					if(pos==0)
						return new Array();
					var ret = path.slice(0,pos);
					ret.push(last_current);
					return ret;
				}
				else{
					path.splice(pos,path.length-pos);
					return last_current;
				}
			}
		},
		
		propAndGo: function(obj, prop){
			if(!_.is(obj[prop]))
				obj[prop] = {};
			return obj[prop];
		},
		
		// is_action and is_static are only user for the last struct insertion, if it's not the first too (that is: if the struct is a first-class struct)
		assertStruct: function(struct_path, is_action, is_static, enter_type_or_args){
			var path = this.getPathArray(struct_path);
			if(path.length>0){
				var struct = this.findStruct(path, true, true);
				if(_.isArray(struct)){
					var current; 
					var path_pos;
					if(struct.length==0){
						path_pos=0;
						current = {};
						this.H_structs[path[0]] = current; 
						return this.H_structs[path[0]];
					}
					else{
						current = _.last(struct);
						path_pos = struct.length-2;
					}
					
					for(var i = path_pos+1; i<path.length-1; i++){
						if(_.isEmpty(current) || _.is(current.type))
							current = this.propAndGo(current, "type");
						current = this.propAndGo(current, "fields");
						current = this.propAndGo(current, path[i]);
					}
					if(_.isBoolean(is_action)){
						if(_.isEmpty(current) || _.is(current.type))
							current = this.propAndGo(current, "type");
						if(!!is_static)
							current = this.propAndGo(current, "static");
						current = is_action ? this.propAndGo(current, "actions") : this.propAndGo(current, "fields");
					}
					current = this.propAndGo(current, _.last(path));
					if(!!enter_type_or_args)
						current = this.propAndGo(current, (!!is_action) ? "args" : "type");
					return current;
				}
				else
					return struct;
			}
			else
				throw "Invalid path: "+_.toString(struct_path);
		},
		
		extendObjWithProp: function(extending, extension, prop, only_keys, static_prop){
			if(_.isObject(extending)){
				extension = (!!static_prop) ? (_.isObject(extension["static"]) ? extension["static"] : null) : extension; 
				extension = ( _.isObject(extension) && _.isObject(extension[prop]) ) ? extension[prop] : null;
				if(_.isObject(extension)){
					extending = (!!static_prop) ? this.propAndGo(extending,"static") : extending;
					if(!!only_keys){
						extension = _.keys(extension);
						if(_.isArray(extending[prop]))
							extending[prop] = extending[prop].concat(extension);
						else
							extending[prop] = extension;
					}
					else{	
						if(_.isObject(extending[prop]))
							_.extendObj(extending[prop],extension);
						else
							extending[prop] = extension;
					}
				}
			}
		},
		
		readStructProps: function(prop_or_props){
			return _.isString(prop_or_props) ? [prop_or_props] : (_.isArray(prop_or_props) ? prop_or_props : ["args", "fields", "actions", "searchables"]);
		},
		
		extendWithStructProps: function(obj, type_or_struct, prop_or_props, only_keys, instance_props){
			var struct = _.isString(type_or_struct) ? this.struct(type_or_struct) : type_or_struct;
			var props = this.readStructProps(prop_or_props); 
			if(_.isObject(struct)){
				if(!_.isObject(obj))
					obj = {};
				var that = this;
				if(instance_props!==false)
					_.each(props, function(prop){
						that.extendObjWithProp(obj,struct,prop,only_keys);
					});
				if(instance_props!==true)
					_.each(props, function(prop){
						that.extendObjWithProp(obj,struct,prop,only_keys,true);
					});
				
				return obj;
			}
		},
		
		findAllProps: function(types, prop_or_props, only_keys, instance_props){
			if(_.isString(types))
				types = [types];
			if(_.isArray(types) && types.length>0){
				var super_struct = (types.length>1) ? this.struct(types[1]) : null;
				var ret = {};
				if(_.is(super_struct)){
					var props = this.readStructProps(prop_or_props);
					var prefix = "H/type_info/" + ( (instance_props===false) ? "static/" : "" );
					_.each(props, function(prop){
						var dest_obj = (instance_props===false) ? this.propAndGo(ret,"static") : ret;
						dest_obj[prop] = this.getAndSet(prefix+prop,super_struct);
					}, this);
				}
				this.extendWithStructProps(ret, types[0], prop_or_props, only_keys, instance_props);
				return ret;
			}
		},
		
		findTypeInfo: function(types){
			if(!_.isArray(types)){
				var struct = _.isString(types) ? this.struct(types) : types;
				types = _.isObject(struct) ? struct.H.types : null;
			}
			if(_.isArray(types) && types.length>0){
				var ret = this.findAllProps(types, "args");
				var props = this.findAllProps(types, ["fields", "actions", "searchables"], false, true);
				_.extend(ret, props);
				props = this.findAllProps(types, ["fields", "actions"], false, false);
				_.extend(ret, props);
				return ret;
			}
		},
		
		typeInfo: function(path_or_struct, info, force_instance_or_static){
	 		var struct = this.struct(path_or_struct);
	 		if(_.isObject(struct)){
	 			var h_field = this.getStructH(struct);
				var type_info = h_field.type_info;
				var ret = ((!_.is(force_instance_or_static)) || (!!force_instance_or_static)) ? type_info[info] : null;
				if(_.is(ret))
					return ret;
				if(((!_.is(force_instance_or_static)) || (!force_instance_or_static)) && _.is(type_info.static))
					ret = type_info.static[info];
				return ret;
	 		}
		},
		
		
		dataInfo: function(all_info){
			var types = {};
			var buckets = {};
			var open_enums = {};
			
			/*
			// create all types to easily read struct and inheritance informations 
			_.each(this.H_structs, function(struct, name){
				this.assertType(name);
			},this);
			*/
			
			var struct_names = _.keys(this.H_structs); 
			_.each(struct_names, function(name){
				
				var info = {};
				var struct = this.assertType(name);
				
				if(this.isTypeCreated(struct)){
					// get bucket
					if(_.is(struct.bucket)){
						info.bucket = struct.bucket;
						buckets[name] = info;
					}
					var fields = this.nav(struct).get("H/type_info/fields");
					var searchables = this.nav(struct).get("H/type_info/searchables");
					// get searchables
					if(_.isObject(searchables)){
						info.searchables = {};
						_.each(searchables, function(searchable, searchable_name){
							if(_.isObject(searchable))
								info.searchables[searchable_name] = searchable.type;
							else if(_.isString(searchable)){
								var field = fields[searchable];
								if(_.isObject(field)){
									field = field.type.is;
									var field_type = this.type(field);
									if(_.is(field_type)){
										if(field_type.is("complex")) // will be converted in string
											field = "string"; 
										else // get the first type before the 'primitive' one, to get the lowest data level 
											field = (field_type.types().length>2) ? field_type.types()[(field_type.types().length-3)] : "string";
									}
									else
										field = "string";
								}
								else
									field = "string";
								info.searchables[searchable_name] = field;
							}
						},this);
					}
					// get fields, finding open-enums
					if(_.isObject(fields)){
						if(!!all_info)
							info.fields = {};
						_.each(fields, function(field, field_name){
							
							if(!!all_info)
								info.fields[field_name] = field.type.is;
							
							if(field.type.is=="autocomplete"){
								var open_enum_type = field.type.args.type.is;
								var prev_val = open_enums[open_enum_type];
								var this_val =  H.path(name, field_name);
								var open_enum_val = _.isArray(prev_val) ? prev_val : (_.is(prev_val) ? [prev_val] : null);
								if(_.isArray(open_enum_val))
									open_enum_val.push(this_val);
								else 
									open_enum_val = this_val;
								open_enums[open_enum_type] = open_enum_val;
							}
						},this);
					}
				}
				
				if((!!all_info) && (!_.isNullOrEmpty(info)))
					types[name] = info;
				
			},this);
			
			var ret = {};
			ret.buckets = buckets;
			ret.open_enums = open_enums;
			if(!!all_info)
				ret.types = types;
			return ret;
		},

		
/////////////////////////////////////////////////////////////////////////////////////////////////////////
		// Types and objects management
/////////////////////////////////////////////////////////////////////////////////////////////////////////		
		
		
		/**
		 * the last parameter can have the following values:
		 * 		object: that's the struct informations of the type
		 * 		string: specify the supertype of this type (can be 'array')
		 * 		boolean: specifiy if type is a primitive type (extends primitive) or not (extends object) 	    
		 */
		defineType: function(type_path, instance_prototype, static_prototype, struct_or_super_class_or_primitive){
			var struct = this.struct(type_path);
			if((!_.is(struct)) || _.isObject(struct_or_super_class_or_primitive)){
				if(!_.is(struct)){
					if(_.isString(struct_or_super_class_or_primitive) || _.isBoolean(struct_or_super_class_or_primitive)){
						var struct_name = _.isString(struct_or_super_class_or_primitive) ? struct_or_super_class_or_primitive : 
								( struct_or_super_class_or_primitive ? "primitive" : ( type_path=="value" ? null : "object" ) );
						struct = {};
						if(_.isString(struct_name))
							struct["extends"] = struct_name;
					}
					else if(_.isObject(struct_or_super_class_or_primitive))
						struct = struct_or_super_class_or_primitive;
					else
						struct = {
							"extends" : "object"
						};
				}
				else
					struct = struct_or_super_class_or_primitive;
				struct = this.struct(type_path,struct);
			}
			this.addPrototype(struct, instance_prototype);
			this.addPrototype(struct, static_prototype, true);
			return struct;
		},
		
		addPrototype: function(struct, prototype, is_static){
			if(_.isObject(prototype)){
				struct = (!!is_static) ? this.propAndGo(struct,"static") : struct;
				struct = this.propAndGo(struct,"functions");
				_.extendObj(struct,prototype);
			}
		},
		
		assertType: function(path){
			var struct = this.struct(path);
			if(_.isObject(struct)){
				if(!this.isTypeCreated(struct))
					struct = this.createType(path, struct);
				if((!_.is(struct.H)) && (_.is(struct.type) || _.is(struct.args)))
					struct = _.is(struct.type) ? struct.type : struct.args;
			}
			return struct;
		},
		
		isTypeCreated: function(path_or_struct){
			var struct = _.isString(path_or_struct) ? this.struct(path_or_struct) : path_or_struct; 
			return _.is(this.getStructH(struct));	
		},
		
		getStructH: function(struct){
			if(_.isString(struct))
				struct = this.struct(struct); 
			return _.isObject(struct) ? ( _.is(struct.H) ? struct.H : ( (_.isObject(struct.type) && _.is(struct.type.H)) ? struct.type.H : 
					((_.isObject(struct.args) && _.is(struct.args.H)) ? struct.args.H : null))) : null;
		},
		
		isSubType: function(path, is_field_or_action, already_resolved_path){
			if(_.isBoolean(is_field_or_action)){
				var resolved_path = (!!already_resolved_path) ? this.getPathArray(path) : this.findStructPath(path);
				var what = is_field_or_action ? "fields" : "actions";
				return (resolved_path.length>1 && resolved_path[resolved_path.length-2]==what);
			}
			else
				return (this.getPathArray(path).length>1); 
		},
		
		isFieldStruct: function(path, already_resolved){
			return this.isSubType(path, true, ((_.isArray(path) && already_resolved!==false) || already_resolved===true));
		},
		
		isActionStruct: function(path, already_resolved){
			return this.isSubType(path, false, ((_.isArray(path) && already_resolved!==false) || already_resolved===true));
		},
		
		
		/*
		 * TODO: estendiamo direttamente le classi e utilizziamo queste function solo per la realizzazione dei super()... ed eventualmente altro... 
		 */
		createType: function(path, struct){
			if(!_.isObject(struct))
				struct = this.struct(path);
			
			if(_.isObject(struct)){
				if(!this.isTypeCreated(struct)){
					var resolved_path = this.findStructPath(path);
					if(this.isSubType(resolved_path)){
						if(this.isFieldStruct(resolved_path)){
							var nested_struct = struct.type;
							this.reallyCreateType(path, nested_struct); 
						}
						else{
							var nested_struct = struct.args;
							var nested_path = this.path(path,"args");
							this.reallyCreateType(nested_path, nested_struct); 
							nested_struct = struct.ret;
							if(_.isObject(nested_struct)){
								nested_path = this.path(path,"ret");
								this.reallyCreateType(nested_path, nested_struct);
							}
						}
					}
					else 
						this.reallyCreateType(path, struct);
				}
				return struct;
			}
			else 
				throw "Struct not found for type "+type_path;
		},
		
		reallyCreateType: function(path, struct){
			var type_types = [path];
			var is_or_extend = _.is(struct.is) ? true : (_.is(struct.extends) ? false : null);
			var super_type = (path=="value") ? null : 
					( _.isBoolean(is_or_extend) ? ( is_or_extend ? struct.is : struct.extends) : 
						(_.isNotEmpty(struct.fields) ? "object" : "primitive") );
			var super_struct = _.is(super_type) ? this.struct(super_type) : null;
			var super_type_fn = this.H_Type;
			var super_obj_fn = this.H_Object;
			if(_.is(super_struct)){
				if(!this.isTypeCreated(super_struct))
					super_struct = this.createType(super_type, super_struct);
				type_types = type_types.concat(super_struct.H.types);
				super_type_fn = super_struct.H.fns.static;
				super_obj_fn = super_struct.H.fns.instance;
			}
			
			struct.H = {};
			struct.H.types = type_types;
			
			struct.H.type_info = this.findTypeInfo(type_types);
			
			struct.H.fns = {};
			if(is_or_extend===true){
				struct.H.fns.static = this.extendHFunction(super_type_fn, type_types);
				struct.H.fns.instance = this.extendHFunction(super_obj_fn, type_types);
			}
			else{
				struct.H.fns.static = this.extendHFunction(super_type_fn, struct, true);
				struct.H.fns.instance = this.extendHFunction(super_obj_fn, struct);
			}
			
			// pre-init the singleton type... comment this to have the types initialized only when needed...
			// TODO: should we make this configurable?
			return H.type(path);
		},
		
		initType: function(type_obj, args){
			type_obj.H.value = {};
			if(_.isObject(args)){
				var fields = type_obj.fields(true);
				var val = type_obj.H.value;
				_.each(fields, function(field){
					if(_.is(args[field]))
						val[field] = args[field];
				});
			}
		},
		
		initObject: function(obj, value, field_path){
			if(_.isString(field_path)){
				obj.H.path = field_path;
				obj.H.root_object = value;
			}
			else
				obj.H.value = value;
			/*
			var type = obj.type();
			if(type.is("primitive"))
				obj.H.value = value;
			else if(type.is("object")){
				obj.H.value = {};
				if(_.hasFields(value)){
					var fields = type.fields();
					var val = obj.H.value;
					if(fields.length==0 || type.meta())
						_.extendObj(val,value);
					else
						_.each(fields, function(field){
							if(_.is(value[field]))
								val[field] = value[field];
						});
				}
			}
			else if(type.is("array")){
				obj.H.value = _.isArray(value) ? value : ( _.is(value) ? [value] : new Array() );
			}
			*/
		},
		
		initHEntity: function(obj, args, field_path){
			obj.H = {};
			var types = obj._H.types;
			if(_.isArray(types) && types.length>0){
				var is_type = _.is(obj, this.H_Type);
				var type = types[0];
				var struct = this.struct(type);
				var complete_init = true;
				if(is_type){
					var _args = this.typeInfo(struct, "args");
					if(_.isObject(_args)){
						_args = _.deepClone(_args);
						args = (_.is(args)) ? _extendObj(_args,args) : _args;
					}
				}
				var complete_init = this.callOnAll(obj,"init",[args]);
				if(complete_init){
					if(is_type)
						this.initType(obj, args);
					else
						this.initObject(obj, args, field_path);
				}
				//console.log((is_type ? "Type initialized: "+types[0] : "Object initialized (type: "+types[0]+")") + ", " +
						//(_.is(field_path) ? "field: "+field_path : ( ( is_type ? "arg" : "value" ) +": "+_.toString(args))));
				return complete_init;
			}
			return false;
		},
		
		getBaseTypes: function(){
			return ["value","primitive","complex","array","object"];
		},

		getHPrototype: function(struct, _static){
			var _types = (_.isObject(struct) && _.isObject(struct.H)) ? struct.H.types : (_.isArray(struct) ? struct : (_.isString(struct) ? [struct] : null));
			if(_.isArray(_types) && _types.length>0){
				var proto = {
					_H:{
						types: _types 
					}	
				};
				if(!!_static){
					//this.fillPrototype();
					struct = _.isObject(struct) ? struct["static"] : null;
				}
				if(_.isObject(struct)){
					//this.fillHPrototype(proto, struct.fields);
					this.fillHPrototype(proto, struct.actions, true);
					this.fillHPrototype(proto, struct.functions);
				}
				return proto;
			}
			else
				throw new Error("Unable to create an H prototype for struct: "+_.toString(struct)+" (static ? "+_static+")");
		},
		
		extendHFunction: function(fn, struct, _static){
			return _.extendFn(fn, this.getHPrototype(struct,_static));
		},
		
		fillHPrototype: function(proto, adding_prototype, h_actions){
			var keys = _.isObject(adding_prototype) ? _.keys(adding_prototype) : null;
			if(_.isArray(keys)){
				for(var i=0; i<keys.length; i++){
					proto[keys[i]] = this.getHFunction(keys[i], h_actions);
				}
			}
		},
		
		getHFunction: function(name, is_action){
			return (!!is_action) ? function(){ return H.callAction(this,name,arguments); } : 
				function(){ return H.call(this,name,arguments); }; 
		},
		
		findFn: function(fn_name, types, _static){
			if(_.isString(fn_name) && _.isArray(types)){
				var struct;
				var nav;
				var fn;
				var search_instance = ((!_.is(_static)) || _static===false);
				var search_static = ((!_.is(_static)) || _static===true);
				for(var i=0; (i<types.length && (!_.is(fn))); i++){
					struct = this.struct(types[i]);
					if(_.is(struct)){
						nav = _.nav(struct,"/");
						fn = search_instance ? nav.get("functions/"+fn_name) : null; 
						if((!_.is(fn)) && search_static)
							fn = nav.get("static/functions/"+fn_name);
					}
				}
				return fn;
			}
		},
		
		call: function(that, fn, args, super_type, dont_go_super, dont_throw){
			var prev_type = that.H.calling_type;
			var prev_fn = that.H.calling_fn;
			var prev_args = that.H.calling_args;
			
			var types = that._H.types;
			if(_.is(super_type)){
				var pos = -1;
				if(_.isString(super_type))
					pos = _.indexOf(types, super_type); 
				else{
					pos = (_.is(prev_type) ? _.indexOf(types, prev_type) : 0);
					if(pos>=0)
						pos++;
				}
				types = (pos>=0 && pos<types.length) ? ( (!dont_go_super) ? _.rest(types, pos) : [types[pos]] ) : new Array(); 
			}
			if(types.length>0){
				if((!_.is(fn)) && _.is(prev_fn))
					fn = prev_fn;
				if(!_.is(args) && _.is(prev_args))
					args = prev_args;
				
				var _static = _.is(that, this.H_Type);
				var func = this.findFn(fn, types, _static);
				if(_.is(func)){
					that.H.calling_type = types[0];
					that.H.calling_fn = fn;
					that.H.calling_args = args;
					var ret = func.apply(that,args);
					that.H.calling_type = prev_type;
					that.H.calling_fn = prev_fn;
					that.H.calling_args = prev_args;
					return ret;
				}
				else if(!dont_throw)
						throw new Error("Function not found: "+fn);
			}
			else if(!dont_throw)
				throw new Error(""+( _.is(super_type) ? "Super-type not found: "+super_type : 
						"Unable to go up in types hierarchy"+(_.is(prev_type) ? " (from type: "+prev_type+")" : "")));
		},
		
		/*
		 * Calls a function on all the types of the object that. The called function is assumed to be void, and to return true 
		 * if the call chain has to be explicity terminated (any other value will not stop the invocation chain).
		 * This funciton returns true if the chain is been completed, false if it's been stopped. 
		 */
		callOnAll: function(that, fn, args){
			var types = that._H.types;
			var called = false;
			for(var i=0; (i<types.length && called!==true); i++){
				called = this.call(that,fn,args,types[i],true,true);
			} 
			return (called!==true);
		},
		
		type: function(path, args){
			var type = this.assertType(path);
			if(_.isObject(type)){
				var h = this.getStructH(type);
				if(_.is(args))
					return new h.fns.static(args);
				else{
					var ret = h.singleton;
					if(!_.is(ret)){
						h.singleton = new h.fns.static();
						ret = h.singleton;
					}
					return ret;
				}
			}
		},
		
		"new": function(type_path, data, field_path){
			var type = this.assertType(type_path);
			var h = this.getStructH(type);
			return new h.fns.instance(data, field_path);
		},
		

		
		
/////////////////////////////////////////////////////////////////////////////////////////////////////////
		// Types and objects functions
/////////////////////////////////////////////////////////////////////////////////////////////////////////		
		
		
		H_Type: _.getFn(function(args){
			H.initHEntity(this,args);
		},{
			super: function(function_name){
				return _.is(this.H.calling_fn) ? H.call(this,null,(arguments.length>0 ? arguments : null),true) : 
						H.call(this,function_name,(arguments.length>1 ? _.rest(arguments) : null),true);
			},
			callSuper: function(function_name){
				return H.call(this,function_name,(arguments.length>1 ? _.rest(arguments) : null),true);
			},
			callAs: function(type, function_name){
				return H.call(this,function_name,(arguments.length>2 ? _.rest(arguments,2) : null),type);
			},
			is: function(type){
				return _.include(this._H.types,type);
			},
			value: function(){
				return this.H.value;
			},
			nav: function(){
				return H.nav(this.value());
			},
			val: function(field_path, value){
				var val = this.value();
				if(_.isString(field_path) && _.isObject(val)){
					var nav = H.nav(val);
					if(_.is(value))
						nav.set(field_path, value);
					return nav.get(field_path); 
				}
				return val;
			},
			getOrDef: function(path, def, arg){
				if(_.is(arg))
					return arg;
				var ret = this.val(path);
				return _.is(ret) ? ret : def; 
			},
			types: function(){
				return this._H.types;
			},
			path: function(){
				return this._H.types[0];
			},
			struct: function(){
				return H.struct(this.path());
			},
			singleton: function(){
				var h = H.getStructH(this.path());
				return h.singleton;
			},
			get: function(path, instance){
				return H.subStruct(this.path(), path, null, instance);
			},
			static: function(path, force_field_or_action){
				return H.subStruct(this.path(), path, force_field_or_action, false);
			},
			fields: function(_static){
				var ret = H.typeInfo(this.path(),"fields",(!_static));
				return _.isArray(ret) ? ret : (_.isObject(ret) ? _.keys(ret) : new Array());
			},
			actions: function(_static){
				var ret = H.typeInfo(this.path(),"actions",(!_static));
				return _.isArray(ret) ? ret : (_.isObject(ret) ? _.keys(ret) : new Array());
			},
			/*
			
			subPath: function(path, fields_or_actions, data_path_or_force_static_or_instance){
				var _static = _.isString(data_path_or_force_static_or_instance) ? false : data_path_or_force_static_or_instance;
				return H.findStructPath(path, this.path(), fields_or_actions, _.isBoolean(_static) ? (!_static) : undefined);
			},
			field: function(path, data_path_or_force_static_or_instance){
				var path = this.subPath(path, true, data_path_or_force_static_or_instance); 
				return _.isString(path) ? new H.H_Field(path) : null;
			},
			action: function(path, data_path_or_force_static_or_instance){
				var path = this.subPath(path, false, data_path_or_force_static_or_instance); 
				return _.isString(path) ? new H.H_Action(path) : null;
			},
			*/
			field: function(path, h_object){
				path = H.pathAndCheck(this.path(),path);
				return H.field(path, h_object);
			},
			action: function(path, h_object){
				path = H.pathAndCheck(this.path(),path);
				return H.action(path, h_object);
			},
			isPrimitive: function(){
				return this.is("primitive");
			},
			obj: function(data){
				return H["new"](this.path(),data);
			},
			def: function(){
				// TODO: ritorna un valore di default per il tipo... 
				// FORSE: lasciamo che lo definiscano direttamente i system types... qui sarebbe giusto una specifica...  
				return null;
			},
			random: function(){
				// TODO: ritorna un valore randomatico per il tipo
				// FORSE: lasciamo che lo definiscano direttamente i system types... qui sarebbe giusto una specifica...  
				return null;
			}
		}),
		
		H_Object: _.getFn(function(obj, path){
			H.initHEntity(this, obj, path);
		},{
			super: function(function_name){
				return _.is(this.H.calling_fn) ? H.call(this,null,arguments,true) : 
						H.call(this,function_name,(arguments.length>1 ? _.rest(arguments) : null),true);
			},
			callSuper: function(function_name){
				return H.call(this,function_name,(arguments.length>1 ? _.rest(arguments) : null),true);
			},
			callAs: function(type, function_name){
				return H.call(this,function_name,(arguments.length>2 ? _.rest(arguments,2) : null),type);
			},
			is: function(type){
				return this.type().is(type);
			},
			type: function(){
				var h = H.getStructH(this._H.types[0]);
				return h.singleton;
			},
			types: function(){
				return this._H.types;
			},
			path: function(){
				return this.H.path;
			},
			dataPath: function(){
				if(this.isRoot()){
					if(_.isString(this.H.type) && _.isString(this.H.key))
						return H.path("",this.H.type, this.H.key);
					else
						return null;
				}
				else{ 
					var root_path = this.root().dataPath(); 
					var field_path = this.path();
					return (_.isString(root_path) && _.isString(field_path)) ? H.path(root_path,field_path) : null;
				}
			},
			fields: function(){
				return _.without(_.fields(this.value()),"H");
			},
			field: function(path){
				if(_.isString(path)){
					var obj = this.get(path);
					return _.is(obj) ? this.type().field(path, obj) : null;
				}
				else{
					if(this.isRoot())
						return null;
					else{
						var field_path = H.findTypePath(this.path(),this.root());
						return H.field(field_path, this);
					}
				}
			},
			actions: function(){
				return this.type().actions();
			},
			action: function(path){
				return this.type().action(path, this);
			},
			isRoot: function(){
				return (!_.is(this.path()));
			},
			root: function(){
				return _.is(this.H.root_object) ? this.H.root_object : this; 
			},
			value: function(){
				return this.isRoot() ? this.H.value : this.root().val(this.path());
			},
			nav: function(){
				return H.nav(this.value());
			},
			val: function(field_path, value){
				var val = this.value();
				if(_.is(field_path)){
					if(_.hasFields(val)){
						var nav = H.nav(val);
						if(_.is(value))
							nav.set(field_path, value);
						return nav.get(field_path);
					}
					else
						return null;
				}
				else
					return val;
			},
			get: function(field_path){
				var val = this.val(field_path);
				return _.is(val) ? H.obj(field_path, this) : null;
			},
			save: function(){
				var path = this.dataPath();
				if(_.isString(path))
					H.data(path, this.value());
			}
		}),
		
		
		H_Field: _.getFn(function(path, h_object){
			this.H = {};
			this.H.path = path;
			this.H.object = h_object;
		},{
			path: function(){
				return _.is(this.H.path) ? this.H.path : (_.is(this.H.object, H.H_Object) ? this.H.object.path() : null);
			},
			dataPath: function(){
				return _.is(this.H.object, H.H_Object) ? this.H.object.dataPath() : null; 
			},
			struct: function(){
				var path = this.path();
				return _.is(path) ? H.struct(path) : {};
			},
			name: function(){
				var path = this.path();
				path = _.isNotEmptyString(path) ? H.getPathArray(path) : new Array();
				return (path.length>0) ? _.last(path) : "field";
			},
			type: function(){
				return  _.is(this.H.object, H.H_Object) ? this.H.object.type() : (_.isNotEmptyString(this.H.path) ? H.type(this.H.path) : null); 
			},
			prop: function(prop_path, default_value){
				var struct = this.struct();
				var ret = _.isObject(struct) ? H.getAndSet(prop_path, struct) : null; 
				return _.is(ret) ? ret : default_value;
			},
			def: function(){
				var ret = this.prop("def");
				if(!_.is(ret)){
					var type = this.type();
					return _.is(type) ? type.def() : null;
				}
				else
					return ret;
			},
			required: function(){
				return this.prop("required",false);
			},
			label: function(){
				return this.prop("label",this.name()); 
			},
			obj: function(){
				return this.H.object;
			},
			value: function(){
				return _.is(this.H.object, H.H_Object) ? this.H.object.value() : null;
			}
		}), 
		
		H_Action: _.getFn(function(path, h_object){
			this.H = {};
			this.H.path = path;
			this.H.object = h_object;
		},{
			path: function(){
				return this.H.path;
			},
			struct: function(){
				return H.struct(this.path);
			},
			name: function(){
				var path_arr = H.getPathArray(this.path());
				return _.last(path_arr);
			},
			args: function(){
				var args_path = H.path(this.path(),"args");
				var struct = H.struct(args_path);
				// TODO: il def e' object. Valutiamo void, anche se forse è meglio questo (più libero, come default...)
				return _.is(struct) ? H.type(args_path) : H.type("object"); 
			},
			ret: function(){
				var ret_path = H.path(this.path(),"ret");
				var struct = H.struct(ret_path);
				// TODO: il def e' value. Valutiamo void, anche se forse è meglio questo (più libero, come default...)
				return _.is(struct) ? H.type(ret_path) : H.type("value");
			},
			label: function(){
				
			},
			call: function(args, success_fn, error_fn){
				
			}
		}),
		
		isH_Function: function(obj, only_roots_or_fields){
			if(only_roots_or_fields===true)
				return (_.is(obj, this.H_Object) || _.is(obj, this.H_Type));
			else if(only_roots_or_fields===false)
				return (_.is(obj, this.H_Field) || _.is(obj, this.H_Action));
			else
				return (_.is(obj, this.H_Object) || _.is(obj, this.H_Type) || _.is(obj, this.H_Field) || _.is(obj, this.H_Action)); 
		},
		
/////////////////////////////////////////////////////////////////////////////////////////////////////////
		// Objects management
/////////////////////////////////////////////////////////////////////////////////////////////////////////		
		

		getPathArray: function(path_string_or_array, is_html_context){
			return _.isString(path_string_or_array) ? path_string_or_array.split(this.getPathSeparator(is_html_context)) : 
				(_.isArray(path_string_or_array) ? path_string_or_array : []);
		},
		
		getPathSeparator: function(is_html_context){
			return (!!is_html_context) ? "___" : "/";
		},
		
		nav: function(object, is_html_context){
			return _.nav(object,this.getPathSeparator(is_html_context));
		},
		
		path: function(paths_in_order, last_arg_is_html_context_if_boolean){
			var args = _.isArray(paths_in_order) ? paths_in_order : _.toArray(arguments);
			var html_context = _.isArray(paths_in_order) ? (!!last_arg_is_html_context_if_boolean) : false;
			if(_.isBoolean(_.last(args))){
				html_context = _.last(args);
				args = _.initial(args);
			}
			
			if(_.isArray(args)){
				if(args.length>0){
					var ret = args[0];
					var sep = this.getPathSeparator(html_context);
					for(var i=1;i<args.length;i++)
						ret = ret+sep+args[i];
					return ret;
				}
				else
					return args[0];
			}
		},
		
		pathAndCheck: function(paths_in_order, last_arg_is_html_context_if_boolean){
			var path = this.path.apply(this, _.toArray(arguments));
			return _.is(this.struct(path)) ? path : null;
		},

		
		assertParent: function(path, root_object){
			var arr = this.getPathArray(path);
			current = root_object;
			if(arr.length>0){
				for(var i=0;i<arr.length-1;i++)
					current = this.propAndGo(current, arr[i]);
			}
			return current;
		},
		
		getAndSet: function(path_or_multiple_data_object, root_object, object){
			if(_.isObject(path_or_multiple_data_object)){
				_.each(path_or_multiple_data_object, function(obj, path){
					this.getAndSet(path, root_object, obj);
				}, this);
			}
			else if(_.isString(path_or_multiple_data_object) || _.isArray(path_or_multiple_data_object)){
				if(_.is(object)){
					var arr = this.getPathArray(path_or_multiple_data_object);
					if(arr.length>0){
						var parent = this.assertParent(arr, root_object);
						parent[_.last(arr)] = object;
					}
					return object;
				}
				else{
					if(_.isArray(path_or_multiple_data_object))
						path_or_multiple_data_object = this.path(path_or_multiple_data_object);
					return this.nav(root_object).get(path_or_multiple_data_object);
				}
			}
			else
				return root_object;
		},
		
		data: function(path_or_multiple_data_object, object){
			return this.getAndSet(path_or_multiple_data_object, this.H_data, object);
		},
		
		getObjectType: function(data){
			if(_.isObject(data)){
				var data_type = (_.isObject(data.H) && _.is(data.H.type)) ? data.H.type : null;
				var runtime_type = (_.isObject(data._H) && _.isArray(data._H.types)) ? data._H.types[0] : null;
				return (_.is(runtime_type) ? runtime_type : ( _.is(data_type) ? data_type : null ));
			} 
		},
		
		defaultDataType: function(object){
			return _.isObject(object) ? "object" : (_.isArray(object) ? "array" : (_.is(object) ? "primitive" : "value"));
		},
		
		findTypePath: function(path, root_object){
			if(!_.isObject(root_object))
				root_object = this.H_data;
			
			if(_.isString(path) || _.isArray(path)){
				var arr = this.getPathArray(path);
				var data;
				var first_type = null;
				var pos = arr.length-1;
				while(pos>=0 && (!_.is(first_type))){
					data = this.getAndSet(arr.slice(0,pos+1), root_object);
					first_type = this.getObjectType(data);
					if(!_.is(first_type))
						pos--;
				}
				// get type eventually from root_object
				if(!_.is(first_type)){
					var root_type = this.getObjectType(root_object); 
					if(_.isString(root_type))
						first_type = root_type;
				}
				// form the type path of the object relatively to the first type found
				if(_.is(first_type)){
					var field_path = (pos<(arr.length-1)) ? this.path(_.rest(arr,pos+1)) : null;
					return (_.isString(field_path) && field_path.length>0) ? this.path(first_type,field_path) : first_type;
				}
				else
					return null;
			}
			else
				return this.getObjectType(root_object);
		},
		
		dataType: function(path, root_object_or_return_type_path, return_type_path){
			if(_.isBoolean(root_object_or_return_type_path))
				return_type_path = root_object_or_return_type_path;
			var type_path = this.findTypePath(path, root_object_or_return_type_path);
			// check that the the type path exists as a struct
			if(_.isString(type_path)){
				var type_obj = this.struct(type_path);
				if(!_.is(type_obj))
					type_path = null;
			}
			// set the type as the default one for the data object, if no type was found from its hierarchy.. 
			if((!_.isString(type_path)) && _.isObject(root_object_or_return_type_path)){
				data = this.getAndSet(path, root_object_or_return_type_path);
				type_path = _.is(data) ? this.defaultDataType(data) : null;
			}
			return (_.isString(type_path)) ? ((!!return_type_path) ? type_path : this.type(type_path)) : null;
		},
		
		obj: function(path_or_obj, root_object){
			if(_.is(path_or_obj, this.H_Object))
				return path_or_obj;
			else if(_.is(path_or_obj, this.H_Field) || _.is(path_or_obj, this.H_Type))
				return path_or_obj.obj();
			else if(_.is(path_or_obj, this.H_Action)) 
				return path_or_obj.args();
			else if(_.is(path_or_obj)){
				var type = null;
				var path = null;
				var data = path_or_obj;
				
				if(_.isString(path_or_obj)){
					if(_.is(root_object, this.H_Object)){
						data = root_object;
						path = path_or_obj;
						type = this.dataType(path_or_obj, root_object, true);
					}
					else{
						var data_obj = this.data(path_or_obj);
						if(_.is(data_obj)){
							type = this.dataType(path_or_obj, true);
							data = data_obj;
						}
					}
				}
				/* TODO: commentata, per ora: dava la possibilità di caricare un oggetto con un tipo differente...
				else if(_.isObject(path_or_obj) && (_.isObject(path_or_obj.H) || _.isObject(path_or_obj._H))){
					var tp = (_.isObject(path_or_obj.H) && _.is(path_or_obj.H.type)) ? path_or_obj.H.type : null;
					var tps = (_.isObject(path_or_obj._H) && _.isArray(path_or_obj._H.types) && path_or_obj._H.types.length>0) ? path_or_obj._H.types : null;  
					if(_.is(tp) || _.is(tps))
						type = _.is(tps) ? tps[0] : tp;
						
					if(_.is(path_or_obj.H.value))
						data = path_or_obj.H.value;
					else if(_.isString(path_or_obj.H.path) && _.keys(path_or_obj).length==1){
						// if there is a path and there are NO OTHER FIELDS in the object than the H meta-field, load the object from data (as a link),
						// else let the passed object to be the data for the returned H_Object
						data = this.data(path_or_obj.H.path);
						if((!_.isString(type)) && _.is(data)){
							// get the type from the data, if type is not already defined (so, it can be overriden) 
							type = this.dataType(path_or_obj, true);
						}
					}
				}
				*/
				
				if(!_.isNotEmptyString(type))
					type = this.defaultDataType( _.isString(path) ? data.val(path) : data ); 
				
				return this["new"](type, data, path);
			}
			
			return this["new"]("object",{});
		},
		
		field: function(field_path, h_object){
			return new H.H_Field(field_path, h_object);
		},
		
		action: function(action_path, h_object){
			return new H.H_Action(action_path, h_object);
		},
		
		
		
		
/////////////////////////////////////////////////////////////////////////////////////////////////////////
		// Loading notify functions
/////////////////////////////////////////////////////////////////////////////////////////////////////////		
		
		
		
		load_callbacks : new Array(),
		onLoad: function(callback){
			this.load_callbacks.push(callback);
		},
		notifyOnLoad: function(){
			var fn = null;
			var callbacks = this.load_callbacks; 
			for(var i=0; i<callbacks.length; i++){
				fn = callbacks[i];
				try{
					if(_.isFunction(fn))
						fn.call();
					else if(_.isNotEmptyString(fn))
						eval(fn);
				}catch(err){
					this.printError("Error while calling load callback:\n"+fn,err);
				}
			}
		},
		
		
		
		
		
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		// Utility functions (still not ready to _plus...)       
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		
		
		parseAndTrim: function(str){
			var elems = (_.isString(str) && str.indexOf(",")>0) ? str.split(",") : str;
			if(_.isArray(elems)){
				for(var i=0;i<elems.length;i++){
					elems[i] = _.trim(elems[i]);
				}
			}
			return _.isArray(elems) ? elems : (_.is(elems) ? [elems] : new Array());
		}
		

		
/////////////////////////////////////////////////////////////////////////////////////////////////////////
		// Types and objects functions
/////////////////////////////////////////////////////////////////////////////////////////////////////////		



		/*
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
				var value = _.is(obj) ? obj : this.defaultNew();
				var H_info = {
						
				};
				var ret = new this.H.object(value, this, path, root_path);
				return ret;
			},
			
			defaultNew: function(){
				return {};
			}
		}),
		
		H_Object: _.getFn(function(path_or_value, type, field){
			// constructor
			this.H = {
				value: this.construct(path_or_value),
				type: type,
				field: field
				//path: ( _.isString(root_path) ? H.childPath(root_path, path) : "" ),
				//root_path: ( _.isString(root_path) ? root_path : path )
			};
		},{
			// prototype
			
			// HTML+ functions
			type: function(){
				return this.H.type;
			},
			
			path: function(){
				return this.H.path;
			},
			
			field: function(){
				return this.H.field;
			},
			
			fieldPath: function(){
				return H.fieldPath(this.H.path, this.H.root_path);
			},
			
			fieldName: function(){
				return H.fieldName(this.H.path);
			},
			
			rootPath: function(){
				return this.H.root_path;
			},
			
			rootObject: function(){
				return H.get(this.rootPath());
			},
			
			isRoot: function(){
				return (!_.isEmptyString(this.H.path));
			},
			
			
			// Utility functions
			label: function(){
				return this.type().name();
			},
			
			name: function(){
				return H.firstNotNullField("name","label","title","id");
			},
			
			// Object importing/exporting from/to raw json objects
			construct: function(obj){
				return obj;
			},
			
			value: function(){
				return this.H.value;
			}
			
		}),
		*/
		
		
		/*
		
		QUESTI DOBBIAMO CREARLI NELLA FUNZIONE INIT, ALL'INIZIO DI INIT TYPES: NON VEDONO ANCORA THIS!
		H_PrimitiveType: _.extendFn(this.H_Type,{
			
		}),
		
		H_Primitive: _.extendFn(this.H_Object,{
			
		}),
		
		
		H_ComplexType: _.extendFn(this.H_Type,{
			
		}),
		
		H_Complex: _.extendFn(this.H_Object,{
			
		}),
		*/
		
		/*
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
		
		
		define: function(type_id, super_type, type_object){
			// definisce un tipo, sempre partendo da un supertype (al minimo, primitive, object o array)
		},
		
		override: function(type_id, overrides_object){
			// estende un tipo con funzioni aggiuntive
		},
		
		type: function(name_or_object, type){
			if(_.isNotEmptyString(name_or_object)){
				if(_.isObject(type))
					this.types[name_or_object] = this.createType(type);
				return this.types[name_or_object];
			}
			else if(_.isObject(name_or_object)){
				//var type = this.hInfo(name_or_object,"type");
				//if(_.isNotEmptyString(type))
				//	return this.types[type];
				//else
					return this.types["object"];
			}
			return null;
		},
		*/
				
		
		
/////////////////////////////////////////////////////////////////////////////////////////////////////////
		// Objects management
/////////////////////////////////////////////////////////////////////////////////////////////////////////		
		
		/*
		
		isNot: function(obj, null_is_undefined){
			null_is_undefined = this.conf("null_is_undefined", null_is_undefined);
			return null_is_undefined ? _.isNot(obj) : _.isUndefined(obj); 
		},
		
		dataRoot: function(){
			return this.nav().root();
		},
		
		scopeArg: function(scope){
			if(!_.isNotEmptyString(scope))
				return "data";
			return (scope=="data" || scope=="local" || scope=="backup") ? scope : null;
		},
		
		// scope: data, backup, local (living non possono essere esportati)
		exportData: function(scope){
			scope = this.scopeArg(scope);
			if(!!scope){
				var cleaned = _.clean(this[scope].root());
				return JSON.stringify(cleaned);
			}
			else
				return {};
		},
		
		
		importData: function(objects, scope){
			scope = this.scopeArg(scope);
			if(!!scope){
				var objects = this.parseAndClean(objects);
				this[scope] = _.nav(objects, this.sep());
			}
			else
				return {};
		},
		
		clearData: function(scope){
			scope = this.scopeArg(scope);
			if(!!scope)
				this[scope] = _.nav({}, this.sep());
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
		
		
		createObject: function(id, obj){
			if(!this.isNot(obj))
				this.data[id] = obj;
			else if(!this.data[id])
				this.data[id] = {};
			if(this.conf("restorable_objects"))
				this.backupObject(id);
		},
		
		backupObject: function(id){
			var obj = this.data[id];
			if(_.isObject(obj)){
				var copy = _.deepClone( _.is(obj, this.H_Object) ? obj.value() : obj );
				this.backup[id] = copy;
			}
		},
		
		restoreObject: function(id){
			var copy = this.backup[id];
			if(_.isObject(copy)){
				var obj = this.data[id];
				var type = (_.is(obj, this.H_Object)) ? obj.type() : undefined;
				var restored = ( _.is(type) ? type.create(copy) : copy );
				this.data[id] = restored;
			}
		},
		
		
/////////////////////////////////////////////////////////////////////////////////////////////////////////
		// Objects addressing
/////////////////////////////////////////////////////////////////////////////////////////////////////////		
		
		// Gets an H data info, reading it from an object (H field) or an element (H data)
		hInfo: function(obj, field){
			if(_.is(obj) && _.isString(field)){
				var info = obj[this.dataAttr("H")];
				if(_.isObject(info))
					return this.nav().get(field, info);
				else try{
					return _.dataAttr(field, obj);
				}catch(err){
					return null;
				}
			}
			else
				return null;
		},
		
		
		getPath: function(id_or_object, field_path){
			var ret = _.isString(id_or_object) ? id_or_object : this.hInfo(id_or_object,"path");
			return _.isString(field_path) ? this.childPath(ret, field_path) : ret;
		},
		
		objPath: function(id_or_dom_or_object){
			
		},
		
		fieldPath: function(field_or_dom_or_object){
			
		},
		
		dataKey: function(id_or_dom_or_object){
			
		},
		
		dataField: function(id_or_dom_or_object){
			
		},
		
		// exporting of the internal ObjectNavigator functions
		childPath: function(path, name){
			return this.nav().childPath(path, name); 
		},
		parentPath: function(path, field_path){
			return this.nav().parentPath(path, field_path);
		},
		fieldName: function(path){
			return this.nav().fieldName(path);
		},
		fieldPath: function(path, root_path){
			return this.nav().fieldPath(path, root_path);
		},
		
		
		// commodity function for internal use
		argFieldPath: function(id_or_obj, sub_prop){
			var parent_path = this.path(id_or_obj);
			return _.isString(parent_path) ? ( (_.isString(sub_prop) && sub_prop.length>0) ? this.childPath(parent_path,sub_prop) : parent_path ) 
					: (_.isString(sub_prop) ? sub_prop : null);
		},
		
		get: function(path, sub_path_or_root_object){
			var root_object = _.isObject(sub_path_or_root_object) ? sub_path_or_root_object : undefined;
			var path = this.argFieldPath(path_or_obj, sub_path_or_root_object);
			var struct = this.nav().get(path, root_object);
			
		},
		
		set: function(path, obj){
			
		},
		
		remove: function(path_or_obj){
			
		},
		
		/*										VECCHIA OTTICA TIPO jsOn...
		
		// commodity function for internal use
		argRootObj: function(root_object_param){
			return _.isObject(root_object_param) ? root_object_param : this.dataRoot();
		},
		
		get: function(id_or_obj, sub_prop, root_object){
			var root_object = this.argRootObj(id_or_obj, root_object);
			var path = this.argFieldPath(id_or_obj, sub_prop);
			return this.nav().get(path, root_object);
		},
	
		set: function(id_or_obj, name, value){
			var root_object = this.argRootObj(id_or_obj);
			var path = this.argFieldPath(id_or_obj, name);
			this.nav().set(path, value, root_object);
		},
		
		add: function(id_or_obj, name, value){
			var root_object = this.argRootObj(id_or_obj);
			var path = this.argFieldPath(id_or_obj, name);
			this.nav().add(path, value, root_object);
		},
		
		remove: function(id_or_obj, name, value, weak_equals){
			var root_object = this.argRootObj(id_or_obj);
			var path = this.argFieldPath(id_or_obj, name);
			this.nav().remove(path, value, weak_equals, root_object);
		},
		*/
		
		
		
		
/////////////////////////////////////////////////////////////////////////////////////////////////////////
		// Data and HTML Objects accessing functions
/////////////////////////////////////////////////////////////////////////////////////////////////////////		
		
		
		
		
		/*
		,
		
		obj: function(){
			
		},
		
		field: function(){
			
		},
		
		value: function(){
			
		},
		
		type: function(){
			
		},
		
		conf: function(){
			
		},
		
		$: function(){
			
		}
		*/
	    
	};
		