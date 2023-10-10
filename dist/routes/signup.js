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
const user_1 = require("./../models/user");
const express_1 = require("express");
const bcrypt_1 = __importDefault(require("bcrypt"));
const generateTokens_1 = require("../utils/generateTokens");
const router = (0, express_1.Router)();
router.post('/signUp', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const saltEnv = Number(process.env.SALT);
    try {
        const userCandidat = yield (0, user_1.findUserByEmail)(email);
        if (userCandidat)
            return res
                .status(400)
                .json({ error: true, message: 'User with given email already exist' });
        const salt = yield bcrypt_1.default.genSalt(saltEnv);
        const hashPassword = yield bcrypt_1.default.hash(password, salt);
        const user = yield (0, user_1.createUser)(email, hashPassword);
        if (!user)
            return res
                .status(400)
                .json({ error: true, message: 'Error when creating user' });
        const tokens = yield (0, generateTokens_1.generateTokens)(user.id);
        res.status(201).json({
            error: false,
            message: 'Account created sucessfully',
            data: {
                tokens,
                userId: user.id,
            },
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: true, message: 'Internal Server Error' });
    }
}));
//# sourceMappingURL=signup.js.map