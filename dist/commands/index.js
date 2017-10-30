"use strict";
exports.__esModule = true;
var commander = require("commander");
var _1 = require("../config/");
var commands = [
    'new',
];
commander.version(_1["default"].version);
commands.forEach(function (command) {
    var _a = require("./" + command), description = _a.description, handle = _a.handle, signature = _a.signature;
    commander
        .command(signature)
        .description(description)
        .action(handle);
});
exports["default"] = commander;
