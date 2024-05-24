"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReplayMessage = void 0;
var app_1 = require("../app");
function ReplayMessage(msg) {
    app_1.Io.to(msg.idM).emit('ee', msg.contentM);
    console.log('send to client');
}
exports.ReplayMessage = ReplayMessage;
