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
exports.verifyRefreshToken = void 0;
const token_1 = require("../models/token");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyRefreshToken = (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    const privateKey = process.env.REFRESH_TOKEN_PRIVATE_KEY;
    const refreshTokenFromDB = (0, token_1.findToken)(refreshToken);
    if (!refreshTokenFromDB)
        return { error: true, message: 'Invalid refresh token' };
    const tokenDetails = jsonwebtoken_1.default.verify(refreshToken, privateKey);
    if (!tokenDetails)
        return { error: true, message: 'Invalid refresh token' };
    return {
        tokenDetails,
        error: false,
        message: 'Valid refresh token',
    };
});
exports.verifyRefreshToken = verifyRefreshToken;
//# sourceMappingURL=verifyRefreshToken.js.map