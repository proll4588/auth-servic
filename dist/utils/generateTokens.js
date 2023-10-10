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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTokens = void 0;
const constants_1 = require("../constants");
const token_1 = require("../models/token");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateTokens = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const privatKey = process.env.ACCESS_TOKEN_PRIVATE_KEY;
    try {
        const payload = { id: userId };
        const accessToken = jsonwebtoken_1.default.sign(payload, privatKey, {
            expiresIn: constants_1.tokenLifeTime,
        });
        const refreshToken = jsonwebtoken_1.default.sign(payload, privatKey, {
            expiresIn: constants_1.refreshTokenLifeTime,
        });
        const userToken = yield (0, token_1.getTokenByUserId)(userId);
        if (userToken)
            yield (0, token_1.deleteTokenByUserId)(userId);
        yield (0, token_1.addTokenToUser)(userId, refreshToken);
        return { accessToken, refreshToken };
    }
    catch (err) {
        return Promise.reject(err);
    }
});
exports.generateTokens = generateTokens;
//# sourceMappingURL=generateTokens.js.map