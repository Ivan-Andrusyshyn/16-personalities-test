"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// ========
const test_answers_validator_1 = require("../../validators/test-answers.validator");
const get_calculate_results_controller_1 = __importDefault(require("../../controllers/16-personalities/calculator/get-calculate-results.controller"));
const get_calculator_disclaimer_controller_1 = __importDefault(require("../../controllers/16-personalities/calculator/get-calculator-disclaimer.controller"));
const get_calculator_information_controller_1 = __importDefault(require("../../controllers/16-personalities/calculator/get-calculator-information.controller"));
const getPercentages_controller_1 = __importDefault(require("../../controllers/16-personalities/getPercentages.controller"));
const getQuestions_controller_1 = __importDefault(require("../../controllers/16-personalities/getQuestions.controller"));
const getTypeByResults_controller_1 = __importDefault(require("../../controllers/16-personalities/getTypeByResults.controller"));
const personalitiesRouter = (0, express_1.default)();
personalitiesRouter.post('/16-personalities/answers', test_answers_validator_1.testAnswersValidator, getPercentages_controller_1.default);
personalitiesRouter.post('/16-personalities/calculator', get_calculate_results_controller_1.default);
personalitiesRouter.get('/16-personalities/calculator-information', get_calculator_information_controller_1.default);
personalitiesRouter.get('/16-personalities/calculator-disclaimer', get_calculator_disclaimer_controller_1.default);
personalitiesRouter.get('/16-personalities/questions', getQuestions_controller_1.default);
personalitiesRouter.get('/16-personalities/result/:personType', getTypeByResults_controller_1.default);
exports.default = personalitiesRouter;
