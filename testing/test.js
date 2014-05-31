var testDrawSVG = function(id) {
    // Create SVG
    var mySVG = new SVG({ width: 400, height: 200 });

    // Create a group
    myGroup = mySVG.addChild('g', { opacity: 0.5 });

    // Draw some rects
    myGroup.rect(100, 50, 200, 100, { fill: '#88f', onMouseOver: "this.setAttribute('fill', '#f22');" });
    myGroup.circle(100, 50, 50, { fill: '#8ff' });

    // Render
    mySVG.show('#mySVG');
}

$(document).ready(function() {
    testDrawSVG();
});