var defaultSVGAttributes = {
    'version': 1.1,
    'baseProfile': 'full',
    'xmlns': 'http://www.w3.org/2000/svg'
};

// Generic SVG element
// Consists of a tag, an attr and child elements

var SVG_Element = function(tag, attr, contents) {
    this.tag = tag;
    this.attr = attr || {};
    this.contents = contents || "";
    this.children = [];
};

SVG_Element.prototype.draw = function(parent) {
    var $element = $('<' + this.tag + '></' + this.tag + '>');
    $element.attr(this.attr);
    $element.text(this.contents);

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

// A line element
// Requires x1, y1, x2, y2 attributes
SVG_Element.prototype.line = function(x1, y1, x2, y2, attr) {
    var attr = attr || {};
    attr.x1 = x1;
    attr.y1 = y1;
    attr.x2 = x2;
    attr.y2 = y2;

    return this.addChild('line', attr);
};

// A polyline element
// Requires an array of points
SVG_Element.prototype.polyline = function(points, attr) {
    var attr = attr || {};
    attr.points = points.join(" ");

    return this.addChild('polyline', attr);
};

// A polygon element
// Requires an array of points
SVG_Element.prototype.polygon = function(points, attr) {
    var attr = attr || {};
    attr.points = points.join(" ");

    return this.addChild('polygon', attr);
};

// A path element
// Requires an attritute d
// See the SVG spec for how this works
SVG_Element.prototype.path = function(d, attr) {
    var attr = attr || {};
    attr.d = d;

    return this.addChild('path', attr);
};

// SVG is a special type of SVG element
var SVG = function(attr) {
    this.tag = 'svg';

    this.attr = attr || {};
    $.extend(attr, defaultSVGAttributes);

    this.children = [];
    this.styles = {};
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

    if (this.styles) {
        this.createStyleElement();
    }

    $container.empty();

    this.draw($container);
    // Hack to reload the SVG
    $container.html($container.html());
};

// Create a Style element containing CSS styles
// TODO: Check user hasn't already created a style element
SVG.prototype.createStyleElement = function() {
    var styleString = "";

    for (var selector in this.styles) {
        if (styleString === "") {
            styleString += "\n";
        }

        styleString += selector + "{\n";
        for (var style in this.styles[selector]) {
            styleString += "    " + style + ": " + this.styles[selector][style] + ";\n";
        }
        styleString += "}\n";
    }

    var element = new SVG_Element('style', {}, styleString);
    this.children.unshift(element);
}

// Add styles to given selector
// Styles are added with CSS
SVG.prototype.addStyle = function(selector, styles) {
    var currentStyle = this.styles[selector] || {};
    $.extend(styles, currentStyle);
    this.styles[selector] = styles;
};