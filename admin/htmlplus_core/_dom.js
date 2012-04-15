
if(!_){	var _ ={}; }    // development line


////////////////////////////////////////////////////////////////////////////////////////////
	/* DOM manipulation utility functions */
	
	_.DOM={
		
		attr : function(el,name_or_map_or_get_string,value){
			if(_.isElement(el)){
				var name_or_map = (_.isNotEmpty(name_or_map_or_get_string) && name_or_map_or_get_string!==true) ? 
										name_or_map_or_get_string : null; 
				if(name_or_map){
					if(_.isString(name_or_map)){
						if(name_or_map=="style")
							return this.style(el,value);
						else if(name_or_map=="class"){
							if(_.isNotEmpty(value))
								el.className=value;
							else
								return el.className;
						}
						else if(_.isNotEmpty(value))
							el.setAttribute(name_or_map,value);
						else
							return el.getAttribute(name_or_map);
					}
					else if(_.isObject(name_or_map)){
						_.each(name_or_map, function(attr_name){
							if(_.isNotEmpty(name_or_map[attr_name]))
								el.setAttribute(attr_name,name_or_map[attr_name]);
						});
					}
				}
				else{
					var attrs = el.attributes;
					var print_string = (name_or_map_or_get_string===true);
					if(attrs.length>0)
						return ( print_string ? "" : {} );
					
					var ret = print_string ? " " : {};
					var attr=null;
					var apix=null;
					for(var i=0;i<attrs.length;i++){
						attr = attrs.item(i);
						if(print_string){
							apix = attr.nodeValue.indexOf('"')>=0 ? "'" : '"';
							ret+=attr.nodeName+"="+apix+attr.nodeValue+apix+" ";
						}
						else
							ret[attr.nodeName] = attr.nodeValue;
					}
					return ret;
				}
			}
		},
		
		removeAttr: function(el, name_or_array){
			if(_.isElement(el)){
				_.callOn(function(name){
					el.removeAttribute(name);
				},name_or_array);
			}
		},
		
		css : function(el,name_or_map,value){
			if((_.isNotEmpty(name_or_map)) && _.isElement(el)){
				if(_.isString(name_or_map)){
					if(_.isNotEmpty(value))
						el.style[name]=value;
					else
						return el.style[name];
				}
				else if(_.isObject(name_or_map)){
					_.each(name_or_map, function(css_rule){
						if(_.isNotEmpty(name_or_map[css_rule]))
							el.style[css_rule]=name_or_map[css_rule];
					});
				}
			}
		},
		
		style : function(el, value){
			if(_.isElement(el)){
				if(_.isNotEmpty(value)){
					if(_.isString(el.style.cssText))
						el.style.cssText=value;
					el.setAttribute('style',value);
				}
				else{
					var css=el.style.cssText;
					if(!_.isString(css))
						css=el.getAttribute('style');
					return css;
				}
			}
		},
		
		show : function(el){
			if(_.isElement(el))
				el.style.display="block";
			else 
				this.callOnArray("show",null,el);
		},
		
		hide : function(el){ 
			if(_.isElement(el))
				el.style.display="none";
			else 
				this.callOnArray("hide",null,el);
		},
		
		html : function(el, new_html_or_include_element){
			if(new_html_or_include_element!=null && new_html_or_include_element!==true){
				if(_.isDOM(el)){
					el.innerHTML="";
					this.addHtml(el,new_html_or_include_element);
				}
				else if(_.isArray(el)){
					var prev_arr_size = el.length;
					this.addHtml(el,new_html_or_include_element);
					var removed = el.splice(0,prev_arr_size);
					this.removeChildren(removed);
				}
			}
			else{
				if(_.isDOM(el)){
					if(new_html_or_include_element===true){
						var tag_name = this.tagName(el.tagName); 
						return "<"+tag_name+" "+this.attr(el, true)+" >"+el.innerHTML+"</"+tag_name+">";
					}
					else
						return el.innerHTML;
				}
				else if(_.isArray(el))
					return this.callOnArray("html",[true],el,true);
				else
					return null;
			} 
		},
		
		/**
		 * Adds an HTML string or element (or an array of them) to the el object (an Element object or an array of them).
		 * If prepend is true adds the html on the beginning of the element, else appends it on the end.
		 * If outside_el is true, the html will be added after or before the el element.
		 */
		addHtml : function(el, html, prepend, outside_el, dont_remove){
			html = this.getInFragment(html, dont_remove);
			
			var parent = outside_el ? this.parent(el) : (_.isDOM(el) ? el : this.parent(el)); 
			if(parent){
				var child_after = (prepend) ? ( _.isArray(el) ? this.first(el) : (outside_el ? el : this.first(el)) ) 
											: ( _.isArray(el) ? this.after(this.last(el)) : (outside_el ? this.after(el) : null) );
				this.addHtmlInDom(el, html, child_after);
			}
			if(_.isArray(el) && (!outside_el))
				_.add(html,el,prepend);
		},
		
		parent : function(el){
			if(_.isFragment(el)){
				var first = this.first(el);
				return first ? first.parentNode : null;
			}
			else if(_.isDOM(el))
				return el.parentNode;
			// TODO: in caso di fragment deve prendere pure il parent del primo figlio...
			else if(_.isArray(el) && el.length>0)
				return el[0].parentNode;
			else
				return null;
		},
		
		hasChildren : function(el){
			if(_.isDOM(el))
				return (el.childNodes && el.childNodes.length>0);
			else if(_.isArray(el))
				return el.length>0;
			else
				return false;
		},
		
		/**
		 * Selects the children of an element (or a generic subset of nodes, if the element argument is an array of DOM nodes..) by their tag
		 * and eventually in a specified children subset.
		 * If tags attribute is undefined, the method will keep all DOM nodes. If it's the true value it will keep
		 * all the HTMLElement DOM, if it's the false value it will keep all the NON-HTMLElement DOMs, and if it's a string or array of strings
		 * it will keep all the HTMLElement(s) with that tag(s). If exlude_tags is true, tags specified in the tags parameter will be excluded
		 * (the exclude_tags parameter will be considered only if the tags parameter is a string or array of strings).
		 * If from_child or to_child are passed, only selected children will be checked and returned; if from_child is not found it will be 
		 * the first child, if to_child is not found it will be the last child. 
		 */
		children : function(element,tags,exclude_tags,from_child,to_child){
			var result=new Array();
			var elem_children = _.isDOM(element) ? element.childNodes : ( _.isArray(element) ? element : null);
			/* Eventually select children to check and return */
			if(_.isNullOrEmpty(elem_children))
				return result;
			
			var from_pos = from_child ? _.indexOf(elem_children,from_child) : 0;
			var to_pos = to_child ? _.indexOf(elem_children,to_child) : elem_children.length-1;
			if(from_pos<0)
				from_pos=0;
			if(to_pos<0)
				to_pos=elem_children.length-1;
			for(var i=from_pos;i<=to_pos;i++)
				result.push(elem_children[i]);
			
			return (tags!=null && result.length>0) ? this.selectChildrenByTag(result, tags, exclude_tags) : result;
		},
		
		selectChildrenByTag : function(nodes, tags, exclude_tags){
			var result=new Array();
			var force_not_elements = (tags===false);
			var force_tags = _.isArray(tags) ? tags : (_.isString(tags) ? [tags] : new Array());
			var force_elements = (tags===true || force_tags.length>0);
			_.each(nodes, function(_node){
				var node_ok = force_elements ? _.isElement(_node) : ( force_not_elements ? (!_.isElement(_node)) : true);
				if(node_ok && force_tags.length>0)
					node_ok = exclude_tags ? (!_.weakInclude(force_tags, this.tagName(_node))) : 
							_.weakInclude(force_tags, this.tagName(_node)); 
				if(node_ok)
					result.push(_node);
			},this);
			return result;
		},
		
		
		child : function(el, index){
			var children = this.children(el);
			return _.getInArray(children,index);
		},
		
		
		
		/**
		 * Select function has to return true if the element has to be returned
		 */
		findParents : function(el, select_function, depth_levels, return_first, this_in_fn){
			return _.recursiveSelect(el, function(elem){
				return _.$(elem).parent();
			}, select_function, true, depth_levels, return_first, this_in_fn);
		},
		
		/**
		 * Select function has to return true if the element has to be returned
		 */
		findChildren : function(el, select_function, depth_levels, return_first, this_in_fn){
			return _.recursiveSelect(el, function(elem){
				return _.$(elem).children();
			}, select_function, true, depth_levels, return_first, this_in_fn);
		},
		
		
		
		
		clone : function(el,dont_clone_children){
			if(_.isArray(el))
				return this.callOnArray("cloneDom",[dont_clone_children],el);
			else 
				return this.cloneDom(el,dont_clone_children);	
		},
		
		
//////////////////////////////////////////////////////////////////////////////////////////////
		// Functions that directly manipulates DOM nodes

		/**
		 * Create a new DOM element from tagName, attributes map and HTML content (string, HtmlElements or an array of both).
		 * If tagName is null, creates a new documentFragment.
		 */ 
		newDOM : function(tagName,attributes,content){
			var is_fragment = (_.isNullOrEmpty(tagName));
			var elem = is_fragment ? document.createDocumentFragment() : document.createElement(tagName);
			if(attributes && (!is_fragment)) 
		    	this.attr(elem,attributes);
		    if(content)
		    	this.addHtml(elem,content); 
		    return elem;
		}, 
		
		/**
		 * Parses a string and returns a DocumentFragment with the parsed result.
		 */
		parseDom : function(html_string){
			var frag = document.createDocumentFragment();
			frag.innerHTML = html_string;
			return frag;
		},
		
		cloneDom : function(el,dont_clone_children){
			return el.cloneNode(!dont_clone_children);
		},
		
		addHtmlInDom : function(el, html_node, child_after){
			if(child_after)
				el.insertBefore(html_node,child_after);
			else
				el.appendChild(html_node);
		},
		
		removeDom : function(el, child){
			el.removeChild(child);
		},
		
		
//////////////////////////////////////////////////////////////////////////////////////////////
		
		
		isDOM: function(elem){
			return (elem!=null && (_.is(elem,_.FNs.Dom) || _.isDOM(elem)));
		},
		
		/**
		 * Html can be a Dom Element, a string to be parsed or an array of them.
		 */
		getInFragment : function(html, dont_remove_elements){
			if( _.isDOM(html) && (!dont_remove_elements) )
				return html;
			var frag = document.createDocumentFragment();
			_.callOn(function(_html){
				if(_.isString(_html))
					_html = this.parseDom(html_string);
				else if(dont_remove_elements && _.isDOM(_html))
					_html = this.clone(_html);
				if(_.isDOM(_html))
					this.addHtmlInDom(frag, _html);
			}, html, this);
			return frag;
		},
		
		prepend : function(el, html, dont_remove){
			this.addHtml(el, html, true, false, dont_remove);
		},
			
		prependTo : function(el, dest_el, el_in_dest_to_add_before, dont_remove){
			if(el_in_dest_to_add_before)
				this.before(el_in_dest_to_add_before, el, dont_remove);
			else
				this.prepend(dest_el,el,dont_remove);
		},
		
		append : function(el, html, dont_remove){
			this.addHtml(el, html, false, false, dont_remove);
		},
		
		appendTo : function(el, dest_el, el_in_dest_to_add_after, dont_remove){
			if(el_in_dest_to_add_after)
				this.after(el_in_dest_to_add_after, el, dont_remove);
			else
				this.append(dest_el,el,dont_remove);
		},
		
		before : function(el, html, dont_remove){
			if(html)
				this.addHtml(el, html, true, true, dont_remove);
			else{
				if(_.isDOM(el) && !_.isFragment(el))
					return el.previousSibling;
				else if(_.isArray(el) && _.isNotEmpty(el))
					return el[0].previousSibling;
				else
					return null;
			}
		},
		
		after : function(el, html, dont_remove){
			if(html)
				this.addHtml(el, html, false, true, dont_remove);
			else{
				if(_.isDOM(el) && !_.isFragment(el))
					return el.nextSibling;
				else if(_.isArray(el) && _.isNotEmpty(el))
					return el[0].nextSibling;
				else
					return null;
			}	
		},
		
		deeper : function(el, root_parent, children_already_visited){
			if(_.isDOM(el)){
				var after;
				if(!children_already_visited){
					after = _.DOM.first(el);
					if(after!=null)
						return after;
				}
				after = _.DOM.after(el);
				if(after!=null)
					return after;
				else{
					var result=null;
					var parent = _.DOM.parent(el);
					while(parent!=root_parent){  // if root_parent is null it's the highest parent, else the root_parent itself
						result = _.DOM.after(parent);
						if(result!=null)
							return result;
						else
							parent = _.DOM.parent(parent);
					}
					return null;
				}					
			}
		},
		
		first : function(el, html, dont_remove){
			if(html)
				this.prepend(el, html, dont_remove);
			else{
				if(_.isDOM(el))
					return el.firstChild;
				else if(_.isArray(el) && _.isNotEmpty(el))
					return el[0];
				else
					return null;
			}
		},
		
		last : function(el, html, dont_remove){
			if(html)
				this.append(el, html, dont_remove);
			else{
				if(_.isDOM(el))
					return el.lastChild;
				else if(_.isArray(el) && _.isNotEmpty(el))
					return el[el.length-1];
				else
					return null;
			}
		},
	
		/**
		 * Removes the element from the parent DOM
		 */
		remove : function(element){
			var parent=this.parent(element);
			if(parent){
				if(_.isDOM(element)){
					var children=parent.childNodes;
					if(children.length>0){
						var pos = _.indexOf(children, element);
						if(pos>=0)
							this.removeDom(parent, children[pos]);
					}
				}
				else if(_.isArray(element) && element.length>0)
					this.removeChildren(parent, element[0], element[element.length-1]);
			}
		},
		
		/**
		 * Removes child nodes from element, optionally specifying starting and ending children and returning the number of removed children.
		 * If starting or ending children are specified and not found, the function does nothing and returns -1.
		 * If starting child is not specified, it will be the first child; if ending child is not specified, it will be the last children.
		 * If neither starting nor ending child is specified, the function removes all children. 
		 */
		removeChildren : function(element, from_child, to_child){
			var children_nodes = _.isArray(element) ? element : element.childNodes;
			var parent = this.parent(children_nodes);
			if( (_.isNotEmpty(children_nodes)) && parent){
				var from_pos = from_child ? _.indexOf(children_nodes,from_child) : 0 ;
				var to_pos = to_child ? _.indexOf(children_nodes,to_child) : (children_nodes.length-1);
				if((from_child || to_child) && (from_pos<0 || to_pos<0))
					return -1;
				var how_many=to_pos-from_pos+1;
				for(var i=0;i<how_many;i++){
					// This way the method really do the job... Else, there's a strange malfunction.. 
					this.removeDom(parent, children_nodes[from_pos]);
				}
				return how_many;
			}
			else
				return 0;
		},
		
		/**
		 * Replaces a DOM object with another
		 */
		replace : function(old_dom, new_dom){
			this.after(old_dom, new_dom);
			this.remove(old_dom);
		},	
		
		changeDom : function(el, tag, attributes){
			var inner = this.innerDom(el, true);
			var new_el = this.newDOM(tag, attributes, inner);
			this.replace(el, new_el);
			return new_el;
		},
		
		/**
		 * Extract HTML content of a node. Previous HTML content is removed from the original element,
		 * if remove_content argument is true; else, previous content is leaved.
		 * The innerHTML of the element is returned as a documentFragment: if you append it to 
		 * another DOM node, only its content will be inserted (not the 'container' fragment).
		 * Internally invokes the children function: see it for from_child, to_child, tags and exclude_tags parameters meaning.
		 */
		innerDOM : function(element,remove_content,from_child,to_child,tags,exclude_tags){
			if(element==null)
				return null;
			var result=document.createDocumentFragment();  
			
			/* Eventually select children to append */
			var elem_children = this.children(element,tags,exclude_tags,from_child,to_child);
			if(_.isNullOrEmpty(elem_children))
				return result;
			_.each(elem_children, function(child){
				if(remove_content)
					this.append(result,child);
				else{
					var clone=this.clone(child);
					this.append(result,clone);
				}
			});
			
			return result;
		},
		
		
		/**
		 * Embeds all HTML content of the element argument in a single child element, allowing to
		 * specify its tag name and attributes.
		 */
		embedInnerDOM : function(element,tagName,attributes,from_child,to_child,tags,exclude_tags){
			var inner=this.innerDOM(element,true,from_child,to_child,tags,exclude_tags);
			var child=this.newDOM(tagName,attributes,inner);
			this.append(element,child); 
			return child;
		},
		
		/**
		 * Utility function: embeds element children in the 'children tag' tag. 
		 * If embed_always is false, the method embeds the children only if at least one element child 
		 * has the 'children tag' tag, otherwise leaves the content as is.
		 * If 'attribute_function_or_object' is not null, it will be invoked with the 'children_tag' and
		 * the inner content arguments, to get attributes to add to the children elements. If the
		 * argument is an object instead of a function, it will be treated as the direct attribute object 
		 */
		embedChildren : function(element, children_tag, embed_always, right_tags, attribute_function_or_object){
			var result=document.createDocumentFragment();  
			var elem_children = _.isArray() ? element : element.childNodes;
			if(_.isNullOrEmpty(elem_children))
				return;
			right_tags=_.addAsFirst(right_tags, children_tag);
			var child=null;
			var one_at_least=false;
			var pos=0;
			var starting_pos=-1;
			while(pos<elem_children.length){
				child = elem_children[pos];
				if(_.isDOM(child)){
					if(_.isElement(child) && _.weakInclude(right_tags,this.tagName(child))){
						if(starting_pos>=0){
							// we found previously one or more nodes to embed: embed them!
							this.embedSelectedChildren(element,elem_children,starting_pos,pos-1,result,
									children_tag,attribute_function_or_object);
							pos=starting_pos;
							starting_pos=-1;
						}
						this.append(result,child);
						one_at_least=true;
					}
					else{
						if(starting_pos<0)
							starting_pos=pos;
						pos++;
					}
				}
				else
					pos++;
			}
			if(starting_pos>=0){
				// we still have some node to embed: if needed, embed them!
				if((!one_at_least) && (!embed_always))
					return;
				else
					this.embedSelectedChildren(element,elem_children,starting_pos,elem_children.length-1,
							result,	children_tag,attribute_function_or_object);
			}
			this.removeChildren(element);
			this.append(element,result); 
		},
		
		// Used internally from this.embedChildren...
		embedSelectedChildren : function(element,children,from_pos,to_pos,result,
				children_tag,attribute_function_or_object){
			var inner=this.innerDOM(element, true, children[from_pos], children[to_pos]);
			var attrs = (attribute_function_or_object!=null) ? (_.isFunction(attribute_function_or_object) ? 
					attribute_function_or_object.call(null,children_tag,inner) : attribute_function_or_object) : null;
			var new_dom=this.newDOM(children_tag, attrs, inner);
			this.append(result,new_dom);
		},
		
		
		
		find : function(element, selector){
			var arr=new Array();
			if(_.isArray(element)){
				_.each(element, function(elem){
					arr.push(this.elemsBySelector(selector,elem));
				},this);
			}
			else if(_.isDOM(element))
				arr.push(this.elemsBySelector(selector,element));
			return arr;
		},
		

		
		/**
		 * Returns a string representation of the DOM object
		 */
		toString : function(dom,print_children){
			if(dom==null)
				return "null";
			var ret = _.isDOM(dom) ? ("" + dom.nodeName + (this.attr(dom,"id") ? this.attr(dom,"id") : "")) : 
				( _.isArray(dom) ? "Fragment object" : "");
			if(print_children){
				var children=this.children(dom);
				if(_.isNotEmpty(children)){
					ret+=", "+children.length+" children: [ ";
					_.each(children, function(child){
						ret+=" "+this.toString(child)+", ";
					});
					ret+=" ]";
				}
				else
					ret+=", 0 children";
			}
			return ret;
		},
		
		elemsByString : function(selector, context_node){
			var elems=new Array();
			if(_.isString(selector)){
				if(selector.toLowerCase()=="body")
					elems.push(document.body);
				else if(_.startsWith(selector,"#"))  
					elems.push(document.getElementById(selector.substring(1,selector.length)));
				else{ 
					var context = _.isDOM(context_node) ? context_node : document;
					var node_list=context.getElementsByTagName(selector);
					for(var i=0;i<node_list.length;i++)
						elems.push(node_list.item(i));
				}
			}
			return elems;
		},
		
		elemsByObject : function(node_obj){
			if(node_obj!=null){
				if(node_obj instanceof _.FNs.DomQuery)
					return node_obj.elem;	
				else if(node_obj instanceof _.FNs.Dom)
					return [node_obj.elem];	
				else if(_.isDOM(node_obj)){
					if(_.isFragment(node_obj))
						return [node_obj.childNodes];
					else
						return [node_obj];
				}
				else if(_.isArray(node_obj))
					return node_obj;
				else
					return new Array(node_obj);
			}
			else
				return new Array();
		},
		
		elemsBySelector : function(selector, context_node){
			return _.isNotEmpty(selector) ? ( ( _.isString(selector) ? _.DOM.elemsByString(selector, context_node) : this.elemsByObject(selector)) )
						: new Array();
		},
		
		
////////////////////////////////////////////////////////////////////////////////////////////
		/* Data extraction functions */
		
		/**
		 * Data extraction options
		 */	
		data_opts: {
				data_attributes_prefix : "data-",
				tag_attribute : "data-tag",
				data_children_tag : "data",
				data_children_key : "key",
				data_children_value : "value",
				children_field : "children"	
		},

		/**
		 * Returns the tag name of the DOM, accepting data overriding 
		 */
		tagName : function(element){
			if(!_.isElement(element))
				return null;
			var standard_form=this.tagInStandardForm(element);
			return (standard_form!=null ? standard_form : element.tagName.toLowerCase()); 
		},
		
		/**
		 * Returns the data overriding of the DOM tag (possibly null)
		 */
		tagInStandardForm : function(element){
			var attr=this.attr(element,this.data_opts.tag_attribute);
			return (attr!=null ? attr.toLowerCase() : null);
		},
		
		/**
		 * Assuming the element argument is an appML div, this method tells if it's written
		 * in the standard form (with data-appml- attributes)
		 */
		hasStandardSintax : function(element){
			return (this.tagInStandardForm(element)!=null);
		},
		
		/**
		 * Commodity function to give the right data tags in the extraction functions
		 */
		getDataTags : function(datatags, skip_datatags_test){
			var tags_ok = (skip_datatags_test) ? ( (_.isNotEmpty(datatags)) ? datatags : new Array() ) : [this.data_opts.data_children_tag];
			if(!skip_datatags_test)
				_.add(datatags, tags_ok);
			return tags_ok;
		},
		
		/**
		 * Checks if the element contains data: if datatags are passed, any element with one of the specified tags will be considered a data element.
		 * Moreover, data attributes and children with the 'data' tag will be checked.
		 * The parameter skip_datatags_test is used to indicate that datatags are already been checked... 
		 * TODO : mi sa che non lo stiamo usando più... lo cacciamo?
		 */
		hasData : function(element, datatags, skip_datatags_test){
			if(!_.isDOM(element))
				return false;
			var tags_ok=this.getDataTags(datatags,skip_datatags_test);
			if(_.weakInclude(tags_ok,this.tagName(element)))
				return true;
			
			if(_.detect(element.attributes,function(attr){
				return _.startsWith(attr.nodeName,this.data_opts.data_attributes_prefix);
			})!=null) 
				return true;
			
			var children = this.children(element);
			return (_.detect(children,function(child){
				return _.weakInclude(tags_ok,this.tagName(child));
			})!=null);
		},
		
		
		
		/**
		 * Extract attributes from the specified element. If attributes is a string array, reads only specified attributes.
		 * Else, if attributes is true (or not falsy), reads all data attributes (attributes prefixed with the attribute_prefix constant).
		 * If attributes is the false value, reads all dom (non-data) attribute, while if it's another falsy value, reads all element attributes.
		 * If remove is true, removes the attributes.
		 * Return attributes in a key-value pairs object. If object_to_extend is passed it will be extended, else a new object will be created. 
		 */
		attributes : function(element, attributes, parse_objects, remove, object_to_extend){
			var ret = _.isObject(object_to_extend) ? object_to_extend : {};
			if(!_.isDOM(element))
				return ret;
			var attributes_found=new Array();
			var name=null;
			var is_data=false;
			var attr_ok=false;
			var value=null;
			// Get desired attributes
			_.each(element.attributes,function(attr){
				is_data = _.startsWith(attr.nodeName,this.data_opts.data_attributes_prefix);
				name = is_data ? attr.nodeName.substring(this.data_opts.data_attributes_prefix.length) : attr.nodeName;
				if(attributes || (attributes===false)){
					if(_.isArray(attributes)) 
						attr_ok = _.weakInclude(attributes,name);
					else 
						attr_ok = (attributes===false) ? (!is_data) : is_data;
				}
				else
					attr_ok = true;
				if(attr_ok){
					value = (_.isNotEmpty(attr.nodeValue)) ? (parse_objects ? _.parse(attr.nodeValue) : attr.nodeValue) : "";
					_.extendProp(ret, name, value, true); 
					attributes_found.push(name);
				}
			});
			// Remove attributes
			if(remove){
				_.each(attributes_found, function(attr){
					element.removeAttribute(attr);
				});
			}
			return ret;
		},
		
		/**
		 * Extracts only data attributes from the element. Other parameters are similar to the attributes function
		 */
		dataAttributes : function(element, parse_objects, remove, object_to_extend){
			return this.attributes(element, (this.hasStandardSintax(element) ? true : null), parse_objects, remove, object_to_extend);
		},
		
		/**
		 * Extracts only non-data attributes from the element. Other parameters are similar to the attributes function
		 */
		domAttributes : function(element, parse_objects, remove, object_to_extend){
			return this.attributes(element, false, parse_objects, remove, object_to_extend);
		},
		
		/**
		 * Returns a new array that embeds continous non-data elements contained in the 'children' array in single data objects
		 */
		embedNonDataChildren : function(children){
			var new_children=new Array();
			var temp=new Array();
			var new_data=null;
			_.each(children,function(elem){
				if(_.isObject(elem)){
					if(temp.length>0){
						// append eventual non-data childrens
						new_data={};
						new_data[this.data_opts.data_children_tag] = temp;
						new_children.push(new_data);
						temp=new Array();
					}
					// append the data element
					new_children.push(elem);
				}
				else
					temp.push(elem);
			});
			if(temp.length>0){
				new_data={};
				new_data[this.data_opts.data_children_tag] = temp;
				new_children.push(new_data);
			}
			return new_children;
		},
		
		/**
		 * Returns an object containing all data information contained in the element (either as attributes or data children and, if specified, 
		 * children with custom subtags).
		 * If deep is the 'false' value only attributes and data children will be extracted; if it assumes another falsy value, 
		 * only the element children will be extracted; else, if it's not falsy, all children with the selected tags will be recursively extracted.
		 */
		data : function(element, datatags, parse_objects, remove, deep, embed_children, skip_datatags_test){
			var first_vars = {
				children : new Array(),
				tags_ok : this.getDataTags(datatags,skip_datatags_test),
				deep: deep,
				embed_children: embed_children
			};
			
			return _.recursiveCall(element, function(elem, vars){
				// before recursion
				
				// extract attributes
				vars.ret=this.dataAttributes(elem,parse_objects,remove);
								
			}, function(elem){
				// next recursion objects
				
				return _.isDOM(elem) ? this.children(elem) : 
					((_.isObject(elem) && elem[this.data_opts.children_field]) ? elem[this.data_opts.children_field] : null);
				
			}, function(elem, vars, is_first, child, child_vars){
				// before each child recursion
				
				tag_name=this.tagName(child);
				is_data_tag = (tag_name==this.data_opts.data_children_tag);
				if(tag_name && ( (deep===false) ? is_data_tag : _.weakInclude(vars.tags_ok,tag_name) )){
					_.extendObj(child_vars, {
						// setting vars for the next recursion, like arguments...
						tag_name : tag_name,
						is_data_tag : is_data_tag,
						children : new Array(),
						tags_ok : (is_data_tag ? [this.data_opts.data_children_tag] : vars.tags_ok),
						deep : (deep ? true : false),
						embed_children : (is_data_tag ? false : embed_children)
					});
				}
				else
					child_vars.dom_element = true;
				
			}, function(elem, vars, is_first, child, value, child_vars){
				// after each child recursion
				
				if(child_vars.dom_element)
					vars.children.push(elem);
				else{
					if(child_vars.is_data_tag){
						var prop_name = ( _.isNotEmpty(value[this.data_opts.data_children_key]) ) ?  value[this.data_opts.data_children_key]
										: child_vars.tag_name;
						_.extendProp(vars.ret, prop_name, value, true);
					}
					else
						vars.children.push(value);
					
					if(remove)
						this.remove(child);
				}

			},			
			function(elem, vars, is_first){
				// after function
				
				var children = vars.children;
				var ret = vars.ret;
				// eventually embed continous non-data children in single data objects
				if(vars.embed_children)
					children=this.embedNonDataChildren(children);
				// put children objects in the return object
				if(children.length>0)
					_.extendProp(ret,this.data_opts.children_field, children, true);
				
				// if the data has only the 'value' field return directly its value 
				if(ret.length==1 && ret[this.data_opts.data_children_value])  
					return ret[this.data_opts.data_children_value];
				// set the tag attribute if not present
				if(!ret.tag)
					ret.tag = vars.tag_name;
				
				return ret;
				
			},this,first_vars);
			
		},
			
					
		
////////////////////////////////////////////////////////////////////////////////////////////
		/* Commodity functions to get or invoke _.DOM functions */
		
		getFn : function(function_or_name){
			if(_.isFunction(function_or_name))
				return function_or_name;
			else if(_.isString(function_or_name) && _.DOM[function_or_name])
				return _.DOM[function_or_name];
			else
				throw "_.DOM function "+function_or_name+" not found!";
		}, 
		
		callFn : function(fn, el, args){
			var _args = [el];
			if(_.isNotEmpty(args))
				_.add(args,_args);
			return fn.apply(this,_args);
		},
		
		callOnArray : function(function_or_name, function_arguments, _array, string_return){
			if(!_.isArray(_array)){
				var fn = _.isString(function_or_name) ? this[function_or_name] : function_or_name;
				if(!fn)
					throw "Function not found: "+function_or_name;
				var args=[""];
				_.add(function_arguments, args);
				var result = string_return ? "" : new Array();
				var res;
				for(var i=0;i<_array.length;i++){
					args[0]=_array[i];
					res=fn.apply(this,args);
					if(res){
						if(string_return)
							result+=res;
						else
							_.add(res, result);	
					}
				}
				return result;
			}
		},
		
		/* Returns an HTMLElement or an array of HTMLElement, or null, from an HTMLElement, _.Dom, or String */
		getDomElem : function(element){
			if(_.isDOM(element))
				return element;
			else if( _.is(element, _.FNs.Dom) )
				return element.get();
			else if(_.isString(element))
				return this.newDOM(element);
			else 
				return null;
		}
		
		
	};  // _.DOM end	
	
	
////////////////////////////////////////////////////////////////////////////////////////////
	/* Wrapping _.DOM utility functions on DOM objects, in a jQuery-like style */
	
	/**
	 * An abstract function to map DOM utility methods to single objects.
	 * This function has to be extended implementing two methods: init (for the object initialization) and get (to get the referred HTMLElement)
	 */
	_.FNs.Dom = function(){
		this.init(arguments);
	};
	_.FNs.Dom.prototype = {
			
		getResult : function(result, return_result, chainable_result){
			if(return_result){
				if(chainable_result)
					return _.$(result);
				else
					return result;
			}
			else
				return this;
		},
		
		adjustArgument : function(arg){
			if(_.is(arg, _.FNs.Dom)){
				var dom=arg.get();
				/*
				if(_.isArray(dom) && dom.length==1)
					return dom[0];
				else
					*/return dom;
			}
			else
				return arg;
		},
		adjustArguments : function(args){
			if(_.isArray(args)){
				for(var i=0;i<args.length;i++)
					args[i] = this.adjustArgument(args[i]);
				return args;
			}
			else
				return this.adjustArgument(args);
		},
		
		callDom : function(function_or_name, function_arguments, return_result, chainable_result, dont_call_if_fragment){
			var result=null;
			var element=this.get();
			if(_.isNotEmpty(element)){
				if(! (_.isArray(element) && dont_call_if_fragment) ){
					var fn = _.DOM.getFn(function_or_name);
					function_arguments = this.adjustArguments(function_arguments);
					result = _.DOM.callFn(fn, element, function_arguments);
				}
			}
			return this.getResult(result, return_result, chainable_result);
		},
		
		getOrSet : function(function_or_name, name, value){
			return this.callDom(function_or_name, (name ? [name,value] : [value]), (value==null), false, true);
		},
		
		
		
////////////////////////////////////////////////////////////////////////////////////////////
		/* _.DOM wrapping functions */
		
		getArray : function(){
			var ret=this.get();
			return _.isArray(ret) ? ret : [ret];
		},
		attr : function(name_or_map,value){
			return this.callDom("attr", arguments, (value==null)); 
		},
		css : function(name_or_map,value){
			return this.callDom("css", arguments, (value==null));
		},
		style : function(value){
			return this.callDom("style", arguments, (value==null));
		},
		html : function(value){
			return this.callDom("html", arguments, (value==null));
		},
		show : function(){ 
			return this.callDom("show", arguments); 
		},
		hide : function(){ 
			return this.callDom("hide", arguments); 
		},
		remove : function(){ 
			return this.callDom("remove", arguments);
		},
		
		
		
////////////////////////////////////////////////////////////////////////////////////////////
		/* DOM children insertion or selection  */
		
		replace : function(new_dom){
			return this.callDom("replace",arguments);
		},
		clone : function(){
			return this.callDom("clone",null,true,true);
		},
		parent : function(){
			return this.callDom("parent",null,true,true);
		},
		child : function(index){
			return this.callDom("child",arguments,true,true);
		},
		children : function(tags,exclude_tags,from_child,to_child){
			return this.callDom("children",arguments,true,true);
		},
		/**
		 * Query the element(s) of this DOM 
		 */
		find : function(selector){
			return this.callDom("find",arguments,true,true);
		},
		findParents : function(select_function, depth, return_first, this_in_fn){
			return this.callDom("findParents",arguments,true,true);
		},
		findChildren : function(select_function, depth, return_first, this_in_fn){
			return this.callDom("findChildren",arguments,true,true);
		},
		removeChildren : function(from_child, to_child){
			return this.callDom("removeChildren", arguments);
		},
		changeDom : function(tag,attributes){
			var new_dom = this.callDom("changeDom",arguments,true);
			this.init(new_dom);
			return this;
		},
		innerDOM : function(remove_content,from_child,to_child,tags,exclude_tags){
			return this.callDom("innerDOM", arguments, true);
		},
		embedInnerDOM : function(tagName,attributes,from_child,to_child,tags,exclude_tags){
			return this.callDom("embedInnerDOM",arguments);
		},
		embedChildren : function(children_tag, embed_always, right_tags, attribute_function_or_object){
			return this.callDom("embedChildren",arguments);
		},
		
		first : function(dom_element, dont_remove){
			return this.callDom("first",arguments,(dom_element==null));
		},
		last : function(dom_element, dont_remove){
			return this.callDom("last",arguments,(dom_element==null));
		},
		before : function(dom_element, dont_remove){
			return this.callDom("before",arguments,(dom_element==null));
		},
		after : function(dom_element, dont_remove){
			return this.callDom("after",arguments,(dom_element==null));
		},
		
		
		append : function(dom_element, dont_remove){
			return this.callDom("append",arguments);
		},
		appendTo : function(dom_element, dont_remove){
			return this.callDom("appendTo",arguments);
		},
		prepend : function(dom_element, dont_remove){
			return this.callDom("prepend",arguments);
		},
		prependTo : function(dom_element, dont_remove){
			return this.callDom("prependTo",arguments);
		},		
		
		
		data : function(remove, dont_parse_objects, datatags){
			return this.callDom("data",[datatags,(!dont_parse_objects),remove],true);
		},
		
		toString : function(print_children){
			return this.callDom("toString",arguments,true);
		}
		
	};
	
	
	
	/**
	 * Maps DOM method on a single DOM element, or on a light-weight DocumentFragment (an array of children, not removed from their parent). 
	 * If element is a string, a new Element with that tag will be created and the second and third parameters are interpreted as the element
	 * attributes and its innerHTML (can be a string, an HTMLElement or an array of them). 
	 */
	_.FNs.DomElement = _.extendFn(_.FNs.Dom, {
	
		/**
		 * Initializes the Dom object 
		 */
		init : function(element, from_child_or_attributes, to_child_or_inner_html){
			this.elem = _.DOM.getDomElem(element);
			if(this.elem && (from_child_or_attributes || to_child_or_inner_html)){
				if(_.isString(element)){ // element is been parsed: the remaining arguments are attributes and inner html
					if(from_child_or_attributes) 
				    	_.DOM.attr(this.elem,from_child_or_attributes);
				    if(to_child_or_inner_html)
				    	_.DOM.addHtml(this.elem,to_child_or_inner_html); 
				}
				else
					this.elem = this.children(element, null, null, from_child_or_attributes, to_child_or_inner_html);
			}
		},
		
		/**
		 * Gets the HTMLElement mapped by this Dom object
		 */
		get : function(index){
			if(_.isArray(this.elem)){
				if(!_.is(index))
					return _.getInArray(this.elem,index);
				else
					return  _.weakClone(this.elem);
			}
			else
				return this.elem;
		}
		
	});
	
	
	
	
	
	
	
	/**  
	 * Query for elements or construct directly from an array of objects, and wraps _.Dom functions on result with chainability.
	 * 
	 * If selector is a string or an array and context_node_or_from_child_or_attributes is a DOM element, or it's null, you'll execute
	 * a DOM query and get the result; in this case:
	 * selector can be a single element or an array of elements, and each element can be a string (containing the tag name or, prefixed by #, 
	 * the id of the desired element(s)), or another HoopElement or Query object (all its elements will be appended in the result), or a
	 * DOM element (only if selector is an array). If context_node_or_from_child_or_attributes is a DOM Element, it will be the parent element 
	 * to resolve the selector string (or the strings in the selector array).
	 * 
	 * In other cases, the Query will construct an Element object with the arguments and sets it as the only element in the result array.  
	 * So, you can:
	 * - construct new DOMs specifying tagName (string), attributes (object) and innerHTML (string, DOM object or array of them) 
	 * (attributes MUST be not null, also an empty object or the true value is good, otherwise you will execute a query)
	 * - construct the Element from a DOM element (if selector is a DOM and other parameters are null) or a fragment (
	 * if selector is a DOM and one of the other parameters specifies a starting or ending child, or if selector is an array and the 
	 * second parameter is the true value)  
	 */
	_.FNs.DomQuery = _.extendFn(_.FNs.Dom, {
		
////////////////////////////////////////////////////////////////////////////////////////////
		/* Initialization functions */
		
		init : function(selector, context_node_or_from_child_or_attributes, to_child_or_inner_html){
			this.elems=new Array();
			if(_.isNotEmpty(selector)){
				if(this.isQuery(selector, context_node_or_from_child_or_attributes, to_child_or_inner_html)){
					if(_.isArray(selector))
						_.each(selector,function(sel){
							_.add( _.DOM.elemsBySelector(sel, context_node_or_from_child_or_attributes), this.elems );
						},this);	
					else 
						_.add( _.DOM.elemsBySelector(selector, context_node_or_from_child_or_attributes), this.elems );
				}
				else{
					// one can pass an object with the desired attributes or the true value to create a new DOM, so adjust it...
					if(context_node_or_from_child_or_attributes===true)
						context_node_or_from_child_or_attributes = {};
					var obj = new _.FNs.DomElement(selector, context_node_or_from_child_or_attributes, to_child_or_inner_html);
					_.add( obj.get(), this.elems );
				}
			}
		},
		
		get: function(index){
			return _.getInArray(this.elems,index);
		},
		
		
////////////////////////////////////////////////////////////////////////////////////////////
		/* Elements utility functions */
			
		isQuery : function(selector, context_node_or_from_child_or_attributes, to_child_or_inner_html){
			return ( selector==null || ( (_.isString(selector) || _.isArray(selector)) && (context_node_or_from_child_or_attributes==null || 
					_.isDOM(context_node_or_from_child_or_attributes)) ) ) ;
		},
		
		size : function(){ 
			return this.elems.length; 
		},
		
		getDomObject: function(index){
			return _.$(this.get(index));
		},
		
		all: function(){
			var arr=new Array();
			for(var i=0;i<this.elems.length;i++)
				arr.push(this.getDomObject(i));
			return arr;
		},
		
		// TODO: inseriamo anche gli args? Servirebbero solo a richiamare funzioni già note però, perchè altrimenti con le funzioni 
		// inline non ha senso... E consideriamo SE, anzi DOVE bindare le funzioni...
		each : function(fn){
			var all=this.all();
			_.each(all,fn);
			return this;
		},
		
		// execute a function on the DOM elements (the each function instead invokes the function passing Query objects...)
		eachDom : function(fn){
			_.each(this.elems,fn);
			return this;
		},
		
		
////////////////////////////////////////////////////////////////////////////////////////////
		/* Redefine the callDom functions, called by the others... */
		
		callDom : function(function_or_name, function_arguments, return_result, chainable_result, dont_call_on_fragments){
			if(return_result && !chainable_result) 
				return this.getFirst(function_or_name, function_arguments, dont_call_on_fragments);
			else
				return this.callEach(function_or_name, function_arguments, return_result, chainable_result, dont_call_on_fragments);
		},
		
		getFirst : function(function_or_name, function_arguments, dont_call_on_fragments){
			var elem=this.getDomObject(0);
			return elem.callDom(function_or_name, function_arguments, true, false, dont_call_on_fragments);
		},
		
		callEach : function(function_or_name, function_arguments, return_result, chainable_result, dont_call_on_fragments){
			var arr=new Array();
			var all = this.all();
			this.each(all, function(elem){
				var result = elem.callDom(function_or_name, function_arguments, return_result, chainable_result, dont_call_on_fragments);
				if(result){
					if(chainable_result)
						result = _.DOM.elemsByObject(result);
					_.add(result, arr);
				}
			});
			return this.getResult(arr,return_result,chainable_result);
		}
		
	});
		
	
	
	
	
	/** Wraps the dom commodity functions returning the right DOM-helper... */
	_.$ = function(selector, context_node_or_from_child_or_attributes, to_child_or_inner_html){
		if(_.is(selector,_.FNs.Dom))
			return selector;
		if(_.FNs.DomQuery.prototype.isQuery(selector, context_node_or_from_child_or_attributes, to_child_or_inner_html))
			return new _.FNs.DomQuery(selector, context_node_or_from_child_or_attributes, to_child_or_inner_html);
		else
			return new _.FNs.DomElement(selector, context_node_or_from_child_or_attributes, to_child_or_inner_html);
	};
	
	
	
	
