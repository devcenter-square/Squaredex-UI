/**
 * Static HTTP Server
 *
 * Create a static file server instance to serve files
 * and folder in the './public' folder
 */

// modules
console.log('starting server')
var static = require( 'node-static' ),
    port =  process.env.PORT || 8080,
    http = require( 'http' );

// config
var file = new static.Server( './', {
    cache: 3600,
    gzip: true
} );

// serve
http.createServer( function ( request, response ) {
    request.addListener( 'end', function () {
        file.serve( request, response );
    } ).resume();
} ).listen( port , function () {
    console.log("server loaded successfully")
} );