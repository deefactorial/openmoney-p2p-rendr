var assert = require('assert');
if (typeof global.window.define == 'function' && global.window.define.amd) {
    global.window.define('assert', function () { return assert; });
} else {
    global.window.assert = assert;
}
var StringDecoder = require('string_decoder').StringDecoder;
if (typeof global.window.define == 'function' && global.window.define.amd) {
    global.window.define('StringDecoder', function () { return StringDecoder; });
} else {
    global.window.StringDecoder = StringDecoder;
}
var url = require('url');
if (typeof global.window.define == 'function' && global.window.define.amd) {
    global.window.define('url', function () { return url; });
} else {
    global.window.url = url;
}