/**
 * @file jsoneditor.js
 * 
 * @brief 
 * JsonEditor is an editor to display and edit JSON data in a treeview. 
 * 
 * Supported browsers: Chrome, Firefox, Safari, Opera, Internet Explorer 8+ 
 * 
 * @license
 * This json editor is open sourced with the intention to use the editor as 
 * a component in your own application. Not to just copy and monetize the editor
 * as it is.
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy 
 * of the License at
 * 
 * http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 *
 * Copyright (C) 2011-2012 Jos de Jong, http://jsoneditoronline.org
 *
 * @author  Jos de Jong, <wjosdejong@gmail.com>
 * @date    2012-01-29
 */


// Internet Explorer 8 and older does not support Array.indexOf, 
// so we define it here in that case
// http://soledadpenades.com/2007/05/17/arrayindexof-in-internet-explorer/
if(!Array.prototype.indexOf) {
  Array.prototype.indexOf = function(obj){
    for(var i = 0; i < this.length; i++){
      if(this[i] == obj){
        return i;
      }
    }
    return -1;
  }
}

// define variable JSON, needed for correct error handling on IE7 and older
var JSON;

/**
 * JSONEditor
 * @param {HTML DOM} container    Container element
 * @param {Object or Array} json  JSON object
 */ 
JSONEditor = function (container, json) {
  // check availability of JSON parser (not available in IE7 and older)
  if (!JSON) {
    throw 'Your browser does not support JSON. \n\n' +
      'Please install the newest version of your browser.\n' +
      '(all modern browsers support JSON).';
  }

  if (!container) {
    throw 'No container element provided.';
  }
  this.container = container;

  this._preloadImages();

  this._createFrame();
  this._createTable();

  this.set(json || {});
}

JSONEditor.dragNode = undefined; // used when dragging

/**
 * Preload images for the editor
 */ 
JSONEditor.prototype._preloadImages = function() {
  // TODO: test if the preloading works.
  var img = {};

  img.add_gray = new Image(); 
  img.add_gray.src = "img/add_gray.png";
  img.add_green = new Image(); 
  img.add_green.src = "img/add_green.png";

  img.delete_gray = new Image(); 
  img.delete_gray.src = "img/delete_gray.png";
  img.delete_red = new Image(); 
  img.delete_red.src = "img/delete_red.png";

  img.duplicate_gray = new Image(); 
  img.duplicate_gray.src = "img/duplicate_gray.png";
  img.duplicate_blue = new Image(); 
  img.duplicate_blue.src = "img/duplicate_blue.png";

  img.move = new Image(); 
  img.move.src = "img/dots_gray.gif";

  img.treeDownTriangleBlack = new Image(); 
  img.treeDownTriangleBlack.src = "img/treeDownTriangleBlack.png";
  img.treeRightTriangleBlack = new Image(); 
  img.treeRightTriangleBlack.src = "img/treeRightTriangleBlack.png";

  this.img = img; // TODO: is this needed?
}

/**
 * Set JSON object in editor
 * @param {Object} json
 */ 
JSONEditor.prototype.set = function (json) {
  this.frame.removeChild(this.table);  // Take the table offline
  
  // replace the root node
  var node = new JSONEditor.Node({
    'value': json
  });
  this._setRoot(node);

  // expand up to a certain maximum level by default
  var maxLevel = 0;  // TODO: make an option for the default expansion level
  this.node.expand(maxLevel);

  this.frame.appendChild(this.table);  // Put the table online again
}

/**
 * Get JSON object from editor
 * @return {Object} json
 */ 
JSONEditor.prototype.get = function () {
  if (this.node) {
    return this.node.getValue();
  }
  else {
    return {};
  }
}

/**
 * Remove the root node from the editor
 */ 
JSONEditor.prototype.clear = function () {
  if (this.node) {
    this.node.collapse();
    this.tbody.removeChild(this.node.getDom());
    delete this.node;
  }
}

/**
 * Set the root node for the json editor
 * @param {JSONEditor.Node} node
 */ 
JSONEditor.prototype._setRoot = function (node) {
  this.clear();
  
  this.node = node;
  this.tbody.appendChild(node.getDom());
}

/**
 * Expand all nodes
 */ 
JSONEditor.prototype.expandAll = function () {
  if (this.node) {
    this.frame.removeChild(this.table);  // Take the table offline
    this.node.expand();
    this.frame.appendChild(this.table);  // Put the table online again
  }
}

/**
 * Collapse all nodes
 */ 
JSONEditor.prototype.collapseAll = function () {
  if (this.node) {
    this.frame.removeChild(this.table);  // Take the table offline
    this.node.collapse();
    this.frame.appendChild(this.table);  // Put the table online again
  }
}

/**
 * Create a new Node
 * @param {Object} params   Can contain parameters: level, field, fieldEditable, 
 *                          value.
 */ 
JSONEditor.Node = function (params) {
  if(params && (params instanceof Object)) {
    this.setField(params.field, params.fieldEditable);
    this.setValue(params.value);
  }
  else {
    this.setField();
    this.setValue();
  }

  this.expanded = false;
}

JSONEditor.Node.prototype.setField = function(field, fieldEditable) {
  this.field = field;
  this.fieldEditable = (fieldEditable == true);
}

JSONEditor.Node.prototype.getField = function() {
  this._getDomField();
  
  return this.field;
}

JSONEditor.Node.prototype.setValue = function(value) {
  // first clear all current childs (if any)
  var childs = this.childs;
  if (childs) {
    while (childs.length) {
      this.removeChild(childs[0]);
    }
  }
  
  // TODO: remove the DOM of this Node
  
  this.type = this._getType(value);
  if (this.type == 'array') {
    // array
    this.childs = [];
    for (var i = 0, iMax = value.length; i < iMax; i++) {
      var child = new JSONEditor.Node({
        'field': i, 
        'value': value[i]
      });
      this.appendChild(child);
    }
  }
  else if (this.type == 'object') {
    // object
    this.childs = [];
    for (var childField in value) {
      if (value.hasOwnProperty(childField)) {
        var child = new JSONEditor.Node({
          'field': childField, 
          'value': value[childField]
        });
        this.appendChild(child);
      }
    }
  }
  else {
    // value
    this.childs = undefined;
    this.value = value;
  }
}

JSONEditor.Node.prototype.getValue = function() {
  this._getDomValue();
  
  if (this.type == 'array') {
    var arr = [];
    var childs = this.childs;
    for (var i = 0, iMax = childs.length; i < iMax; i++) {
      arr.push(childs[i].getValue());
    }
    return arr;
  }
  else if (this.type == 'object') {
    var obj = {};
    var childs = this.childs;
    for (var i = 0, iMax = childs.length; i < iMax; i++) {
      var child = childs[i];
      obj[child.getField()] = child.getValue();
    }
    return obj;
  }  
  else {
    return this.value;
  }
}

/**
 * Get the nesting level of this node
 */ 
JSONEditor.Node.prototype.getLevel = function() {
  return (this.parent ? this.parent.getLevel() + 1 : 0);
}

/**
 * Create a clone of a node
 * The complete state of a clone is copied, including whether it is expanded or
 * not. The DOM elements are not cloned.
 * @return {JSONEditor.Node} clone
 */ 
JSONEditor.Node.prototype.clone = function() {
  var clone = new JSONEditor.Node();
  clone.type = this.type;
  clone.field = this.field;
  clone.fieldEditable = this.fieldEditable;
  clone.value = this.value;
  clone.expanded = this.expanded;
  
  if (this.childs) {
    // an object or array
    var childs = this.childs;
    var cloneChilds = [];
    for (var i = 0, iMax = childs.length; i < iMax; i++) {
      var childClone = childs[i].clone();
      childClone.parent = clone;
      cloneChilds.push(childClone);
    }
    clone.childs = cloneChilds;
  }
  else {
    // a value
    clone.childs = undefined;
  }
  
  return clone;
}

/**
 * Expand this node and optionally its childs, until a maximum depth.
 * @param {Number} maxLevel   Optional maximum level. undefined by default. When
 *                            undefined, all childs will be expanded recursively
 */ 
JSONEditor.Node.prototype.expand = function(maxLevel) {
  if (!this.childs) {
    return;
  }

  // set this node expanded
  this.expanded = true;
  if (this.dom && this.dom.expand) {
    this.dom.expand.className = 'jsoneditor-expanded';
  }

  this.showChilds();
  
  var childs = this.childs;
  if (maxLevel == undefined || this.getLevel() < maxLevel) {
    for (var i = 0, iMax = childs.length; i < iMax; i++) {
      childs[i].expand(maxLevel);
    }
  }
}


/**
 * Collapse this node and optionally its childs, until a maximum depth.
 * @param {Number} maxLevel   Optional maximum level. undefined by default. When
 *                            undefined, all childs will be collapsed recursively
 */ 
JSONEditor.Node.prototype.collapse = function(maxLevel) {
  if (!this.childs) {
    return;
  }

  this.hideChilds();
  
  // collapse childs in case of maxLevel
  var childs = this.childs;
  if (maxLevel == undefined || this.getLevel() < maxLevel) {
    for (var i = 0, iMax = childs.length; i < iMax; i++) {
      childs[i].collapse(maxLevel);
    }
  }

  // make this node collapsed
  if (this.dom && this.dom.expand) {
    this.dom.expand.className = 'jsoneditor-collapsed';
  }
  this.expanded = false;
}

/**
 * Recursively show all childs when they are expanded
 */ 
JSONEditor.Node.prototype.showChilds = function() {
  var childs = this.childs;
  if (!childs) {
    return;
  }
  if (!this.expanded) {
    return;
  }
  
  var tr = this.dom ? this.dom.tr : undefined;
  var table = tr.parentNode;
  if (table) {
    // show row with append button
    var append = this.getAppend();
    var nextTr = tr.nextSibling;
    if (nextTr) {
      table.insertBefore(append, nextTr);
    }
    else {
      table.appendChild(append);
    }
  
    // show childs
    for (var i = 0, iMax = childs.length; i < iMax; i++) {
      var child = childs[i];
      table.insertBefore(child.getDom(), append);
      child.showChilds();
    }
  }
}

/**
 * Hide the node with all its childs
 */ 
JSONEditor.Node.prototype.hide = function() {
  var tr = this.dom ? this.dom.tr : undefined;
  var table = tr ? tr.parentNode : undefined;
  if (table) {
    table.removeChild(tr);
  }
  this.hideChilds();
}
  
  
/**
 * Recursively hide all childs
 */ 
JSONEditor.Node.prototype.hideChilds = function() {
  var childs = this.childs;
  if (!childs) {
    return;
  }
  if (!this.expanded) {
    return;
  }
  
  // hide append row
  var append = this.getAppend();
  if (append.parentNode) {
    append.parentNode.removeChild(append);
  }
  
  // hide childs
  for (var i = 0, iMax = childs.length; i < iMax; i++) {
    childs[i].hide();
  }
}


/**
 * Add a new child to the node. 
 * Only applicable when Node value is of type array or object
 * @param {JSONEditor.Node} node
 */ 
JSONEditor.Node.prototype.appendChild = function(node) {
  if (this.type == 'array' || this.type == 'object') {
    // adjust the link to the parent 
    node.parent = this;
    node.fieldEditable = (this.type == 'object');
    if (this.type == 'array') {
      node.field = this.childs.length;
    } 
    this.childs.push(node);

    if (this.expanded) {
      // insert into the DOM, before the appendRow
      var newtr = node.getDom();
      var appendTr = this.getAppend();
      var table = appendTr ? appendTr.parentNode : undefined;
      if (appendTr && table) {
        table.insertBefore(newtr, appendTr);
      }

      var nodeIndex = this.childs.length - 1;
      this._updateStatus(nodeIndex);

      node.showChilds();
    }
  }
}

/**
 * Insert a new child before a given node
 * Only applicable when Node value is of type array or object
 * @param {JSONEditor.Node} node
 * @param {JSONEditor.Node} beforeNode
 */ 
JSONEditor.Node.prototype.insertBefore = function(node, beforeNode) {
  if (this.type == 'array' || this.type == 'object') {
    if (beforeNode == this.append) {
      // append to the child nodes

      // adjust the link to the parent 
      node.parent = this;
      node.fieldEditable = (this.type == 'object');
      this.childs.push(node);
    }
    else {
      // insert before a child node
      var index = this.childs.indexOf(beforeNode);
      if (index == -1) {
        throw 'Node not found';
      }
      
      // adjust the link to the parent 
      node.parent = this;
      node.fieldEditable = (this.type == 'object');
      this.childs.splice(index, 0, node);
    }
    
    if (this.expanded) {
      // insert into the DOM
      var newTr = node.getDom();
      var nextTr = beforeNode.getDom();
      var table = nextTr ? nextTr.parentNode : undefined;
      if (nextTr && table) {
        table.insertBefore(newTr, nextTr);
      }
      
      node.showChilds();
    }

    this._updateStatus(index);
  }
}

/**
 * Set focus to the value of this node
 */ 
JSONEditor.Node.prototype.focus = function() {
  if (this.dom && this.dom.tr && this.dom.tr.parentNode) {
    this.dom.value.focus();
  }  
}

  
/**
 * Duplicate given child node
 * new structure will be added right before the cloned node
 * @param {JSONEditor.Node} node           the childNode to be duplicated
 */ 
JSONEditor.Node.prototype._duplicate = function(node) {
  var clone = node.clone();
  
  /* TODO: adjust the field name (to prevent equal field names)
  if (this.type == 'object') {
  }
  */
  
  // TODO: insert after instead of insert before
  this.insertBefore(clone, node);
}

/**
 * Check if given node is a child. The method will check recursively to find
 * this node.
 * @param {JSONEditor.Node} node
 */ 
JSONEditor.Node.prototype.containsNode = function(node) {
  if (this == node) {
    return true;
  }

  var childs = this.childs;
  if (childs) {
    for (var i = 0, iMax = childs.length; i < iMax; i++) {
      if (childs[i].containsNode(node)) {
        return true;
      }
    }
  }

  return false;
}

/**
 * Move given node into this node
 * @param {JSONEditor.Node} node           the childNode to be moved
 * @param {JSONEditor.Node} beforeNode     node will be inserted before given
 *                                         node. If no beforeNode is given,
 *                                         the node is appended at the end
 */ 
JSONEditor.Node.prototype._move = function(node, beforeNode) {
  if (node == beforeNode) {
    // nothing to do... 
    return;
  }

  // check if this node is not a child of the node to be moved here
  if (node.containsNode(this)) {
    throw 'Cannot move a field into a child of itself';
  }

  // remove the original node
  // TODO: let the node remove itself on drop, depending on dropEffect?
  if (node.parent) {
    node.parent.removeChild(node);
  }

  // create a clone of the node
  var clone = node.clone();
  delete node.dom;
  if (this.type == 'object') {
    clone.setField(clone.getField(), true);
  }
  else {
    clone.setField(clone.getField(), false);
  }
  
  // insert or append the node
  if (beforeNode) {
    this.insertBefore(clone, beforeNode);  
  }
  else {
    this.appendChild(clone);  
  }
  
  /* TODO: adjust the field name (to prevent equal field names)
  if (this.type == 'object') {
  }
  */
}

/**
 * Remove a child from the node. 
 * Only applicable when Node value is of type array or object
 * @param {JSONEditor.Node} node   The child node to be removed;
 * @return {JSONEditor.Node} node  The removed node on success, else undefined
 */ 
JSONEditor.Node.prototype.removeChild = function(node) {
  if (this.childs) {
    var index = this.childs.indexOf(node);
  
    if (index != -1) {
      node.hide();

      var node = this.childs.splice(index, 1)[0];
      
      this._updateStatus(index);
      
      return node;
    }
  }
  
  return undefined;
}


/**
 * change the type of the value of this Node
 * @param {String} newType
 */ 
JSONEditor.Node.prototype._changeType = function ( newType) {
  var oldType = this.type;

  if ((newType == 'string' || newType == 'auto') && 
      (oldType == 'string' || oldType == 'auto')) {
    // this is an easy change
    this.type = newType;
  }
  else {
    // change from array to object, or from string/auto to object/array

    var table = this.dom ? this.dom.tr.parentNode : undefined;
    var lastTr;
    if (this.expanded) {
      lastTr = this.getAppend();
    }
    else {
      lastTr = this.getDom();
    }
    var nextTr = (lastTr && lastTr.parentNode) ? lastTr.nextSibling : undefined;
    
    // hide current field and all its childs
    this.hide();
    delete this.dom;
    
    // adjust the field and the value
    this.type = newType;

    // adjust childs
    if (newType == 'object') {
      this.value = {};
      if (!this.childs) {
        this.childs = [];
      }

      var childs = this.childs;
      var fieldEditable = true;
      for (var i = 0, iMax = childs.length; i < iMax; i++) {
        var child = childs[i];
        delete child.dom;
        child.setField(child.getField(), fieldEditable);
      }
      //this.expanded = false;
      //this.expand(this.getLevel());
      
      if (oldType == 'string' || oldType == 'auto') {
        this.expanded = true;
      }
    }
    else if (newType == 'array') {
      this.value = [];
      if (!this.childs) {
        this.childs = [];
      }
      
      var childs = this.childs;
      var fieldEditable = false;
      for (var i = 0, iMax = childs.length; i < iMax; i++) {
        var child = childs[i];
        delete child.dom;
        child.setField(child.getField(), false);
      }
      //this.expanded = false;
      //this.expand(this.getLevel());
      this._updateStatus();      

      if (oldType == 'string' || oldType == 'auto') {
        this.expanded = true;
      }
    }
    else {
      this.value = '';
      this.childs = undefined;
      this.expanded = false; 
    } 

    // create new DOM
    if (table) {
      if (nextTr) {
        table.insertBefore(this.getDom(), nextTr);
      }
      else {
        table.appendChild(this.getDom());
      }
    }
    this.showChilds();
    
    if (newType == 'auto' || newType == 'string') {
      this.focus();    
    }
  }
}

/**
 * Retrieve value from DOM
 */ 
JSONEditor.Node.prototype._getDomValue = function() {
  if (this.dom && this.type != 'array' && this.type != 'object') {
    // retrieve the value
    if (this.type == 'string') {
      this.value = this._removeReturn(this._getInnerText(this.dom.value));
    }
    else {
      var innerText = this._removeReturn(this._getInnerText(this.dom.value));
      this.value = this._stringCast(innerText);
    }
  }
}

/**
 * Retrieve field from DOM
 */ 
JSONEditor.Node.prototype._getDomField = function() {
  if (this.fieldEditable && this.dom) {
    // retrieve the field
    if (this.field) {
      this.field = this._removeReturn(this._getInnerText(this.dom.field));
    }
  }
}

/**
 * Get the HTML DOM TR element of the node.
 * The dom will be generated when not yet created
 * @return {HTML DOM TR} tr
 */ 
JSONEditor.Node.prototype.getDom = function() {
  if (this.dom) {
    return this.dom.tr;
  }
  
  var dom = {};
  
  // create row
  dom.tr = document.createElement('tr');
  dom.tr.className = 'jsoneditor-tr';
  dom.tr.node = this;
  
  // create dragable area
  var tdDrag = document.createElement('td');
  tdDrag.className = 'jsoneditor-td-drag'; 
  tdDrag.title = 'Move field (drag and drop)';
  var drag = document.createElement('a');  // must be an link to get it working in IE
  drag.href = '#'; // needed to get things working in IE
  drag.className = 'jsoneditor-drag';
  tdDrag.appendChild(drag);
  dom.tr.appendChild(tdDrag);
  dom.drag = drag;
  
  // create tree and field
  var tdField = document.createElement('td');
  tdField.className = 'jsoneditor-td'; 
  dom.tr.appendChild(tdField);
  dom.field = this._createDomField();
  var expandable = (this.type == 'array' || this.type == 'object');
  var fields = this._createDomTree(dom.field, expandable);
  var tree = fields.tree;
  dom.expand = fields.expand;
  tdField.appendChild(tree);

  /*
  var tdField = document.createElement('td');
  tdField.className = 'jsoneditor-td'; 
  dom.tr.appendChild(tdField);
  dom.field = this._createDomField();
  var fields = this._createDomTree(dom.field);
  var tree = fields.tree;
  dom.expand = fields.expand;
  tdField.appendChild(fields.expand);
  tdField.appendChild(dom.field);
  //dom.field.style.display = 'inline';
  dom.expand.style.float = 'left';
  dom.expand.style.marginLeft = (this.getLevel() * 24) + 'px';
  dom.field.style.float = 'left';
  dom.field.style.marginTop = '3px';
  */

  // create value
  var tdValue = document.createElement('td');
  tdValue.className = 'jsoneditor-td'; 
  dom.tr.appendChild(tdValue);
  dom.value = this._createDomValue();
  tdValue.appendChild(dom.value);
  
  // create type select box
  var tdType = document.createElement('td');
  tdType.className = 'jsoneditor-td jsoneditor-td-edit'; 
  dom.tr.appendChild(tdType);
  dom.type = this._createDomType();
  tdType.appendChild(dom.type);

  // create duplicate button
  var tdDuplicate = document.createElement('td');
  tdDuplicate.className = 'jsoneditor-td jsoneditor-td-edit'; 
  dom.tr.appendChild(tdDuplicate);
  dom.duplicate = this._createDomDuplicateButton();
  if (dom.duplicate) {
    tdDuplicate.appendChild(dom.duplicate);
  }
  
  // create remove button
  var tdRemove = document.createElement('td');
  tdRemove.className = 'jsoneditor-td jsoneditor-td-edit'; 
  dom.tr.appendChild(tdRemove);
  dom.remove = this._createDomRemoveButton();
  if (dom.remove) {
    tdRemove.appendChild(dom.remove);
  }
  
  // create draggable area
  var me = this;
  drag.draggable = true;
  JSONEditor.Events.addEventListener(drag, 'dragstart', function (event) { 
    event.dataTransfer.effectAllowed = 'all';
    event.dataTransfer.setData('text', JSON.stringify(me.getValue()));
    
    if (event.dataTransfer.setDragImage) {
      event.dataTransfer.setDragImage(me.dom.field, -16, 0);
    }

    JSONEditor.dragNode = me; 
  });

  JSONEditor.Events.addEventListener(drag, 'dragend', function (event) {
    JSONEditor.dragnode = undefined;
  });

  this.dom = dom;

  this._updateStatus();
  
  return dom.tr;
}


/**
 * Create an editable field
 * @param {Object} structure
 */ 
JSONEditor.Node.prototype._createDomField = function () {
  var field = this.field;
  if (field == undefined) {
    if (this.type == 'array' || this.type == 'object') {
      field = this.type;
    }
    else {
      field = 'field';
    }
  }
  
  var domField = document.createElement('div');
  domField.innerHTML = field;
  if (this.fieldEditable == true) {
    domField.contentEditable = 'true';
    domField.spellcheck = false;
    domField.className = 'jsoneditor-field';
  }
  else {
    domField.className = 'jsoneditor-readonly';
  }
  
  return domField;
}

/**
 * Update the title of the given structure. 
 * Only applicable when structure is an array or object
 * @param {Number} startIndex  Optional. Index of the first child to be updated
 *                             Only applicable in case of array
 */ 
JSONEditor.Node.prototype._updateStatus = function (startIndex) {
  if (this.dom && this.childs) {
    var count = this.childs ? this.childs.length : 0;
    if (this.type == 'array') {
      this.dom.value.innerHTML = '[' + count + ']';

      // update the field indexes of the childs
      var childs = this.childs;
      for (var i = (startIndex || 0), iMax = childs.length; i < iMax; i++) {
        var child = childs[i];
        child.field = i;
        var dom = child.dom;
        if (dom) {
          dom.field.innerHTML = i;
        }
      }
    }
    else if (this.type == 'object') {
      this.dom.value.innerHTML = '{' + count + '}';
    } 
    
    this.dom.value.title = this.type + ' containing ' + count + ' items';
  }
}

/**
 * Create an editable value
 * @param {JSON} value
 */ 
JSONEditor.Node.prototype._createDomValue = function () {
  var domValue;
  
  if (this.type == 'array') {
    domValue = document.createElement('div');
    domValue.className = 'jsoneditor-readonly';    
    domValue.innerHTML = '[...]';
  }
  else if (this.type == 'object') {
    domValue = document.createElement('div');
    domValue.className = 'jsoneditor-readonly';    
    domValue.innerHTML = '{...}';
  }
  else if (this.type == 'string') {
    domValue = document.createElement('div');
    domValue.contentEditable = 'true';
    domValue.spellcheck = false;
    domValue.className = 'jsoneditor-value';    
    this._setInnerText(domValue, String(this.value));
  }
  else {
    domValue = document.createElement('div');
    domValue.contentEditable = 'true';
    domValue.spellcheck = false;
    domValue.className = 'jsoneditor-value';    
    this._setInnerText(domValue, String(this.value));
  }

  // TODO: in FF spellcheck of editable divs is done via the body. quite ugly
  // document.body.spellcheck = false;

  return domValue;
}

/**
 * Create a DOM tree element, containing the expand/collapse button
 * @param {Object} fields   Object containing tree and expand DOM elements
 * @param {Boolean} expandable
 */ 
JSONEditor.Node.prototype._createDomTree = function (domField, expandable) {
  // TODO: replace the table by a div. will be faster for rendering I think
  var node = this;
  
  var domTree = document.createElement('table');
  var tbody = document.createElement('tbody');
  domTree.style.borderCollapse = 'collapse';
  domTree.appendChild(tbody);
  var tr = document.createElement('tr');
  tbody.appendChild(tr);
  
  // create expand button
  var td = document.createElement('td');
  td.className = 'jsoneditor-td-tree';
  tr.appendChild(td);
  var expand = document.createElement('button');
  td.appendChild(expand);
  td.style.paddingLeft = this.getLevel() * 24 + 'px';

  if (expandable) {
    expand.className = this.expanded ? 'jsoneditor-expanded' : 'jsoneditor-collapsed';
    expand.title = 
      'Click to expand/collapse this field. \n' +
      'Ctrl+Click to expand/collapse including all childs.';

    var me = this;
    expand.onclick = function (event) {
      event = event || window.event;
      var level = event.ctrlKey ? undefined : me.getLevel(); // with ctrl-key, expand/collapse all
      
      if (level == undefined) {
        // Take the table offline
        var table = node.dom.tr.parentNode; // TODO: not nice to access the main table like this
        var frame = table.parentNode;
        var scrollTop = frame.scrollTop;
        frame.removeChild(table);  
      }
      
      if (me.expanded) {
        me.collapse(level);
      }
      else {
        me.expand(level);
      }

      if (level == undefined) {
        // Put the table online again 
        frame.appendChild(table);  
        frame.scrollTop = scrollTop;
      }
    }
  }
  else {
    expand.className = 'jsoneditor-invisible';
    expand.title = '';
  }

  
  var td = document.createElement('td');
  td.className = 'jsoneditor-td-tree';
  tr.appendChild(td);
  td.appendChild(domField);
  
  return {
    'tree': domTree,
    'expand': expand
  };
}

/**
 * Create a DOM select box containing the node type
 * @return {HTML DOM} domType
 */ 
JSONEditor.Node.prototype._createDomType = function () {
  var domType = document.createElement('select');
  domType.className = 'jsoneditor-type';
  domType.title = 'Field type. When \"auto\" is selected, the type is automatically determined.';

  var options = ['array', 'auto', 'object', 'string'];
  for (var i in options) {
    if (options.hasOwnProperty(i)) {
      var optionDom = document.createElement('option');
      optionDom.value = options[i];
      optionDom.innerHTML = options[i];
      domType.appendChild(optionDom);
    }
  }
  domType.value = this.type;

  var me = this;
  domType.onchange = function (event) {
    var newType = domType.value;
    me._changeType(newType);
  }

  return domType;
}

/**
 * Create a table row with an append button. 
 * @return {HTML DOM} buttonAppend or undefined when unapplicable
 */ 
JSONEditor.Node.prototype.getAppend = function () {
  if (!this.append) {
    this.append = new JSONEditor.AppendNode();
    this.append.parent = this;
  }
  return this.append.getDom();
}


/**
 * Create a remove button. Returns undefined when the structure cannot
 * be removed
 * @return {HTML DOM} removeButton, or undefined when unapplicable
 */ 
JSONEditor.Node.prototype._createDomRemoveButton = function () {
  if (this.parent && (this.parent.type == 'array' || this.parent.type == 'object')) {
    var buttonRemove = document.createElement('button');
    buttonRemove.className = 'jsoneditor-remove';
    buttonRemove.title = 'Remove field (including all its childs)';
    
    var me = this;
    buttonRemove.onclick = function (event) {
      if (me.parent) {
        me.parent.removeChild(me);
      }
    }
    
    return buttonRemove;
  }
  else {
    return undefined;
  }
}

/**
 * Create a duplicate button. 
 * If the Node is the root node, no duplicate button is available and undefined
 * will be returned
 * @return {HTML DOM} buttonDuplicate
 */ 
JSONEditor.Node.prototype._createDomDuplicateButton = function () {
  if (this.parent && (this.parent.type == 'array' || this.parent.type == 'object')) {
    var buttonDupliate = document.createElement('button');
    buttonDupliate.className = 'jsoneditor-duplicate';
    buttonDupliate.title = 'Duplicate field (including all childs)';
    
    var me = this;
    var parent = this.parent;
    buttonDupliate.onclick = function (event) {
      parent._duplicate(me);
    }
    
    return buttonDupliate;
  }
  else {
    return undefined;
  }
}

/**
 * get the type of a value
 * @param {any type} value
 * @return {String} type   Can be 'object', 'array', 'string', 'auto'
 */ 
JSONEditor.Node.prototype._getType = function(value) {
  if (value instanceof Array) {
    return 'array';
  }
  if (value instanceof Object) {
    return 'object';
  }  
  if (typeof(value) == 'string' && typeof(this._stringCast(value)) != 'string') {
    return 'string';
  }
  
  return 'auto';
}

/**
 * set the innertext of an HTML element (for example a div element)
 * @param {HTML DOM} element
 * @param {String} innerText
 */ 
JSONEditor.Node.prototype._setInnerText = function (element, innerText) {
  if (element.innerText) {
    element.innerText = innerText;
  }

  var innerHTML = innerText.replace(/\n/g, '<br>');
  element.innerHTML = innerHTML;
}

/**
 * cast contents of a string to the correct type. This can be a string, 
 * a number, a boolean, etc
 * @param {String} str
 * @return {String} type
 */ 
JSONEditor.Node.prototype._stringCast = function(str) {
  var lower = str.toLowerCase(),
    num = Number(str),          // will nicely fail with '123ab'
    numFloat = parseFloat(str); // will nicely fail with '  '

  if (str == '') {
    return '';
  }
  else if (lower == 'null') {
    return null;
  }
  else if (lower == 'true') {
    return true;
  }
  else if (lower == 'false') {
    return false;
  }
  else if (!isNaN(num) && !isNaN(numFloat)) {
    return num;
  }
  else {
    return str;
  }
}


/**
 * get the innertext of an HTML element (for example a div element)
 * @param {HTML DOM} element
 * @return {String} innerText
 */ 
JSONEditor.Node.prototype._getInnerText = function (element) {
  if (element.innerText) {
    return element.innerText;
  }
  
  // text node
  if (element.nodeValue) {
    return element.nodeValue;
  }
        
  // divs or other HTML elements
  if (element.hasChildNodes()) {
    var childNodes = element.childNodes;
    var innerText = "";

    for (var i = 0, iMax = childNodes.length; i < iMax; i++) {
      var child = childNodes[i];
      innerText += this._getInnerText(child);

      // TODO: check if this rule for adding \n is correct in all cases
      if (child.nodeName === 'DIV' && 
          innerText[innerText.length-1] !== '\n') {
        innerText += '\n';  
      }
    }

    return innerText;
  }

  // br
  if (element.nodeName === 'BR') {
    return '\n';
  }
  
  // unknown
  return '';
}

/**
 * remove the lastReturn
 * @param {String} text
 * @return {String} escaped text
 */ 
JSONEditor.Node.prototype._removeReturn = function (text) {
  if (text.charAt(text.length - 1) == '\n') {
    // remove last return character
    text = text.substring(0, text.length - 1);  
  }
  
  return text;
}


/**
 * Create a new AppendNode. This is a special node which is created at the 
 * end of the list with childs for an object or array
 */ 
JSONEditor.AppendNode = function () {
  this.dom = {};
}

JSONEditor.AppendNode.prototype = new JSONEditor.Node();

/**
 * Helper  
 */
function newTd(className) {
  var td = document.createElement('td');
  td.className = className || '';
  return td;
}

/**
 * Return a table row with an append button. 
 * @return {HTML DOM} dom   TR element
 */ 
JSONEditor.AppendNode.prototype.getDom = function () {
  if (this.dom.append) {
    return this.dom.append;
  }

  // a row for the append button
  var trAppend = document.createElement('tr');
  trAppend.appendChild(newTd('jsoneditor-td'));
  trAppend.node = this;

  var tdAppend = document.createElement('td');
  trAppend.appendChild(tdAppend);
  tdAppend.className = 'jsoneditor-td'; 
  tdAppend.style.paddingLeft = (this.getLevel() * 24 + 26) + 'px';
  // TODO: not so nice hard coded offset

  var buttonAppend = document.createElement('button');
  buttonAppend.className = 'jsoneditor-append';
  buttonAppend.title = 'Append a field';

  var me = this;
  buttonAppend.onclick = function (event) {
    if (me.parent) {
      var newNode = new JSONEditor.Node({
        'field': 'field',
        'value': 'value'
      });
      me.parent.appendChild(newNode);
      newNode.focus();
    }
  }

  tdAppend.appendChild(buttonAppend);

  trAppend.appendChild(newTd('jsoneditor-td'));
  trAppend.appendChild(newTd('jsoneditor-td jsoneditor-td-edit'));
  trAppend.appendChild(newTd('jsoneditor-td jsoneditor-td-edit'));
  trAppend.appendChild(newTd('jsoneditor-td jsoneditor-td-edit'));
  
  this.dom.append = trAppend;
  return trAppend;
}



/**
 * Create main frame
 */ 
JSONEditor.prototype._createFrame = function () {
  // create the frame
  this.container.innerHTML = '';  
  this.frame = document.createElement('div');
  this.frame.className = 'jsoneditor-frame';
  this.container.appendChild(this.frame);
}

/**
 * Create main table
 */ 
JSONEditor.prototype._createTable = function () {
  this.table = document.createElement('table');
  this.table.className = 'jsoneditor-table';

  // create colgroup where the first two columns don't have a fixed 
  // width, and the edit columns do have a fixed width
  var col;
  this.colgroupContent = document.createElement('colgroup');
  col = document.createElement('col');
  col.width = "16px";
  this.colgroupContent.appendChild(col);
  col = document.createElement('col');
  this.colgroupContent.appendChild(col);
  col = document.createElement('col');
  this.colgroupContent.appendChild(col);
  col = document.createElement('col');
  col.width = "60px";
  this.colgroupContent.appendChild(col);
  col = document.createElement('col');
  col.width = "24px";
  this.colgroupContent.appendChild(col);
  col = document.createElement('col');
  col.width = "24px";
  this.colgroupContent.appendChild(col);
  this.table.appendChild(this.colgroupContent);

  this.tbody = document.createElement('tbody');
  this.table.appendChild(this.tbody);

  // create header column
  var tr, th;  
  tr = document.createElement('tr');
  th = document.createElement('th');
  th.className = 'jsoneditor-th'; 
  tr.appendChild(th);
  th = document.createElement('th');
  th.className = 'jsoneditor-th'; 
  th.appendChild(document.createTextNode('Field'));
  tr.appendChild(th);
  th = document.createElement('th');
  th.className = 'jsoneditor-th'; 
  th.appendChild(document.createTextNode('Value'));
  tr.appendChild(th);
  th = document.createElement('th');
  th.className = 'jsoneditor-th'; 
  th.colSpan = 4;
  tr.appendChild(th);
  this.tbody.appendChild(tr);

  // create droppable area
  this.dropArea = document.createElement('tr');
  var dropTd = document.createElement('td');
  dropTd.className = 'jsoneditor-droparea';
  dropTd.colSpan = 7;
  this.dropArea.appendChild(dropTd);
  JSONEditor.Events.addEventListener(this.dropArea, 'mouseover', function (event) {
    editor.hideDropArea();
  });
  
  JSONEditor.Events.addEventListener(this.table, 'dragover', function (event) {
    event.dataTransfer.dropEffect = 'move';
    // event.dataTransfer.dropEffect = event.ctrlKey ? 'copy' : 'move'; // TODO
    
    var target = event.target || event.srcElement;
    var dropNode = editor.getNodeFromTarget(target);
    if (dropNode) {
      editor.showDropArea(dropNode);
    }

    JSONEditor.Events.preventDefault(event);

    return false;
  });
  
  this.hoveredElements = [];
  JSONEditor.Events.addEventListener(this.table, 'dragenter', function (event) {
    event.dataTransfer.dropEffect = 'move';
    
    var target = event.target || event.srcElement;
    if (editor.hoveredElements.indexOf(target) == -1) {
      editor.hoveredElements.push(target);
    }
    
    JSONEditor.Events.preventDefault(event);
    /*
    if (event.preventDefault) {
      event.preventDefault(); // allows us to drop. huh? yeah, that is how HTML5 drag and drop works...
    }
    */
    
    return false; // needed to get IE to work
  });
  
  JSONEditor.Events.addEventListener(this.table, 'dragleave', function (event) {
    var target = event.target || event.srcElement;
    var index = editor.hoveredElements.indexOf(target);
    if (index != -1) {
      editor.hoveredElements.splice(index, 1);
    }

    if (editor.hoveredElements.length == 0) {
      editor.hideDropArea();
    }
  });
  
  var editor = this;
  JSONEditor.Events.addEventListener(this.table, 'drop', function (event) {
    if (event.stopPropagation) {
      event.stopPropagation(); // stops the browser from redirecting...why???
    }
    
    JSONEditor.Events.preventDefault(event);
    editor.hideDropArea();

    var target = event.target || event.srcElement;
    var dropNode = editor.getNodeFromTarget(target);
    
    if (JSONEditor.dragNode && dropNode && dropNode.parent) {
      // move an internal node
      var parent = dropNode.parent;
      dropNode.parent._move(JSONEditor.dragNode, dropNode);
      JSONEditor.dragNode = undefined;
    }
    else if (!JSONEditor.dragNode) {
      // drop exteral data
      try {
        var data = event.dataTransfer.getData('text/plain');
        if (data) {
          var json = JSON.parse(data);
          var newNode = new JSONEditor.Node({
            'field': 'dropped',
            'value': json
          });
          dropNode.parent.insertBefore(newNode, dropNode);
          newNode.expand(newNode.getLevel());
        }
      }
      catch (err) {
        throw 'No valid JSON';
      }
    }
    else {
      console.log('drop failed');
    }
    
    return false;
  });

  this.frame.appendChild(this.table);
}

/**
 * Show the droparea, attach it to the given node
 * @param {JSONEditor.Node} node
 */ 
JSONEditor.prototype.showDropArea = function (node) {
  var dropArea = this.dropArea;
  var dropTr = node ? node.getDom() : undefined;
   
  if (dropTr && dropTr.previousSibling != dropArea && dropTr != dropArea) {
    dropArea.node = node;

    this.hideDropArea();

    if (node.parent) {
      this.tbody.insertBefore(dropArea, dropTr);
    }
  }
}


/**
 * hide the droparea
 */ 
JSONEditor.prototype.hideDropArea = function () {
  if (this.dropArea.parentNode) {
    this.dropArea.parentNode.removeChild(this.dropArea);
  }
}


/**
 * Find the node from an event target
 * @param {HTML DOM} event target
 * @return {JSONEditor.Node} node  or undefined when not found 
 */ 
JSONEditor.prototype.getNodeFromTarget = function (target) {
  while (target) {
    if (target.node) {
      return target.node;
    }
    target = target.parentNode;
  }
  
  return undefined;
}


JSONFormatter = function (container) {
  // check availability of JSON parser (not available in IE7 and older)
  if (!JSON) {
    throw 'Your browser does not support JSON. \n\n' +
      'Please install the newest version of your browser.\n' +
      '(all modern browsers support JSON).';
  }
  
  this.container = container;

  this.width = container.clientWidth;
  this.height = container.clientHeight;

  this.frame = document.createElement('div');
  this.frame.className = "jsoneditor-frame";

  this.head = document.createElement('table');
  this.head.className = 'jsonformatter-table'; 
  var tbody = document.createElement('tbody');
  this.head.appendChild(tbody);
  this.frame.appendChild(this.head);

  var tr = document.createElement('tr');
  var th = document.createElement('th');
  th.className = 'jsoneditor-th'; 
  var buttonFormat = document.createElement('button');
  buttonFormat.innerHTML = 'Format';
  buttonFormat.title = 'Format JSON data, with proper indentation and line feeds';
  buttonFormat.className = 'jsoneditor-button';
  th.appendChild(buttonFormat);
  tr.appendChild(th);
  tbody.appendChild(tr);

  var buttonCompact = document.createElement('button');
  buttonCompact.innerHTML = 'Compact';
  buttonCompact.title = 'Compact JSON data, remove all whitespaces';
  buttonCompact.className = 'jsoneditor-button';
  th.appendChild(buttonCompact);
  tr.appendChild(th);
  tbody.appendChild(tr);

  this.content = document.createElement('div');
  this.content.className = 'jsonformatter-content';
  this.frame.appendChild(this.content);

  this.textarea = document.createElement('textarea');
  this.textarea.className = "jsonformatter-textarea";
  this.textarea.spellcheck = false;
  this.content.appendChild(this.textarea);

  var formatter = this;
  var textarea = this.textarea;
  var onChange = function () {
    formatter._checkChange();
  };
  /* TODO: register onchange
  this.textarea.onchange = onChange;
  this.textarea.onkeyup = onChange;
  this.textarea.oncut = onChange;
  this.textarea.oncopy = onChange;
  this.textarea.onpaste = onChange;
  this.textarea.onchange = function () {
    console.log('onchange');
  }
  this.textarea.ondomcharacterdatamodified = function () {
    console.log('DOMCharacterDataModified');
  }
  this.textarea.ondomattrmodified = function () {
    console.log('DOMAttrModified');
  }
  addEventListener(this.textarea, 'DOMAttrModified', function (event) {
    console.log('DOMAttrModified', event);
  });
  addEventListener(this.textarea, 'DOMCharacterDataModified', function (event) {
    console.log('DOMCharacterDataModified', event);
  });
  */

  buttonFormat.onclick = function () {
    try {
      textarea.value = JSON.stringify(JSON.parse(textarea.value), null, '  ');
    }
    catch (err) {
      alert(err); // TODO: nicer error handling
    } 
  };
  buttonCompact.onclick = function () {
    try {
      textarea.value = JSON.stringify(JSON.parse(textarea.value));
    }
    catch (err) {
      alert(err); // TODO: nicer error handling
    } 
  };
  
  this.container.appendChild(this.frame);
}


/**
 * Check if the contents are changed
 */ 
JSONFormatter.prototype._checkChange = function() {
  var content = this.textarea.value;
  
  if (content != this.lastContent) {
    this.lastContent = content;
    if (formatter.onChangeCallback) {
        formatter.onChangeCallback();
    }
  }
}

/**
 * Set json data in the formatter
 * @param {JSON} json
 */ 
JSONFormatter.prototype.set = function(json) {
  this.textarea.value = JSON.stringify(json, null, '  ');
}

/**
 * Get json data from the formatter
 * @return {JSON} json
 */ 
JSONFormatter.prototype.get = function() {
  return JSON.parse(this.textarea.value);
}

/**
 * Set a callback method for the onchange event
 * @return {function} callback
 */ 
/* TODO: setOnChangeCallback
JSONFormatter.prototype.setOnChangeCallback = function(callback) {
  this.onChangeCallback = callback;
  console.log(this.onChangeCallback, callback)
}
*/


// create namespace for event methods
JSONEditor.Events = {};

/**
 * Add and event listener. Works for all browsers
 * @param {DOM Element} element    An html element
 * @param {string}      action     The action, for example "click", 
 *                                 without the prefix "on"
 * @param {function}    listener   The callback function to be executed
 * @param {boolean}     useCapture
 * @return {function}   the created event listener
 */ 
JSONEditor.Events.addEventListener = function (element, action, listener, useCapture) {
  if (element.addEventListener) {
    if (useCapture === undefined)
      useCapture = false;
      
    if (action === "mousewheel" && navigator.userAgent.indexOf("Firefox") >= 0) {
      action = "DOMMouseScroll";  // For Firefox
    }
      
    element.addEventListener(action, listener, useCapture);
    return listener;
  } else {
    // IE browsers
    var f = function () {
      return listener.call(element, window.event);
    };
    element.attachEvent("on" + action, f);  
    return f;
  }
};

/**
 * Remove an event listener from an element
 * @param {DOM element}  element   An html dom element
 * @param {string}       action    The name of the event, for example "mousedown"
 * @param {function}     listener  The listener function
 * @param {boolean}      useCapture
 */ 
JSONEditor.Events.removeEventListener = function(element, action, listener, useCapture) {
  if (element.removeEventListener) {
    // non-IE browsers
    if (useCapture === undefined)
      useCapture = false;    
          
    if (action === "mousewheel" && navigator.userAgent.indexOf("Firefox") >= 0) {
      action = "DOMMouseScroll";  // For Firefox
    }
      
    element.removeEventListener(action, listener, useCapture); 
  } else {
    // IE browsers
    element.detachEvent("on" + action, listener);
  }
};


/**
 * Stop event propagation
 */ 
JSONEditor.Events.stopPropagation = function (event) {
  if (!event) 
    var event = window.event;
  
  if (event.stopPropagation) {
    event.stopPropagation();  // non-IE browsers
  }
  else {
    event.cancelBubble = true;  // IE browsers
  }
}


/**
 * Cancels the event if it is cancelable, without stopping further propagation of the event.
 */ 
JSONEditor.Events.preventDefault = function (event) {
  if (!event) 
    var event = window.event;
  
  if (event.preventDefault) {
    event.preventDefault();  // non-IE browsers
  }
  else {    
    event.returnValue = false;  // IE browsers
  }
}
