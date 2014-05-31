var defaultSVGAttributes = {
    'version': 1.1,
    'baseProfile': 'full',
    'xmlns': 'http://www.w3.org/2000/svg'
};

// Generic SVG element
// Consists of a tag, an attr and child elements

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
    return element;
};

// Specific SVG elements.
// Allows elements to be created with less effort

// A rect element
// Requires x, y, width and height attributes
SVG_Element.prototype.rect = function(x, y, width, height, attr) {
    var attr = attr || {};
    attr.x = x;
    attr.y = y;
    attr.width = width;
    attr.height = height;

    return this.addChild('rect', attr);
};

// A circle element
// Requires cx, cy, r attributes
SVG_Element.prototype.circle = function(cx, cy, r, attr) {
    var attr = attr || {};
    attr.cx = cx;
    attr.cy = cy;
    attr.r = r;

    return this.addChild('circle', attr);
};

// An ellipse element
// Requires cx, cy, rx, ry attributes
SVG_Element.prototype.ellipse = function(cx, cy, rx, ry, attr) {
    var attr = attr || {};
    attr.cx = cx;
    attr.cy = cy;
    attr.rx = rx;
    attr.ry = ry;

    return this.addChild('ellipse', attr);
};

// An ellipse element
// Requires x1, y1, x2, y2 attributes
SVG_Element.prototype.line = function(x1, y1, x2, y2, attr) {
    var attr = attr || {};
    attr.x1 = x1;
    attr.y1 = y1;
    attr.x2 = x2;
    attr.y2 = y2;

    return this.addChild('line', attr);
};

// SVG is a special type of SVG element
var SVG = function(attr) {
    this.tag = 'svg';

    this.attr = attr || {};
    $.extend(attr, defaultSVGAttributes);

    this.children = [];
}

SVG.prototype = Object.create(SVG_Element.prototype);

// Finds element selected by a given selector
// Empties them and then draw the SVG inside them
SVG.prototype.show = function(selector) {
    var $container = $(selector);

    if (!($container)){
        console.log("No elements found using the selector: '" + selector + "'");
        return;
    }

    $container.empty();

    this.draw($container);
    // Hack to reload the SVG
    $container.html($container.html());
};