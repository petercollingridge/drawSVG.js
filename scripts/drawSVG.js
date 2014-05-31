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
};

// Specific SVG elements.
// Allows elements to be created with less effort

// A rect element
// Requires x, y, width and height attributes
SVG_Element.prototype.rect = function(x, y, width, height, attr) {
    attr.x = x;
    attr.y = y;
    attr.width = width;
    attr.height = height;

    this.children.push(new SVG_Element('rect', attr));
};

// SVG is a special type of SVG element
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

    mySVG.rect(100, 50, 200, 100, { fill: '#88f' });
    mySVG.rect(100, 50, 50, 50, { fill: '#8ff' });

    mySVG.draw($container);

    // Hack to reload the SVG
    $container.html($container.html());
}

$(document).ready(function() {
    testDrawSVG('mySVG');
});