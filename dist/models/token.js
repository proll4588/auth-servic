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
Object.defineProperty(exports, "__esModule", { value: true });
exports.findToken = exports.addTokenToUser = exports.deleteTokenByUserId = exports.getTokenByUserId = void 0;
const prisma_1 = require("../prisma");
const getTokenByUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tokenData = yield prisma_1.prisma.users_tokens.findUnique({
            where: {
                user_id: userId,
            },
        });
        return tokenData;
    }
    catch (e) {
        return null;
    }
});
exports.getTokenByUserId = getTokenByUserId;
const deleteTokenByUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tokenData = yield prisma_1.prisma.users_tokens.delete({
            where: {
                user_id: userId,
            },
        });
        return tokenData;
    }
    catch (e) {
        return null;
    }
});
exports.deleteTokenByUserId = deleteTokenByUserId;
const addTokenToUser = (userId, token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newToken = yield prisma_1.prisma.users_tokens.create({
            data: {
                token,
                user_id: userId,
            },
        });
        return newToken;
    }
    catch (e) {
        return null;
    }
});
exports.addTokenToUser = addTokenToUser;
const findToken = (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = yield prisma_1.prisma.users_tokens.findFirst({
            where: {
                token: refreshToken,
            },
        });
        return token;
    }
    catch (e) {
        return null;
    }
});
exports.findToken = findToken;
//# sourceMappingURL=token.js.map