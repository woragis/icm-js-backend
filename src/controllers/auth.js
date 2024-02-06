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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.register = exports.testEmail = void 0;
var pg_1 = require("pg");
var bcrypt_1 = require("bcrypt");
var pgConnectionString = {
    host: "localhost",
    port: 5432,
    database: "icm",
    user: "woragis",
    password: "woragispg",
};
var userTable = "users";
var testEmail = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var email, pool, result, exists, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                email = req.body.email;
                pool = new pg_1.Pool(pgConnectionString);
                return [4 /*yield*/, pool.connect()];
            case 1:
                _a.sent();
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, 5, 7]);
                return [4 /*yield*/, pool.query("SELECT EXISTS (SELECT * FROM ".concat(userTable, " WHERE email=$1)"), [email])];
            case 3:
                result = _a.sent();
                exists = result.rows[0].exists;
                if (exists) {
                    res.status(200).json({ message: true });
                }
                else {
                    res.status(200).json({ message: false });
                }
                return [3 /*break*/, 7];
            case 4:
                err_1 = _a.sent();
                console.error("Error testing existance of email " + err_1);
                res
                    .status(500)
                    .json({ message: "Error testing existance of email " + err_1 });
                return [3 /*break*/, 7];
            case 5: return [4 /*yield*/, pool.end()];
            case 6:
                _a.sent();
                return [7 /*endfinally*/];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.testEmail = testEmail;
var register = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, whatsapp, email, password, admin, client, hashedPassword, registerQuery, result, userInfo, err_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                req.session;
                _a = req.body, name = _a.name, whatsapp = _a.whatsapp, email = _a.email, password = _a.password;
                admin = true;
                client = new pg_1.Client(pgConnectionString);
                return [4 /*yield*/, client.connect()];
            case 1:
                _b.sent();
                _b.label = 2;
            case 2:
                _b.trys.push([2, 5, 6, 8]);
                return [4 /*yield*/, (0, bcrypt_1.hash)(password, 10)];
            case 3:
                hashedPassword = _b.sent();
                registerQuery = "INSERT INTO ".concat(userTable, " (name, whatsapp, admin, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING *");
                return [4 /*yield*/, client.query(registerQuery, [
                        name,
                        whatsapp,
                        admin,
                        email,
                        hashedPassword,
                    ])];
            case 4:
                result = _b.sent();
                userInfo = result.rows[0];
                console.log("User registred: " + userInfo);
                res.status(201).json(result);
                return [3 /*break*/, 8];
            case 5:
                err_2 = _b.sent();
                console.error("Error at register controll " + err_2);
                res.status(500).json("Internal server error");
                return [3 /*break*/, 8];
            case 6: return [4 /*yield*/, client.end()];
            case 7:
                _b.sent();
                return [7 /*endfinally*/];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.register = register;
var login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, client, loginQuery, result, encryptedPassword, err_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                client = new pg_1.Client(pgConnectionString);
                return [4 /*yield*/, client.connect()];
            case 1:
                _b.sent();
                loginQuery = "SELECT * FROM ".concat(userTable, " WHERE email=$1;");
                console.log("login control start");
                _b.label = 2;
            case 2:
                _b.trys.push([2, 4, 5, 7]);
                console.log("login control, send database query");
                return [4 /*yield*/, client.query(loginQuery, [email])];
            case 3:
                result = _b.sent();
                console.log("login control, received database query");
                encryptedPassword = result.rows[0].password;
                console.log("entrypted password: " + encryptedPassword);
                (0, bcrypt_1.compare)(password, encryptedPassword, function (err, same) {
                    if (err) {
                        console.error("Error decrypting password on login " + err);
                        res.status(500).json({ message: "Error decrypting password" });
                    }
                    else if (same) {
                        console.log("logged in");
                        res.status(200).json({ message: "logged in" });
                    }
                    else {
                        console.log("wrong password on login");
                        res.status(400).json({ message: "wrong password" });
                    }
                });
                return [3 /*break*/, 7];
            case 4:
                err_3 = _b.sent();
                console.error("Error at loging controller " + err_3);
                res.status(500).json({ message: "Internal server error" + err_3 });
                return [3 /*break*/, 7];
            case 5:
                console.log("login controller end");
                return [4 /*yield*/, client.end()];
            case 6:
                _b.sent();
                return [7 /*endfinally*/];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.login = login;
var logout = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        if (req.session) {
            req.session.destroy(function (err) {
                return console.error("Error destroying session " + err);
            });
        }
        else {
            res.status(400).json({ message: "already logged off" });
        }
        return [2 /*return*/];
    });
}); };
exports.logout = logout;
