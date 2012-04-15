
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
			var ret = _.clone(this.api_object.constants.errors[err_code]);
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
	},
	
	
	
	////////////////////////////////////////////////////
    // general ajax functions... 
    
    // success and errors take parsed data (or an array of errors: if null, there was an ajax error), the 'callback_params' object, xhr and status as arguments. 
    // complete takes only the 'callback_params' object, xhr and status. 
    // callback params is always extended with the _request_data field, containing informations on the current request...
    // passing an "hide_errors" field in callback_params will cause the errors to not be displayed to the user
    ajax : function(url, success_fn, error_fn, opts, callback_params, complete_fn, data_in_fake_ajax){
    	var ajax_opts = {
            data: _.isString(url) ? {} : url,
            dataType: "json"
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
        
        var callbacks = {
            success: function(data, status, xhr){
            	if(ajax_opts.dataType=="json"){
	            	// assumes that data always contains 'data' and 'errors' fields (eventually empty) to do an higher level error check 	
	            	console.log("AJAX SUCCESS: "+JSON.stringify(data)+", status: "+status);
	            	if(data.errors.count>0)
	            		RestAPI.prototype.handleAjaxErrors(data.errors.errors, callback_params, xhr, status);
	                else 
	                	RestAPI.prototype.handleAjaxSuccess(data.data, callback_params, xhr, status);
            	}
            	else{
            		// directly pass the result to the success function 	
	            	RestAPI.prototype.handleAjaxSuccess(data, callback_params, xhr, status);
            	}
            },
            error: function(xhr, status){
                console.log("AJAX ERROR: "+status);
                RestAPI.prototype.handleAjaxErrors([], callback_params, xhr, status);
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

// a global object containing the RestAPI eventually specified by the 'API_object' global variable. The API_object can also be setted later, calling API.refresh(). You can always construct and use a different RestAPI object.
var API = new RestAPI();


