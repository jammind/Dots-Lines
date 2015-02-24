// lines.js
// Dots & Lines main library
// (C)2015 Jam Zhang


// Constructor

function Lines(scene) {
    
    this.scene = scene;
    this.plain = new Plain();
    this.parsePatterns(Lines.patterns);
    this.drawLines();
    
}


// Constants

Lines.MAX_ROWS = 50;
Lines.GRID_DISTANCE = 10;
Lines.PLANE_DISTANCE = 500;
Lines.OFFSET_X = -100;
Lines.OFFSET_Y = 100;
Lines.OFFSET_Z = 0;
Lines.SCALE = .5;


Lines.MATERIAL = new THREE.LineBasicMaterial( {
    fog: true,
    color: 0xffffff,
    opacity: 1,
    linewidth: 1,
    linecap: 'round',
    vertexColors: THREE.VertexColors
} );


Lines.patterns = [
    // 宇宙
    {
        color: 0xffff00,
        offsetX: -20,
        offsetY: 20,
        bitmap:
        'x'
    }
    ,
    {
        color: 0x0066ff,
        offsetX: -20,
        offsetY: 20,
        bitmap:
        '                      x                                               x                     /' +
        '                      x                                               x                     /' +
        '                      x                                               x                     /' +
        '                      x                                               x                     /' +
        '                      x                                               x                     /' +
        '                      x                                               x                     /' +
        '                      x                                               x                     /' +
        'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx    xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx/' +
        'x                                          x    x                                          x/' +
        'x                                          x    x                                          x/' +
        'x                                          x    x                     x                    x/' +
        'x                                          x    x                     x                    x/' +
        'x                                          x    x                     x                    x/' +
        'x      xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx      x    x                     x                    x/' +
        'x                     x                    x    x                     x                    x/' +
        '                      x                                               x                     /' +
        '                      x                            xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx   /' +
        '                      x                            x                  x                 x   /' +
        '                      x                            x                  x                 x   /' +
        '                      x                            x                  x                 x   /' +
        '                      x                            x                  x                 x   /' +
        '                      x                            x                  x                 x   /' +
        '                      x                            x                  x                 x   /' +
        '                      x                            x                  x                 x   /' +
        '                      x                            x                  x                 x   /' +
        '    xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx          x                  x                 x   /' +
        '                      x                            x                  x                 x   /' +
        '                      x                            x                  x                 x   /' +
        '                      x                            x                  x                 x   /' +
        '                      x                            x                  x                 x   /' +
        '                      x                            xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx   /' +
        '                      x                            x                  x                 x   /' +
        '                      x                            x                  x                 x   /' +
        '                      x                            x                  x                 x   /' +
        '                      x                            x                  x                 x   /' +
        '                      x                            x                  x                 x   /' +
        '                      x                            x                  x                 x   /' +
        '                      x                            x                  x                 x   /' +
        '                      x                            x                  x                 x   /' +
        '                      x                            x                  x                 x   /' +
        '                      x                            x                  x                 x   /' +
        '                      x                            x                  x                 x   /' +
        '                      x                            x                  x                 x   /' +
        '                      x                            x                  x                 x   /' +
        '              xxxxxxxxx                            xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx   /'
    }
    ,
    {
        color: 0xcc0000,
        offsetX: -20,
        offsetY: 20,
        bitmap:
        'x              x          x      xxxxxxxxxxxxxxx  xxxxxxxxxxxxxxxx/' +
        'x              x         x x            x         x               /' +
        'x              x         x x            x         x               /' +
        'x              x        x   x           x         x               /' +
        'x              x        x   x           x         x               /' +
        'x              x       x     x          x         x               /' +
        'x              x       x     x          x         x               /' +
        'x              x      x       x         x         x               /' +
        'xxxxxxxxxxxxxxxx      x       x         x         xxxxxxxxxxxxxx  /' +
        'x              x     xxxxxxxxxxx        x         x               /' +
        'x              x     x         x        x         x               /' +
        'x              x    x           x       x         x               /' +
        'x              x    x           x       x         x               /' +
        'x              x   x             x      x         x               /' +
        'x              x   x             x      x         x               /' +
        'x              x  x               x     x         x               /' +
        'x              x  x               x     x         xxxxxxxxxxxxxxxx/'
    }
    ,
    {
        color: 0xff66ff,
        offsetX: -20,
        offsetY: 20,
        bitmap:
        'x                   xxxxx      x               x  xxxxxxxxxxxxxxxx/' +
        'x                 xx     xx    x               x  x               /' +
        'x                x         x    x             x   x               /' +
        'x               x           x   x             x   x               /' +
        'x              x             x   x           x    x               /' +
        'x              x             x   x           x    x               /' +
        'x             x               x   x         x     x               /' +
        'x             x               x   x         x     x               /' +
        'x             x               x    x       x      xxxxxxxxxxxxxx  /' +
        'x             x               x    x       x      x               /' +
        'x             x               x     x     x       x               /' +
        'x              x             x      x     x       x               /' +
        'x              x             x       x   x        x               /' +
        'x               x           x        x   x        x               /' +
        'x                x         x          x x         x               /' +
        'x                 xx     xx           x x         x               /' +
        'xxxxxxxxxxxxxx      xxxxx              x          xxxxxxxxxxxxxxxx/'
    }
    ,
    {
        color: 0x00ffff,
        offsetX: -20,
        offsetY: 20,
        bitmap:
        '    xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx   /' +
        '    x                 x                    /' +
        '    x                 x                    /' +
        '    x                 x                    /' +
        '    x                 x                    /' +
        '    x                 x                    /' +
        '    x                 x                    /' +
        '    x                 x                    /' +
        '    x                 x                    /' +
        '    xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx   /' +
        '    x                 x                    /' +
        '    x                 x                    /' +
        '    x                 x                    /' +
        '    x                 x                    /' +
        '    x                 x                    /' +
        '    x                 x                    /' +
        '    x                 x                    /' +
        '    x                 x                    /' +
        '    xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx   /' +
        '    x                 x                    /' +
        '    x                 x                    /' +
        '    x                 x                    /' +
        '    x                 x                    /' +
        '    x                 x                    /' +
        '    x                 x                    /' +
        '    x                 x                    /' +
        '    x                 x                    /' +
        '    xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx/' +
        '                                          x/' +
        '                                          x/' +
        '                                          x/' +
        '                                          x/' +
        '                                          x/' +
        '  x         x         x         x         x/' +
        '  x         x         x         x         x/' +
        '  x         x         x         x         x/' +
        '  x         x         x         x         x/' +
        '  x         x         x         x         x/' +
        '  x         x         x         x         x/' +
        '  x         x         x         x         x/' +
        '  x         x         x         x         x/' +
        '                                          x/' +
        '                                          x/' +
        '                                          x/' +
        '                                     xxxxxx/'
    }
    ,
    {
        color: 0xff00ff,
        offsetX: 20,
        offsetY: -20,
        bitmap:
            '          x                     x          /' +
            '          x                     x          /' +
            '           x                   x           /' +
            '           x                   x           /' +
            '            x                 x            /' +
            '            x                 x            /' +
            '             x               x             /' +
            '             x               x             /' +
            ' xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx /' +
            '                     x                     /' +
            '                     x                     /' +
            '                     x                     /' +
            '                     x                     /' +
            '                     x                     /' +
            '                     x                     /' +
            '                     x                     /' +
            '                     x                     /' +
            '  xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx  /' +
            '                     x                     /' +
            '                     x                     /' +
            '                     x                     /' +
            '                     x                     /' +
            '                     x                     /' +
            '                     x                     /' +
            '                     x                     /' +
            '                     x                     /' +
            'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx/' +
            '                     x                     /' +
            '                     x                     /' +
            '                     x                     /' +
            '                     x                     /' +
            '                     x                     /' +
            '                     x                     /' +
            '                     x                     /' +
            '                     x                     /' +
            '                     x                     /' +
            '                     x                     /' +
            '                     x                     /' +
            '                     x                     /'
    }

];


// Lines Methods

// Pre-process patterns

Lines.prototype.parsePatterns = function (patterns) {

    for (var p in patterns) {

        var bitmap = patterns[p].bitmap;
        var i, a = 0, b = 0;

        for (i = 0; i < bitmap.length; i++) {
            switch (bitmap.charAt(i).toLowerCase()) {

                case '/':
                    a = 0;
                    b ++;
                    break;

                case ' ':
                    a ++;
                    break;

                default:
                    this.plain.setNode(p, a, b);
                    a ++;
                    break;

            }
            
        }

    }

    console.log(this.plain);
}


// Draw lines

Lines.prototype.drawLines = function () {
    
    var l, n, m;
    
    this.parentTransform = new THREE.Object3D();
    
    // Algorithm B - Connecting the nearest nodes
    
    for (l = 0; l < 2; l++) { // Enumerating 2 plains
        
        for (n in this.plain.nodeBuffer[l]) { // Enumerating nodes within the plain

            var offsetX = 0, offsetY = 0;
            var x0 = this.plain.nodeBuffer[l][n].x;
            var y0 = this.plain.nodeBuffer[l][n].y;

            // Looking for the nearest nodes in Plain B
            var minDistance = 0xffffff;
            var nearestNodes = [];

            // Looking for nearest nodes
            for (m in this.plain.nodeBuffer[1-l]) {

                var x1 = this.plain.nodeBuffer[1-l][m].x;
                var y1 = this.plain.nodeBuffer[1-l][m].y;

                var d = Math.sqrt(Math.pow(x1-x0, 2) + Math.pow(y1-y0, 2));
                if (d == minDistance) {
                    nearestNodes.push({x: x1, y: y1});
                } else if (d < minDistance) {
                    minDistance = d;
                    nearestNodes = [{x: x1, y: y1}];
                }
            }

            // Draw lines to the nearest nodes in Plain B
            for (m in nearestNodes) {

                var x1 = nearestNodes[m].x;
                var y1 = nearestNodes[m].y;
                
                if (l == 1 && this.plain.isConnected(x0, y0, x1, y1)) {
//                    console.log('Duplicated nodes ignored');
                } else {
                    
                    var geometry3 = new THREE.Geometry();
                    var colors3 = [];
                    
                    if (l == 0) {
                        this.plain.setConnection(x0, y0, x1, y1);
                    }
                    
                    // Adding Node A
                    geometry3.vertices.push(Lines.toPosition(l, x0, y0));
                    colors3.push(new THREE.Color( Lines.patterns[l].color ));

                    // Adding a black node in the Middle
//                    geometry3.vertices.push({x:0, y:0, z:0});
                    geometry3.vertices.push(Lines.toPosition(.5, (x0+x1)/2, (y0+y1)/2));
                    colors3.push(new THREE.Color( 0x000000 ));

                    // Adding Node B
                    geometry3.vertices.push(Lines.toPosition(1-l, x1, y1));
                    colors3.push(new THREE.Color( Lines.patterns[1-l].color ));

                    var line, p, d = 225;

                    geometry3.colors = colors3;
                    line = new THREE.Line(geometry3, Lines.MATERIAL);
                    line.scale.x = line.scale.y = line.scale.z =  Lines.SCALE;
                    line.position.x = 0;
                    line.position.y = 0;
                    line.position.z = 0;
                    this.parentTransform.add( line );
                    
                }

            }

        }
        
    }

    scene.add( this.parentTransform );

}


// Converting grid coodinate to 3D position
Lines.toPosition = function(plain, x, y) {
    return {
        x: x * Lines.GRID_DISTANCE + Lines.OFFSET_X,
        y: - y * Lines.GRID_DISTANCE + Lines.OFFSET_Y,
        z: (plain - .5) * 2 * Lines.PLANE_DISTANCE
    }
}



// Plain Class
// Abstract class for plains and nodes with all the connection data

function Plain() {
    
    this.plainBuffer = [];
    this.nodeBuffer = [];
    this.nodes = [];
    this.maxWidth = 0;
    this.maxHeight = 0;
    this.totalNodes = 0;
    
}


// Get the a certain node value (true / false)

Plain.prototype.getNode = function(plain, x, y) {
    
    if (!this.plainBuffer[plain]) {
        return false;
    }
    
    if (!this.plainBuffer[plain][x]) {
        return false;
    }
    
    return this.plainBuffer[plain][x][y];
}


// Set the a certain node value (true / false)

Plain.prototype.setNode = function(plain, x, y, on) {
    
    if (typeof(on)=='undefined') {
        on = true;
    }
    
    if (!this.plainBuffer[plain]) {
        this.plainBuffer[plain] = [];
    }
    
    if (!this.plainBuffer[plain][x]) {
        this.plainBuffer[plain][x] = [];
    }
    
    if (!this.plainBuffer[plain][x][y]) {
        this.plainBuffer[plain][x][y] = {};
    }
    
    if (!this.nodeBuffer[plain]) {
        this.nodeBuffer[plain] = [];
    }
    
    if (!this.nodes[plain]) {
        this.nodes[plain] = 0;
    }
    
    if (on && !this.plainBuffer[plain][x][y].node) { // Add a node to the plain
        
        this.nodeBuffer[plain].push({x:x, y:y});
        this.plainBuffer[plain][x][y].node = true;
        this.nodes[plain] ++;
        this.totalNodes ++;
        this.maxWidth = Math.max(this.maxWidth, x);
        this.maxHeight = Math.max(this.maxHeight, y);
        
    } else if (!on && this.plainBuffer[plain][x][y].node) { // Remove a node from the plain
        
        this.plainBuffer[plain][x][y].node = false;
        this.nodes[plain] --;
        this.totalNodes --;
//        this.maxWidth = Math.max(this.maxWidth, x);
//        this.maxHeight = Math.max(this.maxHeight, y);
        
    }
    
}


// Set a connection between 2 nodes
// Connection is only stored one-way in plain0

Plain.prototype.setConnection = function(x0, y0, x1, y1) {
    
    if(!this.plainBuffer[0][x0][y0].connection) {
        this.plainBuffer[0][x0][y0].connection = [];
    }
    
    if(!this.isConnected(x0, y0, x1, y1)) {
        this.plainBuffer[0][x0][y0].connection.push({x:x1, y:y1});
    }
    
}


// Check if 2 nodes are connected

Plain.prototype.isConnected = function(x0, y0, x1, y1) {
        
    Lines.plainBuffer = this.plainBuffer;
    
    try {
        if(!this.plainBuffer[0][x0][y0].connection) {
            return false;
        }
    } catch (err) {
        return false;
    }
    
    for (var i in this.plainBuffer[0][x0][y0].connection) {
        with (this.plainBuffer[0][x0][y0].connection[i]) {
            if (x==x1 && y==y1) {
                return true;
            }
        }
    }
    
    return false;
    
}


// Get all nodes in a plain as an Array

Plain.prototype.getPlainNodes = function(plain) {
    return this.nodes[plain];
}
