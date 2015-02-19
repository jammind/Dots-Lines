Lines = {
    GRID_DISTANCE: 15,
    PLANE_DISTANCE: 1000,
    OFFSET_X: -300,
    OFFSET_Y: 300,
    OFFSET_Z: 500
};

Lines.MATERIAL = new THREE.LineBasicMaterial( {
    fog: true,
    color: 0xffffff,
    opacity: 1,
    linewidth: 1,
    linecap: 'round',
    vertexColors: THREE.VertexColors
} );



Lines.bitmaps = [

//    'xxxxxxxxxxxxx',

//    '      x      /' +
//    '      x      /' +
//    '      x      /' +
//    '      x      /' +
//    '      x      /' +
//    '      x      /' +
//    '      x      /' +
//    '      x      /' +
//    '      x      /' +
//    '      x      /' +
//    '      x      /' +
//    '      x      /' +
//    '      x      /',

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
    
    ,
    
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


];

Lines.parseBitmap = function(bitmaps) {

    var arrays = [];

    for (var indexBitmap in bitmaps) {

        var bitmap = bitmaps[indexBitmap];
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
//                                if (!array[a]) {
//                                    array[a] = [];
//                                }
//                                array[a][b] = 1;
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
    
    var arrays = Lines.parseBitmap(Lines.bitmaps);
    Lines.parentTransform = new THREE.Object3D();
    
    var totalNodes = Math.max(arrays[0].length,arrays[1].length);
    for ( var n=0; n<totalNodes ; n++) {

        var geometry3 = new THREE.Geometry(),
            points = hilbert2D( new THREE.Vector3( 0,0,0 ), 400.0, 4, 0, 1, 2, 3, 4, 5, 6, 7 ),
            colors3 = [];

        var a = Math.floor(n / totalNodes * arrays[0].length);
        var p0 = arrays[0][a];
        var x0 = p0.x * Lines.GRID_DISTANCE + Lines.OFFSET_X;
        var y0 = - p0.y * Lines.GRID_DISTANCE + Lines.OFFSET_Y;
        var z0 = Lines.OFFSET_Z;

        var b = Math.floor(n / totalNodes * arrays[1].length);
//        console.log(a, b);
        var p1 = arrays[1][b];
        var x1 = p1.x * Lines.GRID_DISTANCE + Lines.OFFSET_X;
        var y1 = - p1.y * Lines.GRID_DISTANCE + Lines.OFFSET_Y;
        var z1 = - Lines.PLANE_DISTANCE + Lines.OFFSET_Z;

        geometry3.vertices.push( {x:x1, y:y1, z:z1} );
        geometry3.vertices.push( {x:x0, y:y0, z:z0} );

        var color = new THREE.Color( 0xffffff );
        color.setHSL( a / points.length, 1.0, 0.5 );
        colors3.push(new THREE.Color( 0xff0000 ));
        colors3.push(new THREE.Color( 0x0000ff ));
        geometry3.colors = colors3;

        var line, p, scale = 0.3, d = 225;

        line = new THREE.Line(geometry3, Lines.MATERIAL);
        line.scale.x = line.scale.y = line.scale.z =  scale*1.5;
        line.position.x = 0;
        line.position.y = 0;
        line.position.z = 0;
        Lines.parentTransform.add( line );
    }

    scene.add( Lines.parentTransform );

}
