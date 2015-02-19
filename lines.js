Lines = {
    GRID_DISTANCE: 10,
    PLANE_DISTANCE: 500,
    OFFSET_X: -100,
    OFFSET_Y: 100,
    OFFSET_Z: 0
};

Lines.MATERIAL = new THREE.LineBasicMaterial( {
    fog: true,
    color: 0xffffff,
    opacity: 1,
    linewidth: 1,
    linecap: 'round',
    vertexColors: THREE.VertexColors
} );



Lines.plains = [

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
    
    var arrays = Lines.parseBitmap(Lines.plains);
    Lines.parentTransform = new THREE.Object3D();
    
    var totalNodes = Math.max(arrays[0].length,arrays[1].length);
    for ( var n=0; n<totalNodes ; n++) {

        var geometry3 = new THREE.Geometry();
        var colors3 = [];
        var offsetX = 0, offsetY = 0;
        
        // Node A
        if (Lines.plains[0].offsetX) {
            offsetX = Lines.plains[0].offsetX;
        }
        if (Lines.plains[0].offsetY) {
            offsetY = Lines.plains[0].offsetY;
        }
//        console.log('Offset A', offsetX, offsetY);
        var a = Math.floor(n / totalNodes * arrays[0].length);
        var p0 = arrays[0][a];
        var x0 = (p0.x + offsetX) * Lines.GRID_DISTANCE + Lines.OFFSET_X;
        var y0 = - (p0.y + offsetY) * Lines.GRID_DISTANCE + Lines.OFFSET_Y;
        var z0 = Lines.PLANE_DISTANCE + Lines.OFFSET_Z;
        
        colors3.push(new THREE.Color( Lines.plains[0].color ));
        geometry3.vertices.push( {x:x0, y:y0, z:z0} );
        
        // Node Black inthe Middle
        geometry3.vertices.push( {x:(x0+x1)*.5, y:(y0+y1)*.5, z:(z0+z1)*.5} );
        colors3.push(new THREE.Color( 0x000000 ));

        // Node B
        offsetX = 0;
        offsetY = 0;
        if (Lines.plains[1].offsetX) {
            offsetX = Lines.plains[1].offsetX;
        }
        if (Lines.plains[1].offsetY) {
            offsetY = Lines.plains[1].offsetY;
        }
//        console.log('Offset B', offsetX, offsetY);
        var b = Math.floor(n / totalNodes * arrays[1].length);
        var p1 = arrays[1][b];
        var x1 = (p1.x + offsetX) * Lines.GRID_DISTANCE + Lines.OFFSET_X;
        var y1 = - (p1.y + offsetY) * Lines.GRID_DISTANCE + Lines.OFFSET_Y;
        var z1 = - Lines.PLANE_DISTANCE + Lines.OFFSET_Z;

        geometry3.vertices.push( {x:x1, y:y1, z:z1} );
        colors3.push(new THREE.Color( Lines.plains[1].color ));

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
