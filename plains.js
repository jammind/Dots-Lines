// plains.js
// Dots & Lines Plain Class
// (C)2015 Jam Zhang


// Plain Class
// Constructor

function Plain() {
    this.array = [];
}

Plain.prototype.setGrid = function(plain, x, y, on) {
    if (typeof(on)=='undefined') {
        on = true;
    }
    if (!this.array[plain]) {
        this.array[plain] = [];
    }
    if (!this.array[plain][x]) {
        this.array[plain][x] = [];
    }
    this.array[plain][x][y] = on;
}
