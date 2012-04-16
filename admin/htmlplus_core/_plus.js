
// TODO: delete this in all files! 
if(!_){	var _ ={}; }    // development line

//TODO: okkio a _.keys: NON DOVREBBE FUNZIONARE SU IE 6-8!! Includiamo da: 
// http://whattheheadsaid.com/2010/10/a-safer-object-keys-compatibility-implementation o:
// http://stackoverflow.com/questions/208016/how-to-list-the-properties-of-a-javascript-object  (è lo stesso...)


/** _+ (_plus) extends _.js, with more utility functions  */


////////////////////////////////////////////////////////////////////////////////////////////
		/* General utility extensions */

/** Add several utility functions directly */
_.mixin({

	/**
	 * Checks if an object is instance of all passed functions (or at least one, if the last argument is true).
	 * If no functions are passed, only checks that the object is not null or undefined. You can also pass a function directly
	 * as the second argument (instead of an array of functions)
	 */
	is: function(obj, fn, one_at_least){
		if(_.isNull(obj) || _.isUndefined(obj))
			return false;
		if(_.isFunction(fn) || _.isArray(fn)){
			var check_fn = function(f){ 
				return (obj instanceof f); 
			};
			if(_.isArray(fn))
				return _.check(fn, check_fn, one_at_least);
			else
				return check_fn(fn);
		}
		return true;
	},
	
	isNot: function(obj, null_is_undefined){
		return (!null_is_undefined) ? (_.isUndefined(obj)) : (!_.is(obj)); 
	},
	
	/**
	 * Checks if this object is null, undefined, an empty string or an empty array.
	 * If deep is true and object is an (also multidimensional) array, all its elements will be checked. 
	 */
	isNullOrEmpty: function(obj, deep){
		return ( (!_.is(obj)) || _.isEmpty(obj) ); 
	},
	
	/**
	 * Returns true if obj is not null and not empty. 
	 * If deep is true and object is an (also multidimensional) array, all its elements will be checked.
	 * TODO: add the deep check also for objects
	 */
	isNotEmpty: function(obj, deep){
		if((!!deep) && _.isArray(obj))
			return (!_.check(obj, function(o){ return _.isNullOrEmpty(o, true); }));
		return (!_.isNullOrEmpty(obj,deep)) ;
	},
	
	isNotEmptyString: function(obj){
		return (_.isString(obj) && obj.length>0);
	},
	
	/**
	 * Checks if all elements of an array (or one at least, if the last argument is true) pass a check function 
	 */
	check: function(arr, check_fn, one_at_least){
		return (!!one_at_least) ? _.any(arr, check_fn) : _.all(arr, check_fn); 
	},
	
	/**
	 * Adds a value, if not null, to an object. If the object is an array or a string the value is appended, if it's an object the value will 
	 * be set as a field named as specified with the name_or_prepend parameter, or with a unique id if a name_or_prepend is not specified. 
	 * If obj is null, a new array containing the value will be returned, so that you can chain multiple add calls to fill an (also initially null) array. 
	 * If obj is an object that already contains the named field, its value will be overwrited.
	 * If either obj and value are arrays, their value will be concatenated in the result array and the name_or_prepend parameter will be used
	 * to specify where to insert value elements: if it's true the elements will be inserted at the beginning of obj, else they will be pushed.
	 * If either obj and value are null, a new empty array will be returned.
	 */
	add : function(obj, value, name_or_prepend){
		if(!_.is(obj))
			obj = new Array();
		if(_.is(value)){
			if(_.isArray(obj)){
				if(_.isArray(value)){
					if(!!name_or_prepend){
						value.concat(obj);
						obj=value;
					}
					else
						obj.concat(value);
				}
				else
					obj.push(value);
			}
			else if(_.isString(obj))
				obj = obj + value;
			else{
				var name = _.is(name_or_prepend) ? name_or_prepend : _.id(); 
				obj[name] = value;
			}
		}
		return obj;
	},
	
	/** 
	 * Insert obj (or its elements, if it's an array) at the beginning of the arr array.
	 */
	addAsFirst : function(arr, obj){
		return _.add(arr, obj, true);
	},
	
	/**
	 * Add an object to an array (using _.add) if it's not already present. If weak_unique is true, the unicity test will be weak 
	 * (using the == operator instead of the === one). If prepend is true, obj will be inserted at the beginning of arr.
	 */ 
	addUnique : function(arr, obj, weak_unique, prepend){
		var has_to_add = ( _.is(obj) && _.isArray(arr) ) ? ( (!!weak_unique) ? (!_.weakInclude(arr, obj)) : (!_.include(arr, obj)) ) : true; 
		return has_to_add ? _.add(arr,obj,prepend) : arr;
	},
	
	/**
	 * Returns true if obj is an object
	 */
	isObject : function(obj){
		return (!!obj) && (typeof obj=="object") && (!_.isArray(obj));
	},
	/**
	 * Returns true if obj is a text node
	 */
	isTextNode : function(obj){
		return (!!obj) && (obj.nodeType == 3 || obj.nodeType == 4);
	},
	/**
	 * Returns true if obj is an HTML fragment
	 */
	isFragment : function(obj){
		return (!!obj) && obj.nodeType == 11;
	},
	/**
	 * Returns true if obj is a significative DOM object (Element, Fragment or Text nodes)
	 */
	isDOM : function(obj){
		return (!!obj) && (obj.nodeType == 1 || obj.nodeType == 3 || obj.nodeType == 4 || obj.nodeType == 11);
	},
	
	/**
	 * Assigns an object to another object, a function, or a default value
	 * TODO: still uses eval to parse the object...
	 */ 
	assign : function(obj_name, obj_value, default_value){
		eval("if(_.isFunction("+obj_value+")) { "+obj_name+"=new "+obj_value+"; } " +
				"else if("+obj_value+" != null){ "+obj_name+"="+obj_value+"; } " +
				"else "+obj_name+"="+default_value);
	},
	
	/**
	 * If elem is an array, returns the first element that passes the test_fn test; if elem is an object, directly test it.
	 * Returns null if no objects are found.
	 */
	findOrGet : function(elem, test_fn){
		return _.isArray(elem) ? _.find(elem, test_fn) : ( test_fn(elem) ? elem : null );
	},
	
	/**
	 * Parses a string to an object
	 * TODO: still uses eval to parse the object...
	 */
	parse : function(value, dont_parse_functions){
		var ret = value;
		if(_.isString(value)){
			value = _.trimBounds(value);
			if( _.startsWith(value,"{") || _.startsWith(value,"[") || ((!dont_parse_functions) && _.startsWith(value,"function(")) )  
				eval("ret = "+value);
		}
		return ret;
	},
	
	// TODO: manage log levels and properties (area, type, key) for a full-json log policy, enabling powerful logs displaying...
	log : function(msg_or_obj, level, area, type, key){
		var msg = _.toString(msg_or_obj);
		console.log(msg);
	},
	
	/**
	 * Returns a random number between a max (def:1) and a min (def:0), eventually as an integer, or a random item or field if
	 * the first argument is an array or an object.
	 */
	random : function(max_or_array_or_object, min_or_int_value, int_value){
		var size = _.hasFields(max_or_array_or_object) ? (_.fieldsLength(max_or_array_or_object)-1) : -1;
		var ret_it = (size>=0 || min_or_int_value===true || int_value===true);
		var max = (size>=0) ? size : ( _.isNumber(max_or_array_or_object) ? ( (!!int_value) ? max_or_array_or_object : max_or_array_or_object) : 1 );
		var min = (size>=0) ? 0 : ( _.isNumber(min_or_int_value) ? min_or_int_value : (max/2) );
		// the +1 is needed to avoid that first and last numbers have an half probability than others (ex, between 0 and 2: 0-0.5, 0.5-1.5, 1.5-2)
		var max_rand = (max-min+(ret_it ? 1 : 0)); 
		var rand = Math.random() * max_rand;
		if(ret_it){
			if(rand==max_rand) // it's just the max number, that is the real max + 1 (see before...)
				rand--;
			else
				rand = Math.floor(rand);
		}
		rand += min;
		return (size>=0) ? _.field(max_or_array_or_object,(_.isArray(max_or_array_or_object) ? rand : _.keys(max_or_array_or_object)[rand])) : rand;
	},
	
	boolRandom: function(probability, probability_value){
		var num = _.random(_.isNumber(probability) ? probability : 1, 0, true);
		if(!_.isBoolean(probability_value))
			probability_value = true;
		return (!!probability_value) ? (num>0) : (num==0);
	},
	
	// try to parse a boolean (third arg = false), int (third arg = true) or number (third arg not specified), returning a default value 
	// or undefined if the operation fails
	tryParse: function(obj, def, is_int_or_is_boolean){
		var is_int = is_int_or_is_boolean===true;
		var is_bool = is_int_or_is_boolean===false;
		var ret;
		try{
			if(_.isString(obj))
				ret = is_bool ? (obj==="true" ? true : (obj==="false" ? false : undefined)) : (is_int ? parseInt(obj) : parseFloat(obj));
			else
				ret = (is_bool && _.isBoolean(obj)) ? obj : (_.isNumber(obj) ? (is_int ? Math.floor(obj) : obj) : undefined);
		}catch(err){}
		return (_.is(ret) && !_.isNaN(ret)) ? ret : def;
	},
	
	// NOTE that the maximum Javascript approsimation is about 10 to the 16 (because of the same considerations of _.maxInteger()).
	// Above this limit (if the difference between two operands is major than that), the operations are approximated.  
	maxNumber: function(negative){
		return Number.MAX_VALUE * ((!!negative) ? -1 : 1);
	},
	minNumber: function(negative){
		return Number.MIN_VALUE * ((!!negative) ? -1 : 1);
	},
	// Js numbers are 64-bit based, with 53 bit for the mantissa: 2 to the 53 is 9007199254740992.
	// This value is the maximum value that supports correct integer operations! 
	maxInteger: function(negative){
		return 9007199254740992 * ((!!negative) ? -1 : 1);
	},
	// This is (about...) the maximum Date in Javascript (values greater than that originate 'Invalid Date').
	// So, the maximum valid date range is about [270.000 AC,270.000 DC]
	maxDate: function(ac){
		return new Date(270000 * ((!!ac) ? -1 : 1),0,0,0,0,0,1);
	},
	
	round: function(number, decimals){
		decimals = (decimals===true) ? 2 : _.tryParse(decimals, 0, true);
		var mult = 1;
		for(var i=0;i<decimals;i++)
			mult = mult*10;
		number = _.tryParse(number, 0) * mult;
		return (Math.round(number)/mult);
	},
	
	limit: function(number, min, max){
		number = _.tryParse(number, 0);
		min = _.tryParse(min);
		max = _.tryParse(max);
		if(_.isNumber(min) && number<min)
			number = min;
		else if(_.isNumber(max) && number>max)
			number = max;
		return number;
	},
	
	
	/**
	 * Attempts to return a JSON string with all the obj properties, returning a less meaningful rapresentation if it's a circular structure
	 * (and then cannot be printed in JSON).
	 * TODO: insert DOM printing in _.dom plus! :-D
	 */
	toString : function(obj, print_children_if_dom){
		/*if(_.isDOM(obj))
			return _.DOM.toString(obj, print_children_if_dom);
		else*/ 
		if(_.isString(obj))
			return obj;
		else if(_.is(obj)){
			try{
				return JSON.stringify(obj, null, '  ');
			}catch(err){
				return ""+obj+" ["+(typeof obj)+"]";
			}
		}
		else
			return ""+obj;
	},
	
	/**
	 * Returns the right or left part of a string within a starting or ending bound; matches can be a single string or an array of strings, 
	 * starting selects the starting or ending bound. 
	 */
	strWithinBound : function(str, matches, ending){
		var fn = function(match){ 
			return (!!ending) ? _.endsWith(str,match) : _.startsWith(str,match); 
		};
		var bound = _.findOrGet(matches, fn);
		if(!!bound)
			return (!!ending) ? _.strLeftBack(str,bound) : _.strRight(str,bound);
		else
			return str;
	},
	
	/** 
	 * Return the substring of str included within a set of starting and ending matches.
	 * If ending_match_or_bound is a boolean, it identifies the starting or ending bound; if it's a string it identifies the ending match,
	 * else both starting and ending matches are considered equal to the match parameter.
	 * If starting_match or ending_match are arrays, they will considered as a set of possible starting or ending matches.
	 * If one of the matches is not found, the substring is calculated from the beginning or ending of the string itself.
	 */
	strWithin : function(str, match, ending_match_or_bound){
		if(!!match){
			if(ending_match_or_bound===true || ending_match_or_bound===false)
				str = _.strWithinBound(str, match, ending_match_or_bound);
			else{
				str = _.strWithinBound(str, match);
				str = _.strWithinBound(str, ( _.isString(ending_match_or_bound) ? ending_match_or_bound : match ), true);
			}
		}
		return str;
	},
	
	/**
	 * Trims the bounds of the str object within the characters in chars string. The inner part of the string is not manipulated.
	 * The default trim character, used if chars is not provided, is the whitespace. 
	 */
	trimBounds : function(str, chars){
		return _(str).chain().ltrim(chars).rtrim(chars).value();
	},
	
	replaceInString: function(str, find, replace, ignore_case){
		return str.replace(new RegExp(find.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"),(ignore?"gi":"g")),(typeof(replace)=="string")?replace.replace(/\$/g,"$$$$"):replace);
	},
	
	/**
	 * If argument is a string it's splitted around the ',' character and returned as an 
	 * array of the trimmed values. If the argument is an array, it will be immediatly returned.
	 * If it's another object, this method will return null.
	 * If the str object is not a string, it will be returned directly without manipulations.
	 * TODO: delete this when a more precise parsing is done with _.parse... embed this in _.parse, or _.obj, or _.arr...
	 * TODO: NON funziona con array che contengono oggetti... ma serve?!? Facciamolo direttamente con il parsing...
	 * Ora anche la doc è diversa, abbiamo fatto con parse...
	 */
	strToArr : function(str){
		/*
		if(_.isString(str)){
			var arr = _(str).chain().strWithin("[","]").words(",").value();
			var ret = new Array();
			_.each(arr, function(elem){
				 if(_.isString(elem))
					 elem = _(elem).chain().trimBounds().strWithin(['"',"'"]).value();
				 ret.push(elem);
			});
			return ret;
		}
		else
			return str;
		*/
		return _.parse(str);
	},
	
	getStackTrace: function(err){
		var stack = (!!err.stack) ? err.stack.replace(/^[^\(]+?[\n$]/gm, '')
			.replace(/^\s+at\s+/gm, '')
			.replace(/^Object.<anonymous>\s*\(/gm, '{anonymous}()@')
			.split('\n') : [];
		return stack;
	},
	
	printStackTrace: function(err){
		var stack = _.getStackTrace(err);
		console.log(stack);
	},
	
	/**
	 * Limits _index within the length of _array. If _array is not an array returns -1, if _index is not a number (or it's not passed in) just
	 * returns the last valid pos of _array (length-1).
	 */
	limit : function(_array, _index){
		if(_.isNotEmpty(_array)){
			if(_.isNumber(_index)){
				if(_index<0)
					_index=0;
				else if(_index>_array.length-1)
					_index=_array.length-1;
				return _index;
			}
			else
				return _array.length-1;
		}
		else
			return -1;
	},
	
	/**
	 * Returns the _index-nth element of _array, or null if _array is not an array, or _index is out of its range. 
	 * If _index is not passed, it will be 0. 
	 */
	getInArr : function(_array, _index){
		if(!_.isArray(_array))
			return null;
		_index = _.tryParse(_index,0,true);
		if(_index>=0 && _index<=_array.length)
			return _array[_index];
		else
			return null;
	},
	
	setInArr : function(_array, _index, _value){
		if(!_.isArray(_array))
			return false;
		if(_index>=0 && _index<=_array.length){
			_array[_index] = _value;
			return true;
		}
		else
			return false;
	},
	
	/**
	 * Splits str and pushes the result in arr; is prepend is true, the values will be inserted at the beginning of the arr.
	 */
	splitInArr : function(str, arr, prepend){
		var new_arr=_.strToArr(str);
		_.add(arr,new_arr,prepend);
	},
	
	/**
	 * Returns an array from obj: if it's already an array it's immediatly returned, if it's a string or arguments it's converted in a new Array,
	 * if it's an object it's pushed in a new Array, if it's null an empty Array will be returned, or null if return_null_if_null is true.
	 */
	asArray : function(obj, return_null_if_null){
		return (obj!=null) ? ( _.isArray(obj) ? obj : ( _.isArguments(obj) ? _.argsToArr(obj) : 
					( _.isString(obj) ? _.strToArr(obj) : [obj] ) ) ) : ((!!return_null_if_null) ? null : new Array()) ;
	},
	
	/**
	 * Converts argument in a regular Array.
	 * TODO: verificare compatibilità di questo, trovato sulla guida di Mozilla:
	 * 		https://developer.mozilla.org/en/JavaScript/Reference/functions_and_function_scope/arguments
	 */
	argsToArr : function(args){
		return Array.prototype.slice.call(args);
	},
	
	/**
	 * Removes and returns the first element of arr, if it's a not empty array. Else, returns null.
	 */
	removeFirst : function(arr){
		if(_.isNotEmpty(arr) && _.isArray(arr))
			return arr.shift();
		else
			return null;
	},
	
	/**
	 * Returns the index of the first element in arr that is equal to obj, using the weak == operator.
	 * Returns -1 if no obj is found.
	 */
	weakIndexOf : function(arr, obj){
		if(_.isArray(arr))
			for(var i=0;i<arr.length;i++)
				if(arr[i]==obj)
					return i;
		return -1;
	},
	
	/**
	 * A weak version of _.include, uses == operator instead of ===
	 */
	weakInclude : function(arr, obj){
		return (_.weakIndexOf(arr, obj)>=0);
	},
	
	/**
	 * Returns a weak clone of obj, that is an object that only clone the direct fields of obj, without cloning their value.
	 * TODO: this is just a name at now, since it directly invokes _.clone(): add a deep clone method (more appropriate for the name...)
	 */
	weakClone : function(obj){
		return _.clone(obj);
	},
	
	/**
	 * A deep clone method. PLEASE NOTE that this method doesn't check if an object has a circular structure 
	 * (you can test it with a method like JSON.stringify, that will throw an exception if called on a circular object), so this method can
	 * loop undefinitevely if invoked on such objects. 
	 * The method automatically detects DOM nodes (that are always circular) and returns a DOM clone of them.
	 * TODO: gestione casi non gestiti (ad esempio se obj è arguments... controlliamo bene...)
	 */
	deepClone : function(obj){
		if(_.isString(obj))
			return (""+obj);
		else if(_.isNumber(obj) || _.isNaN(obj))
			return obj;
		else if(_.isNull(obj))
			return null;
		else if(_.isUndefined(obj))
			return undefined;
		else if(_.isDOM(obj))
			return obj.cloneNode(true);
		else if(_.isArray(obj)){
			var arr = new Array();
			for(var i=0;i<obj.length;i++)
				arr[i] = this.deepClone(obj[i]);
			return arr;
		}
		else if(_.isObject(obj)){
			var ret = {};
			var keys = _.keys(obj);
			for(var i=0;i<keys.length;i++)
				ret[keys[i]] = this.deepClone(obj[keys[i]]);
			return ret;
		}
		else
			return obj;
	},
	
	
	/**
	 * Extends an object with a given property key and value. If dont_replace is true, the overlapping fields will become an array field 
	 * containing both values (if one of the values is an array, it will be merged in the result). 
	 * If merge_objects is true and two objects are found for a given key, the objects will be recursively merged in a single object.  
	 * TODO: it's better to avoid the real recursion with a plane recursion...
	 * TODO: we should clean the objects from null values, if delete_if_null_value is true....
	 */
	extendProp : function(obj, key, value, dont_replace, merge_objects, parse_objects, delete_if_null_value){
		if(_.isObject(obj)){
			var new_value = parse_objects ? _.parse(value) : value;
			if(dont_replace && (new_value!=null) && (obj[key]!=null)){
				if(merge_objects && _.isObject(new_value) && _.isObject(obj[key]))
					_.extendObj(obj[key],new_value,true,true);
				else {
					var arr = _.asArray(obj[key]);
					_.add(new_value,arr);
					obj[key]=arr;
				}
			}
			else if(new_value!=null || delete_if_null_value)
				obj[key]=new_value;
		}
		return obj;
	},
	
	/**
	 * Extends an object with an extensions object. Invokes _.extendProp internally and then accepts the same optional parameters.
	 */
	extendObj : function(obj, extensions, dont_replace, merge_objects, parse_objects, delete_if_null_value){
		if(!_.isObject(obj))
			obj = {};
		if(_.isObject(obj) && _.isObject(extensions)){
			_.each(extensions, function(value,key){
				_.extendProp(obj,key,value,dont_replace,merge_objects,parse_objects,delete_if_null_value);
			});
		}
		return obj;
	},
	
	
	/** 
	 * Sets the new value and return the previous one. if dont_set_if_null is true, the setting is done only if a value is passed,
	 * otherwise the old value is returned and not modified.
	 */
	setAndGet : function(obj, name, value, dont_set_if_null){
		if(value==null && dont_set_if_null)
			return obj[name];
		else {
			var prev = obj[name];
			obj[name] = value;
			return prev;
		}
	},
	
	/**
	 * Returns a valid array index, trying to parse the name as an int: you can use the return to access an element of an array 
	 * or a field of an object
	 */
	fieldIndex : function(name){
		try{
			return parseInt(name);
		}catch(err){
			return name;
		}
	},
	
	hasFields: function(obj){
		return (_.isObject(obj) || _.isArray(obj));
	},
	
	fieldsLength: function(obj){
		if(_.isArray(obj))
			return obj.length;
		else if(_.isObject(obj))
			return _.keys(obj).length;
		else 
			return 0;
	},
	
	fields: function(obj){
		if(_.isObject(obj))
			return _.keys(obj);
		else if(_.isArray(obj)){
			var ret = new Array();
			for(var i=0; i<obj.length; i++){
				ret.push(i);
			}
			return ret;
		}
		else
			return new Array();
	},
	
	labels: function(obj){
		var fields = _.fields(obj);
		if(_.isArray(obj)){
			for(var i=0;i<fields.length;i++)
				fields[i] = ""+fields[i];
		}
		else
			return fields;
	},
	
	/**
	 * Get or set a property in an object or an item in an array 
	 */
	field : function(obj, name, value, null_is_undefined){
		var read = _.isNot(value, null_is_undefined);
		if(read){
			if(_.isArray(obj))
				return _.getInArr(obj,name);
			else if(_.isObject(obj))
				return obj[name];
			else
				return null;
		}
		else{
			if(_.isArray(obj)){
				if(_.isNullOrEmpty(name))
					obj.push(value);
				else
					_.setInArray(obj, name, value);
			}
			else if(_.isObject(obj))
				obj[name] = value;
		}
	},
	
	
	/**
	 * Returns a value if not null or undefined, else returns its default
	 */
	getValue : function(value, default_value, null_is_undefined){
		if(_.isNot(value, null_is_undefined) && (!_.isNot(default_value, null_is_undefined)))
			return default_value;
		else
			return value;
	},
	
	isSelected : function(obj, value_or_conditional_function, weak_equal){
		if(_.isFunction(value_or_conditional_function))
			return (!!value_or_conditional_function.call(null,obj));
		else if(_.isString(obj) && _.isString(value_or_conditional_function))
			return (!!weak_equal) ? (obj.toLowerCase()==value_or_conditional_function.toLowerCase()) : (obj==value_or_conditional_function);
		else
			return (!!weak_equal) ? (obj==value_or_conditional_function) : (obj===value_or_conditional_function);
	},
	
	/**
	 * Remove from an array or object all the values that are equal to a value or pass a conditional function, with the possibility
	 * to specify a weak (==) or strength (===) comparison and to apply the function recursively in the found objects
	 * This method also acts on strings if the first two arguments are strings, and the third parameter is interpreted to make
	 * the comparison ignoring case or not (in this case, weak obviously means ignoring case).
	 */
	remove: function(obj, value_or_conditional_function, weak_equals, deep){
		return _.removeFieldInternal(obj, value_or_conditional_function, weak_equals, deep, false);
	},
	
	/**
	 * Remove a field from an object or an array, with the same options in the _.remove function
	 */
	removeField: function(obj, field_name, weak_equals, deep){
		return _.removeFieldInternal(obj, field_name, weak_equals, deep, true);
	},
	
	// TODO: spostare da qualche parte in private...
	removeFieldInternal: function(obj, value_or_conditional_function, weak_equals, deep, field_name){
		if(_.hasFields(obj)){
			var fields = _.fields(obj);
			var result = _.isArray(obj) ? new Array() : {};
			var field = null; var value = null;
			
			for(var i=0;i<fields.length;i++){
				field = _.field(obj, fields[i]);
				if(!_.isSelected( ((!!field_name) ? fields[i] : field) , value_or_conditional_function, weak_equals)){
					value = (deep && _.hasFields(field)) ? 
							_.removeFieldInternal(field, value_or_conditional_function, weak_equals, deep, field_name) : field;
					_.field(result,fields[i],value);
				}
			}
			return result;	
		}
		else if(_.isString(obj) && _.isString(value_or_conditional_function)){
			return _.replaceInString(obj,value_or_conditional_function,"",weak_equals);
		}
		else
			return obj;
	},
	
	/**
	 * Cleans an object from its undefined (and null, if null_is_undefined is falsy) values
	 */
	clean: function(obj, only_first_level, null_is_undefined){
		var remove_fn = function(obj){
			return _.isNot(obj,null_is_undefined);
		};
		return _.remove(obj,remove_fn,undefined,(!only_first_level));
	},
	
	
	/**
	 * Calls a function on obj, or on each element if it's an array. Returns fn itself to mantain chainability.
	 */
	callOn : function(fn, obj, _this){
		if(_.isArray(obj))
			_.each(obj,fn,_this);
		else
			fn.apply(_this,[obj]);
		return fn;
	},

	
////////////////////////////////////////////////////////////////////////////////////////////
	/*  Function extension, included (and modified...) from: 
		http://www.lshift.net/blog/2006/08/03/subclassing-in-javascript-part-2 */
	
	/**
	 * Function extension: extend a function with a constructor function and 
	 * prototype object. Arguments to the constructor will be passed in the same order
	 * to the superclass constructor: be sure that they are uniform with the superclass 
	 * constructor!
	 *  
	 * The general function extension mechanism is:
	 * The constructor function is prototyped with another function, that extends itself the
	 * superclass and doesn't have a constructor function; so, the result function has the 
	 * prototype of the superclass and the proper constructor without interferences. 
	 * Finally, the prototype argument fields are copied in the constructor function prototype.
	 */ 
	extendFn : function(superclass, constructor_function, prototype) {
		/* Accept either the constructor, the prototype or both */
		if((!_.is(constructor_function)) && (_.isFunction(prototype))){
			constructor_function=prototype;
			prototype=null;
		}
		else if((!_.is(prototype)) && (typeof constructor_function == "object")){
			prototype=constructor_function;
			constructor_function=null;
		}
		/* AND (not present in original...): copies fields eventually present in the 
		 * prototype of constructor function! */
		if(_.is(constructor_function) && _.is(constructor_function.prototype)){
		    if(prototype==null)
		    	prototype={};
			for (var k in constructor_function.prototype) {
		        if(constructor_function.prototype[k]!=null && prototype[k]==null)
		        	prototype[k] = constructor_function.prototype[k];
		    }
	    }
		
		/* Constructor is first invoked on the superclass, then execute itself */
		var constructor=function(){
	        superclass.apply(this, arguments);
	        if(constructor_function!=null)
	        	constructor_function.apply(this, arguments);
	    };
		
	    /* General extension mechanism: */
		var withoutcon = function () {};
	    withoutcon.prototype = superclass.prototype;
	    constructor.prototype = new withoutcon();
	    if(prototype!=null){
		    for (var k in prototype) {
		        if(prototype[k]!=null)
		        	constructor.prototype[k] = prototype[k];
		    }
	    }
	    return constructor;
	},
	

	/**
	 * Return a new function that extends multiple functions. Simply invokes extendFn multiple times...
	 * The function will behaves as expected if superclasses is a single function or an array with one single element.
	 */
	extendFns : function(superclasses, constructor_function, prototype){
		if((!_.isArray(superclasses)) || superclasses.length==1)
			return _.extendFn((_.isArray(superclasses) && superclasses.length>0) ? superclasses[0] : superclasses, constructor_function, prototype);
		if(superclasses.length>0){
			var fn=superclasses[0];
			for(i=1; i<superclasses.length; i++)
				fn = _.extendFn(fn, superclasses[i]);
			return _.extendFn(fn, constructor_function, prototype);
		}
		else
			return _.getFn(constructor_function, prototype);
	},
	

	/**
	 * Simply adds the prototype to the constructor function and returns the resulting function: useful to get it in a single line of code
	 * (ex: when adding a function to an object), or to get a function from its prototype object.
	 * TODO: se viene passata una funzione constructor mi sembra che questa vengo invocata in window! Può darsi che sbagliavo io qualcosa,
	 * ma testiamo questo fatto!
	 */
	getFn : function(constructor_or_prototype, prototype){
		if(_.is(prototype)){
			constructor_or_prototype.prototype=prototype;
			return constructor_or_prototype;
		}
		else{
			var ret = function(){};
			ret.prototype = constructor_or_prototype;
			return ret;
		}
	}

});

/** Declares a private field to keep internal functions not exposed in the _ object */
_._private = {};



////////////////////////////////////////////////////////////////////////////////////////////
	/* ObjectNavigator */

_._private.ObjectNavigator = _.getFn(
	function(root_object_or_separator, separator){
		this.separator = (_.isString(root_object_or_separator) && root_object_or_separator.length>0) ? root_object_or_separator :
				((_.isString(separator) && separator.length>0) ? separator : ".");
		this.root_object = _.hasFields(root_object_or_separator) ? root_object_or_separator : undefined;
	}, 
	{
		sep: function(){
			return this.separator;
		},
		
		path: function(id){
			return (_.isString(id) && id.length>0) ? id.split(this.sep()) : (_.isArray(id) ? id : [id]);
		},
		
		childPath: function(path, name){
			return ""+path+this.sep()+name;
		},
		
		// if a field_path is passed, returns its parent in the full path string or null, else returns the parent path of path 
		// (that will be an empty string, if the parent is the root object, or null, if path is empty or falsy)
		parentPath: function(path, field_path){
			var field_parent = _.isNotEmptyString(field_path);
			var pos = _.isString(path) ? path.lastIndexOf( this.sep()+( field_parent ? field_path : "" ) ) : -1;
			/*if(pos<0 && _.isNotEmptyString(path) && (!field_parent))
				pos=path.length;*/
			return (pos>=0) ? path.substring(0,pos) : null; 
		},
		
		fieldPath: function(path, root_path){
			if(root_path.charAt(root_path.length-1)!=this.sep())
				root_path+=this.sep();
			var pos = (_.isString(path) && _.isString(root_path)) ? path.indexOf(root_path) : -1;
			return (pos>=0) ? ( (pos+root_path.length<path.length) ? path.substring( (pos+root_path.length), path.length ) : null ) : null;
		},
		
		fieldName: function(path){
			var sep = this.sep();
			if(_.isString(path) && path.indexOf(sep)>0)
				return path.substring(path.lastIndexOf(sep)+sep.length, path.length);
			else
				return path;
		},
		
		root: function(root_object){
			return _.hasFields(root_object) ? root_object : this.root_object;
		},
		
		resolve: function(path, root_object, value, default_value, null_is_undefined){
			root_object = this.root(root_object);
			var parent = this.parentPath(path);
			var field = this.fieldName(path);
			var obj = this.get(parent, root_object);
			value = _.getValue(value, default_value, null_is_undefined);
			if(_.isNot(value, null_is_undefined))
				value = "";
			return {
				root: root_object,
				parent: parent,
				field: field,
				object: obj,
				value: value
			};
		},
		
		get: function(path, root_object_or_subpath){
			var root_object = this.root(root_object_or_subpath);
			var subpath = _.isString(root_object_or_subpath) ? root_object_or_subpath : null;
			if(_.hasFields(root_object)){
				var arr = this.path(path);
				if(!_.isNullOrEmpty(arr)){
					var obj = _.field(root_object,arr[0]);
					for(var i=1; i<arr.length && _.is(obj); i++)
						obj = _.field(obj, arr[i]);
					if(!!subpath){
						arr = this.path(subpath);
						for(var i=0; i<arr.length && _.is(obj); i++)
							obj = _.field(obj, arr[i]);
					}
					return obj;
				}
				else
					return root_object;
			}
			else
				return null;
		},
		
		set: function(path, value, root_object, default_value, null_is_undefined){
			var resolved = this.resolve(path, root_object, value, default_value, null_is_undefined);
			_.field(resolved.object, resolved.field, resolved.value);
		},
		
		add: function(path, value, root_object, default_value, null_is_undefined){
			var resolved = this.resolve(path, root_object, value, default_value, null_is_undefined);
			if(_.hasFields(resolved.object)){
				var prop = _.field(resolved.object,resolved.field);
				value = (_.isNot(prop, null_is_undefined)) ? resolved.value : [prop, resolved.value];
				_.field(obj, name, value);
			}
		},
		
		remove: function(path, value, weak_equals, root_object, null_is_undefined){
			var resolved = this.resolve(path, root_object);
			if(_.isNot(value,null_is_undefined)){
				// directly remove the field at the specified path
				return _.remove(resolved.object, resolved.field, weak_equals);
			}
			else{
				// remove values equal to value from the object at the specified path
				var obj = resolved.object;
				var field = _.field(obj, resolved.field);
				if(_.hasFields(field)){
					field = _.remove(field, value, weak_equals);
					_.field(obj, resolved.field, field);
					return obj;
				}
				else
					return obj;
			}
		}
		
	}
);

_.mixin({
	nav : function(root_object_or_separator, separator){
		return new _._private.ObjectNavigator(root_object_or_separator, separator);
	},
	navField: function(obj, field, separator){
		return _.nav(obj, separator).get(field);
	}
});

////////////////////////////////////////////////////////////////////////////////////////////
	/* Date utilities */

_.mixin({
	
	// TODO: test all functionalities, and the DateNavigator... :-)
	date: function(today, usa_format, separator, hour_separator, date_hour_separator){
		if(_.is(today, Date))
			return today;
		else if(_.isNotEmptyString(today)){
			// read eventual literal strings 
			if(today=="now" || today=="yesterday" || today=="tomorrow"){
				var now = new Date();
				if(today=="now")
					return now;
				else if(today=="yesterday")
					return _.yesterday(now);
				else if(today=="tomorrow")
					return _.tomorrow(now);
			}
			// tokenize today string
			var arr = today.split(_.isString(date_hour_separator) ? date_hour_separator : " ");
			today = arr[0];
			var hour = (arr.length>1) ? arr[1] : "";
			if(!separator)
				separator = (!!usa_format) ? separator="-" : separator="/";   
			var date_arr = today.split(separator);
			var hour_arr = (hour.length>0) ? hour.split(_.isString(hour_separator) ? hour_separator : ":") : new Array();
			// read date coordinates
			var d = (date_arr.length>2) ? ((!!usa_format) ? date_arr[2] : date_arr[0]) : 1;
			_.limit(d,1,7); 
			d--;
			var m = (date_arr.length>1) ? ((!!usa_format) ? date_arr[1] : date_arr[0]) : 1; 
			_.limit(m,1,12);
			m--;
		    var y = (!!usa_format) ? date_arr[0] : date_arr[date_arr.length-1];
		    _.limit(y, -9999, 9999);
		    var h = (hour_arr.length>0) ? hour_arr[0] : 0;
		    var min = (hour_arr.length>1) ? hour_arr[1] : 0;
		    var sec = (hour_arr.length>2) ? hour_arr[2] : 0;
		    var ms = (hour_arr.length>3) ? hour_arr[3] : 0;
			// return date object
		    return new Date(y,m,d,h,min,sec,ms);
		}
		else if(_.isNumber(today))
			return new Date(today);
		else
			return new Date();
	},
	
	yesterday : function(today, days, usa_format){
    	return _.nextDate(today, days, null, true, usa_format); 
    },
    
    tomorrow : function(today, days, usa_format){
    	return _.nextDate(today, days, null, false, usa_format);
    },
    
    /**
	 * Returns a date interval in milliseconds, eventually interpreting the interval depending on an initial date (if the first arg is a Date). 
	 * The interval has to be expressed in the format X-X-X (days-months-years), or X[d|m|y] (default: d). Note that the value of a month 
	 * is conventionally fixed in 30 days if the starting date is not specified. 
	 * An hour interval can be specified with the second argument, in the format X-X-X-X (hours, minutes, seconds and milliseconds) or X[h|m|s|ms]
	 * (default: h). 
	 */
	dateInterval: function(today_or_date_interval, date_interval_or_hour_interval, hour_interval){
		var today = _.is(today_or_date_interval, Date) ? today_or_date_interval : null;
		var date_interval = (!today) ? today_or_date_interval : date_interval_or_hour_interval;
		hour_interval = (!today) ?  date_interval_or_hour_interval : hour_interval;
		
		var days = 0;
		if(_.isNotEmptyString(date_interval)){
			var d = 0; var m = 0; var y = 0;
			if(date_interval.indexOf("-")>=0){
				var arr = date_interval.split("-");
				if(arr.length>0 && arr[0].length>0)
					d = arr[0];
				if(arr.length>1 && arr[1].length>0)
					m = arr[1];
				if(arr.length>2 && arr[2].length>0)
					y = arr[2];
			}
			else{
				var last_char = date_interval.charAt(date_interval.length-1);
				var num = date_interval.substring(0,date_interval.length-1);
				if(last_char=="d")
					d = _.tryParse(num,0,true);
				else if(last_char=="m")
					m = _.tryParse(num,0,true);
				else if(last_char=="y")
					y = _.tryParse(num,0,true);
			}
			
			days += d;
			if(m>0 && (!!today)){
				var month = today.getMonth();
				for(var i=0;i<m;i++)
					days += _.monthDays(month+i+1);
			}
			else 
				days += (30*m);
			days += Math.floor(365.25 * y);			
		}
		else if(_.isNumber(date_interval)) 
			days = date_interval;
		else if(!_.isNotEmptyString(hour_interval))
			days = 1;
		
		var ms = 0;
		if(_.isNotEmptyString(hour_interval)){
			var h = 0; var m = 0; var s = 0; 
			if(hour_interval.indexOf("-")>=0){
				var arr = hour_interval.split("-");
				if(arr.length>0 && arr[0].length>0)
					h = arr[0];
				if(arr.length>1 && arr[1].length>0)
					m = arr[1];
				if(arr.length>2 && arr[2].length>0)
					s = arr[2];
				if(arr.length>3 && arr[3].length>0)
					ms = arr[3];
			}
			else{
				var last_char = hour_interval.charAt(hour_interval.length-1);
				var num = hour_interval.substring(0,hour_interval.length-1);
				if(last_char=="h")
					h = _.tryParse(num,0,true);
				else if(last_char=="m")
					m = _.tryParse(num,0,true);
				else if(last_char=="s"){
					if(hour_interval.length>2 && hour_interval.charAt(hour_interval.length-2)=="m")
						ms = _.tryParse(hour_interval.substring(0,hour_interval.length-2),0,true);
					else
						s = _.tryParse(num,0,true);
				}
			}
			
			ms += (h * (1000*60*60)) + (m * (1000*60)) + (s * (1000)); 			
		}
		else if(_.isNumber(hour_interval))
			ms = (1000*60*60 *  hour_interval);
			
		ms += ( 1000*60*60*24 * days );
		return ms;
	},
	
	monthDays: function(month, zero_indexed){
		if(_.is(month, Date)){
			month = month.getMonth();
			zero_indexed = true;
		}
		if(!!zero_indexed)
			month++;
		if(month>12){
			month = month%12;
			if(month==0)
				month=12;
		}
		return (month==9 || month==4 || month==6 || month==9) ? 31 : ((month==2) ? 28 : 31);
	},
	
	nextDate : function(today, days_or_interval, hour_interval, backward, usa_format){
    	var date = _.date(today, usa_format);
    	var interval_ms = _.dateInterval(today, days_or_interval, hour_interval);
    	var new_date_ms = (!!backward) ? (date.getTime()-interval_ms) : (date.getTime()+interval_ms);
        return new Date(new_date_ms);
    },
    
    dateStr: function(date, include_hour_or_hour_fields, usa_format){
		date=_.date(date, usa_format);
		var ret = (!!usa_format) ? (date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()) :
				(date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear());
		if(!!include_hour_or_hour_fields){
			var fields = _.isNumber(include_hour_or_hour_fields) ? include_hour_or_hour_fields : 2;
			if(fields>0)
				ret+=" "+date.getHours() + ( (fields>1) ? ":"+date.getMinutes() : "" ) + 
						( (fields>2) ? ":"+date.getSeconds() : "" ) + ( (fields>3) ? ":"+date.getMilliseconds() : "" );
		}
		return ret;
	},
    
    dateNav: function(today, include_hour_or_hour_fields, usa_format, separator, hour_separator, date_hour_separator){
    	return {
    		value : _.date(today, usa_format, separator, hour_separator, date_hour_separator),
    		ms: function(){
    			return this.value.getTime();
    		},
    		next: function(days_or_date_interval, hour_interval){
    			this.value = _.nextDate(this.value, days_or_date_interval, hour_interval, false, usa_format);
    			return this;
    		},
    		prev: function(days_or_date_interval, hour_interval){
    			this.value = _.nextDate(this.value, days_or_date_interval, hour_interval, true, usa_format);
    			return this;
    		},
    		str: function(){
    			return _.dateStr(this.value, include_hour_or_hour_fields, usa_format);
    		}
    	};
    } 
    
});
		
		
////////////////////////////////////////////////////////////////////////////////////////////
	/* Plane recursion functions */

/**
 * Computes the next iteration objects within a recursive call
 */ 
_._private.nextInRecursion = function(chain_nodes, next_function, _this_in_fn){
	var _objs = _.asArray(chain_nodes);
	var _next_objs=new Array();
	_.each(_objs, function(_obj){
		var _result = next_function ? next_function.apply(_this_in_fn,[_obj]) : null;
		_.add(_result, _next_objs);
	});
	return _next_objs;
};

/**
 * Computes the selection within a recursive call
 */ 
_._private.selectInRecursion = function(_next, _select_function, _ret, _return_first, _this_in_fn){
	if(_.isNotEmpty(_next)){
		if(_select_function){
			var _selected = null;
			for(var i=0;i<_next.length;i++){
				_selected = _select_function.call(_this_in_fn,_next[i]);
				if(_selected!=null && _selected!==false){
					if(_selected===true)
						_selected = _next[i];
					if(_return_first)
						return _selected;
					else
						_.add(_selected,_ret);
				}
			}
		}
		else{
			if(_return_first)
				return _next[0];
			else
				_.add(_next,_ret);
		}
	}
	return null;
};

/**
 * Computes a recursion iteration within a recursive call
 */
_._private.callInRecursion = function(_recursing_obj, _recursings, _next_fn, _before_recursion_fn, _before_each_recursion_fn, 
		_after_each_recursion_fn, _after_recursion_fn, _this_in_fn, _vars){
	
	var _recursing_parent_info = _recursings.length>0 ? _recursings[0] : null; 
	var _recursing_parent = _recursing_parent_info ? _recursing_parent_info.caller : null;
	var _is_starting_obj = (_recursing_parent==null);
	var _is_parent_starting_object = (_recursings.length==1);
	if(_.isNullOrEmpty(_vars)) 
		_vars = {};
	var _return = null;
	
	// here we are in the for of the parent recursion, first to call the recursion on the object
	if(_before_each_recursion_fn && _recursing_parent)
		_return = _before_each_recursion_fn.apply( _this_in_fn, [_recursing_parent, _recursing_parent_info.vars, _is_parent_starting_object,
		                                              _recursing_obj, _vars] );
	if(_return!=undefined)
		return _return;
	
	// here we are in the first part of the child recursion, before the for 
	if(_before_recursion_fn)
		_return = _before_recursion_fn.apply(_this_in_fn, [ _recursing_obj, _vars, _is_starting_obj ]);
	if(_return!=undefined)
		return _return;
		
	// here we select the next objects to continue the recursion
	var _next_objs = _next_fn.apply( _this_in_fn, [_recursing_obj, _vars, _is_starting_obj] );
	if(_next_objs && (!_.isArray(_next_objs)))
		_next_objs = [_next_objs];
	if(_.isNotEmpty(_next_objs)){
		// the current object has generated recursion children: put them as the next iterated branch and do not return
		
		var _next_recursing = {
			caller : _recursing_obj,
			objects : _next_objs,
			vars : _vars
		};
		_.addAsFirst(_recursings, _next_recursing);
	} 
	else
		// the current object has not recursion children: terminate its recursion calling the after functions and returning the result...
		return _.afterRecursion(_recursing_obj, _is_starting_obj, _recursing_parent, _is_parent_starting_object, _recursing_parent_info,
				_vars, _after_each_recursion_fn, _after_recursion_fn, _this_in_fn);
};

/**
 * Computes an iteration termination within a recursive call
 */
_._private.afterRecursion = function(_recursing_obj, _is_starting_obj, _recursing_parent, _is_parent_starting_object, _recursing_parent_info, _vars, 
		_after_each_recursion_fn, _after_recursion_fn, _this_in_fn){
	// here we are in the second part of the child recursion, after the for: this function returns the result of the function
	var _return = _after_recursion_fn ? _after_recursion_fn.apply(_this_in_fn, [ _recursing_obj, _vars, _is_starting_obj ]) : undefined;
	
	// here we are in the second part of the for of the parent recursion, just returned from the child recursion: we can return and so
	// stop the nested recursions
	if(_after_each_recursion_fn && _recursing_parent){
		var _returned = _after_each_recursion_fn.apply( _this_in_fn, [_recursing_parent, _recursing_parent_info.vars, _is_parent_starting_object,
		                                              _recursing_obj, _return, _vars] );
		if(_returned!=undefined)
			_recursing_parent_info.returned = _returned;
	}
	
	return _return;
};

/** Add plane recursion functions */
_.mixin({
	
	/** 
	 * Navigates the chain with a breadth-first search, and returns the array of selected objects
	 * TODO: better comment
	 */
	recursiveSelect : function(_starting_objects, _next_function, _select_function, _exclude_starting_objects, _depth_levels, 
				_return_first, _this_in_fn){
		if(_.isNullOrEmpty(_starting_objects))
			return ( _return_first ? null : new Array() );
		if( !(_.isNumber(_depth_levels) || _depth_levels===false ) )
			_depth_levels=true;
		var _levels = 0;
		var _ret = new Array();
		var _ret_obj=null;
		var _next = new Array();
		if(!_exclude_starting_objects)
			_.add(_starting_objects, _next);
		else if( _depth_levels===true || _depth_levels>0 ){
			_next = _.nextInRecursion(_starting_objects, _next_function, _this_in_fn);
			_ret_obj = _.selectInRecursion(_next, _select_function, _ret, _return_first, _this_in_fn);
			if(_ret_obj)
				return _ret_obj;
			_levels++;
		}
		
		while( _next.length>0 && ( _depth_levels===true || _levels<_depth_levels ) ){
			
			_next = _.nextInRecursion(_next, _next_function, _this_in_fn);
			_ret_obj = _.selectInRecursion(_next, _select_function, _ret, _return_first, _this_in_fn);
			if(_ret_obj)
				return _ret_obj;
			_levels++;
			
		}
		return ( _return_first ? null : _ret ) ;
	},
	
	
	
	/**
	 * 
	 *	Si prende la funzione ricorsiva, la funzione next ed eventualmente la funzione return, e gli oggetti di partenza (oltre alle opzioni)
	 *	dopodichè, la struttura dati da tenere è un array di oggetti. Ogni oggetto è fatto così:
	 *	{
	 *		caller : object (all'inizio null, poi chi ha costruito la ricorsione)
	 *		objects : [] (all'inizio gli elementi iniziali, poi quelli ritornati dal next sull'oggetto caller)
	 *
	 *		POI, NON ORA, gestiamo anche i ritorni (in realtà i ritorni multipli sono un po' incasinati, pure da gestire nelle fn...
	 *												... e poi con le closoure si può fare praticamente tutto...): 
	 *		returning : any (fissato dalla funzione ricorsiva: viene messo qui e passato come secondo
	 *					argomento alla funzione return, quando saranno terminati i figli, o ritornato direttamente come risultato)
	 *		returns : per ogni oggetto in objects, questi sono i risultati di ciascuno e vengono pure passati alla funzione ricorsiva,
	 *				  che potrà farne quel che vuole. Magari alla funzione passiamo un oggetto che sa dare i ritorni dei vari oggetti 
	 *				  passati nella ricorsione, boh...	
	 *	}  
	 *	Dopodichè, a ogni giro, si prende il primo elemento dell'array, e di questo si rimuove il primo in objects. 
	 *  Si invoca la funzione su di lui, e si invoca la funzione next: se next ritorna oggetti, si crea un nuovo oggetto ricorsivo e lo 
	 *  si mette all'inizio dell'array, con quest'oggetto come caller e il risultato di next come objects. Altrimenti, ci si invoca sopra 
	 *  l'eventuale funzione return (altrimenti invocata sul caller del nuovo oggetto creato, quando saranno terminati i suoi figli). 
	 *  Quando gli objects finiscono si invoca la funzione return su caller, si rimuove l'oggetto di traduzione dall'array, e si passa
	 *  all'oggetto in prima posizione dell'array stesso (che sarebbe il padre di questo caller, dal cui campo objects è stato rimosso...)
	 *  SUI RITORNI, PER ORA: facciamo che passiamo il booleano is_first quando invochiamo la funzione sul nodo radice, e alla fine il 
	 *  risultato della ricorsione è quello che ritorna lui nella sua funzione return o, se null, nella funzione ricorsiva. Gli altri 
	 *  ritorni non li cachiamo proprio, tanto non hanno senso essendoci le closoure, con cui uno può gestire con più precisione 
	 *  eventuali risultati intermedi a seconda della funzione...
	 *  
	 *  TODO: better comment
	 */
	
	recursiveCall : function(_starting_object, _before_recursion_fn, _next_fn, _before_each_recursion_fn, _after_each_recursion_fn,
			_after_recursion_fn, _this_in_fn, _first_vars){
		if(_starting_object==null || _next_fn==null || ( _before_recursion_fn==null && _before_each_recursion_fn==null &&
														_after_each_recursion_fn==null && _after_recursion_fn==null) )
			return null;
		
		var _recursings = new Array();
		var _return = _.callInRecursion(_starting_object, _recursings, _next_fn, _before_recursion_fn, _before_each_recursion_fn,
				_after_each_recursion_fn, _after_recursion_fn, _this_in_fn, _first_vars);
		if(_return!=undefined) 
			// no recursion at all: either the before_function has returned a result, or the next function has not generated nested recursions
			return _return;
		
		var _recursing = null;
		var _recursing_obj = null;
		var _recursing_parent_info = null; 
		var _recursing_parent = null;
		var _is_starting_obj = null;
		var _is_parent_starting_object = null;
		
		while(_recursings.length>0){
			
			_recursing =  _recursings[0];
			_return = _recursing.returned;
			_recursing_obj = _return ? null : _.removeFirst(_recursing.objects);
			
			if(_recursing_obj){
				// process the next nested recursion
				_return = _.callInRecursion(_recursing_obj, _recursings, _next_fn, _before_recursion_fn,  _before_each_recursion_fn,
						_after_each_recursion_fn, _after_recursion_fn, _this_in_fn);
			}
			else{
				// nested recursion are terminated, or we returned in one of the second part of the for (just after a nested translation)
				_.removeFirst(_recursings);
				
				_recursing_parent_info = _recursings.length>0 ? _recursings[0] : null; 
				_recursing_parent = _recursing_parent_info ? _recursing_parent_info.caller : null;
				_is_starting_obj = (_recursing_parent==null);
				_is_parent_starting_object = (_recursings.length==1);
				
				if(_return){
					// we returned in the second part of the for of the recursion, just after the last nested translation
					_.afterRecursion(_recursing.caller, _is_starting_obj, _recursing_parent, _is_parent_starting_object, 
							_recursing_parent_info,	_recursing.vars, _after_each_recursion_fn, null, _this_in_fn);
				}
				else{
					// we processed all nested translations: call the after functions
					_return = _.afterRecursion(_recursing.caller, _is_starting_obj, _recursing_parent, _is_parent_starting_object, 
							_recursing_parent_info,	_recursing.vars, _after_each_recursion_fn, _after_recursion_fn, _this_in_fn);
				}
			}
		}
		
		// the last returned value is relative to the root recursion
		return _return;
	}
	
});
	
	
////////////////////////////////////////////////////////////////////////////////////////////	
	/* Flexible id generation with isolate increments for different context */

_._private.id_gens = {};

_.mixin({
	
	/**
	 * Returns an id generator function with isolated id increments
	 */
	idGen: function(prefix){
		if(_.isNullOrEmpty(prefix))
			prefix = "_";
		var max = 0;
		return function(){
			max++;
			return prefix+max;
		};
	},
	
	/**
	 * Returns a globally unique id, with isolated increments for each prefix
	 */
	id: function(prefix){
		if(_.isNullOrEmpty(prefix))
			prefix = "_";
		if(!_.is(_._private.id_gens[prefix]))
			_._private.id_gens[prefix] = _.idGen(prefix); 
		return _._private.id_gens[prefix]();	
	}
	
});
	

////////////////////////////////////////////////////////////////////////////////////////////
	/* Event source, taken from Backbone.js (function Backbone.Events) */

_._private.event_source_prototype = {
		
	// Bind an event, specified by a string name, `ev`, to a `callback` function.
	// Passing `"all"` will bind the callback to all events fired.
	bind : function(ev, callback) {
		var calls = this._callbacks || (this._callbacks = {});
		var list  = this._callbacks[ev] || (this._callbacks[ev] = []);
		list.push(callback);
		return this;
    },

    // Remove one or many callbacks. If `callback` is null, removes all
    // callbacks for the event. If `ev` is null, removes all bound callbacks
    // for all events.
    unbind : function(ev, callback) {
    	var calls;
    	if (!ev) {
    		this._callbacks = {};
    	} 
    	else if (calls = this._callbacks) {
	    	if (!callback) {
	    		calls[ev] = [];
	    	} else {
		        var list = calls[ev];
		        if (!list) return this;
		        for (var i = 0, l = list.length; i < l; i++) {
		        	if (callback === list[i]) {
			            list[i] = null;
			            break;
		        	}
		        }
	    	}
    	}
    	return this;
    },

    // Trigger an event, firing all bound callbacks. Callbacks are passed the
    // same arguments as `trigger` is, apart from the event name.
    // Listening for `"all"` passes the true event name as the first argument.
    trigger : function(eventName) {
	    var list, calls, ev, callback, args, i, l;
	    var both = 2;
	    if (!(calls = this._callbacks)) return this;
	    while (both--) {
	    	ev = both ? eventName : 'all';
	    	if (list = calls[ev]) {
	    		for (i = 0, l = list.length; i < l; i++) {
	    			if (!(callback = list[i])) {
	    				list.splice(i, 1); i--; l--;
	    			} else {
	    				args = both ? Array.prototype.slice.call(arguments, 1) : arguments;
	    				callback.apply(this, args);
	    			}
	    		}
	    	}
	    }
	    return this;
    }
		
};
_._private.EventSource = _.getFn(_._private.event_source_prototype);

_.mixin({
	
	/** 
	 * Returns an event source function or object, depending from the parameters.
	 * If object_or_constructor is a function (or null) extends the EventSource function with the specified constructor and prototype and 
	 * returns it, else if it's an object it's directly extended to support event binding and triggering. 
	 */
	eventSrc : function(object_or_constructor, function_prototype){
		if(!_.is(object_or_constructor))
			object_or_constructor = new function(){};
		if(_.isFunction(object_or_constructor))
			return _.extendFn(_._private.EventSource, object_or_constructor, function_prototype);
		else if(_.isObject(object_or_constructor))
			return _.extend(object_or_constructor, _private.event_source_prototype);
		else
			return object_or_constructor;
	}	

});

	

////////////////////////////////////////////////////////////////////////////////////////////
	/* Device investigations */
	
_._private.Device = _.getFn(
	function(user_agent){
		var device=this.find(user_agent);
		this.platform = device.platform;
		this.engine = device.engine;
		this.engine_version = device.engine_version;
	},
	{
		find : function(ua){
			if(_.isNullOrEmpty(ua))
				ua = navigator.userAgent;
			
			/* FROM JQUERY: */
			ua = ua.toLowerCase();
		
			var rwebkit = /(webkit)[ \/]([\w.]+)/;
			var ropera = /(opera)(?:.*version)?[ \/]([\w.]+)/;
			var rmsie = /(msie) ([\w.]+)/;
			var rmozilla = /(mozilla)(?:.*? rv:([\w.]+))?/;
			
			var match = rwebkit.exec( ua ) ||
				ropera.exec( ua ) ||
				rmsie.exec( ua ) ||
				ua.indexOf("compatible") < 0 && rmozilla.exec( ua ) ||
				[];
			var engine = {
				webkit : (match[1]=="webkit"), 
				opera : (match[1]=="opera"),
				msie : (match[1]=="msie"),
				mozilla : (match[1]=="mozilla") 
			};
			var engine_version=match[2] || "0";
			/* END JQUERY */
			
			var riphone = /(iphone)/;
			var ripad = /(ipad)/;
			var randroid = /(android)/;
			var rblackberry = /(blackberry)/;
			var rios = /(mac os x)[ \w.]+(mobile)/;
			var rmacos = /(mac os x)/; // less than ios, after in the OR
			var rlinux = /(linux)/;
			var rwindows = /(windows)/;
			match = riphone.exec( ua ) || ripad.exec( ua ) || randroid.exec( ua ) ||
					rblackberry.exec( ua ) || rios.exec( ua ) || rmacos.exec( ua ) ||
					rlinux.exec( ua ) || rwindows.exec( ua ) ||	[];
			var platform = {
				iphone : (match[1]=="iphone"),
				ipad : (match[1]=="ipad"),
				android : (match[1]=="android"),
				blackberry : (match[1]=="blackberry"),
				ios : (match.length>2 && match[2]=="mobile"),
				macos: (match[1]=="macos"),
				linux : (match[1]=="linux"),
				windows : (match[1]=="windows")
			}; 
			
			return {engine: engine, engine_version: engine_version, platform: platform};
		},
			
		isMobileWebkit : function(){
			return (this.platform.ios || this.platform.android || this.platform.blackberry);
		},
		
		json: function(){
			return {
				engine: this.engine,
				engine_version: this.engine_version,
				platform: this.platform
			};
		}
	}
);

_.mixin({
	device : function(user_agent){
		return new _._private.Device(user_agent);
	}
});

	
////////////////////////////////////////////////////////////////////////////////////////////
	/* HAOP support (Html Aspected Oriented Programming) */
	
_._private.HAOP={

	interceptors : new Array(),
	
	findInterceptors: function(obj, function_name, intercept_before){
		if(!obj)
			return null;
		var obj_interceptors = this.getObjectInterceptors(obj);
		if(obj_interceptors){
			if(function_name){
				if(obj_interceptors[function_name]){
					if(intercept_before===true)
						return obj_interceptors[function_name].before;
					else if(intercept_before===false)
						return obj_interceptors[function_name].after;
					else
						return obj_interceptors[function_name];
				}
				else
					return null;
			}
			else
				return obj_interceptors;
		}
		else
			return null;
	},
	
	getObjectInterceptors: function(_obj, create_if_null){
		var obj_interceptors = _.detect(this.interceptors, function(obj_interceptor){ return (obj_interceptor.obj==_obj); });
		if((!obj_interceptors) && create_if_null){
			obj_interceptors = {
				obj : _obj
			};
			this.interceptors.push(obj_interceptors);
		}
		return obj_interceptors;
	},
	
	getFunctionInterceptors: function(_obj, function_name, intercept_before, create_if_null){
		var obj_inters = this.getObjectInterceptors(_obj, create_if_null);
		var fn_inters = obj_inters ? obj_inters[function_name] : null;
		var intercept_type = (intercept_before===true) ? "before" : ( (intercept_before===false) ? "after" : null ) ;
		if(create_if_null){
			if(!fn_inters){
				var _fn = _obj[function_name];
				if(_.isFunction(_fn)){
					_obj[function_name] = function(){
						return _._private.HAOP.callHaop(_obj, function_name, this, arguments);
					};
					obj_inters[function_name] = {
						fn : _fn	
					};
					fn_inters = obj_inters[function_name];
				}
			}
			if(intercept_type && (!fn_inters[intercept_type]))
				fn_inters[intercept_type] = new Array();
		}
		return fn_inters ? (intercept_type ? fn_inters[intercept_type] : fn_inters) : null;
	},
	
	intercept : function(obj, function_name, interceptor_fn, intercept_before, interceptor_this, interceptor_opts){
		var inters = this.getFunctionInterceptors(obj, function_name, (intercept_before ? intercept_before : false) , true);
		if(inters){
			inters.push({
				fn : interceptor_fn,
				fn_this : interceptor_this,
				opts : interceptor_opts
			});
			return true;
		}
		else
			return false;
	},
	
	callHaop : function(_obj, function_name, _this, _args){
		var fn_inters = this.findInterceptors(_obj,function_name);
		var inter_args = {
			obj : _obj,	
			fn : function_name,
			fn_this : _this,
			fn_args : _args,
			fn_return : undefined,
			fn_error : undefined,
			stopped : false,
			catch_err : false
		};
		//_.log("Interceptors on "+function_name+" of "+_obj+": "+ (fn_inters && fn_inters.before ? fn_inters.before.length : 0)+
		//		" before, "+(fn_inters && fn_inters.after ? fn_inters.after.length : 0)+" after");
		if(fn_inters && fn_inters.before)
			// calls before interceptors: they can adjust this pointer and arguments for the function, or stop its esecution at all 
			_.each(fn_inters.before, function(inter){
				var inter_this = inter.fn_this ? inter.fn_this : _this;
				inter_args.opts = inter.opts;
				try{
					inter.fn.call(inter_this,inter_args); 
				}catch(err){
					_.log("Error in BEFORE interception of "+function_name+": "+err);
				}
			});
		
		if(!inter_args.stopped)
			try{
				inter_args.fn_return = fn_inters.fn.apply(inter_args.fn_this,inter_args.fn_args); 
			}catch(err){
				inter_args.fn_error = err;
			}
		
		if(fn_inters && fn_inters.after)
			// calls after interceptors: they can change the function return or the thrown error, or catch an eventual error 
			_.each(fn_inters.after, function(inter){
				var inter_this = inter.fn_this ? inter.fn_this : _this;
				inter_args.opts = inter.opts;
				try{
					inter.fn.call(inter_this,inter_args); 
				}catch(err){
					_.log("Error in AFTER interception of "+function_name+": "+err);
				}
			});
		
		if(inter_args.fn_error!=null){
			if(!inter_args.catch_err)
				throw inter_args.fn_error;
		}
		return inter_args.fn_return;
	}
	
};

_.mixin({
	/**
	 * TODO: comment this!
	 */
	intercept : function(obj, function_name, interceptor_fn, intercept_before, interceptor_this, interceptor_opts){
		_._private.HAOP.intercept(obj, function_name, interceptor_fn, intercept_before, interceptor_this, interceptor_opts);
	}
});
	
	
	

////////////////////////////////////////////////////////////////////////////////////////////
	/* _+ Separated contexts support */

_._private.plus = {
		
	prototypes : {},	
	functions: {},
	
	getPlusFn : function(plus_name, fn_name){
		var fn = function(){
			var args = arguments;
			if(_.is(this._obj)){
				if(arguments.length>0){
					args = _.argsToArr(arguments);
					args.splice(0,0,this._obj);
				}
				else
					args = [this._obj];
			}
			var ret = _._private.plus.prototypes[plus_name][fn_name].apply(this,args);
			return (!this._chained) ? ret :
				( _._private.plus.prototypes[plus_name].is(ret) ?  _._private.plus.constructPlus(plus_name,ret).chain() : _(ret).chain());
		};
		return fn;
	},
	
	createPlus : function(_name, _prototype){
		if(_.is(_prototype)){
			// checks that the get and is functions exist, otherwise creates them by default
			if(!_.is(_prototype.get))
				_prototype.get = function(obj){
					return _.is(obj) ? obj : null;
				};
			if(!_.is(_prototype.is))
				_prototype.is = function(obj){
					return _.is(this.get(obj)) ? true : false;
				};	
			_._private.plus.prototypes[_name] = _prototype;
			// builds the plus function prototype	
			var fn_prototype = {
				_chained : false,
				// emulates _.chain
				chain : function(){
					this._chained = true;
					return this;
				},
				// emulates _.value
				value : function(){
					return this._obj;
				},
				// adds the _ function to get a complete _ object instead of the actual _plus object
				_ : function(){
					var ret = _(this._obj);
					if(this._chained)
						ret.chain();
					return ret;
				}
			};
			var keys = _.keys(_prototype);
			_.each(keys, function(key){
				fn_prototype[key] = _._private.plus.getPlusFn(_name, key);
			});
			// creates the plus function and registers it as an _ mixin
			_._private.plus.functions[_name] = _.getFn(fn_prototype);
			var plus_fn = function(){
				return _._private.plus.constructPlus(_name,arguments);
			};
			var mixin_obj = {};
			mixin_obj[_name] = plus_fn;
			_.mixin(mixin_obj);
			return plus_fn;
		}
	},
	
	constructPlus: function(plus_name, obj_or_args){
		var fn = null;
		if(_.is(obj_or_args)){
			fn = new _._private.plus.functions[plus_name]();
			if(_.isArray(obj_or_args) || _.isArguments(obj_or_args))
				fn._obj = _._private.plus.prototypes[plus_name].get.apply(null,obj_or_args);
			else
				fn._obj = obj_or_args;
		}
		else
			fn = _.plus(plus_name);
		return fn;
	}
	
};

_.mixin({
	// TODO: Comment this!
	// TODO: cerchiamo di farlo come _, che costruisce col wrapper cò.. e riesce a fare che _ è sia object che function.. così sarebbe bello pure
	// 		per i plus...
	// TODO: aggiungiamo in qualche modo la costruzione di un plus dall'oggetto direttamente, con una ricerca prima sugli is e poi sui get,
	// 		nell'ordine in cui sono stati dichiarati... una cosa simile poi dovremo farla per i plus Query, ma forse possiamo farlo direttamente 
	//		solo qua e poi usarlo anche la...
	// TODO: Attenzione: nella documementazione va chiarito che il modo in cui verranno invocati i metodi dipenderà sempre dalla funzione get():
	// 		 se questa ritorna null, allora i metodi saranno invocati senza passare _obj come primo parametro, altrimenti il valore ritornato 
	//		 sarà l'_obj e verrà dunque passato come prima parametro nelle funzioni... in genere è bene ritornare null se il valore di ingresso
	//		 è null o undefined, in modo che l'oggetto possa poi invocare le funzioni direttamente (es: _.arr2().test(obj) viene invocato con
	//		 il parametro obj come secondo parametro se la funzione get ritorna sempre un oggetto !=null...).
	//		 OVVIAMENTE questa cosa si risolve se risolviamo il fatto che dicevamo prima, cioè farlo come _ (sia oggetto che funzione... bah...)..
	plus: function(_prototype, _name){
		if(_.is(_prototype) && (!_.isString(_prototype))){
			if(_.is(_name))
				return _._private.plus.createPlus(_name, _prototype);
			else
				return _.mixin(_prototype);
		}
		else
			return _.isString(_prototype) ? _._private.plus.functions[_prototype].prototype : _.keys(_._private.plus.prototypes);
	},
	plusSrc: function(plus_name){
		return _._private.plus.prototypes[plus_name];
	}
});	



////////////////////////////////////////////////////////////////////////////////////////////
		/* Adding plus logic for objects in _.js and _.string */

_.mixin({
	
	fn: function(obj){
		var ret = _.isString(obj) ? _.parse(obj) : obj;
		return _.isFunction(ret) ? _(ret) : _(); 
	},
	
	arr: function(obj){
		var arr = _.asArray(obj);
		return _(arr);
	},
	
	obj: function(obj){
		if(!_.is(obj))
			obj = {};
		return _(obj);
	}
});



////////////////////////////////////////////////////////////////////////////////////////////
		/* Adding query capabilities on tree contexts (HTML, js objects and all ) */

_._private.query = {
		
};











	
	