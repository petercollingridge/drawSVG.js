var testDrawSVG = function(id) {
    // Create SVG
    var mySVG = new SVG({ width: 400, height: 200 });

    // Draw some rects
    mySVG.rect(100, 50, 200, 100, { fill: '#88f' });
    mySVG.rect(100, 50, 50, 50, { fill: '#8ff' });

    // Render
    mySVG.show('#mySVG');
}

$(document).ready(function() {
    testDrawSVG();
});