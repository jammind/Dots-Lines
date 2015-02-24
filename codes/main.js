function init() {
//    initEditor();
    initViewer();
}

function initEditor() {
    var n;
    for (n = 0; n < Lines.MAX_ROWS * Lines.MAX_ROWS; n++) {
        $('.gridContainer').append('<div class="grid"></div>')
    }
}

function initViewer() {

    var i, container;

    container = document.getElementById('viewer');

    camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.z = 700;

    scene = new THREE.Scene();
    scene.fog = new THREE.Fog (0x000000, 500, 2000);

//	renderer = new THREE.CanvasRenderer();
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );

    // lines

    lines = new Lines(scene); // Jam's codes

    //

    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '0px';
    //container.appendChild( stats.domElement );

    //

    document.addEventListener( 'mousemove', onDocumentMouseMove, false );
    document.addEventListener( 'touchstart', onDocumentTouchStart, false );
    document.addEventListener( 'touchmove', onDocumentTouchMove, false );

    //

    window.addEventListener( 'resize', onWindowResize, false );

}

//

function animate() {

    requestAnimationFrame( animate );
    onWindowResize();
    render();

    stats.update();

}

function render() {

//				camera.position.x += ( mouseX - camera.position.x ) * .5;
//				camera.position.y += ( - mouseY + 200 - camera.position.y ) * .5;
    lines.parentTransform.rotation.y = mouseX * .01;
    lines.parentTransform.rotation.x = mouseY * .01;

    camera.lookAt( scene.position );

//				var time = Date.now() * 0.0005;
//
//				for ( var i = 0; i < scene.children.length; i ++ ) {
//
//					var object = scene.children[ i ];
//					if ( object instanceof THREE.Line ) object.rotation.y = time * ( i % 2 ? 1 : -1 );
//
//				}

    renderer.render(scene, camera );

}

function onWindowResize() {

    var panelWidth = (window.innerHeight - 100) * .5;
    var gridSize = Math.floor(panelWidth / Lines.MAX_ROWS) - 1;
    var viewerWidth = window.innerWidth; // - panelWidth;
    var containerSize = (gridSize + 1) * Lines.MAX_ROWS;
    panelWidth = containerSize + 2;

    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    $('#viewer').css("width", viewerWidth+"px")
        .css("height", window.innerHeight+"px");
    $('#panels').css("width", panelWidth+"px")
        .css("height", window.innerHeight+"px");
    $('.panel').css("width", "100%")
        .css("height", (containerSize)+"px");

    if (Lines.gridSize != gridSize ) {
        $('.gridContainer').css('width', containerSize+'px');
        $('.grid').css('width', gridSize+'px').css('height', gridSize+'px');
        Lines.gridSize = gridSize;
    }
    
//    console.log('panelWidth='+panelWidth, 'viewerWidth='+viewerWidth);

    camera.aspect = viewerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( viewerWidth, window.innerHeight);

}

function onDocumentMouseMove( event ) {

    mouseX = event.clientX - windowHalfX;
    mouseY = event.clientY - windowHalfY;

}

function onDocumentTouchStart( event ) {

    if ( event.touches.length > 1 ) {

        event.preventDefault();

        mouseX = event.touches[ 0 ].pageX - windowHalfX;
        mouseY = event.touches[ 0 ].pageY - windowHalfY;

    }

}

function onDocumentTouchMove( event ) {

    if ( event.touches.length == 1 ) {

        event.preventDefault();

        mouseX = event.touches[ 0 ].pageX - windowHalfX;
        mouseY = event.touches[ 0 ].pageY - windowHalfY;
    }

}

