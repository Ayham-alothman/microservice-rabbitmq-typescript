"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
var mongoose_1 = require("mongoose");
var msgSchema = new mongoose_1.Schema({
    idmessage: { type: String, required: true },
    idownmessage: { type: String, required: true },
    idrecivermessage: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: Date, },
});
exports.Message = (0, mongoose_1.model)('Message', msgSchema);
