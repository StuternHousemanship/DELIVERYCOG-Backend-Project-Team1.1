"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatMessage = exports.response = void 0;
const response = ({ success, message, error, data }) => {
    return {
        success: success == null ? true : success,
        message: (0, exports.formatMessage)(message),
        error: (0, exports.formatMessage)(error) || undefined,
        count: typeof data === 'object' ? data.length : undefined,
        data: data || undefined,
    };
};
exports.response = response;
const formatMessage = (str) => {
    if (!str)
        return '';
    // Make first letter capitial
    return str.charAt(0).toUpperCase() + str.slice(1);
};
exports.formatMessage = formatMessage;
