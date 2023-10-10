"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERRORS_MAP = exports.createErrorMap = exports.RESPONSE_ERROR_MESSAGES = void 0;
exports.RESPONSE_ERROR_MESSAGES = {
    other: 'Unknow error',
    notAuth: 'Not auth',
};
const createError = (message) => {
    return {
        data: undefined,
        error: true,
        message,
    };
};
const createErrorMap = () => {
    let map = {};
    for (const key in exports.RESPONSE_ERROR_MESSAGES) {
        const KEY = key;
        Object.assign(map, { [key]: createError(exports.RESPONSE_ERROR_MESSAGES[KEY]) });
    }
    return map;
};
exports.createErrorMap = createErrorMap;
exports.ERRORS_MAP = (0, exports.createErrorMap)();
//# sourceMappingURL=errors.js.map