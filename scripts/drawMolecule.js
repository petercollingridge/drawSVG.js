// Atomic data (atoms have a size and a colour)
var atomData = {
    H: { color: '#A2A2A2', size: 1.2 },
    C: { color: ['#3A383A', 230], size: 1.7 },
    N: { color: [68, 75, 219, 230], size: 1.55 },
    O: { color: '#E10E0E', size: 1.52 },
    P: { color: [230, 107, 7, 230], size: 1.8 },
    S: { color: [200, 180, 20, 230], size: 1.8 },
    CL: { color: [40, 200, 20, 230], size: 1.6 },
    FE: { color: [165, 60, 10, 230], size: 2 }
};

var MoleculeSVG = function() {
    this.atoms = [];
    this.bonds = [];
    this.atomSize = 0.16;
    this.background = false;
};

// Add an array of atoms
// Atoms should be an array of the atom type (e.g. 'O' for oxygen),
// followed by the x, y, z components
MoleculeSVG.prototype.addAtoms = function(atoms) {
    this.atoms = this.atoms.concat(atoms);
};

// Add an array of bonds
MoleculeSVG.prototype.addBonds = function(bond) {
    this.atoms.concat(bond);
};

// Draw the molecule inside the element with the given id
MoleculeSVG.prototype.draw = function(id) {
    // Calculate viewBox based on maximum extent of atoms

    var svg = new SVG({ viewBox: "-1.5 -1.5 3 3" });

    // Order atoms and bonds

    // Draw atoms
    for (var i = 0; i < this.atoms.length; i++) {
        var atom = this.atoms[i];
        var radius = this.atomSize * atomData[atom[0]].size;
        svg.circle(atom[1], atom[3], radius, { fill: atomData[atom[0]].color });
    }

    // Draw bonds

    svg.show('#' + id);
};