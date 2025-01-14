"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = (0, express_1.default)();
var callback_api_1 = __importDefault(require("amqplib/callback_api"));
var queue = "valditionmessage";
var Message_db_1 = require("./db/Message.db");
callback_api_1.default.connect('amqp://localhost:5672', function (err, con) {
    if (err) {
        throw err;
    }
    ;
    con.createChannel(function (err, cha) {
        if (err) {
            throw err;
        }
        cha.assertQueue(queue, { durable: false });
        cha.consume(queue, function (msg) { return __awaiter(void 0, void 0, void 0, function () {
            var aa, OrginalObjectMessage, Save;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        aa = msg === null || msg === void 0 ? void 0 : msg.content.toString();
                        OrginalObjectMessage = JSON.parse(aa);
                        if (!(OrginalObjectMessage.contentMessage != 'fake' && OrginalObjectMessage.contentMessage != 'shit')) return [3 /*break*/, 2];
                        console.log('set condition do not foun fake or shit');
                        return [4 /*yield*/, (0, Message_db_1.SaveUser)(OrginalObjectMessage.idMessage, OrginalObjectMessage.idOwnMessage, OrginalObjectMessage.idReciverMessage, OrginalObjectMessage.contentMessage)];
                    case 1:
                        Save = _a.sent();
                        if (Save) {
                            console.log('set condition save in database  ');
                            cha.ack(msg);
                            cha.sendToQueue('recmessage', Buffer.from(JSON.stringify(OrginalObjectMessage)));
                        }
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); }, { noAck: false });
    });
});
var Port = 5001;
app.listen(Port, function () { console.log("listening on port number ".concat(Port)); });
