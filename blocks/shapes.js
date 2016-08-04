'use strict';

goog.provide('Blockly.Blocks.shapes');

goog.require('Blockly.Blocks');

var objectDropDown = [["box", "box"], ["sphere", "sphere"],
                      ["cylinder", "cylinder"], ["vector", "vector"]];

var boxDropDown = [["pos", "pos"], ["axis", "axis"],
                   ["length", "length"], ["width", "width"],
                   ["height", "height"], ["up", "up"],
                   ["color","color"]];

var vectorDropDown = [["x", "x"], ["y", "y"],
                      ["z", "z"]];

var cylinderDropDown = [["cylinderTest", "cylinderTest"]];

var sphereDropDown = [["pos", "pos"], ["axis", "axis"], 
                      ["radius", "radius"], ["up", "up"],
                      ["color", "color"], ["opacity", "opacity"],
                      ["trail", "trail"], ["retain", "retain"]
                      ];

///////////////////////////////////////////////////////////////////////////////


//------------------------Get and Set Blocks---------------------------------//


///////////////////////////////////////////////////////////////////////////////

Blockly.Blocks['set'] = {
  init: function() {
    var thisBlock = this;
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Set");
    this.appendDummyInput("NAME")
        .appendField("Object Type")
        .appendField(new Blockly.FieldDropdown(objectDropDown, function(selected){
            thisBlock.updateShape_(selected);
        }), "OBJECT_TYPE")
        .appendField("Attribute")
        .appendField(new Blockly.FieldDropdown(boxDropDown), "ATTRIBUTE");
    this.appendValueInput("OBJECT")
        .setCheck(null)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Object");
    this.appendValueInput("VALUE")
        .setCheck(null)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Value");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(20);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
    this.selected = '';
  },

  mutationToDom: function(){
    var container = document.createElement('mutation');
    this.selected = this.getFieldValue('OBJECT_TYPE');
    container.setAttribute('selected', this.selected);
    return container;
  },

  domToMutation: function(xmlElement){
    this.selected = xmlElement.getAttribute('selected');
    //alert(selected);
    this.updateShape_(this.selected);
  },


  updateShape_: function(selected){

    var input = this.getInput('NAME');
    input.removeField('ATTRIBUTE');

    switch(selected){

        case 'box':
            input.appendField(new Blockly.FieldDropdown(boxDropDown), "ATTRIBUTE");
            break;

        case 'vector':
            input.appendField(new Blockly.FieldDropdown(vectorDropDown), "ATTRIBUTE");
            break;

        case 'cylinder':
            input.appendField(new Blockly.FieldDropdown(cylinderDropDown), "ATTRIBUTE");
            break;

        case 'sphere': 
            input.appendField(new Blockly.FieldDropdown(sphereDropDown), "ATTRIBUTE");
            break;

        }
    }
};

  
 
Blockly.Blocks['get'] = {
  init: function() {
    var thisBlock = this;
    this.appendValueInput("NAME")
        .setCheck(null)
        .appendField("Get")
        .appendField(new Blockly.FieldDropdown(objectDropDown, function(selection){
            thisBlock.updateShape_(selection);
        }), "OBJECT")

        .appendField(new Blockly.FieldDropdown(boxDropDown), "VALUE");
    this.setOutput(true, null);
    this.setColour(20);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
    this.selected = '';
  },

  mutationToDom: function(){
    var container = document.createElement('mutation');
    this.selected = this.getFieldValue('OBJECT');
    container.setAttribute('selected', this.selected);
    return container;
  },

  domToMutation: function(xmlElement){
    this.selected = xmlElement.getAttribute('selected');
    //alert(selected);
    this.updateShape_(this.selected);
  },


  updateShape_: function(selected){

    var input = this.getInput('NAME');
    input.removeField('VALUE');

    switch(selected){

        case 'box':
            input.appendField(new Blockly.FieldDropdown(boxDropDown), "VALUE");
            break;

        case 'vector':
            input.appendField(new Blockly.FieldDropdown(vectorDropDown), "VALUE");
            break;

        case 'cylinder':
            input.appendField(new Blockly.FieldDropdown(cylinderDropDown), "VALUE");
            break;

        case 'sphere': 
            input.appendField(new Blockly.FieldDropdown(sphereDropDown), "VALUE");
            break;

    }
  }
};

///////////////////////////////////////////////////////////////////////////////


//----------------------------3D Objects Blocks------------------------------//


///////////////////////////////////////////////////////////////////////////////


Blockly.Blocks['vpython_box'] = {
  init: function(){
    this.appendDummyInput()
        .appendField("Box");
    this.setInputsInline(false);
    this.setOutput(true, null);
    this.setColour(20);
    this.setTooltip('');
    this.itemCount_ = 0;
    this.setHelpUrl('http://www.example.com/');
    this.setMutator(new Blockly.Mutator(['pos',
                                         'axis',
                                         'size',
                                         'up',
                                         'color',
                                         'opacity',
                                         'make_trail']));
    this.hasPos = false;
    this.hasAxis= false;
    this.hasSize= false;
    this.hasUp = false;
    this.hasColor = false;
    this.hasOpacity = false;
    this.hasTrail = false;
    this.elementCount_ = 0;
    },


    mutationToDom: function(){
        if(!this.elementCount_){
            return null;
        }
        var container = document.createElement('mutation');

        if(this.hasPos){
            container.setAttribute('pos', 1);
        }
        if(this.hasAxis){
            container.setAttribute('axis', 1);
        }
        if(this.hasSize){
            container.setAttribute('size', 1);
        }
        if(this.hasUp){
            container.setAttribute('up', 1);
        }
        if(this.hasColor){
            container.setAttribute('color', 1);
        }
        if(this.hasOpacity){
            container.setAttribute('opacity', 1);
        }
        if(this.hasTrail){
            container.setAttribute('make_trail', 1);
        }
        container.setAttribute('elementCount', this.elementCount_)
        return container;
    },

    domToMutation: function(xmlElement){

        this.hasPos = parseInt(xmlElement.getAttribute('pos'), 10) || 0;
        this.hasAxis = parseInt(xmlElement.getAttribute('axis'), 10) || 0;
        this.hasSize = parseInt(xmlElement.getAttribute('size'), 10) || 0;
        this.hasUp = parseInt(xmlElement.getAttribute('up'), 10) || 0;
        this.hasColor = parseInt(xmlElement.getAttribute('color'), 10) || 0;
        this.hasOpacity = parseInt(xmlElement.getAttribute('opacity'), 10) || 0;
        this.hasTrail = parseInt(xmlElement.getAttribute('make_trail'), 10) || 0;
        this.elementCount_ = parseInt(xmlElement.getAttribute('elementCount'), 10) || 0;
        this.updateShape_();

    },
    decompose: function(workspace){
        var containerBlock = workspace.newBlock('vpython_create_box');
        containerBlock.initSvg();
        var connection = containerBlock.nextConnection;

        if(this.hasPos){
            
            var posBlock = workspace.newBlock('pos');
            posBlock.initSvg();
            connection.connect(posBlock.previousConnection);
            connection = posBlock.nextConnection;
        }

        if(this.hasAxis){
            var axisBlock = workspace.newBlock('axis')
            axisBlock.initSvg();
            connection.connect(axisBlock.previousConnection);
            connection = axisBlock.nextConnection;

        }
        if(this.hasSize){
            var sizeBlock = workspace.newBlock('size');
            sizeBlock.initSvg();
            connection.connect(sizeBlock.previousConnection);
            connection = sizeBlock.nextConnection;
        }

        if(this.hasUp){
            var upBlock = workspace.newBlock('up');
            upBlock.initSvg();
            connection.connect(upBlock.previousConnection);
            connection = upBlock.nextConnection;
        }

        if(this.hasColor){
            var colorBlock = workspace.newBlock('color');
            colorBlock.initSvg();
            connection.connect(colorBlock.previousConnection);
            connection = colorBlock.nextConnection;
        }

        if(this.hasOpacity){
            var opacityBlock = workspace.newBlock('opacity');
            opacityBlock.initSvg();
            connection.connect(opacityBlock.previousConnection);
            connection = opacityBlock.nextConnection;
        }

        if(this.hasTrail){
            var trailBlock = workspace.newBlock('make_trail');
            trailBlock.initSvg();
            connection.connect(trailBlock.previousConnection);
            connection = trailBlock.nextConnection;
        }

        return containerBlock;
    },

    compose: function(containerBlock){

        var clauseBlock = containerBlock.nextConnection.targetBlock();
        
        this.hasPos = false;
        this.hasAxis = false;
        this.hasSize = false;
        this.hasUp = false;
        this.hasColor = false;
        this.hasOpacity = false;
        this.hasTrail = false;
        this.elementCount_ = 0;
        //alert("compose");
        var valueConnections = [];
        var i = 0;
        while(clauseBlock){


            switch(clauseBlock.type){

                case 'pos':
                    this.hasPos = true;
                    this.elementCount_++;
                    valueConnections.push(['pos', clauseBlock.valueConnection_]);
                    break;
                case 'axis':
                    this.hasAxis = true;
                    this.elementCount_++;
                    valueConnections.push(['axis', clauseBlock.valueConnections_]);
                    break;
                case 'size':
                    this.hasSize = true;
                    this.elementCount_++;
                    valueConnections.push(['size', clauseBlock.valueConnection_]);
                    break;
                case 'up':
                    this.hasUp = true;
                    this.elementCount_++;
                    valueConnections.push(['up', clauseBlock.valueConnection_]);
                    break;
                case 'color':
                    this.hasColor = true;
                    this.elementCount_++;
                    valueConnections.push(['color', clauseBlock.valueConnection_]);
                    break;
                case 'opacity':
                    this.hasOpacity = true;
                    this.elementCount_++;
                    valueConnections.push(['opacity', clauseBlock.valueConnection_]);
                    break;
                case 'make_trail':
                    this.hasTrail = true;
                    this.elementCount_++;
                    valueConnections.push(['make_trail', clauseBlock.valueConnection_]);
                    break;

                default:
                    throw "Unknown block type.";

            }
            clauseBlock = clauseBlock.nextConnection && clauseBlock.nextConnection.targetBlock();
            i++;
            
        }
        
        this.updateShape_();

        /*for(var i = 0; i <= this.elementCount_ - 1; i++){
            Blockly.Mutator.reconnect(valueConnections[i][1], 
                                      this, 
                                      valueConnections[i][0]);
        }*/

    },

    saveConnections: function(containerBlock){
        var clauseBlock = containerBlock.nextConnection.targetBlock();
        
        while(clauseBlock){
           
            switch(clauseBlock.type){
                case 'pos':
                    //alert("saveConnections clauseBlock pos");
                    var inputPos = this.getInput('POS');
                    clauseBlock.valueConnection_ = inputPos && inputPos.connection.targetConnection;
                    break;
                case 'axis':
                    var inputAxis = this.getInput('AXIS');
                    clauseBlock.valueConnection_ = inputAxis && inputAxis.connection.targetConnection;
                    break;
                case 'size':
                    //alert("saveConnections clauseBlock box_size");
                    var inputSize = this.getInput('SIZE');
                    clauseBlock.valueConnection_ = inputSize && inputSize.connection.targetConnection;
                    break;
                case 'up':
                    var inputUp = this.getInput('UP');
                    clauseBlock.valueConnection_ = inputUp && inputUp.connection.targetConnection;
                    break;
                case 'color':
                    var inputColor = this.getInput('COLOR');
                    clauseBlock.valueConnection_ = inputColor && inputColor.connection.targetConnection;
                    break;
                case 'opacity':
                    var inputOpacity = this.getInput('OPACITY');
                    clauseBlock.valueConnection_ = inputOpacity && inputOpacity.connection.targetConnection;
                    break;
                case 'make_trail':
                    var inputTrail = this.getInput('TRAIL');
                    clauseBlock.valueConnection_ = inputTrail && inputTrail.connection.targetConnection;
                    break;

                default:
                    throw 'Unknown block type.';

            }
            clauseBlock = clauseBlock.nextConnection &&
                clauseBlock.nextConnection.targetBlock(); 
        }

        

    },

    updateShape_: function(){
        
        if(this.getInput('POS')){
            this.removeInput('POS');
        }
        if(this.getInput('AXIS')){
            this.removeInput('AXIS');
        }
        if(this.getInput('SIZE')){
            this.removeInput('SIZE');
        }
       if(this.getInput('UP')){
            this.removeInput('UP');
        }
        if(this.getInput('COLOR')){
            this.removeInput('COLOR');
        }
        if(this.getInput('OPACITY')){
        	this.removeInput('OPACITY');
        }
        if(this.getInput('TRAIL')){
            this.removeInput('TRAIL');
            this.removeInput('RETAIN_INPUT');
        }

        if(this.hasPos){
            //alert("updateShape_ has pos");
            this.appendValueInput("POS")
                .setCheck("Vector")
                .appendField("Pos");
        }

        if(this.hasAxis){
            this.appendValueInput("AXIS")
                .setCheck("Vector")
                .appendField("Axis");
        }

        if(this.hasSize){
            this.appendValueInput("SIZE")
                .setCheck("Vector")
                .appendField("Size");
        }

        if(this.hasUp){
            this.appendValueInput("UP")
                .setCheck("Vector")
                .appendField("Up");
        }

        if(this.hasColor){
            this.appendValueInput("COLOR")
                .setCheck(null)
                .appendField("Color");
        }

        if(this.hasOpacity){
        	this.appendValueInput("OPACITY")
        		.setCheck("Number")
        		.appendField("Opacity");
        }
        
        if(this.hasTrail){
            this.appendValueInput("TRAIL")
                .setCheck("Boolean")
                .appendField("Make Trail");
            this.appendDummyInput("RETAIN_INPUT")
                .appendField("Retain")
                .appendField(new Blockly.FieldTextInput("50"), "RETAIN_VALUE");
        }
    }
};


Blockly.Blocks['vpython_sphere'] = {
  init: function(){
    this.appendDummyInput()
        .appendField("Sphere");
    this.setInputsInline(false);
    this.setOutput(true, null);
    this.setColour(20);
    this.setTooltip('');
    this.itemCount_ = 0;
    this.setHelpUrl('http://www.example.com/');
    this.setMutator(new Blockly.Mutator(['pos',
                                         'axis',
                                         'radius',
                                         'size',
                                         'up',
                                         'color',
                                         'opacity',
                                         'make_trail']));
    this.hasPos = false;
    this.hasAxis = false;
    this.hasRadius = false;
    this.hasSize = false;
    this.hasUp = false;
    this.hasColor = false;
    this.hasOpacity = false;
    this.hasTrail = false;
    this.elementCount_ = 0;
    },


    mutationToDom: function(){
        if(!this.elementCount_){
            return null;
        }
        var container = document.createElement('mutation');

        if(this.hasPos){
            container.setAttribute('pos', 1);
        }
        if(this.hasAxis){
            container.setAttribute('axis', 1);
        }
        if(this.hasRadius){
            container.setAttribute('radius', 1);
        }
        if(this.hasSize){
            container.setAttribute('size', 1);
        }
        if(this.hasUp){
            container.setAttribute('up', 1);
        }
        if(this.hasColor){
            container.setAttribute('color', 1);
        }
        if(this.hasOpacity){
            container.setAttribute('opacity', 1);
        }
        if(this.hasTrail){
            container.setAttribute('make_trail', 1);
        }
        container.setAttribute('elementCount', this.elementCount_)
        return container;
    },

    domToMutation: function(xmlElement){

        this.hasPos = parseInt(xmlElement.getAttribute('pos'), 10) || 0;
        this.hasAxis = parseInt(xmlElement.getAttribute('axis'), 10) || 0;
        this.hasRadius = parseInt(xmlElement.getAttribute('radius'), 10) || 0;
        this.hasSize = parseInt(xmlElement.getAttribute('size'), 10) || 0;
        this.hasUp = parseInt(xmlElement.getAttribute('up'), 10) || 0;
        this.hasColor = parseInt(xmlElement.getAttribute('color'), 10) || 0;
        this.hasOpacity = parseInt(xmlElement.getAttribute('opacity'), 10) || 0;
        this.hasTrail = parseInt(xmlElement.getAttribute('make_trail'), 10) || 0;
        this.elementCount_ = parseInt(xmlElement.getAttribute('elementCount'), 10) || 0;
        this.updateShape_();

    },
    decompose: function(workspace){
        var containerBlock = workspace.newBlock('vpython_create_sphere');
        containerBlock.initSvg();
        var connection = containerBlock.nextConnection;

        if(this.hasPos){
            
            var posBlock = workspace.newBlock('pos');
            posBlock.initSvg();
            connection.connect(posBlock.previousConnection);
            connection = posBlock.nextConnection;
        }

        if(this.hasAxis){
            var axisBlock = workspace.newBlock('axis')
            axisBlock.initSvg();
            connection.connect(axisBlock.previousConnection);
            connection = axisBlock.nextConnection;

        }

        if(this.hasRadius){
            var radiusBlock = workspace.newBlock('radius');
            radiusBlock.initSvg();
            connection.connect(radiusBlock.previousConnection);
            connection = radiusBlock.nextConnection;
        }

        if(this.hasSize){
            var sizeBlock = workspace.newBlock('size');
            sizeBlock.initSvg();
            connection.connect(sizeBlock.previousConnection);
            connection = sizeBlock.nextConnection;
        }

        if(this.hasUp){
            var upBlock = workspace.newBlock('up');
            upBlock.initSvg();
            connection.connect(upBlock.previousConnection);
            connection = upBlock.nextConnection;
        }

        if(this.hasColor){
            var colorBlock = workspace.newBlock('color');
            colorBlock.initSvg();
            connection.connect(colorBlock.previousConnection);
            connection = colorBlock.nextConnection;
        }

        if(this.hasOpacity){
            var opacityBlock = workspace.newBlock('opacity');
            opacityBlock.initSvg();
            connection.connect(opacityBlock.previousConnection);
            connection = opacityBlock.nextConnection;
        }

        if(this.hasTrail){
            var trailBlock = workspace.newBlock('make_trail');
            trailBlock.initSvg();
            connection.connect(trailBlock.previousConnection);
            connection = trailBlock.nextConnection;
        }

        return containerBlock;
    },

    compose: function(containerBlock){

        var clauseBlock = containerBlock.nextConnection.targetBlock();
        
        this.hasPos = false;
        this.hasAxis = false;
        this.hasRadius = false;
        this.hasSize = false;
        this.hasUp = false;
        this.hasColor = false;
        this.hasOpacity = false;
        this.hasTrail = false;
        this.elementCount_ = 0;
        //alert("compose");
        var valueConnections = [];
        var i = 0;
        while(clauseBlock){


            switch(clauseBlock.type){

                case 'pos':
                    this.hasPos = true;
                    this.elementCount_++;
                    valueConnections.push(['pos', clauseBlock.valueConnection_]);
                    break;
                case 'axis':
                    this.hasAxis = true;
                    this.elementCount_++;
                    valueConnections.push(['axis', clauseBlock.valueConnections_]);
                    break;
                case 'radius':
                    this.hasRadius = true;
                    this.elementCount_++;
                    valueConnections.push(['radius', clauseBlock.valueConnection_]);
                    break; 
                case 'size':
                    this.hasSize = true;
                    this.elementCount_++;
                    valueConnections.push(['size', clauseBlock.valueConnection_]);
                    break; 
                case 'up':
                    this.hasUp = true;
                    this.elementCount_++;
                    valueConnections.push(['up', clauseBlock.valueConnection_]);
                    break;
                case 'color':
                    this.hasColor = true;
                    this.elementCount_++;
                    valueConnections.push(['color', clauseBlock.valueConnection_]);
                    break;
                case 'opacity':
                    this.hasOpacity = true;
                    this.elementCount_++;
                    valueConnections.push(['opacity', clauseBlock.valueConnection_]);
                    break;
                case 'make_trail':
                    this.hasTrail = true;
                    this.elementCount_++;
                    valueConnections.push(['make_trail', clauseBlock.valueConnection_]);
                    break;

                default:
                    throw "Unknown block type.";

            }
            clauseBlock = clauseBlock.nextConnection && clauseBlock.nextConnection.targetBlock();
            i++;
            
        }
        
        this.updateShape_();

        // Was unsure of this sections purpose or whether it will be implemented
        // later on so I copied it over
        /*for(var i = 0; i <= this.elementCount_ - 1; i++){
            Blockly.Mutator.reconnect(valueConnections[i][1], 
                                      this, 
                                      valueConnections[i][0]);
        }*/

    },

    saveConnections: function(containerBlock){
        var clauseBlock = containerBlock.nextConnection.targetBlock();
        
        while(clauseBlock){
           
            switch(clauseBlock.type){
                case 'pos':
                    var inputPos = this.getInput('POS');
                    clauseBlock.valueConnection_ = inputPos && inputPos.connection.targetConnection;
                    break;
                case 'axis':
                    var inputAxis = this.getInput('AXIS');
                    clauseBlock.valueConnection_ = inputAxis && inputAxis.connection.targetConnection;
                    break;
                case 'radius':
                    var inputRadius = this.getInput('RADIUS');
                    clauseBlock.valueConnection_ = inputRadius && inputRadius.connection.targetConnection;
                    break;
                case 'size':
                    var inputSize = this.getInput('SIZE');
                    clauseBlock.valueConnection_ = inputSize && inputSize.connection.targetConnection;
                    break;
                case 'up':
                    var inputUp = this.getInput('UP');
                    clauseBlock.valueConnection_ = inputUp && inputUp.connection.targetConnection;
                    break;
                case 'color':
                    var inputColor = this.getInput('COLOR');
                    clauseBlock.valueConnection_ = inputColor && inputColor.connection.targetConnection;
                    break;
                case 'opacity':
                    var inputOpacity = this.getInput('OPACITY');
                    clauseBlock.valueConnection_ = inputOpacity && inputOpacity.connection.targetConnection;
                    break;
                case 'make_trail':
                    var inputTrail = this.getInput('TRAIL');
                    clauseBlock.valueConnection_ = inputTrail && inputTrail.connection.targetConnection;
                    break;

                default:
                    throw 'Unknown block type.';

            }
            clauseBlock = clauseBlock.nextConnection &&
                clauseBlock.nextConnection.targetBlock(); 
        }

        

    },

    updateShape_: function(){
        
        if(this.getInput('POS')){
            this.removeInput('POS');
        }
        if(this.getInput('AXIS')){
            this.removeInput('AXIS');
        }
        if(this.getInput('RADIUS')){
            this.removeInput('RADIUS');
        }
        if(this.getInput('SIZE')){
            this.removeInput('SIZE');
        }
        if(this.getInput('UP')){
            this.removeInput('UP');
        }
        if(this.getInput('COLOR')){
            this.removeInput('COLOR');
        }
        if(this.getInput('OPACITY')){
            this.removeInput('OPACITY');
        }
        if(this.getInput('TRAIL')){
            this.removeInput('TRAIL');
            this.removeInput('RETAIN_INPUT');
        }

        if(this.hasPos){
            this.appendValueInput("POS")
                .setCheck("Vector")
                .appendField("Pos");
        }

        if(this.hasAxis){
            this.appendValueInput("AXIS")
                .setCheck("Vector")
                .appendField("Axis");
        }

        if(this.hasRadius){
            this.appendValueInput("RADIUS")
                .setCheck("Number")
                .appendField("Radius");
        }

        if(this.hasSize){
            this.appendValueInput("SIZE")
                .setCheck("Vector")
                .appendField("Size");
        }

        if(this.hasUp){
            this.appendValueInput("UP")
                .setCheck("Vector")
                .appendField("Up");
        }

        if(this.hasColor){
            this.appendValueInput("COLOR")
                .setCheck(null)
                .appendField("Color");
        }

        if(this.hasOpacity){
            this.appendValueInput("OPACITY")
                .setCheck("Number")
                .appendField("Opacity");
        }
        
        if(this.hasTrail){
            this.appendValueInput("TRAIL")
                .setCheck("Boolean")
                .appendField("Make Trail");
            this.appendDummyInput("RETAIN_INPUT")
                .appendField("Retain")
                .appendField(new Blockly.FieldTextInput("50"), "RETAIN_VALUE");
        }
    }
};


///////////////////////////////////////////////////////////////////////////////


//-----------------------------Attribute Blocks------------------------------//


///////////////////////////////////////////////////////////////////////////////


Blockly.Blocks['vpython_create_box']= {
    init: function(){
        this.appendDummyInput()
            .appendField("Box");
        this.setColour(20);
        this.setNextStatement(true);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['vpython_create_sphere']= {
    init: function(){
        this.appendDummyInput()
            .appendField("Ball");
        this.setColour(20);
        this.setNextStatement(true);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['pos']= {
    init: function(){
        this.appendDummyInput()
            .appendField("Pos");
        this.setColour(20);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['axis']= {
    init: function(){
        this.appendDummyInput()
            .appendField("Axis");
        this.setColour(20);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['size']= {
    init: function(){
        this.appendDummyInput()
            .appendField("Size");
        this.setColour(20);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['up']= {
    init: function(){
        this.appendDummyInput()
            .appendField("Up");
        this.setColour(20);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['color']= {
    init: function(){
        this.appendDummyInput()
            .appendField("Color");
        this.setColour(20);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['radius'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Radius");
    this.setColour(20);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['opacity'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Opacity");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(20);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['make_trail'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Make Trail");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(20);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};