// Atomic data (atoms have a size and a colour)
var atomData = {
    H: { name: 'hydrogen', color: '#A2A2A2', size: 1.2 },
    C: { name: 'carbon', color: '#3A383A', size: 1.7 },
    N: { name: 'nitrogen', color: '#3D44C6', size: 1.55 },
    O: { name: 'oxygen', color: '#E10E0E', size: 1.52 },
    P: { name: 'phosphorus', color: '#CF6006', size: 1.8 },
    S: { name: 'sulfur', color: [200, 180, 20, 230], size: 1.8 },
    CL: { name: 'chlorine', color: [40, 200, 20, 230], size: 1.6 },
    FE: { name: 'iron', color: [165, 60, 10, 230], size: 2 }
};

var MoleculeSVG = function() {
    this.atoms = [];
    this.bonds = [];
    this.atomSize = 0.2;
    this.atomTypes = {};

    this.background = false;

    this.bondColor = '#66666f';
    this.bondThickness = 0.12;
};

// Add an array of atoms
// Atoms should be an array of the atom type (e.g. 'O' for oxygen),
// followed by the x, y, z components
MoleculeSVG.prototype.addAtoms = function(atoms) {
    for (var i = 0; i < atoms.length; i++) {
        this.atoms.push(atoms[i]);

        if (atomData[atoms[i][0]]) {
            this.atomTypes[atoms[i][0]] = true;
        }
    }
};

// Add an array of bonds
MoleculeSVG.prototype.addBonds = function(bonds) {
    this.bonds = this.bonds.concat(bonds);
};

// Draw the molecule inside the element with the given id
MoleculeSVG.prototype.draw = function(id) {
    // TODO: Calculate viewBox based on maximum extent of atoms
    var svg = new SVG({ viewBox: "-10 -10 20 20" });

    svg.addStyle('.bond', {
        stroke: this.bondColor,
        'stroke-width': this.bondThickness
    });

    // Style atoms
    for (var atomType in this.atomTypes) {
        svg.addStyle('.' + atomData[atomType].name, {
            fill: atomData[atomType].color
        });
    }

    // TODO: Order atoms and bonds

    // Draw bonds
    for (var i = 0; i < this.bonds.length; i++) {
        var bond = this.bonds[i];
        var atom1 = this.atoms[bond[0]];
        var atom2 = this.atoms[bond[1]];
        svg.line(atom1[1], atom1[2], atom2[1], atom2[2], { class: 'bond' });
    }

    // Draw atoms
    for (var i = 0; i < this.atoms.length; i++) {
        var atom = this.atoms[i];
        var radius = this.atomSize * atomData[atom[0]].size;
        svg.circle(atom[1], atom[2], radius, { class: atomData[atom[0]].name });
    }

    svg.show('#' + id);
};

MoleculeSVG.prototype.rotateX = function(theta) {
    var ct = Math.cos(theta);
    var st = Math.sin(theta);

    var i, y, z;
    for (i = 0; i < this.atoms.length; i++) {
        y = this.atoms[i][2];
        z = this.atoms[i][3];
        this.atoms[i][2] = ct * y - st * z;
        this.atoms[i][3] = st * y + ct * z;
    }
};

MoleculeSVG.prototype.rotateY = function(theta) {
    var ct = Math.cos(theta);
    var st = Math.sin(theta);

    var i, x, z;
    for (i = 0; i < this.atoms.length; i++) {
        x = this.atoms[i][1];
        z = this.atoms[i][3];
        this.atoms[i][1] =  ct * x + st * z;
        this.atoms[i][3] = -st * x + ct * z;
    }
};

MoleculeSVG.prototype.rotateZ = function(theta) {
    var ct = Math.cos(theta);
    var st = Math.sin(theta);

    var i, x, y;
    for (i = 0; i < this.atoms.length; i++) {
        x = this.atoms[i][1];
        y = this.atoms[i][2];
        this.atoms[i][1] = ct * x - st * y;
        this.atoms[i][2] = st * x + ct * y;
    }
};

var parsePDBdata = function(str) {
    var lines = str.split("\n");

    var molecule = {
        atoms: [],
        bonds: []
    };

    for (var i = 0; i < lines.length; i++) {
        var data = lines[i].split(/\s+/);

        if (data.length === 12 && data[0] === 'ATOM') {
            molecule.atoms.push([data[11], parseFloat(data[6]), parseFloat(data[7]), parseFloat(data[8])]);
        } else if (data.length > 2 && data[0] === 'CONECT') {
            var atom1 = parseInt(data[1]) - 1;

            for (var j = 2; j < data.length; j++) {
                var atom2 = parseInt(data[j]) - 1;
                if (atom1 > atom2) {
                    molecule.bonds.push([atom1, atom2]);
                }
            }
        }
    }

    return molecule;
};

var drawPDBMolecule = function(id) {
    var dataBox = $('#' + id);

    if (!dataBox){
        console.log("No element found with id: " + id);
        return;
    }

    var data = dataBox.text();
    var moleculeData = parsePDBdata(data);

    var molecule = new MoleculeSVG();
    molecule.addAtoms(moleculeData.atoms);
    molecule.addBonds(moleculeData.bonds);
    molecule.draw('moleculeSVG');
};