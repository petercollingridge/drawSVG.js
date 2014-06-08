var testDrawSVG = function(id) {
    // Create SVG
    var mySVG = new SVG({ width: 400, height: 200 });

    // Draw a background
    mySVG.rect(0, 0, 400, 200, { fill: '#ddf' });

    // Create a group
    var myGroup = mySVG.addChild('g', { opacity: 0.5 });
    myGroup.circle(80, 100, 70, { fill: '#8ff', onMouseOver: "this.setAttribute('fill', '#f22');" });
    myGroup.ellipse(280, 100, 100, 70);
    myGroup.line(200, 50, 80, 40, { stroke: '#000' });

    mySVG.polyline([100, 100, 100, 160, 140, 130], { stroke: '#00f', fill: 'none' });
    mySVG.polygon([150, 100, 150, 160, 190, 130], { stroke: '#00f', fill: 'none' });
    mySVG.path("M200 100 L200 160 240 130z", { stroke: '#00f', fill: 'none' });

    mySVG.addStyle('ellipse', { fill: '#f8f', stroke: '#c4c' });

    // Render
    mySVG.show('#mySVG');
};

var testMolecule = function() {
    var water = new MoleculeSVG();

    water.addAtoms([
        ['O', -0.064, 0,  0],
        ['H',  0.512, 0, -0.77],
        ['H',  0.512, 0,  0.77]
    ]);

    // Create a bond between atoms 0 and 1, and between atoms 0 and 2
    water.addBonds([[0, 1], [0, 2]]);

    water.rotateX(Math.PI / 2);
    //water.rotateZ(Math.PI / 2);
    water.draw('moleculeSVG');
};

$(document).ready(function() {
    testMolecule();
});