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

Lines.MAX_ROWS = 50,
Lines.GRID_DISTANCE = 10,
Lines.PLANE_DISTANCE = 500,
Lines.OFFSET_X = -100,
Lines.OFFSET_Y = 100,
Lines.OFFSET_Z = 0


Lines.MATERIAL = new THREE.LineBasicMaterial( {
    fog: true,
    color: 0xffffff,
    opacity: 1,
    linewidth: 1,
    linecap: 'round',
    vertexColors: THREE.VertexColors
} );


Lines.patterns = [

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
                    this.plain.setGrid(p, a, b);
                    a ++;
                    break;

            }
            
        }

    }

    console.log(this.plain);
}


// Draw lines

Lines.prototype.drawLines = function () {
    
    console.log('drawLines');
    var n, m;
    
    this.parentTransform = new THREE.Object3D();
    
    // Algorithm B - Connecting the nearest nodes
    
    for (n in this.plain.nodeBuffer[0]) {
        console.log('Node ', n);

        var geometry3 = new THREE.Geometry();
        var colors3 = [];
        var offsetX = 0, offsetY = 0;
        var x0 = this.plain.nodeBuffer[0][n].x;
        var y0 = this.plain.nodeBuffer[0][n].y;
        var z0 = -Lines.PLANE_DISTANCE;
        
        // Looking for the nearest nodes in Plain B
        var minDistance = 0xffffff;
        var nearestNodes = [];
        
        for (m in this.plain.nodeBuffer[1]) {
            
            var x1 = this.plain.nodeBuffer[1][m].x;
            var y1 = this.plain.nodeBuffer[1][m].y;
            
            var d = Math.sqrt(Math.pow(x1-x0, 2) + Math.pow(y1-y0, 2));
            if (d == minDistance) {
                nearestNodes.push({x: x1, y: y1});
//                console.log('One more node at the same distance (', x0, ',', y0, ')-(', x1, ',', y1, ')', d, minDistance);
//                console.log(nearestNodes);
            } else if (d < minDistance) {
//                console.log('Nearest node updated (', x0, ',', y0, ')-(', x1, ',', y1, ')', d, minDistance);
                minDistance = d;
//                console.log(nearestNodes);
                nearestNodes = [{x: x1, y: y1}];
//                console.log(nearestNodes);
            }
        }
        console.log('End of searching');
        console.log(nearestNodes);
        
        // Draw lines to the nearest nodes in Plain B
        var z1 = Lines.PLANE_DISTANCE;
        
        for (m in nearestNodes) {
            // Adding Node A
            geometry3.vertices.push( {x:x0, y:y0, z:z0} );
            colors3.push(new THREE.Color( Lines.patterns[0].color ));

            // Adding a black node in the Middle
            geometry3.vertices.push( {x:(x0+x1)*.5, y:(y0+y1)*.5, z:(z0+z1)*.5} );
            colors3.push(new THREE.Color( 0x000000 ));

            // Adding Node B
            var x1 = nearestNodes[m].x;
            var y1 = nearestNodes[m].y;
            geometry3.vertices.push( {x:x1, y:y1, z:z1} );
            colors3.push(new THREE.Color( Lines.patterns[1].color ));
            
            var line, p, scale = 0.3, d = 225;

            geometry3.colors = colors3;
            line = new THREE.Line(geometry3, Lines.MATERIAL);
            line.scale.x = line.scale.y = line.scale.z =  scale*1.5;
            line.position.x = 0;
            line.position.y = 0;
            line.position.z = 0;
            this.parentTransform.add( line );
        }

    }

    scene.add( this.parentTransform );

}




// Pre-process patterns

Lines.parseBitmap = function(plains) {

    var arrays = [];

    for (var i in plains) {

        var bitmap = plains[i].bitmap;
        var array = [];
        var i = 0, a = 0, b = 0;

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
//                    if (!array[a]) {
//                        array[a] = [];
//                    }
//                    array[a][b] = 1;
                    array.push({x:a, y:b});
                    a ++;
                    break;

            }
        }

        arrays.push(array);
    }

    console.log(arrays);
    return arrays;
}



// Draw lines
Lines.drawLines = function (scene) {
    
    var arrays = Lines.parseBitmap(Lines.patterns);
//    Lines.parseBitmap(Lines.plains);
    Lines.parentTransform = new THREE.Object3D();
    
    var totalNodes = Math.max(arrays[0].length,arrays[1].length);
    for ( var n=0; n<totalNodes ; n++) {

        var geometry3 = new THREE.Geometry();
        var colors3 = [];
        var offsetX = 0, offsetY = 0;
        
        // Node A
        if (Lines.patterns[0].offsetX) {
            offsetX = Lines.patterns[0].offsetX;
        }
        if (Lines.patterns[0].offsetY) {
            offsetY = Lines.patterns[0].offsetY;
        }
//        console.log('Offset A', offsetX, offsetY);
        var a = Math.floor(n / totalNodes * arrays[0].length);
        var p0 = arrays[0][a];
        var x0 = (p0.x + offsetX) * Lines.GRID_DISTANCE + Lines.OFFSET_X;
        var y0 = - (p0.y + offsetY) * Lines.GRID_DISTANCE + Lines.OFFSET_Y;
        var z0 = Lines.PLANE_DISTANCE + Lines.OFFSET_Z;
        
        colors3.push(new THREE.Color( Lines.patterns[0].color ));
        geometry3.vertices.push( {x:x0, y:y0, z:z0} );
        
        // Node Black inthe Middle
        geometry3.vertices.push( {x:(x0+x1)*.5, y:(y0+y1)*.5, z:(z0+z1)*.5} );
        colors3.push(new THREE.Color( 0x000000 ));

        // Node B
        offsetX = 0;
        offsetY = 0;
        if (Lines.patterns[1].offsetX) {
            offsetX = Lines.patterns[1].offsetX;
        }
        if (Lines.patterns[1].offsetY) {
            offsetY = Lines.patterns[1].offsetY;
        }
//        console.log('Offset B', offsetX, offsetY);
        var b = Math.floor(n / totalNodes * arrays[1].length);
        var p1 = arrays[1][b];
        var x1 = (p1.x + offsetX) * Lines.GRID_DISTANCE + Lines.OFFSET_X;
        var y1 = - (p1.y + offsetY) * Lines.GRID_DISTANCE + Lines.OFFSET_Y;
        var z1 = - Lines.PLANE_DISTANCE + Lines.OFFSET_Z;

        geometry3.vertices.push( {x:x1, y:y1, z:z1} );
        colors3.push(new THREE.Color( Lines.patterns[1].color ));

//        var color = new THREE.Color( 0xffffff );
//        color.setHSL( a / points.length, 1.0, 0.5 );
        

        var line, p, scale = 0.3, d = 225;

        geometry3.colors = colors3;
        line = new THREE.Line(geometry3, Lines.MATERIAL);
        line.scale.x = line.scale.y = line.scale.z =  scale*1.5;
        line.position.x = 0;
        line.position.y = 0;
        line.position.z = 0;
        Lines.parentTransform.add( line );
    }

    scene.add( Lines.parentTransform );

}



// Plain Class
// Abstract class for plains and nodes

function Plain() {
    
    this.plainBuffer = [];
    this.nodeBuffer = [];
    this.nodes = [];
    this.maxWidth = 0;
    this.maxHeight = 0;
    this.totalNodes = 0;
    
}

Plain.prototype.getGrid = function(plain, x, y) {
    
    if (!this.plainBuffer[plain]) {
        return false;
    }
    
    if (!this.plainBuffer[plain][x]) {
        return false;
    }
    
    return this.plainBuffer[plain][x][y];
}

Plain.prototype.setGrid = function(plain, x, y, on) {
    
    if (typeof(on)=='undefined') {
        on = true;
    }
    
    if (!this.plainBuffer[plain]) {
        this.plainBuffer[plain] = [];
    }
    
    if (!this.plainBuffer[plain][x]) {
        this.plainBuffer[plain][x] = [];
    }
    
    if (!this.nodeBuffer[plain]) {
        this.nodeBuffer[plain] = [];
    }
    
    if (!this.nodes[plain]) {
        this.nodes[plain] = 0;
    }
    
    if (on && !this.plainBuffer[plain][x][y]) { // Add a node to the plain
        
        this.nodeBuffer[plain].push({x:x, y:y});
        this.plainBuffer[plain][x][y] = true;
        this.nodes[plain] ++;
        this.totalNodes ++;
        this.maxWidth = Math.max(this.maxWidth, x);
        this.maxHeight = Math.max(this.maxHeight, y);
        
    } else if (!on && this.plainBuffer[plain][x][y]) { // Remove a node from the plain
        
        this.plainBuffer[plain][x][y] = false;
        this.nodes[plain] --;
        this.totalNodes --;
//        this.maxWidth = Math.max(this.maxWidth, x);
//        this.maxHeight = Math.max(this.maxHeight, y);
        
    }
    
}

Plain.prototype.getPlainNodes = function(plain) {
    return this.nodes[plain];
}
