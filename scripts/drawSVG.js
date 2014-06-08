var defaultSVGAttributes = {
    'version': 1.1,
    'baseProfile': 'full',
    'xmlns': 'http://www.w3.org/2000/svg'
};

// Generic SVG element
// Consists of a tag, an attr and child elements

var SVG_Element = function(tag, attributes, contents) {
    this.tag = tag;
    this.attributes = attributes || {};
    this.contents = contents || "";
    this.children = [];
    this.namespaceURI = defaultSVGAttributes.xmlns;
};

SVG_Element.prototype.create = function() {
    var element = document.createElementNS(this.namespaceURI, this.tag);

    for (var attr in this.attributes) {
        element.setAttribute(attr, this.attributes[attr]);
    }

    if (this.contents) {
        var txtnode = document.createTextNode(this.contents);
        element.appendChild(txtnode);
    }

    for (var i = 0; i < this.children.length; i++) {
        element.appendChild(this.children[i].create());
    }

    return element;
};

SVG_Element.prototype.addChild = function(tag, attributes, children) {
    var element = new SVG_Element(tag, attributes, children);
    this.children.push(element);
    return element;
};

// Specific SVG elements.
// Allows elements to be created with less effort

// A rect element
// Requires x, y, width and height attributes
SVG_Element.prototype.rect = function(x, y, width, height, attributes) {
    var attributes = attributes || {};
    attributes.x = x;
    attributes.y = y;
    attributes.width = width;
    attributes.height = height;

    return this.addChild('rect', attributes);
};

// A circle element
// Requires cx, cy, r attributes
SVG_Element.prototype.circle = function(cx, cy, r, attributes) {
    var attributes = attributes || {};
    attributes.cx = cx;
    attributes.cy = cy;
    attributes.r = r;

    return this.addChild('circle', attributes);
};

// An ellipse element
// Requires cx, cy, rx, ry attributes
SVG_Element.prototype.ellipse = function(cx, cy, rx, ry, attributes) {
    var attributes = attributes || {};
    attributes.cx = cx;
    attributes.cy = cy;
    attributes.rx = rx;
    attributes.ry = ry;

    return this.addChild('ellipse', attributes);
};

// A line element
// Requires x1, y1, x2, y2 attributes
SVG_Element.prototype.line = function(x1, y1, x2, y2, attributes) {
    var attributes = attributes || {};
    attributes.x1 = x1;
    attributes.y1 = y1;
    attributes.x2 = x2;
    attributes.y2 = y2;

    return this.addChild('line', attributes);
};

// A polyline element
// Requires an array of points
SVG_Element.prototype.polyline = function(points, attributes) {
    var attributes = attributes || {};
    attributes.points = points.join(" ");

    return this.addChild('polyline', attributes);
};

// A polygon element
// Requires an array of points
SVG_Element.prototype.polygon = function(points, attributes) {
    var attributes = attributes || {};
    attributes.points = points.join(" ");

    return this.addChild('polygon', attributes);
};

// A path element
// Requires an attritute d
// See the SVG spec for how this works
SVG_Element.prototype.path = function(d, attributes) {
    var attributes = attributes || {};
    attributes.d = d;

    return this.addChild('path', attributes);
};

// SVG is a special type of SVG element
// It has defaultSVGAttributes plus a show function,
// which builds the SVG in a DOM element
var SVG = function(attributes) {
    this.tag = 'svg';
    this.namespaceURI = defaultSVGAttributes.xmlns;

    this.attributes = attributes || {};
    for (var attr in attributes) {
        this.attributes[attr] = attributes[attr];
    }

    this.children = [];
    this.styles = {};
}

SVG.prototype = Object.create(SVG_Element.prototype);

// Finds element selected by a given selector
// Empties them and then draw the SVG inside them
SVG.prototype.show = function(id) {
    var container = document.getElementById(id);

    // Empty container
    while (container.hasChildNodes()) {
        container.removeChild(container.lastChild);
    }

    if (!container){
        console.log("No elements found with id: " + id);
        return;
    }

    if (this.styles) {
        this.createStyleElement();
    }

    var svg = this.create();
    container.appendChild(svg);
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
    for (var style in styles) {
        currentStyle[style] = styles[style];
    }

    this.styles[selector] = styles;
};