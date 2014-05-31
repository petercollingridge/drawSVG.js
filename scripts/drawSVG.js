var defaultSVGAttributes = {
    'version': 1.1,
    'baseProfile': 'full',
    'xmlns': 'http://www.w3.org/2000/svg'
};

var SVG_Element = function(tag, attr, children) {
    this.tag = tag;
    this.attr = attr || {};
    this.children = children || [];
};

SVG_Element.prototype.draw = function(parent) {
    var $element = $('<' + this.tag + '></' + this.tag + '>');
    $element.attr(this.attr); 

    $(this.children).each( function() {
        $element.append(this.draw($element));
    });

    parent.append($element);
};

SVG_Element.prototype.addChild = function(tag, attr, children) {
    var element = new SVG_Element(tag, attr, children);
    this.children.push(element);
}

// SVG is a type of SVG element
var SVG = function(attr) {
    this.tag = 'svg';

    this.attr = attr || {};
    $.extend(attr, defaultSVGAttributes);

    this.children = [];
}

SVG.prototype = Object.create(SVG_Element.prototype);

// Draw SVG inside the element with the given ID
var testDrawSVG = function(id) {
    var $container = $('#' + id);

    if (!($container)){
        console.log("Unable to to find element with id " + id);
        return;
    }

    $container.empty();

    // Create SVG
    var mySVG = new SVG({ width: 400, height: 200 });

    mySVG.addChild('rect', { x: 100, y: 50, width: 200, height: 100, fill: '#88f' });
    mySVG.addChild('rect', { x: 100, y: 50, width: 50, height: 50, fill: '#8ff' });

    mySVG.draw($container);

    // Hack to reload the SVG
    $container.html($container.html());
}

$(document).ready(function() {
    testDrawSVG('mySVG');
});