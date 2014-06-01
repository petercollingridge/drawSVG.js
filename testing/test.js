var testDrawSVG = function(id) {
    // Create SVG
    var mySVG = new SVG({ width: 400, height: 200 });

    // Create a group
    var myGroup = mySVG.addChild('g', { opacity: 0.5 });

    // Draw some rects
    myGroup.rect(100, 50, 200, 100, { fill: '#88f', onMouseOver: "this.setAttribute('fill', '#f22');" });
    myGroup.circle(100, 50, 50, { fill: '#8ff' });
    myGroup.ellipse(200, 50, 80, 40, { fill: '#f8f' });
    myGroup.line(200, 50, 80, 40, { stroke: '#000' });

    mySVG.polyline([100, 100, 100, 160, 140, 130], { stroke: '#00f', fill: 'none' });
    mySVG.polygon([150, 100, 150, 160, 190, 130], { stroke: '#00f', fill: 'none' });
    mySVG.path("M200 100 L200 160 240 130z", { stroke: '#00f', fill: 'none' });

    // Render
    mySVG.show('#mySVG');
}

$(document).ready(function() {
    testDrawSVG();
});