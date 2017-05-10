var StaticServer = require('static-server');
var server = new StaticServer({
    rootPath: './public/_build/elandww/',
    port: 3000

});

server.start(function () {
    console.log('Server listening to', server.port);
});

