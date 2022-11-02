"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.restPasswordValidationRules = exports.emailValidationRules = exports.otpValidationRules = exports.loginValidationRules = exports.registerValidationRules = void 0;
const express_validator_1 = require("express-validator");
const registerValidationRules = () => {
    return [
        (0, express_validator_1.check)('email')
            .trim()
            .isEmail()
            .normalizeEmail()
            .withMessage('please enter a valid email'),
        (0, express_validator_1.check)('firstName')
            .trim()
            .notEmpty()
            .withMessage('first name can not be empty')
            .isLength({ min: 1, max: 20 })
            .withMessage('First name  must be between 1 and 20 characters'),
        (0, express_validator_1.check)('lastName')
            .trim()
            .notEmpty()
            .withMessage('last name can not be empty')
            .isLength({ min: 1, max: 20 })
            .withMessage('Last name  must be between 1 and 20 characters'),
        (0, express_validator_1.check)('password')
            .trim()
            .notEmpty()
            .withMessage('Password can not be empty')
            .isLength({ min: 6, max: 16 })
            .withMessage('Password must be between 6 and 16 characters'),
        (0, express_validator_1.check)('phoneNumber')
            .trim()
            .notEmpty()
            .withMessage('Phone number can not be empty')
            .isLength({ min: 11, max: 11 })
            .withMessage('Phone number must be 11 digit long'),
    ];
};
exports.registerValidationRules = registerValidationRules;
const loginValidationRules = () => {
    return [
        (0, express_validator_1.check)('email')
            .trim()
            .isEmail()
            .normalizeEmail()
            .withMessage('please enter a valid email'),
        (0, express_validator_1.check)('password')
            .trim()
            .notEmpty()
            .withMessage('Password can not be empty')
            .isLength({ min: 6, max: 16 })
            .withMessage('Password must be between 6 and 16 characters'),
    ];
};
exports.loginValidationRules = loginValidationRules;
const otpValidationRules = () => {
    return [
        (0, express_validator_1.body)('code')
            .isLength({ min: 6 })
            .isNumeric()
            .withMessage('code must be at least 6 character long'),
    ];
};
exports.otpValidationRules = otpValidationRules;
const emailValidationRules = () => {
    return [
        (0, express_validator_1.check)('email')
            .trim()
            .isEmail()
            .normalizeEmail()
            .withMessage('please enter a valid email'),
    ];
};
exports.emailValidationRules = emailValidationRules;
const restPasswordValidationRules = () => {
    return [
        (0, express_validator_1.check)('password')
            .trim()
            .notEmpty()
            .withMessage('Password can not be empty')
            .isLength({ min: 6, max: 16 })
            .withMessage('Password must be between 6 and 16 characters'),
        (0, express_validator_1.check)('confirm_password')
            .trim()
            .notEmpty()
            .withMessage('Password can not be empty')
            .isLength({ min: 6, max: 16 })
            .withMessage('Password must be between 6 and 16 characters'),
        (0, express_validator_1.check)('email')
            .trim()
            .isEmail()
            .normalizeEmail()
            .withMessage('please enter a valid email'),
        (0, express_validator_1.check)('code')
            .isLength({ min: 6 })
            .isNumeric()
            .withMessage('code must be at least 6 character long'),
    ];
};
exports.restPasswordValidationRules = restPasswordValidationRules;
