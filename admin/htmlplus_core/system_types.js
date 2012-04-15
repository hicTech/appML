
(function(){
	
	var structs = {
		
		"value": {},
		
		"primitive": {
			extends: "value"
		},
		
		"complex": {
			extends: "value"
		},
		
		"void": {
			extends: "value"
		},
		
		"object": {
			extends: "complex",
			static:{
				"meta" : "boolean",
				functions:{
					meta: function(){
						return this.val("meta");
					}
				}
			},
			functions: {
				/*
				init: function(args){
					// gestiamo inizializzazione a seconda di come gestiamo i meta...
				},
				meta: function(){
					// ritorna i meta dell'oggetto...
				}
				*/ 
			}
		},
		
		"array": {
			extends: "complex",
			static: {
				fields:{
					type: "value",
					min_length: "number",
					max_length: "number"
				},
				functions: {
					type: function(){
						var type = this.val("type");
						if(_.isObject(type)){
							var type_path = H.path(this.path(), "type");
							H.defineType(type_path, null, null, type);
							return H.type(type_path);
						}
						else if(_.isString(type))
							return H.type(type);
						else
							return H.type("value");
						/*
						if(this.H.array_type==null){
							var type_path = H.path(this.path(),"type"); 
							this.H.array_type = H.createType(type_path, this.val("type"));
						}
						
						return this.H.array_type;
						*/
					},
					random: function(min_length, max_length, type_or_vals_or_fn){
						var ret = new Array();
						var min = _.tryParse(min_length,null,true);
						var max = (_.isArray(type_or_vals_or_fn) && (!_.is(max_length))) ? type_or_vals_or_fn.length : _.tryParse(max_length,null,true);
						
						min = this.getOrDef("min_length",0,min);
						max = this.getOrDef("max_length",10,max);
						type_or_vals_or_fn = _.is(type_or_vals_or_fn) ? type_or_vals_or_fn : this.type();
						
						var num = H.type("number").random("int",min,max);
						var elem;
						for(var i=0;i<num;i++){
							elem = _.is(type_or_vals_or_fn, H.H_Type) ? type_or_vals_or_fn.random() :
									(_.isString(type_or_vals_or_fn) ? H.type(type_or_vals_or_fn).random() : 
									(_.isArray(type_or_vals_or_fn) ? _.random(type_or_vals_or_fn) : 
									(_.isFunction(type_or_vals_or_fn) ? type_or_vals_or_fn.call() : 
									(_.is(type_or_vals_or_fn) ? type_or_vals_or_fn : {} ))));
							ret.push(elem);
						}
						return ret;
					}
				}
			}
		},
		
		
		
		"boolean": {
			static:{
				functions:{
					random: function(){
						return _.boolRandom();
					}
				}
			}
		},
		
		"number": {
			static:{
				fields:{
					type: "enum({ values: ['number','int','percent','int-percent'] })",
					min: "number",
					max: "number",
					decimals: "number",
					measure: "string",
					exp: "number",
					base: "number"
				},
				functions:{
					random: function(number_type, min, max, decimals){
						number_type = this.getOrDef("type","number",number_type);
						var is_int = (number_type=="int" || number_type=="int-percent") ? true : undefined;
						min = _.tryParse(min, _.maxInteger(true), is_int);
						max = _.tryParse(max, _.maxInteger(), is_int);
						min = this.getOrDef("min",null,min);
						max = this.getOrDef("max",null,max);
						if(number_type=="percent" || number_type=="int-percent"){
							if(min<-100)
								min = -100;
							if(max>100)
								max = 100;
						}
						if(min>max)
							min=max;
						decimals = this.getOrDef("decimals",2,decimals);
						
						var ret = _.random(max,min,is_int);
						return (!!is_int) ? ret : _.round(ret, decimals);
					},
					asString: function(number, measure, exp, base){
						var ret = ""+number;
						exp = _.tryParse(exp, null, true);
						exp = this.getOrDef("exp",null,exp);
						if(_.isNumber(exp)){
							base = (base=="e") ? base : _.tryParse(base, 10, true);
							base = this.getOrDef("base",null,base);
							ret += " X"+base+"^"+exp;
						}
						measure = this.getOrDef("measure",null,measure);
						if(_.isString(measure))
							ret+= " "+measure;
						return ret;
					},
					randomString: function(number_type, min, max, measure, exp, base){
						number_type = this.getOrDef("type","number",number_type);
						measure = this.getOrDef("measure",null,measure);
						
						if(number_type=="percent" || number_type=="int-percent")
							measure = "%" + (_.isString(measure) ? " "+measure : "");
						var num = this.random(number_type, min, max);
						
						exp = this.getOrDef("exp",null,exp);
						if(_.isObject(exp) || exp===true){
							var min_e = _.isObject(exp) ? _.tryParse(exp.min, -10, true) : -10;
							var max_e = _.isObject(exp) ? _.tryParse(exp.max, 10, true) : 10;
							exp = _.random(max_e,min_e,true);
						}
						
						return this.asString(num, measure, exp, base);
					}
				}
			}
		},
		
		"char": {
			static:{
				functions:{
					random: function(vocal, english_or_accents){
						var chars = (!!vocal) ? ["a","e","i","o","u"] : ["b","c","d","f","g","h","l","m","n","p","q","r","s","t","v","z"];
						if(!!english_or_accents){
							if(!!vocal)
								chars.push("à","è","é","ì","ò","ù");
							else
								chars.push("j","k","w","x","y");
						}
						return _.random(chars);
					}
				}
			}
		},
		
		"string": {
			static:{
				fields:{
					min_length: "number",
					max_length: "number"
				},
				functions:{
					random: function(max_length, min_length){
						min_length = _.tryParse(min_length,null,true)
						max_length = _.tryParse(max_length,null,true);
						min_length = this.getOrDef("min_length", 5, min_length);
						max_length = this.getOrDef("max_length", 20, max_length);
						
						var len = _.random(max_length,min_length,true);
						var ret = ""; var vocal = false; var num = 0;
						vocal = _.boolRandom();
						while(ret.length<len){
							num = _.random(vocal ? 2 : 3,1);
							for(var i=0; i<num && ret.length<len; i++){
								ret+=H.type("char").random(vocal/*,(vocal ? ret.length==len-1 : true)*/);
							}
							vocal = !vocal;
						}
						return ret;
						/*
						TODO: facciamolo più evoluto, con la generazione di sillabe invece che chars... :-)
						addSyllable: function(word, max_word_len, only_latin){
							
						}
						*/
					}
				}
			}
			
		},
		
		"text": {
			static:{
				functions:{
					random: function(max_times){
						var lorem_ipsum = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et " +
								"dolore magna aliqua. " +
								"Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. " +
								"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. " +
								"Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. ";
						var times = H.type("number").random("int",0,(_.isNumber(max_times) ? max_times : 10));
						var ret = "";
						for(var i=0;i<times;i++)
							ret+="Lorem Ipsum "+i+": <br/> "+lorem_ipsum+" <br/> ";
						return ret;
					}	
				}
			}
		},
			
		"date": {
			static:{
				fields:{
					min: "string",
					max: "string"
				},
				functions:{
					randomTimestamp: function(min_or_range, max_or_range, auto){
						if(!!auto)
							return _.isString(auto) ? _.date(auto) : new Date();
						var min; var max;
						var now = new Date();
						min_or_range = this.getOrDef("min","01/01/1900",min_or_range);
						max_or_range = this.getOrDef("max","now",max_or_range);
						
						var min_range = (_.isString(min_or_range) && ( (min_or_range.indexOf("y")>0 || min_or_range.indexOf("m")>0 || 
								min_or_range.indexOf("d")>0 || min_or_range.indexOf("-")>0)) ) ? min_or_range : null;
						var max_range = (_.isString(max_or_range) && ( (max_or_range.indexOf("y")>0 || max_or_range.indexOf("m")>0 || 
								max_or_range.indexOf("d")>0 || max_or_range.indexOf("-")>0)) ) ? max_or_range : null;
						if(_.is(min_range) && _.is(max_range)){
							min = _.nextDate(now,min_range,null,true);
							max = _.nextDate(now,max_range); 
						}
						else if(_.is(min_range) || _.is(max_range)){
							if(_.is(min_range)){
								max = _.is(max_or_range) ? _.date(max_or_range) : now; 
								min = _.nextDate(max,min_range,null,true);
							}
							else{
								min = _.is(min_or_range) ? _.date(min_or_range) : now;  
								max = _.nextDate(min,max_range);
							}
						}
						else{	
							min = _.is(min_or_range) ? _.date(min_or_range) : _.maxDate(true);
							max = _.is(max_or_range) ? _.date(max_or_range) : _.maxDate();
						}
						
						return _.random(max.getTime(),min.getTime(),true);
					},
					random:function(min_or_range, max_or_range, auto){
						var rand = this.randomTimestamp(min_or_range, max_or_range, auto);
						return new Date(rand);
					},
					randomString: function(min_or_range, max_or_range, hours, usa_format, auto){
						var date = this.random(min_or_range, max_or_range, auto);
						return _.dateStr(date, hours, usa_format);
					}
				}
			}
		},
			
		"enum": {
			static:{
				fields:{
					values: "array({ type: 'string' })"
				},
				functions:{
					random: function(){
						return _.random(this.val("values"));
					}
				}
			}
		},
				
		"link": {
			static:{
				fields:{
					type: "string"
				},
				functions:{
					tables:{},
					repo_random: {},
					random: function(linked_type){
						var table = _.isString(this.tables[linked_type]) ? this.tables[linked_type] : linked_type; 
						var key = tipi.string.random(5,8);
						var repo_obj = this.repo_random[linked_type];
						if(_.isString(repo_obj)){
							var repo_table = jsOn.get("repo_random-"+repo_obj);
							var keys = _.keys(repo_table);
							if(!_.isEmpty(keys))
								key = _.random(keys);
							else
								throw "RepoRandom table "+repo_obj+" is empty: unable to link it!";
						}
						return this.getLink(table,key,true);
					},
					getLink: function(table,key,already_db_table){
						return "/"+((!!already_db_table) ? table : this.tables[table])+"/"+key;
					},
					repoRandomTable: function(table){
						if(_.isString(table) && (!_.isEmpty(this.tables)) && (!_.isEmpty(this.repo_random))){
							var table_key = this.getLinkInfoKey(table);
							if(_.isString(table_key))
								return this.repo_random[table_key];
						}
					},
					getLinkInfoKey: function(searching_key, from_repo_name){
						var link_key = null;
						var from = (!!from_repo_name) ? this.repo_random : this.tables;
						_.each(from, function(val, key){
							if(val==searching_key)
								link_key=key;
						});
						return link_key;
					},
					resolve: function(link){
						var arr = _.isString(link) ? link.split('/') : new Array();
						// we are considering that links could be relative (without the initial slash)...
						if(arr.length>1){
							var table = (arr.length>2 && arr[0].length>0) ? arr[0] : arr[1]; 
							var key = (arr.length>2 && arr[0].length>0) ? arr[1] : arr[2];
							var repo_table = this.repoRandomTable(table);
							if(_.isString(repo_table))
								return jsOn.get("repo_random-"+repo_table,key);
						}
					}
				}
			}
		},
		
		"provarr_elems": {
			is: "enum",
			values: ["Gianni", "Ippolito", "Michelino", "Guascogno", "Filippo", "Umbertone"]
		},
		
		"provarr": {
			extends: "array",
			args:{
				type: "provarr_elems"
			}
		}
		
	};
	
	
	H.importStructs(structs);
	
})();